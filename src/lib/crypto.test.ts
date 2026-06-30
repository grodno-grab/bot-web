// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { decryptAesCbc } from './crypto';
import { encryptBotDoc } from '../../test/helpers/cryptoFixture';

const decode = (buf: ArrayBuffer) => new TextDecoder().decode(buf);

describe('decryptAesCbc', () => {
  it('round-trips data encrypted with the same userId + key', async () => {
    const userId = '6092224989';
    const key = 'secret-key';
    const text = JSON.stringify([{ chat_id: -1001, message_ids: [1, 2, 3] }]);

    const buf = await encryptBotDoc(userId, key, text);
    const out = decode(await decryptAesCbc(buf, userId, key));

    expect(out).toBe(text);
  });

  it('uses the first 16 bytes as the IV (output is iv || ciphertext, block-aligned)', async () => {
    const buf = await encryptBotDoc('1', 'k', 'hello');
    // 16-byte IV + at least one 16-byte AES block, total a multiple of 16.
    expect(buf.byteLength).toBeGreaterThanOrEqual(32);
    expect(buf.byteLength % 16).toBe(0);
  });

  it('produces different ciphertext each call (random IV) but decrypts the same', async () => {
    const a = await encryptBotDoc('1', 'k', 'same');
    const b = await encryptBotDoc('1', 'k', 'same');
    expect(new Uint8Array(a)).not.toEqual(new Uint8Array(b));
    expect(decode(await decryptAesCbc(a, '1', 'k'))).toBe('same');
    expect(decode(await decryptAesCbc(b, '1', 'k'))).toBe('same');
  });

  it('does not recover the plaintext with a wrong userId or key', async () => {
    const buf = await encryptBotDoc('6092224989', 'right-key', 'topsecret');

    const tryDecrypt = async (userId: string, key: string) => {
      try {
        return decode(await decryptAesCbc(buf, userId, key));
      } catch {
        return '__THREW__';
      }
    };

    expect(await tryDecrypt('0000', 'right-key')).not.toBe('topsecret');
    expect(await tryDecrypt('6092224989', 'wrong-key')).not.toBe('topsecret');
  });
});
