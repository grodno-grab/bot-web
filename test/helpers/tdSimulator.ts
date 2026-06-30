import type { TdSend } from '../../src/lib/types';

type Emit = (update: Record<string, unknown>) => void;

export interface SimScript {
  /** Ask for a 2FA password after the login code. */
  requirePassword?: boolean;
  passwordHint?: string;
  /** Throw from the TdClient constructor (simulates a failed WASM load). */
  throwOnConstruct?: boolean;
  /** Never emit the first authorization update (to test the init timeout). */
  silent?: boolean;
  /** Delegate non-auth `send` calls (e.g. a buildAdminSend / makeFakeSend send). */
  onSend?: TdSend;
  /** Bot data message delivered via updateNewMessage after sendBotStartMessage. */
  botMessage?: Record<string, unknown>;
}

const authUpdate = (type: string, extra: Record<string, unknown> = {}) => ({
  '@type': 'updateAuthorizationState',
  authorization_state: { '@type': type, ...extra },
});

/**
 * Install a scriptable fake `tdweb` global that mimics the TDLib client the
 * production code talks to: it drives the authorization handshake and delegates
 * everything else to an optional `onSend` handler.
 */
export function installTdSimulator(script: SimScript = {}) {
  class TdSimClient {
    onUpdate: ((u: Record<string, unknown>) => void) | null = null;

    constructor(_opts: unknown) {
      if (script.throwOnConstruct) throw new Error('wasm load failed');
      if (!script.silent) {
        queueMicrotask(() => this.emit(authUpdate('authorizationStateWaitTdlibParameters')));
      }
    }

    private emit: Emit = (u) => this.onUpdate?.(u);

    async send(req: Record<string, unknown>): Promise<unknown> {
      const type = req['@type'] as string;

      switch (type) {
        case 'setTdlibParameters':
          queueMicrotask(() => this.emit(authUpdate('authorizationStateWaitEncryptionKey')));
          return {};
        case 'setDatabaseEncryptionKey':
          queueMicrotask(() => this.emit(authUpdate('authorizationStateWaitPhoneNumber')));
          return {};
        case 'setAuthenticationPhoneNumber':
          queueMicrotask(() => this.emit(authUpdate('authorizationStateWaitCode')));
          return {};
        case 'checkAuthenticationCode':
          queueMicrotask(() =>
            this.emit(
              script.requirePassword
                ? authUpdate('authorizationStateWaitPassword', { password_hint: script.passwordHint ?? '' })
                : authUpdate('authorizationStateReady'),
            ),
          );
          return {};
        case 'checkAuthenticationPassword':
          queueMicrotask(() => this.emit(authUpdate('authorizationStateReady')));
          return {};
      }

      let result: unknown = {};
      if (script.onSend) {
        const { '@type': _omit, ...params } = req;
        result = await script.onSend(type, params);
      }

      if (type === 'sendBotStartMessage' && script.botMessage) {
        queueMicrotask(() => this.emit({ '@type': 'updateNewMessage', message: script.botMessage }));
      }

      return result;
    }
  }

  (globalThis as unknown as { tdweb: unknown }).tdweb = { default: TdSimClient };
}

export function uninstallTdSimulator() {
  delete (globalThis as unknown as { tdweb?: unknown }).tdweb;
}
