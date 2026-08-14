import "server-only";

import { type App, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Firebase Admin SDK — server-only. Used by:
 *  - Server Components fetching content/{page} for public pages
 *    (fast, SEO-friendly, no client-side Firestore round trip)
 *  - Server Actions that write CMS content and verify the caller's
 *    Firebase ID token against CMS_ADMIN_ALLOWED_EMAILS
 *
 * `import "server-only"` makes it a hard build error if this file is
 * ever imported from a Client Component — the private key must never
 * reach the browser bundle.
 */
function loadAdminApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  // Service-account keys are pasted into .env with literal \n escapes —
  // convert them back to real newlines or the PEM key fails to parse.
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin credentials. Set FIREBASE_ADMIN_PROJECT_ID, " +
        "FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local " +
        "(see .env.example)."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export const adminApp = loadAdminApp();
export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);

/** Verifies a Firebase ID token and checks it against the CMS allow-list. */
export async function verifyAdminToken(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const allowed = (process.env.CMS_ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!decoded.email || !allowed.includes(decoded.email.toLowerCase())) {
    throw new Error("This account is not authorized to edit Callie X CMS.");
  }

  return decoded;
}
