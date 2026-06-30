import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

// Keeps the app ephemeral: all web storage is replaced with in-memory shims, so a
// session leaves nothing on disk.

// ── in-memory localStorage / sessionStorage ───────────────────────────────────

function createMemoryStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() { return map.size; },
    key(i: number) { return [...map.keys()][i] ?? null; },
    getItem(k: string) { return map.get(k) ?? null; },
    setItem(k: string, v: string) { map.set(k, String(v)); },
    removeItem(k: string) { map.delete(k); },
    clear() { map.clear(); },
  };
}

Object.defineProperty(window, 'localStorage',   { value: createMemoryStorage(), configurable: true });
Object.defineProperty(window, 'sessionStorage', { value: createMemoryStorage(), configurable: true });

// ── in-memory IndexedDB (main thread) ─────────────────────────────────────────

Object.defineProperty(window, 'indexedDB', { value: new IDBFactory(), configurable: true });
Object.defineProperty(window, 'IDBKeyRange', { value: IDBKeyRange, configurable: true });

// ── in-memory CacheStorage ────────────────────────────────────────────────────

const memCache: CacheStorage = {
  match: async () => undefined,
  has: async () => false,
  open: async () => ({
    match: async () => undefined,
    matchAll: async () => [],
    add: async () => {},
    addAll: async () => {},
    put: async () => {},
    delete: async () => false,
    keys: async () => [],
  }),
  delete: async () => false,
  keys: async () => [],
};

Object.defineProperty(window, 'caches', { value: memCache, configurable: true });
