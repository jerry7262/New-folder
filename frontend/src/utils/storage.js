const PREFIX = "fc_";

export const STORAGE_KEYS = {
  session: `${PREFIX}session_v1`,
  users: `${PREFIX}users_v1`,
  resetTokens: `${PREFIX}reset_tokens_v1`,
  anonId: `${PREFIX}anon_id_v1`,
  prayers: `${PREFIX}prayers_v1`,
  bookmarks: `${PREFIX}bookmarks_v1`,
};

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getJSON(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setJSON(key, value) {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key) {
  if (!isBrowser()) return;
  window.localStorage.removeItem(key);
}

export function getOrCreateAnonId() {
  if (!isBrowser()) return "anon";
  const existing = window.localStorage.getItem(STORAGE_KEYS.anonId);
  if (existing) return existing;
  const newId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `anon_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  window.localStorage.setItem(STORAGE_KEYS.anonId, newId);
  return newId;
}

