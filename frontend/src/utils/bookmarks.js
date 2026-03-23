import { STORAGE_KEYS, getJSON, setJSON } from "./storage";

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `bm_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function normalizeText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function makeDedupKey(reference, translation, text) {
  return `${reference}::${translation}::${normalizeText(text)}`.toLowerCase();
}

export function getBookmarks() {
  return getJSON(STORAGE_KEYS.bookmarks, []);
}

export function setBookmarks(next) {
  setJSON(STORAGE_KEYS.bookmarks, next);
}

export function addBookmark({ reference, translation, text }) {
  const next = getBookmarks().filter(Boolean);
  const translationNormalized = (translation || "KJV").toUpperCase();

  const dedupKey = makeDedupKey(reference, translationNormalized, text);
  const exists = next.some((b) => b.dedupKey === dedupKey);
  if (exists) return { added: false };

  const createdAt = Date.now();
  const bookmark = {
    id: makeId(),
    reference,
    translation: translationNormalized,
    text,
    createdAt,
    dedupKey,
  };

  const updated = [bookmark, ...next];
  setBookmarks(updated);
  return { added: true, bookmark };
}

export function removeBookmark(id) {
  const next = getBookmarks().filter((b) => b.id !== id);
  setBookmarks(next);
}

