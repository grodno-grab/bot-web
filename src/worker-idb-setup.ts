import { IDBFactory, IDBKeyRange } from 'fake-indexeddb';

Object.defineProperty(globalThis, 'indexedDB', {
  value: new IDBFactory(),
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, 'IDBKeyRange', {
  value: IDBKeyRange,
  writable: true,
  configurable: true,
});
