import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BrandContent } from "@/lib/cms/types";

// lucide-react dropped brand/logo icons (Facebook, Instagram, LinkedIn) —
// they were spun out over trademark concerns shared across most icon
// libraries. Small inline SVGs here instead of pulling in a whole
// separate brand-icon package for three glyphs.
function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20.4h3.38V8.5ZM5.25 3.1a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.3v6.34H9.24V8.5h3.23v1.63h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2v6.82Z" />
    </svg>
  );
}

export function Footer({ brand }: { brand: BrandContent }) {
  return (
    <footer className="bg-[var(--color-ink)] pt-20 pb-8 text-white">
      <div className="cx-shell">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="relative mb-5 h-9 w-[170px]">
              {brand.footerLogoUrl && (
                <Image
                  src={brand.footerLogoUrl}
                  alt="Callie X Group"
                  fill
                  sizes="170px"
                  className="object-contain object-left"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              )}
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">{brand.footerTagline}</p>
            <div className="mt-6 flex gap-3">
              {brand.facebookUrl && (
                <SocialLink href={brand.facebookUrl}>
                  <FacebookIcon />
                </SocialLink>
              )}
              {brand.instagramUrl && (
                <SocialLink href={brand.instagramUrl}>
                  <InstagramIcon />
                </SocialLink>
              )}
              {brand.linkedinUrl && (
                <SocialLink href={brand.linkedinUrl}>
                  <LinkedinIcon />
                </SocialLink>
              )}
            </div>
          </div>

          <div>
            <p className="cx-eyebrow cx-eyebrow--light mb-4">Navigate</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/products" className="hover:text-white">Our Products</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <p className="cx-eyebrow cx-eyebrow--light mb-4">Get in touch</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[var(--color-brand-light)]" />
                <a href={`mailto:${brand.footerSupportEmail}`} className="hover:text-white">
                  {brand.footerSupportEmail}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--color-brand-light)]" />
                <a href={`tel:${brand.footerSupportPhone.replace(/\s+/g, "")}`} className="hover:text-white">
                  {brand.footerSupportPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>{brand.copyrightText}</span>
          <span className="font-mono">Fintech \u00b7 Real Estate \u00b7 Trade \u00b7 Lifestyle</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-brand-light)] hover:text-white"
    >
      {children}
    </a>
  );
}
