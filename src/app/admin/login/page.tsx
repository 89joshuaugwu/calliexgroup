"use client";

import { AlertCircle, Building2, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAdminAuth } from "@/lib/firebase/auth-context";

export default function AdminLoginPage() {
  const { signInGoogle, signInPassword } = useAdminAuth();
  const params = useSearchParams();
  const denied = params.get("denied") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signInPassword(email, password);
    } catch {
      setError("Could not sign in with that email and password.");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setError("");
    try {
      await signInGoogle();
    } catch {
      setError("Google sign-in was cancelled or failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="cx-login">
      <div className="cx-login__card">
        <div className="cx-login__brand">
          <Building2 size={22} />
          <span>Callie X CMS</span>
        </div>
        <p className="cx-login__sub">Sign in to edit the Callie X Group website.</p>

        {denied && (
          <div className="cx-editor__error">
            <AlertCircle size={16} /> That account isn&apos;t authorized for Callie X CMS.
          </div>
        )}
        {error && (
          <div className="cx-editor__error">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <button type="button" className="cx-btn-google" onClick={handleGoogle} disabled={busy}>
          Continue with Google
        </button>

        <div className="cx-login__divider">or</div>

        <form onSubmit={handlePasswordSubmit} className="cx-login__form">
          <input
            type="email"
            className="cx-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="cx-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="cx-btn-primary" disabled={busy}>
            {busy ? <Loader2 size={14} className="cx-spin" /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
