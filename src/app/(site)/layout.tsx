import { MotionConfig } from "framer-motion";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPageContent } from "@/lib/cms/content";

/**
 * Shell for every public marketing route (/, /about, /contact, /products).
 *
 * <MotionConfig reducedMotion="user"> is the one wrapper that makes every
 * framer-motion animation on the public site — Reveal, staggered grids,
 * the hero fade-in, the nav's spring physics, TiltCard, Counter, the new
 * hero network — automatically respect a visitor's OS-level "reduce
 * motion" setting, without touching each animation individually. Passing
 * Server Component children (the page routes below) into a Client
 * Component wrapper like this is a normal, supported App Router pattern:
 * MotionConfig doesn't need to render them, only wrap them.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const brand = await getPageContent("brand");

  return (
    <MotionConfig reducedMotion="user">
      <Navbar brand={brand} />
      {children}
      <Footer brand={brand} />
    </MotionConfig>
  );
}
