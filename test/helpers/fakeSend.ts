import type { TdSend, TdUpdate } from '../../src/lib/types';

export interface SendCall {
  type: string;
  params: Record<string, unknown>;
}

/**
 * A handler is either a fixed response object, an Error (which is thrown),
 * or a function of (params, callIndex) returning a response / Error / void.
 * An array of handlers is consumed by call index (clamped to the last entry),
 * which is handy for loops and verification passes.
 */
export type Handler =
  | TdUpdate
  | Error
  | ((params: Record<string, unknown>, callIndex: number) => unknown);

export interface FakeSendOptions {
  handlers?: Record<string, Handler | Handler[]>;
  /** Response for any `@type` without an explicit handler. Default: `{}`. */
  fallback?: (type: string, params: Record<string, unknown>) => unknown;
}

export interface FakeSend {
  send: TdSend;
  calls: SendCall[];
  callsOf(type: string): SendCall[];
  countOf(type: string): number;
  lastOf(type: string): SendCall | undefined;
}

function unwrap(value: unknown): TdUpdate {
  if (value instanceof Error) throw value;
  return (value ?? {}) as TdUpdate;
}

/** Build a fake TDLib `send` that records every call and replies per handler map. */
export function makeFakeSend(opts: FakeSendOptions = {}): FakeSend {
  const calls: SendCall[] = [];
  const counts: Record<string, number> = {};
  const handlers = opts.handlers ?? {};

  const send: TdSend = async (type, params = {}) => {
    calls.push({ type, params });
    const n = counts[type] ?? 0;
    counts[type] = n + 1;

    let handler = handlers[type] as Handler | Handler[] | undefined;
    if (Array.isArray(handler)) {
      handler = handler[Math.min(n, handler.length - 1)];
    }

    if (handler === undefined) {
      if (opts.fallback) return unwrap(await opts.fallback(type, params));
      return {} as TdUpdate;
    }
    if (typeof handler === 'function') {
      return unwrap(await (handler as (p: Record<string, unknown>, i: number) => unknown)(params, n));
    }
    return unwrap(handler);
  };

  return {
    send,
    calls,
    callsOf: (t) => calls.filter((c) => c.type === t),
    countOf: (t) => counts[t] ?? 0,
    lastOf: (t) => [...calls].reverse().find((c) => c.type === t),
  };
}
