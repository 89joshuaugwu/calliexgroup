"use client";

import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "./client";

interface AdminAuthState {
  user: User | null;
  loading: boolean;
  /** True once we've confirmed the signed-in email is in CMS_ADMIN_ALLOWED_EMAILS. */
  authorized: boolean;
  signInGoogle: () => Promise<void>;
  signInPassword: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        // Cheap client-side gate for UX (instant redirect). The real,
        // unbypassable check happens server-side in every Server Action
        // via verifyAdminToken() — this only decides what the UI shows.
        try {
          const res = await fetch("/api/admin/check-access", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: await nextUser.getIdToken() }),
          });
          setAuthorized(res.ok);
        } catch {
          setAuthorized(false);
        }
      } else {
        setAuthorized(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = useMemo<AdminAuthState>(
    () => ({
      user,
      loading,
      authorized,
      signInGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
      },
      signInPassword: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signOut: async () => {
        await firebaseSignOut(auth);
      },
      getIdToken: async () => (auth.currentUser ? auth.currentUser.getIdToken() : null),
    }),
    [user, loading, authorized]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside <AdminAuthProvider>");
  return ctx;
}
