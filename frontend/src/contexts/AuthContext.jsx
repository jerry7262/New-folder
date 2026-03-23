/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getOrCreateAnonId, STORAGE_KEYS } from "../utils/storage";
import { getSession, loginUser, logoutUser, registerUser } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getSession());

  useEffect(() => {
    // Keep session synced across tabs.
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEYS.session) return;
      setSession(getSession());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const identityId = useMemo(() => {
    if (session?.userId) return session.userId;
    return getOrCreateAnonId();
  }, [session]);

  const value = useMemo(
    () => ({
      user: session,
      identityId,
      login: async (email, password) => {
        const next = await loginUser({ email, password });
        setSession(next ? { userId: next.id, email: next.email, displayName: next.displayName } : null);
      },
      signup: async (displayName, email, password) => {
        const next = await registerUser({ email, password, displayName });
        setSession({ userId: next.id, email: next.email, displayName: next.displayName });
      },
      logout: () => {
        logoutUser();
        setSession(null);
      },
      // Small helper for components that only need to know if a user exists.
      isLoggedIn: !!session?.userId,
    }),
    [session, identityId],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider.");
  return ctx;
}

