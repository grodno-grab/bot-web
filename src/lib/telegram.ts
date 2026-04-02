import {
  API_ID, API_HASH,
  BOT_CHAT_ID,
  BOT_DATA_BUTTON_TEXT,
  TDLIB_INSTANCE_NAME,
  EXIT_FALLBACK_URL,
  INIT_TIMEOUT_MS, EXIT_REDIRECT_DELAY_MS,
} from './config';
import { startBotFlow, handleBotMessage, sendBotResult } from './bot-flow';
import { runAdminFlow } from './admin-flow';
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

  async cancelAndExit(): Promise<void> {
    this.isSessionActive = false;
    this.cleanupPerformed = true;
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
      case 'authorizationStateWaitTdlibParameters':
        await this.send('setTdlibParameters', {
          api_id: API_ID,
          api_hash: API_HASH,
          system_language_code: navigator.language || 'en',
          device_model: 'Web',
          system_version: navigator.platform || 'Unknown',
          application_version: '1.0',
          use_file_database: false,
          use_message_database: false,
          use_secret_chats: false,
          use_test_dc: false,
        });
        break;

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
        this.routePostAuthFlow().catch(err => this.ctrl.showError((err as Error).message));
        break;
    }
  }

  // ─── Post-auth routing ───────────────────────────────────────────────────────

  private async routePostAuthFlow(): Promise<void> {
    const send = this.send.bind(this);

    while (true) {
      const mode = await this.ctrl.waitForModeSelect();

      if (mode === 'user') {
        await startBotFlow(send, this.ctrl);
        return; // onBotMessage handles the rest
      }

      this.isSessionActive = false;
      const result = await runAdminFlow(send, this.ctrl);
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
    const rows = (msg.reply_markup as TdUpdate)?.rows as TdUpdate[][] | undefined;
    const hasMarker = rows?.some(row => row.some(btn => btn.text === BOT_DATA_BUTTON_TEXT));
    if (!hasMarker) return;

    this.isSessionActive = false;
    const send = this.send.bind(this);

    const result = await handleBotMessage(msg, send, this.ctrl);
    if (result === 'back') {
      this.isSessionActive = true;
      await this.routePostAuthFlow();
      return;
    }
    await sendBotResult(result, send, this.ctrl);
    const doneText = result.length === 0
      ? 'Все найденные сообщения успешно удалены.'
      : `Не удалось удалить сообщения из ${result.length} чатов.`;
    const action = await this.ctrl.waitForBotDone(doneText);
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
    this.tdlibLoggedOut = true;
    this.cleanupPerformed = true;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private send(type: string, params: Record<string, unknown> = {}): Promise<TdUpdate> {
    return this.tg.send({ '@type': type, ...params }) as Promise<TdUpdate>;
  }
}
