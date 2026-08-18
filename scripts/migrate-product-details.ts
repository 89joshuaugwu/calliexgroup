/**
 * scripts/migrate-product-details.ts
 *
 * One-time backfill for the 2026-08 catalog redesign: adds category,
 * tagline, description, and highlights to the 8 products already saved
 * in your live content/home document.
 *
 * WHY THIS EXISTS INSTEAD OF JUST RE-RUNNING `npm run seed`:
 * seed-cms.ts uses `.set(data, { merge: true })`, and Firestore's merge
 * only merges at the map/field level — array fields (products, board,
 * offices, featureSlides, china.services) are replaced WHOLESALE, not
 * merged item-by-item. Running `npm run seed` right now would overwrite
 * your entire live `products` array with defaults.ts's version, silently
 * wiping any logoUrl/embedLink you've already changed through /admin
 * since launch. Worth knowing for next time too: the same is true for
 * `board`, `offices`, `featureSlides`, and `china.services` — re-seeding
 * is only safe for those if you're fine losing any admin edits to them.
 *
 * This script instead:
 *   1. Reads your CURRENT live products array as-is
 *   2. Matches each entry to defaults.ts by name
 *   3. Adds ONLY the 4 new fields, and ONLY where they're still missing
 *   4. Leaves logoUrl, embedLink, order, id, name exactly as they are live
 *   5. Writes the merged array back as one atomic update
 *
 * Usage:
 *   npx tsx scripts/migrate-product-details.ts
 *
 * Requires .env.local with FIREBASE_ADMIN_* set (see .env.example).
 * Safe to re-run — anything already filled in (by this script or by you
 * in /admin) is left untouched.
 */
import { config } from "dotenv";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { DEFAULT_HOME } from "../src/lib/cms/defaults";
import type { Product } from "../src/lib/cms/types";

config({ path: ".env.local" });

function loadApp() {
  if (getApps().length) return getApps()[0]!;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing FIREBASE_ADMIN_* env vars — check .env.local against .env.example.");
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

function normalize(name: string) {
  return name.trim().toLowerCase();
}

async function migrate() {
  const db = getFirestore(loadApp());
  const ref = db.collection("content").doc("home");
  const snap = await ref.get();

  if (!snap.exists) {
    console.error("content/home doesn't exist yet — run `npm run seed` first, then this script.");
    process.exit(1);
  }

  const live = snap.data() as { products?: Product[] } | undefined;
  const liveProducts = live?.products ?? [];

  if (liveProducts.length === 0) {
    console.error("content/home has no products array — run `npm run seed` first, then this script.");
    process.exit(1);
  }

  const byName = new Map(DEFAULT_HOME.products.map((p) => [normalize(p.name), p]));

  let filled = 0;
  let skippedNoMatch = 0;
  let alreadyComplete = 0;

  const merged: Product[] = liveProducts.map((live) => {
    const hasAllFields = live.category && live.tagline && live.description && live.highlights;
    if (hasAllFields) {
      alreadyComplete++;
      return live;
    }

    const match = byName.get(normalize(live.name));
    if (!match) {
      skippedNoMatch++;
      console.warn(`  ⚠ "${live.name}" has no match in defaults.ts — add its fields manually in /admin.`);
      return live;
    }

    filled++;
    console.log(`  ✓ ${live.name} — filled category/tagline/description/highlights`);
    return {
      ...live, // id, order, name, logoUrl, embedLink stay exactly as they are live
      category: live.category ?? match.category,
      tagline: live.tagline ?? match.tagline,
      description: live.description ?? match.description,
      highlights: live.highlights ?? match.highlights,
    };
  });

  if (filled === 0) {
    console.log(`Nothing to do — ${alreadyComplete} product(s) already complete, ${skippedNoMatch} unmatched.`);
    process.exit(0);
  }

  await ref.update({ products: merged });

  console.log(
    `\nDone. ${filled} product(s) backfilled, ${alreadyComplete} already complete, ${skippedNoMatch} skipped (no name match).`,
  );
  console.log("Every field is editable at /admin from here on — this script never needs to run again.");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
