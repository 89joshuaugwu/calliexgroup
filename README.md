# Callie X Group — v2

Full rebuild of the Callie X Group WordPress theme as a Next.js 16 site with a real CMS: every string, image, and repeating block (products, board members, offices, feature slides, China services) is stored in Firestore and editable at `/admin`, grouped by page exactly like the original theme's admin screens (Brand / Home / About / Contact / Newsletter). Nothing is hardcoded.

**Status:** feature-complete vertical slice. `npm install`, `tsc`, and `eslint` all pass clean in a real sandboxed test run against the live npm registry (see § Validated, below). What's left before this is live is Firebase/Cloudinary account setup and swapping placeholder images for real photography — there's no unfinished code.

---

## 1. Stack, and why

| | Choice | Why |
|---|---|---|
| Framework | Next.js 16.3, App Router, Server Components | Matches every other Joshuazaza project; Server Components let public pages fetch Firestore data server-side instead of paying a client round-trip |
| Database | **Firestore**, not MongoDB | See below |
| Auth | Firebase Auth (Google + email/password) | Same dual pattern as buildwithzaza's admin gate |
| Images | Cloudinary, direct `fetch()`, no SDK | Same pattern as every other project — cloud name `dgxxhrwxm` |
| Styling | Tailwind v4, CSS-first `@theme` | Same as buildwithzaza |

**Firebase over MongoDB:** your boss asked for realtime + smoothness. Firestore gives that natively (`onSnapshot`), plus Auth, plus a document model that maps 1:1 onto "admin grouped by page" (`content/home`, `content/about`, `content/contact`, `content/brand` — four documents, done). MongoDB would mean bolting on NextAuth or Clerk for login and Socket.io/Pusher or Atlas Change Streams for realtime — two extra systems to stand up and secure, on a fintech company's site, under a deadline. It's also the one path where nine live projects' worth of your own debugged patterns carry over directly instead of starting from zero.

The realtime/performance tension is handled deliberately, not by picking one and ignoring the other: **public pages fetch through the Admin SDK server-side** (`lib/cms/content.ts`, cached with `unstable_cache` + tags) for fast, SEO-friendly, no-client-JS-required rendering. **The admin dashboard reads via the client SDK with `onSnapshot`** for real multi-admin realtime sync. Saving goes through a Server Action (`lib/cms/actions.ts`) that verifies the caller server-side and calls `revalidateTag`/`revalidatePath` — so a save shows up on the live site in seconds, no redeploy, without every anonymous visitor paying for an open Firestore socket.

---

## 2. The Hero, and the design system

The old theme's `main.js` did typewriter text, scroll-reveal, and pop-zoom via hand-rolled `IntersectionObserver` calls. This rebuild keeps the same beats (typewriter subtitle, scroll reveals, count-up stats, layered payment-band cards, board-member hover cards) but as one shared set of primitives (`components/ui/Reveal.tsx`, `Counter.tsx`) instead of one-off code per section, and adds one real signature move: the hero background (`components/home/HeroBackground.tsx`) is a literal diagram of the company — one core (Callie X, founded 2019 as a crypto desk) with a node orbiting it for every live row in CMS `home.products`, currently eight (Dolla, Bitshop, Jetpay, Billpoint, B Cars, B Homes, Blunt, Famous). It's not a generic particle field; it's the org chart, animated, and it stays correct automatically if a product is renamed or added in `/admin`. It draws itself in once on load, then sits quiet with an occasional signal pulse along each spoke — the same technique as the Nigeria→Guangzhou route on the About/China section.

> **Note on how this evolved:** an earlier pass built this as a literal Three.js/React-Three-Fiber 3D scene (`Hero3D.tsx`). It got swapped for the SVG version above — same idea, ~3KB instead of a WebGL dependency, works identically on every device — but the swap wasn't fully cleaned up afterward: the README kept describing the old component, and `next.config.ts` kept a `transpilePackages: ["three"]` line for a package no longer in `package.json`. Both are fixed now. Worth flagging as a pattern: after any architectural pivot like this, re-run `tsc`/`eslint` *and* update the docs in the same pass — otherwise the paper trail quietly drifts from what's actually deployed.

Brand electric blue (`#0033FF`) is kept exactly as-is — that's real existing brand equity. Everything else is new: deep ink-blue-black instead of pure black, cool paper-white instead of warm cream, Instrument Sans + IBM Plex Sans/Mono instead of system-ui. Full rationale is in the code comments at the top of `app/globals.css`.

---

## 3. Setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run seed                 # pushes real Callie X copy into Firestore
npm run dev
```

### Firebase
1. Create a Firebase project (or reuse an existing one).
2. Enable **Firestore** (production mode) and **Authentication** → Google + Email/Password providers.
3. Web app config → paste the six `NEXT_PUBLIC_FIREBASE_*` values into `.env.local`.
4. Project settings → Service accounts → Generate new private key → paste `project_id` / `client_email` / `private_key` into the `FIREBASE_ADMIN_*` vars. Keep the `\n`s literal in the private key string, exactly as downloaded.
5. **Firestore → Rules → paste `firestore.rules` → Publish.** This does not auto-deploy from the repo — same as every other project, this step is manual, every time the rules file changes.
6. Set `CMS_ADMIN_ALLOWED_EMAILS` to your and your boss's real emails — and update the matching hardcoded list inside `firestore.rules` to match (Firestore rules can't read `.env`, so that list is intentionally duplicated — see the comment in the file).

### Cloudinary
Cloud name `dgxxhrwxm` is already wired in. Create an **unsigned upload preset** named `calliexgroup_uploads` (Settings → Upload → Upload presets → Add preset → Signing mode: Unsigned) scoped to a `callie-x-group` folder, so admin uploads land in their own space.

### Newsletter emails (optional)
Gmail SMTP with an **App Password** (not your normal password — 2FA must be on). `myaccount.google.com/apppasswords` → paste into `SMTP_USER` / `SMTP_APP_PASSWORD`. If you skip this, subscriptions still save to Firestore — only the admin notification email is skipped.

---

## 4. Architecture: the schema-driven CMS

Instead of hand-building ~30 separate admin forms (one per content block), every page's editable shape is declared once in `lib/cms/schema.ts` as data — field labels, types (text/textarea/richtext/image/color), and repeaters (products, board members, offices, China services, feature slides — with add/remove/reorder). `components/admin/SchemaPageEditor.tsx` + `SchemaField.tsx` read that config and render the whole form generically. **Adding a new field to an existing page is a one-line schema edit — no new component.**

```
lib/cms/
  types.ts      → the TypeScript shape of every page's content
  defaults.ts   → the real Callie X copy (seed data + fallback if Firestore is empty)
  schema.ts     → admin form config, built on top of types.ts
  content.ts    → server-side read path (Admin SDK + cache tags)
  actions.ts    → the one write path (Server Action: verify → write → revalidate)
```

To add a whole new editable page (say, a Careers page): add its shape to `types.ts`, its copy to `defaults.ts`, its form config to `schema.ts`, add it to `ROUTES_BY_PAGE` in `actions.ts`, and drop a two-line route file in `app/admin/careers/page.tsx` (copy any existing one, swap the schema import). The editor, save flow, and realtime sync all come for free.

### Route structure
```
app/
  layout.tsx          → root: fonts only, nothing else
  (site)/layout.tsx    → public shell: fetches brand, renders Navbar + Footer
  (site)/page.tsx, about/, contact/, products/
  admin/layout.tsx     → independent shell: auth gate + sidebar, NO public chrome
  admin/{home,about,contact,brand,newsletter}/page.tsx
```
The `(site)` route group exists specifically so `/admin` doesn't inherit the public Navbar/Footer or its Firestore brand-content dependency — Next.js nests layouts, so without the split, every admin page would've quietly rendered inside the marketing header/footer and needed a content fetch just to build. This was caught and fixed during build validation, not left as a known issue.

---

## 5. Media migration (do this before launch)

Every image URL still pointing at `images.unsplash.com` or `blordgroup.ng` is a **placeholder inherited from the old theme** — it was hot-linking Blord Group's own site images. None of it is Callie X Group's real photography. Go through `/admin` page by page and replace every image field (each has a Cloudinary upload button right next to it) — board portraits, office/team photos, the hero background, product logos. `next.config.ts` keeps both old hosts allow-listed only so the site doesn't break with broken images before that migration happens; remove that block once every field is real.

---

## 6. What's next / roadmap

- [ ] Real Firebase project + Cloudinary preset (§ 3)
- [ ] Run `npm run seed`, then replace every placeholder image via `/admin`
- [ ] Swap `hero.bgVideoUrl` for a real brand video if you have one (falls back cleanly to the poster image if left blank)
- [ ] Point `calliexgroup.co` DNS at the Vercel deployment
- [ ] Optional: a Careers or Blog page, using the exact pattern in § 4
- [ ] Optional: Firebase AI Logic (shipping this year) could power an "AI-assist" button in the richtext/History editor — worth a look once you're past launch, given you've already built the multi-provider AI pattern in AcadeGrade's `lib/ai/manager.ts`

## Validated

This isn't just written, it was checked: `npm install` against the real npm registry, `tsc --noEmit` clean, `eslint` clean, and a real `next build` run (Turbopack) that compiled successfully and reached static-page generation — the only failure was Firestore/font network calls being blocked by the *sandbox's* egress rules, which resolves itself on any normal deploy. That test also caught and fixed the `(site)`/`admin` layout-nesting bug described in § 4 before you ever saw it.

**Redesign pass (this file's current state):** the visual/interaction layer was audited against ANTI_VIBE_CODING_RULES and reworked — hero background, card treatment, radius scale, nav contrast, reduced-motion coverage, and the products catalog's CMS wiring. Re-validated the same way: `npm install` clean, `tsc --noEmit` clean, `eslint` clean. `next build` reached full compilation and the TypeScript build pass with zero errors; it then failed at page-data collection for two *environmental* reasons only — no `FIREBASE_ADMIN_*` credentials in this sandbox, and Google Fonts blocked by egress rules — confirmed by temporarily stubbing both out and re-running: full build succeeded end to end with those two removed. Neither applies once this runs somewhere with real credentials and open network access.
