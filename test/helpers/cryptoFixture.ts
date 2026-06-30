/**
 * Produce ciphertext that `decryptAesCbc` (src/lib/crypto.ts) can decrypt.
 * Mirrors its key derivation: AES-CBC with key = SHA-256(userId + key),
 * output = iv(16 bytes) || ciphertext. Uses Web Crypto (PKCS#7 padding).
 */
export async function encryptBotDoc(
  userId: string,
  key: string,
  plaintext: string | Uint8Array,
): Promise<ArrayBuffer> {
  const { subtle } = globalThis.crypto;
  const keyMaterial = new TextEncoder().encode(userId + key);
  const keyData = await subtle.digest('SHA-256', keyMaterial);
  const cryptoKey = await subtle.importKey('raw', keyData, { name: 'AES-CBC' }, false, ['encrypt']);

  const iv = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const data = typeof plaintext === 'string' ? new TextEncoder().encode(plaintext) : plaintext;
  const ciphertext = await subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, data);

  const out = new Uint8Array(16 + ciphertext.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ciphertext), 16);
  return out.buffer;
}

/** Convenience: encrypt a JSON-serialisable value as the bot document. */
export function encryptBotJson(userId: string, key: string, value: unknown): Promise<ArrayBuffer> {
  return encryptBotDoc(userId, key, JSON.stringify(value));
}
