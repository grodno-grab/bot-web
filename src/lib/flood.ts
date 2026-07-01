import type { TdSend, TdUpdate, TelegramController } from './types';

const FLOOD_MAX_RETRIES = 5;
const FLOOD_MAX_WAIT_SEC = 120; // don't sit through absurdly long flood waits

/**
 * send() wrapper that waits out a `FLOOD_WAIT_X` (with a visible countdown) and retries,
 * instead of letting the chat be skipped. mtcute's built-in flood waiter only covers short
 * waits (~10s); longer FLOOD_WAIT_20/31 are thrown, and without this the scan would silently
 * drop every rate-limited chat. Shared by the export and admin scans so their flood messages
 * stay identical. Non-flood errors (and absurdly long / repeated waits) are re-thrown for the
 * caller to handle. Use only on sequential loops — a parallel batch would just re-flood.
 */
export async function sendFloodSafe(
  send: TdSend,
  type: string,
  params: Record<string, unknown>,
  ctrl: TelegramController,
  label: string,
): Promise<TdUpdate> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await send(type, params);
    } catch (e) {
      const sec = Number(/FLOOD_WAIT_(\d+)/.exec((e as Error)?.message ?? '')?.[1]);
      if (!sec || attempt >= FLOOD_MAX_RETRIES || sec > FLOOD_MAX_WAIT_SEC) throw e;
      for (let left = sec + 1; left > 0; left--) {
        ctrl.showWorking(`Пауза из-за лимита Telegram: ${left} с (${label})`);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }
}
