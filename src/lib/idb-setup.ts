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

// ── no-op IndexedDB (main thread) ─────────────────────────────────────────────

// The mtcute client runs on MemoryStorage and never opens IndexedDB (only
// @mtcute/web's unused IdbStorageDriver would). This stub stands in purely to
// guarantee ephemerality — no library/app code can persist to disk — without
// bundling the full ~141 KB fake-indexeddb implementation.
const noopRequest = (): IDBOpenDBRequest => ({
  onsuccess: null, onerror: null, onupgradeneeded: null, onblocked: null,
  result: undefined, error: null, readyState: 'pending',
  addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
} as unknown as IDBOpenDBRequest);

const memoryIndexedDB = {
  open: noopRequest,
  deleteDatabase: noopRequest,
  databases: async () => [],
  cmp: () => 0,
} as unknown as IDBFactory;

Object.defineProperty(window, 'indexedDB', { value: memoryIndexedDB, configurable: true });

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
