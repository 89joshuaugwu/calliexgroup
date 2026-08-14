/**
 * scripts/seed-cms.ts
 *
 * Pushes the real Callie X Group copy (lib/cms/defaults.ts) into Firestore
 * so the site is never blank on first deploy. Safe to re-run: uses
 * { merge: true }, so it only fills in fields that don't already exist —
 * it will NOT overwrite anything already edited through /admin.
 *
 * Usage:
 *   npm run seed
 *
 * Requires .env.local with FIREBASE_ADMIN_* set (see .env.example).
 * Same pattern as seed-profile.mjs / seed-projects.mjs on buildwithzaza.
 */
import { config } from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { DEFAULT_ABOUT, DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_HOME } from "../src/lib/cms/defaults";

config({ path: ".env.local" });

function loadApp() {
  if (getApps().length) return getApps()[0]!;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing FIREBASE_ADMIN_* env vars \u2014 check .env.local against .env.example.");
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

async function seed() {
  const db = getFirestore(loadApp());
  const pages = {
    home: DEFAULT_HOME,
    about: DEFAULT_ABOUT,
    contact: DEFAULT_CONTACT,
    brand: DEFAULT_BRAND,
  } as const;

  for (const [pageId, data] of Object.entries(pages)) {
    await db.collection("content").doc(pageId).set(data, { merge: true });
    console.log(`\u2713 Seeded content/${pageId}`);
  }

  console.log("\nDone. Every field is now editable at /admin.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
