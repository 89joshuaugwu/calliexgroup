"use client";

/**
 * Floating pill navbar.
 *
 * Behaviour:
 * - On hero pages (/, /about, /contact): starts transparent and full-width,
 *   transitions to a floating pill on scroll (>48px).
 * - On non-hero pages (/products, /admin): always solid.
 * - Scroll progress bar tracks read position across the page.
 * - Active page indicator dot under the current link.
 * - Mobile: full-screen overlay menu with staggered link reveal.
 *
 * The scrolled pill sits at 92% white opacity — comfortably over the
 * 85% floor for any header meant to stay legible against whatever the
 * visitor is scrolling past underneath it.
 */

import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
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

const HERO_ROUTES = ["/", "/about", "/products", "/contact"];

export function Navbar({ brand }: { brand: BrandContent }) {
  const pathname = usePathname();
  const transparentOnLoad = HERO_ROUTES.includes(pathname);
  const [scrollYOver48, setScrollYOver48] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrollYOver48(y > 48);
  });

  const solid = !transparentOnLoad || scrollYOver48 || open;

  return (
    <>
      <motion.div className="cx-scroll-progress" style={{ scaleX }} />

      <motion.header
        className="fixed inset-x-0 z-50"
        initial={false}
        animate={{
          top: solid ? 12 : 0,
          paddingLeft: solid ? 16 : 0,
          paddingRight: solid ? 16 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
      >
        <motion.div
          className="mx-auto flex h-[60px] items-center justify-between transition-colors duration-300"
          initial={false}
          animate={{
            maxWidth: solid ? 1120 : 9999,
            borderRadius: solid ? 999 : 0,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          style={{
            background: solid ? "rgba(255, 255, 255, 0.92)" : "transparent",
            backdropFilter: solid ? "blur(16px) saturate(180%)" : "none",
            WebkitBackdropFilter: solid ? "blur(16px) saturate(180%)" : "none",
            border: solid
              ? "1px solid rgba(0, 0, 0, 0.06)"
              : "1px solid transparent",
            boxShadow: solid
              ? "0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)"
              : "none",
            paddingLeft: solid ? 24 : 0,
            paddingRight: solid ? 24 : 0,
          }}
        >
          {/* Logo area — padded when not in pill mode */}
          <Link
            href="/"
            className="relative z-10 block h-7 w-[130px]"
            style={{ marginLeft: solid ? 0 : "max(1rem, calc((100vw - 1200px) / 2))" }}
          >
            {brand.headerLogoUrl && (
              <Image
                src={brand.headerLogoUrl}
                alt="Callie X Group"
                fill
                sizes="130px"
                className="object-contain object-left"
                style={{ filter: solid ? "none" : "brightness(0) invert(1)" }}
                priority
              />
            )}
          </Link>

          {/* Desktop nav links */}
          <nav
            className="hidden items-center gap-7 md:flex"
            style={{ marginRight: solid ? 0 : "max(1rem, calc((100vw - 1200px) / 2))" }}
          >
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`cx-nav-link font-mono text-[0.74rem] tracking-wide uppercase transition-colors ${isActive ? "cx-nav-link--active" : ""}`}
                  style={{
                    color: solid
                      ? isActive
                        ? "var(--color-brand)"
                        : "var(--color-graphite)"
                      : "rgba(255,255,255,0.92)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative z-10 rounded-full md:hidden"
            style={{
              color: solid ? "var(--color-graphite)" : "#fff",
              marginRight: solid ? 0 : "max(1rem, calc((100vw - 1200px) / 2))",
            }}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-ink)] px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">
                Callie X Group
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full"
                aria-label="Close menu"
              >
                <X size={26} className="text-white" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-white/10 py-4 font-display text-3xl ${pathname === link.href ? "text-[var(--color-brand-light)]" : "text-white"}`}
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
