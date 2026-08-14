"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { verifyAdminToken } from "@/lib/firebase/admin";
import type { ContentMap, PageKey } from "./types";

/** Which public routes render each CMS page — used to bust the right cache on save. */
const ROUTES_BY_PAGE: Record<PageKey, string[]> = {
  home: ["/", "/products"],
  about: ["/about"],
  contact: ["/contact"],
  // Brand backs the header/footer on every route via the root layout.
  brand: ["/", "/about", "/contact", "/products"],
};

export interface SaveContentResult {
  ok: boolean;
  error?: string;
}

/**
 * The ONLY write path into Callie X CMS content. Called from the admin's
 * SchemaPageEditor after every save. Verifies the caller server-side
 * (client-side gating in AdminAuthProvider is UX only, not security),
 * merges the change into Firestore, then revalidates exactly the routes
 * that read that page — so an edit shows up on the live site within
 * seconds without a redeploy.
 */
export async function savePageContent<K extends PageKey>(
  pageKey: K,
  data: Partial<ContentMap[K]>,
  idToken: string
): Promise<SaveContentResult> {
  try {
    await verifyAdminToken(idToken);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Not authorized." };
  }

  try {
    await adminDb
      .collection("content")
      .doc(pageKey)
      .set(data, { merge: true });
  } catch (err) {
    return { ok: false, error: `Firestore write failed: ${(err as Error).message}` };
  }

  // revalidateTag now takes a required cache-life profile as its 2nd arg
  // (Next.js's newer explicit-cache-lifetime model). "max" just means
  // "stay cached until something calls revalidateTag again" — the actual
  // invalidation below is immediate regardless of the profile.
  revalidateTag(`cms:${pageKey}`, "max");
  for (const path of ROUTES_BY_PAGE[pageKey]) {
    revalidatePath(path);
  }

  return { ok: true };
}

export interface SubscribeResult {
  ok: boolean;
  alreadySubscribed?: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Newsletter subscribe — called from the public ContactPage / NewsletterBox form. */
export async function subscribeNewsletter(email: string): Promise<SubscribeResult> {
  const clean = email.trim().toLowerCase();
  if (!EMAIL_RE.test(clean)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const docId = clean.replace(/[^a-z0-9]/g, "_");
  const ref = adminDb.collection("newsletter_subscribers").doc(docId);
  const existing = await ref.get();

  if (existing.exists) {
    return { ok: true, alreadySubscribed: true };
  }

  await ref.set({
    email: clean,
    createdAt: new Date().toISOString(),
    source: "website",
  });

  // Best-effort admin notification — a failed email must never block the
  // subscription itself (same lesson learned from the AcadeGrade Gmail
  // SMTP BadCredentials incident: fail soft, never fail the user's action).
  try {
    const { notifyNewSubscriber } = await import("@/lib/email");
    await notifyNewSubscriber(clean);
  } catch (err) {
    console.error("Newsletter notification email failed (non-fatal):", err);
  }

  return { ok: true };
}
