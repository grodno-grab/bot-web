export interface TdChat {
  id: number;
  title: string;
  type: {
    '@type': string;
    supergroup_id?: number;
    is_channel?: boolean;
  };
  photo?: {
    minithumbnail?: {
      data: string;
    };
  };
  can_hide_members?: boolean;
  has_hidden_members?: boolean;
}

export interface DateRange {
  startTs: number;
  endTs: number;
  startDateStr: string;
  endDateStr: string;
}

export interface TdUpdate {
  '@type': string;
  [key: string]: unknown;
}

export interface BotChatItem {
  chatId: number;
  displayName: string;
  messageCount: number;
  thumbnail?: string;
}

export interface ConfirmSummary {
  totalMessages: number;
  chatNames: string[];
}

export interface AdminChatGroup {
  label: string;
  chats: TdChat[];
}

export interface TelegramController {
  showWorking(text: string, spinner?: boolean): void;
  showError(text: string): void;
  showPhoneScreen(): void;
  showCodeScreen(): void;
  showPasswordScreen(hint: string): void;

  waitForChatSelect(chats: BotChatItem[]): Promise<Set<number> | null>;
  waitForConfirm(summary?: ConfirmSummary): Promise<boolean>;
  waitForBotDone(text: string): Promise<'back' | 'done'>;
  waitForModeSelect(): Promise<'user' | 'admin'>;
  waitForAdminChatSelect(groups: AdminChatGroup[]): Promise<TdChat | null>;
  waitForDateRange(chatTitle: string, supergroupIdToHide?: number): Promise<DateRange | null>;
  waitForAdminConfirm(chat: TdChat, startDate: string, endDate: string): Promise<boolean>;
  waitForAdminDone(
    chatTitle: string, startDate: string, endDate: string, count: number,
  ): Promise<'next' | 'done'>;
}

export type TdSend = (type: string, params?: Record<string, unknown>) => Promise<TdUpdate>;
