export async function decryptAesCbc(
  buffer: ArrayBuffer,
  userId: string,
  key: string,
): Promise<ArrayBuffer> {
  const keyMaterial = new TextEncoder().encode(userId + key);
  const keyData = await crypto.subtle.digest('SHA-256', keyMaterial);
  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'AES-CBC' }, false, ['decrypt'],
  );
  const iv = buffer.slice(0, 16);
  const ciphertext = buffer.slice(16);
  return crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, ciphertext);
}
