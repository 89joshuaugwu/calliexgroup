import "server-only";

import { unstable_cache } from "next/cache";
import { adminDb } from "@/lib/firebase/admin";
import { deepMerge } from "@/lib/utils";
import { DEFAULT_ABOUT, DEFAULT_BRAND, DEFAULT_CONTACT, DEFAULT_HOME } from "./defaults";
import type { ContentMap, PageKey } from "./types";

const DEFAULTS: ContentMap = {
  home: DEFAULT_HOME,
  about: DEFAULT_ABOUT,
  contact: DEFAULT_CONTACT,
  brand: DEFAULT_BRAND,
};

/** Every public route reads through this — the ONE place page data is fetched. */
async function fetchPageContent<K extends PageKey>(pageKey: K): Promise<ContentMap[K]> {
  const snap = await adminDb.collection("content").doc(pageKey).get();
  const stored = snap.exists ? (snap.data() as Partial<ContentMap[K]>) : undefined;
  return deepMerge(DEFAULTS[pageKey], stored);
}

/**
 * Cached per page-key, tagged so a CMS save can invalidate just that page
 * (`revalidateTag('cms:home')`) instead of a blanket full-site rebuild.
 * This is what makes edits feel instant without paying for a live
 * Firestore listener on every anonymous visitor's page load.
 */
export function getPageContent<K extends PageKey>(pageKey: K): Promise<ContentMap[K]> {
  const cached = unstable_cache(() => fetchPageContent(pageKey), [`cms-${pageKey}`], {
    tags: [`cms:${pageKey}`],
    revalidate: 300, // 5 min safety net even if a revalidate call is ever missed
  });
  return cached();
}
