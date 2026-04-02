import { useState, useEffect, useRef, useCallback, useMemo } from 'preact/hooks';
import './styles.css';

import { TelegramSession } from './lib/telegram';
import type { TelegramController, TdChat, DateRange, AdminChatGroup } from './lib/telegram';
import type { BotChatItem, ConfirmSummary } from './lib/types';
import { EXIT_FALLBACK_URL } from './lib/config';
import { todayDdMmYyyy } from './lib/utils';

import { Header }             from './components/Header';
import { IntroScreen }        from './screens/IntroScreen';
import { WorkingScreen }      from './screens/WorkingScreen';
import { PhoneScreen }        from './screens/PhoneScreen';
import { CodeScreen }         from './screens/CodeScreen';
import { PasswordScreen }     from './screens/PasswordScreen';
import { ErrorScreen }        from './screens/ErrorScreen';
import { ConfirmScreen }         from './screens/ConfirmScreen';
import { BotChatSelectScreen }  from './screens/BotChatSelectScreen';
import { BotDoneScreen }        from './screens/BotDoneScreen';
import { ModeSelectScreen }   from './screens/ModeSelectScreen';
import { AdminChatsScreen }   from './screens/AdminChatsScreen';
import { DateRangeScreen }    from './screens/DateRangeScreen';
import { AdminConfirmScreen } from './screens/AdminConfirmScreen';
import { AdminDoneScreen }    from './screens/AdminDoneScreen';

// ─── State ────────────────────────────────────────────────────────────────────

type Screen =
  | 'intro'
  | 'working'
  | 'phone'
  | 'code'
  | 'password'
  | 'error'
  | 'bot-chat-select'
  | 'confirm'
  | 'mode-select'
  | 'admin-chats'
  | 'date-range'
  | 'admin-confirm'
  | 'admin-done'
  | 'bot-done';

// Order determines transition direction: forward = deeper index, back = lower index
const SCREEN_ORDER: Screen[] = [
  'intro', 'phone', 'code', 'password', 'working',
  'bot-chat-select', 'confirm', 'mode-select', 'admin-chats', 'date-range',
  'admin-confirm', 'admin-done', 'bot-done', 'error',
];

interface AppState {
  screen: Screen;
  prevScreen: Screen | null;
  workingText: string;
  workingSpinner: boolean;
  errorText: string;
  passwordHint: string;
  botChatItems: BotChatItem[];
  confirmSummary: ConfirmSummary | null;
  botDoneText: string;
  adminChatGroups: AdminChatGroup[];
  selectedChatTitle: string;
  dateFromValue: string;
  dateToValue: string;
  adminConfirmText: string;
  adminConfirmWarning: string;
  adminDoneText: string;
}

const initialState: AppState = {
  screen: 'intro',
  prevScreen: null,
  workingText: '',
  workingSpinner: true,
  errorText: '',
  passwordHint: '',
  botChatItems: [],
  confirmSummary: null,
  botDoneText: '',
  adminChatGroups: [],
  selectedChatTitle: '',
  dateFromValue: '01.01.2020',
  dateToValue: todayDdMmYyyy(),
  adminConfirmText: '',
  adminConfirmWarning: '',
  adminDoneText: '',
};

// ─── Header config ────────────────────────────────────────────────────────────

interface HeaderConfig {
  title?: string;
  showBack?: boolean;
}

function getHeaderConfig(screen: Screen): HeaderConfig {
  switch (screen) {
    case 'intro':         return { title: 'FindMessagesBot' };
    case 'phone':
    case 'code':
    case 'password':
    case 'working':
    case 'error':         return {};
    case 'bot-chat-select': return { title: 'Выбор чатов' };
    case 'confirm':       return { title: 'Подтверждение' };
    case 'mode-select':   return { title: 'Выберите действие' };
    case 'admin-chats':   return { title: 'Доступные чаты', showBack: true };
    case 'date-range':    return { title: 'Период удаления', showBack: true };
    case 'admin-confirm': return { title: 'Подтверждение', showBack: true };
    case 'admin-done':    return { title: 'Готово' };
    case 'bot-done':      return { title: 'Готово' };
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export function App() {
  const [state, setState] = useState<AppState>(initialState);
  const resolveRef = useRef<((value: unknown) => void) | null>(null);
  const sessionRef = useRef<TelegramSession | null>(null);
  const cleanupRef = useRef(false);

  const dispatch = useCallback((value: unknown) => {
    const fn = resolveRef.current;
    if (fn) {
      resolveRef.current = null;
      fn(value);
    }
  }, []);

  const waitFor = useCallback(<T,>(update: (prev: AppState) => AppState): Promise<T> => {
    setState(update);
    return new Promise<T>(resolve => {
      resolveRef.current = resolve as (v: unknown) => void;
    });
  }, []);


  const controller = useMemo<TelegramController>(() => ({
    showWorking: (text, spinner = true) =>
      setState(prev => ({ ...prev, screen: 'working', prevScreen: prev.screen, workingText: text, workingSpinner: spinner })),

    showError: (text) =>
      setState(prev => ({ ...prev, screen: 'error', prevScreen: prev.screen, errorText: text })),

    showPhoneScreen: () =>
      setState(prev => ({ ...prev, screen: 'phone', prevScreen: prev.screen })),

    showCodeScreen: () =>
      setState(prev => ({ ...prev, screen: 'code', prevScreen: prev.screen })),

    showPasswordScreen: (hint) =>
      setState(prev => ({ ...prev, screen: 'password', prevScreen: prev.screen, passwordHint: hint })),

    waitForChatSelect: (chats) =>
      waitFor<Set<number> | null>(prev => ({
        ...prev,
        screen: 'bot-chat-select',
        prevScreen: prev.screen,
        botChatItems: chats,
      })),

    waitForConfirm: (summary) =>
      waitFor<boolean>(prev => ({
        ...prev,
        screen: 'confirm',
        prevScreen: prev.screen,
        confirmSummary: summary ?? null,
      })),

    waitForBotDone: (text) =>
      waitFor<'back' | 'done'>(prev => ({
        ...prev,
        screen: 'bot-done',
        prevScreen: prev.screen,
        botDoneText: text,
      })),

    waitForModeSelect: () =>
      waitFor<'user' | 'admin'>(prev => ({ ...prev, screen: 'mode-select', prevScreen: prev.screen })),

    waitForAdminChatSelect: (groups) =>
      waitFor<TdChat | null>(prev => ({ ...prev, screen: 'admin-chats', prevScreen: prev.screen, adminChatGroups: groups })),

    waitForDateRange: (chatTitle) =>
      waitFor<DateRange | null>(prev => ({
        ...prev,
        screen: 'date-range',
        prevScreen: prev.screen,
        selectedChatTitle: chatTitle,
      })),

    waitForAdminConfirm: (chat, startDate, endDate) =>
      waitFor<boolean>(prev => ({
        ...prev,
        screen: 'admin-confirm',
        prevScreen: prev.screen,
        adminConfirmText: `Чат: «${chat.title}».`,
        adminConfirmWarning:
          `Будут безвозвратно удалены все сообщения каждого участника, ` +
          `написавшего хотя бы одно сообщение с ${startDate} по ${endDate} — ` +
          `включая сообщения за другие даты.`,
      })),

    waitForAdminDone: (chatTitle, startDate, endDate, count) =>
      waitFor<'next' | 'done'>(prev => ({
        ...prev,
        screen: 'admin-done',
        prevScreen: prev.screen,
        adminDoneText:
          `Чат: «${chatTitle}». Период: с ${startDate} по ${endDate}. ` +
          `Обработано пользователей: ${count}.`,
      })),

  }), [waitFor]);

  const handleCancelAndExit = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.cancelAndExit().catch(() => location.replace(EXIT_FALLBACK_URL));
    } else {
      location.replace(EXIT_FALLBACK_URL);
    }
  }, []);

  // Sync viewport height for mobile keyboard
  useEffect(() => {
    const sync = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--viewport-height', `${h}px`);
    };
    window.visualViewport?.addEventListener('resize', sync);
    sync();
    return () => window.visualViewport?.removeEventListener('resize', sync);
  }, []);

  useEffect(() => {
    const onUnload = () => {
      if (cleanupRef.current) return;
      cleanupRef.current = true;
      sessionRef.current?.onPageUnload();
    };
    window.addEventListener('pagehide', onUnload);
    window.addEventListener('beforeunload', onUnload);
    window.addEventListener('pageshow', (e) => {
      if ((e as PageTransitionEvent).persisted) location.reload();
    });
    return () => {
      window.removeEventListener('pagehide', onUnload);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, []);

  useEffect(() => {
    return () => sessionRef.current?.cleanup();
  }, []);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleIntroProceed = useCallback(() => {
    let session: TelegramSession;
    try {
      session = new TelegramSession(controller);
    } catch (err) {
      controller.showError(`Не удалось запустить TDLib: ${(err as Error).message}`);
      return;
    }
    sessionRef.current = session;
  }, [controller]);

  // Back navigation handlers — dispatch null to the waiting promise
  const handleBack = useCallback(() => {
    dispatch(null);
  }, [dispatch]);

  // ─── Render ──────────────────────────────────────────────────────────────────

  const { screen, prevScreen } = state;
  const headerConfig = getHeaderConfig(screen);
  const isIntro = screen === 'intro';
  const isDoneWorking = screen === 'working' && !state.workingSpinner;
  const showFooterCancel = !isIntro;

  // Determine transition direction
  const prevIdx = prevScreen ? SCREEN_ORDER.indexOf(prevScreen) : -1;
  const currIdx = SCREEN_ORDER.indexOf(screen);
  const transitionClass = prevScreen === null
    ? ''
    : currIdx >= prevIdx
    ? 'screen-enter-forward'
    : 'screen-enter-back';

  return (
    <div id="app">
      <Header
        title={headerConfig.title}
        onBack={headerConfig.showBack ? handleBack : undefined}
      />

      <div class="app-content">
        <div class={transitionClass} key={screen}>
          {screen === 'intro' && (
            <IntroScreen
              onProceed={handleIntroProceed}
              onCancel={handleCancelAndExit}
            />
          )}
          {screen === 'working' && (
            <WorkingScreen text={state.workingText} spinner={state.workingSpinner} />
          )}
          {screen === 'phone' && (
            <PhoneScreen onSubmit={p => sessionRef.current!.submitPhone(p)} />
          )}
          {screen === 'code' && (
            <CodeScreen onSubmit={c => sessionRef.current!.submitCode(c)} />
          )}
          {screen === 'password' && (
            <PasswordScreen hint={state.passwordHint} onSubmit={p => sessionRef.current!.submitPassword(p)} />
          )}
          {screen === 'error' && (
            <ErrorScreen message={state.errorText} />
          )}
          {screen === 'bot-chat-select' && (
            <BotChatSelectScreen
              chats={state.botChatItems}
              onProceed={ids => dispatch(ids)}
              onBack={() => dispatch(null)}
            />
          )}
          {screen === 'confirm' && (
            <ConfirmScreen
              summary={state.confirmSummary ?? undefined}
              onConfirm={() => dispatch(true)}
              onCancel={() => dispatch(false)}
            />
          )}
          {screen === 'mode-select' && (
            <ModeSelectScreen onSelect={mode => dispatch(mode)} />
          )}
          {screen === 'admin-chats' && (
            <AdminChatsScreen groups={state.adminChatGroups} onSelect={chat => dispatch(chat)} />
          )}
          {screen === 'date-range' && (
            <DateRangeScreen
              chatTitle={state.selectedChatTitle}
              defaultFrom={state.dateFromValue}
              defaultTo={state.dateToValue}
              onSubmit={range => {
                setState(prev => ({ ...prev, dateFromValue: range.startDateStr, dateToValue: range.endDateStr }));
                dispatch(range);
              }}
            />
          )}
          {screen === 'admin-confirm' && (
            <AdminConfirmScreen
              text={state.adminConfirmText}
              warning={state.adminConfirmWarning}
              onConfirm={() => dispatch(true)}
            />
          )}
          {screen === 'admin-done' && (
            <AdminDoneScreen
              text={state.adminDoneText}
              onNext={() => dispatch('next')}
              onFinish={() => dispatch('done')}
            />
          )}
          {screen === 'bot-done' && (
            <BotDoneScreen
              text={state.botDoneText}
              onBack={() => dispatch('back')}
              onFinish={() => dispatch('done')}
            />
          )}
        </div>
      </div>

      {showFooterCancel && (
        <div class="app-footer-cancel">
          <div class="app-footer-cancel-inner">
            <button onClick={handleCancelAndExit} disabled={isDoneWorking}>
              {isDoneWorking ? 'Выйти' : 'Отменить и выйти'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
