function isBrowser() {
  return typeof window !== "undefined" && window.crypto && window.crypto.subtle;
}

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function sha256Base64(input) {
  if (!isBrowser()) throw new Error("WebCrypto not available");
  const enc = new TextEncoder();
  const data = enc.encode(input);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return bytesToBase64(new Uint8Array(digest));
}

export async function hashPasswordPBKDF2(password, saltBase64, iterations = 100_000) {
  if (!isBrowser()) throw new Error("WebCrypto not available");

  const saltBytes = base64ToBytes(saltBase64);
  const enc = new TextEncoder();

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  return bytesToBase64(new Uint8Array(bits));
}

export function generateSaltBase64(bytes = 16) {
  if (!isBrowser()) throw new Error("WebCrypto not available");
  const arr = new Uint8Array(bytes);
  window.crypto.getRandomValues(arr);
  return bytesToBase64(arr);
}

export async function hashResetToken(tokenPlaintext) {
  return sha256Base64(tokenPlaintext);
}

