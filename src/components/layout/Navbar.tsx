"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { BrandContent } from "@/lib/cms/types";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact Us" },
];

// Routes with a full-bleed dark hero at the top get a transparent navbar
// that solidifies on scroll. Routes without one (Products has no hero,
// same as the original theme's "page-without-hero" case) start solid —
// otherwise white nav text would sit unreadable on a light background.
const HERO_ROUTES = ["/", "/about", "/contact"];

export function Navbar({ brand }: { brand: BrandContent }) {
  const pathname = usePathname();
  const transparentOnLoad = HERO_ROUTES.includes(pathname);
  const [scrolled, setScrolled] = useState(!transparentOnLoad);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!transparentOnLoad) return;
    setScrolled(y > 48);
  });

  const solid = scrolled || open;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        style={{
          background: solid ? "rgba(245,246,250,0.85)" : "transparent",
          backdropFilter: solid ? "blur(14px) saturate(160%)" : "none",
          borderBottom: solid ? "1px solid var(--color-line)" : "1px solid transparent",
        }}
      >
        <div className="cx-shell flex h-[72px] items-center justify-between">
          <Link href="/" className="relative z-10 block h-8 w-[150px]">
            {brand.headerLogoUrl && (
              <Image
                src={brand.headerLogoUrl}
                alt="Callie X Group"
                fill
                sizes="150px"
                className="object-contain object-left"
                style={{ filter: solid ? "none" : "brightness(0) invert(1)" }}
                priority
              />
            )}
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[0.78rem] tracking-wide uppercase transition-colors"
                style={{
                  color: solid
                    ? pathname === link.href
                      ? "var(--color-brand)"
                      : "var(--color-graphite)"
                    : "rgba(255,255,255,0.92)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative z-10 md:hidden"
            style={{ color: solid ? "var(--color-graphite)" : "#fff" }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-ink)] px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">Callie X Group</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} className="text-white" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-3xl text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
