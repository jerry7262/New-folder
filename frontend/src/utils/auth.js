import {
  STORAGE_KEYS,
  getJSON,
  setJSON,
  removeKey,
} from "./storage";
import { generateSaltBase64, hashPasswordPBKDF2, hashResetToken } from "./crypto";

const USERS_VERSION = 1;

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getUsers() {
  const users = getJSON(STORAGE_KEYS.users, []);
  if (!Array.isArray(users)) return [];
  return users;
}

function setUsers(users) {
  setJSON(STORAGE_KEYS.users, users);
}

export async function registerUser({ email, password, displayName }) {
  if (!isValidEmail(email)) throw new Error("Please enter a valid email address.");
  if (password.trim().length < 6)
    throw new Error("Password must be at least 6 characters.");

  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const existing = users.find((u) => u.email === normalizedEmail);
  if (existing) throw new Error("An account with that email already exists.");

  const saltBase64 = generateSaltBase64(16);
  const passwordHash = await hashPasswordPBKDF2(password, saltBase64, 100_000);

  const user = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `u_${Math.random().toString(16).slice(2)}_${Date.now()}`,
    version: USERS_VERSION,
    email: normalizedEmail,
    displayName: (displayName || "").trim() || normalizedEmail.split("@")[0],
    saltBase64,
    passwordHash,
    createdAt: Date.now(),
  };

  setUsers([user, ...users]);
  return { id: user.id, email: user.email, displayName: user.displayName };
}

export async function loginUser({ email, password }) {
  if (!isValidEmail(email)) throw new Error("Invalid email address.");
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user) throw new Error("Email or password is incorrect.");

  const passwordHash = await hashPasswordPBKDF2(password, user.saltBase64, 100_000);
  if (passwordHash !== user.passwordHash) throw new Error("Email or password is incorrect.");

  setJSON(STORAGE_KEYS.session, {
    userId: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: Date.now(),
  });

  return { id: user.id, email: user.email, displayName: user.displayName };
}

export function logoutUser() {
  removeKey(STORAGE_KEYS.session);
}

export function getSession() {
  return getJSON(STORAGE_KEYS.session, null);
}

export async function createPasswordResetToken({ email }) {
  if (!isValidEmail(email)) throw new Error("Please enter a valid email address.");
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const user = users.find((u) => u.email === normalizedEmail);

  // For a localStorage-only demo, we still generate tokens only for known users.
  if (!user) return null;

  const tokenBytes = new Uint8Array(32);
  crypto.getRandomValues(tokenBytes);

  // Store plaintext token temporarily for display in UI; we store only the hash.
  const tokenPlaintext = Array.from(tokenBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const tokenHash = await hashResetToken(tokenPlaintext);
  const expiresAt = Date.now() + 1000 * 60 * 30; // 30 minutes

  const existing = getJSON(STORAGE_KEYS.resetTokens, {});
  const next = {
    ...existing,
    [normalizedEmail]: {
      tokenHash,
      expiresAt,
      userId: user.id,
    },
  };

  setJSON(STORAGE_KEYS.resetTokens, next);
  return { email: normalizedEmail, tokenPlaintext, expiresAt };
}

export async function resetPassword({ email, tokenPlaintext, newPassword }) {
  if (!isValidEmail(email)) throw new Error("Invalid email address.");
  if (newPassword.trim().length < 6)
    throw new Error("Password must be at least 6 characters.");

  const normalizedEmail = normalizeEmail(email);
  const resetTokens = getJSON(STORAGE_KEYS.resetTokens, {});
  const record = resetTokens[normalizedEmail];
  if (!record) throw new Error("Invalid or expired reset token.");
  if (Date.now() > record.expiresAt) throw new Error("Invalid or expired reset token.");

  const tokenHash = await hashResetToken(tokenPlaintext);
  if (tokenHash !== record.tokenHash) throw new Error("Invalid or expired reset token.");

  const users = getUsers();
  const userIdx = users.findIndex((u) => u.email === normalizedEmail);
  if (userIdx === -1) throw new Error("Account no longer exists.");

  const saltBase64 = generateSaltBase64(16);
  const passwordHash = await hashPasswordPBKDF2(newPassword, saltBase64, 100_000);

  users[userIdx] = {
    ...users[userIdx],
    saltBase64,
    passwordHash,
  };

  setUsers(users);

  // Clear reset token record for this email.
  const { [normalizedEmail]: _, ...rest } = resetTokens;
  setJSON(STORAGE_KEYS.resetTokens, rest);
}

