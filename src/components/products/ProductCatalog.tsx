"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { HomeContent, ProductCategory } from "@/lib/cms/types";
import { RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

const CATEGORIES: readonly ("All Products" | ProductCategory)[] = [
  "All Products",
  "Fintech & Crypto",
  "Real Estate & Auto",
  "Lifestyle & Commerce",
];

/** "Instant settlement|Zero downtime|Over 100+ billers" -> 3 clean strings.
 *  raw can be undefined on any product saved before this field existed. */
function parseHighlights(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split("|")
    .map((h) => h.trim())
    .filter(Boolean);
}

export function ProductCatalog({ products }: { products: HomeContent["products"] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All Products");

  const sorted = [...products].sort((a, b) => a.order - b.order);
  const filtered = sorted.filter(
    (p) => activeCategory === "All Products" || p.category === activeCategory,
  );

  return (
    <section className="cx-shell py-16 sm:py-24">
      {/* Category tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              className={`rounded-full px-5 py-2.5 font-mono text-xs font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-[var(--color-brand)] text-white shadow-[0_4px_16px_rgba(0,51,255,0.3)]"
                  : "border border-[var(--color-line)] bg-white text-[var(--color-mist)] hover:border-[var(--color-brand)] hover:text-[var(--color-graphite)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const highlights = parseHighlights(product.highlights).slice(0, 3);

          return (
            <motion.div key={product.id} variants={revealItemVariants} className="h-full">
              <div className="cx-card group relative flex h-full flex-col justify-between border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)]">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-badge)] bg-[var(--color-paper-warm)] p-2.5">
                      {product.logoUrl ? (
                        <Image src={product.logoUrl} alt={product.name} fill sizes="56px" className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-[calc(var(--radius-badge)-4px)] bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-light)] font-display text-xl font-bold text-white">
                          {product.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {product.category && (
                      <span className="rounded-full bg-[var(--color-brand)]/8 px-3 py-1 font-mono text-[0.68rem] font-medium text-[var(--color-brand)]">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold text-[var(--color-graphite)] transition-colors group-hover:text-[var(--color-brand)]">
                      {product.name}
                    </h3>
                    {product.tagline && (
                      <p className="mt-1 font-mono text-xs font-medium text-[var(--color-brand-light)]">{product.tagline}</p>
                    )}
                  </div>

                  {product.description && (
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--color-mist)]">{product.description}</p>
                  )}

                  {highlights.length > 0 && (
                    <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                      <ul className="flex flex-col gap-2 text-xs text-[var(--color-graphite)]">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="shrink-0 text-[var(--color-growth)]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 border-t border-[var(--color-line)] pt-4">
                  <Link
                    href={product.embedLink || "/contact"}
                    className="inline-flex w-full items-center justify-between rounded-[var(--radius-badge)] bg-[var(--color-paper-warm)] px-4 py-2.5 font-mono text-xs font-medium text-[var(--color-graphite)] transition-colors duration-200 group-hover:bg-[var(--color-brand)] group-hover:text-white"
                  >
                    <span>Explore {product.name}</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </RevealStagger>
    </section>
  );
}
