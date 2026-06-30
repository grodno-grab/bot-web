import type {
  TelegramController,
  BotChatItem,
  ConfirmSummary,
  TdChat,
  AdminChatGroup,
  DateRange,
} from '../../src/lib/types';

/** Scripted answers consumed in order; each falls back to a safe default. */
export interface ScriptedAnswers {
  chatSelect?: (Set<number> | null)[];
  confirm?: boolean[];
  botDone?: ('back' | 'done')[];
  modeSelect?: ('user' | 'admin')[];
  adminChatSelect?: (TdChat | null)[];
  dateRange?: (DateRange | null)[];
  adminConfirm?: boolean[];
  adminDone?: ('next' | 'done')[];
}

export interface ControllerCall {
  method: string;
  args: unknown[];
}

export interface FakeController {
  ctrl: TelegramController;
  calls: ControllerCall[];
  working: { text: string; spinner: boolean }[];
  errors: string[];
  callsOf(method: string): ControllerCall[];
}

export function makeFakeController(answers: ScriptedAnswers = {}): FakeController {
  const calls: ControllerCall[] = [];
  const working: { text: string; spinner: boolean }[] = [];
  const errors: string[] = [];
  const idx: Record<string, number> = {};

  const next = <T>(key: keyof ScriptedAnswers, fallback: T): T => {
    const arr = (answers[key] as T[] | undefined) ?? [];
    const i = idx[key] ?? 0;
    idx[key] = i + 1;
    return i < arr.length ? arr[i] : fallback;
  };

  const record = (method: string, args: unknown[]) => calls.push({ method, args });

  const ctrl: TelegramController = {
    showWorking: (text, spinner = true) => {
      record('showWorking', [text, spinner]);
      working.push({ text, spinner });
    },
    showError: (text) => {
      record('showError', [text]);
      errors.push(text);
    },
    showPhoneScreen: () => record('showPhoneScreen', []),
    showCodeScreen: () => record('showCodeScreen', []),
    showPasswordScreen: (hint) => record('showPasswordScreen', [hint]),

    waitForChatSelect: async (chats: BotChatItem[]) => {
      record('waitForChatSelect', [chats]);
      return next<Set<number> | null>('chatSelect', null);
    },
    waitForConfirm: async (summary?: ConfirmSummary) => {
      record('waitForConfirm', [summary]);
      return next<boolean>('confirm', false);
    },
    waitForBotDone: async (text: string) => {
      record('waitForBotDone', [text]);
      return next<'back' | 'done'>('botDone', 'done');
    },
    waitForModeSelect: async () => {
      record('waitForModeSelect', []);
      return next<'user' | 'admin'>('modeSelect', 'user');
    },
    waitForAdminChatSelect: async (groups: AdminChatGroup[]) => {
      record('waitForAdminChatSelect', [groups]);
      return next<TdChat | null>('adminChatSelect', null);
    },
    waitForDateRange: async (chatTitle: string, supergroupIdToHide?: number) => {
      record('waitForDateRange', [chatTitle, supergroupIdToHide]);
      return next<DateRange | null>('dateRange', null);
    },
    waitForAdminConfirm: async (chat: TdChat, startDate: string, endDate: string) => {
      record('waitForAdminConfirm', [chat, startDate, endDate]);
      return next<boolean>('adminConfirm', false);
    },
    waitForAdminDone: async (chatTitle: string, startDate: string, endDate: string, count: number, failedCount: number) => {
      record('waitForAdminDone', [chatTitle, startDate, endDate, count, failedCount]);
      return next<'next' | 'done'>('adminDone', 'done');
    },
  };

  return {
    ctrl,
    calls,
    working,
    errors,
    callsOf: (method) => calls.filter((c) => c.method === method),
  };
}
