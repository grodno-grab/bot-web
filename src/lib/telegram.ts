import {
  API_ID, API_HASH,
  BOT_CHAT_ID,
  BOT_DATA_BUTTON_TEXT,
  TDLIB_INSTANCE_NAME,
  EXIT_FALLBACK_URL,
  INIT_TIMEOUT_MS, EXIT_REDIRECT_DELAY_MS,
} from './config';
import { startBotFlow, handleBotMessage, handleNoBotData, handleExportOnly, sendBotResult } from './bot-flow';
import { collectChatsViaExport, type ExportFinding } from './export-flow';
import { runAdminFlow } from './admin-flow';
import { browserProfile } from './utils';
import type { TdUpdate, TelegramController } from './types';

export type { TdChat, DateRange, TelegramController, AdminChatGroup } from './types';

// ─── Session ──────────────────────────────────────────────────────────────────

export class TelegramSession {
  private tg: TdClient;
  private ctrl: TelegramController;
  private isSessionActive = false;
  private tdlibLoggedOut = false;
  private initTimerId: ReturnType<typeof setTimeout> | null = null;
  private cleanupPerformed = false;
  private takeoutSessionId: string | null = null;
  private exportFindings: ExportFinding[] = [];

  constructor(ctrl: TelegramController) {
    this.ctrl = ctrl;

    const TdClientClass = tdweb.default;
    this.tg = new TdClientClass({
      logVerbosityLevel: 1,
      mode: 'wasm',
      instanceName: TDLIB_INSTANCE_NAME,
      readOnly: false,
      isBackground: false,
      useDatabase: false,
      wasmUrl: 'tdlib.wasm',
    });

    this.tg.onUpdate = this.handleUpdate.bind(this);

    this.initTimerId = setTimeout(() => {
      ctrl.showError('Инициализация не завершилась. Попробуйте обновить страницу.');
    }, INIT_TIMEOUT_MS);

    ctrl.showWorking('Инициализация…');
  }

  // ─── Public API ─────────────────────────────────────────────────────────────

  async submitPhone(phone: string): Promise<void> {
    await this.send('setAuthenticationPhoneNumber', { phone_number: phone });
  }

  async submitCode(code: string): Promise<void> {
    await this.send('checkAuthenticationCode', { code });
  }

  async submitPassword(password: string): Promise<void> {
    await this.send('checkAuthenticationPassword', { password });
  }

  async toggleHideMembers(supergroupId: number): Promise<void> {
    await this.send('toggleSupergroupHasHiddenMembers', {
      supergroup_id: supergroupId,
      has_hidden_members: true,
    });
  }

  async cancelAndExit(): Promise<void> {
    this.isSessionActive = false;
    this.cleanupPerformed = true;
    this.finishTakeout();
    if (!this.tdlibLoggedOut) {
      try { await this.send('logOut'); } catch (_) {}
    }
    window.close();
    await new Promise(r => setTimeout(r, EXIT_REDIRECT_DELAY_MS));
    location.replace(EXIT_FALLBACK_URL);
  }

  onPageUnload(): void {
    if (this.cleanupPerformed) return;
    this.cleanupPerformed = true;
    this.finishTakeout();
    this.send('logOut').catch(() => {});
  }

  cleanup(): void {
    if (this.initTimerId !== null) {
      clearTimeout(this.initTimerId);
      this.initTimerId = null;
    }
  }

  // ─── TDLib update handler ────────────────────────────────────────────────────

  private handleUpdate(update: Record<string, unknown>): void {
    if (this.initTimerId !== null) {
      clearTimeout(this.initTimerId);
      this.initTimerId = null;
    }

    switch (update['@type']) {
      case 'updateAuthorizationState':
        this.handleAuthState(update.authorization_state as TdUpdate)
          .catch(err => this.ctrl.showError((err as Error).message));
        break;

      case 'updateNewMessage':
        if (this.isSessionActive) {
          this.onBotMessage(update.message as TdUpdate)
            .catch(err => this.ctrl.showError((err as Error).message));
        }
        break;
    }
  }

  // ─── Authorization ───────────────────────────────────────────────────────────

  private async handleAuthState(state: TdUpdate): Promise<void> {
    switch (state['@type']) {
      case 'authorizationStateWaitTdlibParameters': {
        // Present as the actual browser (shown in Telegram's active-sessions list)
        // rather than a generic "Web".
        const { deviceModel, systemVersion } = browserProfile();
        await this.send('setTdlibParameters', {
          api_id: API_ID,
          api_hash: API_HASH,
          system_language_code: navigator.language || 'en',
          device_model: deviceModel,
          system_version: systemVersion,
          application_version: '1.0',
          use_file_database: false,
          use_message_database: false,
          use_secret_chats: false,
          use_test_dc: false,
        });
        break;
      }

      case 'authorizationStateWaitEncryptionKey':
        await this.send('setDatabaseEncryptionKey', { new_encryption_key: '' });
        break;

      case 'authorizationStateWaitPhoneNumber':
        this.ctrl.showPhoneScreen();
        break;

      case 'authorizationStateWaitCode':
        this.ctrl.showCodeScreen();
        break;

      case 'authorizationStateWaitPassword': {
        const hint = (state as { password_hint?: string }).password_hint ?? '';
        this.ctrl.showPasswordScreen(hint);
        break;
      }

      case 'authorizationStateReady':
        this.isSessionActive = true;
        this.startPostAuth().catch(err => this.ctrl.showError((err as Error).message));
        break;
    }
  }

  // ─── Post-auth routing ───────────────────────────────────────────────────────

  private async startPostAuth(): Promise<void> {
    // Open the account-export (takeout) session right after login so previously-left
    // chats become reachable; it stays open until finish/exit (see finishTakeout).
    await this.ensureTakeoutSession();
    await this.routePostAuthFlow();
  }

  /**
   * Open a takeout session. Telegram guards data export behind a confirmation: the first
   * call usually fails until the user approves the export request in their Telegram app,
   * so we ask them to do that and retry when they press «Продолжить».
   */
  private async ensureTakeoutSession(): Promise<void> {
    if (this.takeoutSessionId) return;
    for (;;) {
      try {
        this.ctrl.showWorking('Подготовка доступа к данным аккаунта…');
        const session = await this.send('initTakeoutSession', {
          message_users: true,
          message_chats: true,
          message_megagroups: true,
          message_channels: true,
        }) as TdUpdate & { id?: string };
        this.takeoutSessionId = session.id ?? null;
        return;
      } catch (_) {
        await this.ctrl.waitForExportApproval(
          'Чтобы проверить не только текущие чаты, но и покинутые ранее группы, разрешите ' +
          'экспорт данных: откройте приложение Telegram <b>на телефоне</b>, подтвердите ' +
          'запрос на экспорт, затем вернитесь сюда и нажмите «Продолжить».',
        );
      }
    }
  }

  private async routePostAuthFlow(): Promise<void> {
    const send = this.send.bind(this);

    while (true) {
      const mode = await this.ctrl.waitForModeSelect();

      if (mode === 'user') {
        this.isSessionActive = true;
        // Enumerate chats via the takeout session (incl. left chats) and find own
        // messages before the bot flow; these are merged into the deletion list below.
        this.exportFindings = await collectChatsViaExport(send, this.ctrl, this.takeoutSessionId);
        await startBotFlow(send, this.ctrl);
        return; // onBotMessage handles the rest
      }

      this.isSessionActive = false;
      const result = await runAdminFlow(send, this.ctrl, this.takeoutSessionId);
      if (result === 'back') continue;
      if (result === 'completed') this.finishSession();
      return;
    }
  }

  // ─── Bot message handling ────────────────────────────────────────────────────

  private async onBotMessage(msg: TdUpdate): Promise<void> {
    if ((msg.chat_id as number) !== BOT_CHAT_ID) return;
    if ((msg.sender_id as TdUpdate)?.user_id !== BOT_CHAT_ID) return;
    if ((msg.content as TdUpdate)?.['@type'] !== 'messageText') return;

    this.isSessionActive = false;
    const send = this.send.bind(this);

    // A genuine bot reply carries the data marker button. Without it, the bot is
    // telling us there is nothing to delete — otherwise the flow would hang on
    // "Ожидание ответа бота…" waiting for a data message that never comes.
    const rows = (msg.reply_markup as TdUpdate)?.rows as TdUpdate[][] | undefined;
    const hasData = rows?.some(row => row.some(btn => btn.text === BOT_DATA_BUTTON_TEXT));

    let result: number[] | 'back' | 'no-data';
    if (hasData) {
      result = await handleBotMessage(msg, send, this.ctrl, this.exportFindings);
    } else {
      // The bot found nothing itself — remove its message, but still offer any messages
      // the export/replies scan turned up so the unified list isn't lost.
      await handleNoBotData(msg, send);
      result = await handleExportOnly(this.exportFindings, send, this.ctrl);
    }

    if (result === 'back') {
      this.isSessionActive = true;
      await this.routePostAuthFlow();
      return;
    }

    let doneText: string;
    let doneTitle: string | undefined;
    if (result === 'no-data') {
      doneTitle = 'Всё чисто';
      doneText = 'Сообщений для удаления не найдено — ваши чаты уже чистые.';
    } else {
      await sendBotResult(result, send, this.ctrl);
      doneText = result.length === 0
        ? 'Все найденные сообщения успешно удалены.'
        : `Не удалось удалить сообщения из ${result.length} чатов.`;
    }

    const action = await this.ctrl.waitForBotDone(doneText, doneTitle);
    if (action === 'back') {
      this.isSessionActive = true;
      await this.routePostAuthFlow();
      return;
    }
    await this.send('logOut');
    this.finishSession();
  }

  // ─── Session finalization ────────────────────────────────────────────────────

  private finishSession(): void {
    this.finishTakeout();
    this.tdlibLoggedOut = true;
    this.cleanupPerformed = true;
  }

  /** Close the takeout session (best-effort) on finish or when the page goes away. */
  private finishTakeout(): void {
    if (!this.takeoutSessionId) return;
    const id = this.takeoutSessionId;
    this.takeoutSessionId = null;
    this.send('finishTakeoutSession', { takeout_session_id: id, success: true }).catch(() => {});
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private send(type: string, params: Record<string, unknown> = {}): Promise<TdUpdate> {
    return this.tg.send({ '@type': type, ...params }) as Promise<TdUpdate>;
  }
}
