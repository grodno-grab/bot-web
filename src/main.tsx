import './lib/idb-setup';
import { render } from 'preact';
import { App } from './App';
import { TdAdapter } from './lib/td-adapter';

// Register the mtcute-backed client under the same global the app and tests use.
// `??=` lets an already-installed fake (unit tests, e2e init script) win.
(globalThis as unknown as { tdweb?: unknown }).tdweb ??= { default: TdAdapter };

render(<App />, document.getElementById('app')!);
