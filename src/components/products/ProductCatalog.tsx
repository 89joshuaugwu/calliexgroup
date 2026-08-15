"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { HomeContent } from "@/lib/cms/types";
import { RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

// Detailed product metadata to elevate the catalog into a world-class fintech showcase
const PRODUCT_DETAILS: Record<
  string,
  {
    category: "Fintech & Crypto" | "Real Estate & Auto" | "Lifestyle & Commerce";
    tagline: string;
    description: string;
    highlights: string[];
    accentColor: string;
  }
> = {
  "B Cars": {
    category: "Real Estate & Auto",
    tagline: "Automotive Sourcing & Importation",
    description: "End-to-end verified luxury and commercial vehicle procurement, shipping, and clearing from global hubs.",
    highlights: ["Global procurement", "Customs clearance", "Verified inspection"],
    accentColor: "from-blue-600 to-indigo-600",
  },
  "B Homes": {
    category: "Real Estate & Auto",
    tagline: "Prime Real Estate & Property Investments",
    description: "Verified luxury residential and commercial property development, sales, and land acquisitions across top African cities.",
    highlights: ["100% Verified titles", "Prime locations", "High-yield ROI"],
    accentColor: "from-blue-600 to-cyan-600",
  },
  "Billpoint": {
    category: "Fintech & Crypto",
    tagline: "Smart Everyday Payments & Utilities",
    description: "The all-in-one payment gateway for instant utility bills, airtime recharge, TV subscriptions, and merchant checkout.",
    highlights: ["Instant settlement", "Zero downtime", "Over 100+ billers"],
    accentColor: "from-indigo-600 to-blue-700",
  },
  "Bitshop": {
    category: "Fintech & Crypto",
    tagline: "Secure Digital Asset Custody",
    description: "Institutional-grade digital asset wallet offering frictionless storage, swaps, and multi-chain crypto asset management.",
    highlights: ["Multi-sig security", "Instant swaps", "Cold-storage backing"],
    accentColor: "from-blue-500 to-teal-500",
  },
  "Blunt": {
    category: "Lifestyle & Commerce",
    tagline: "Luxury Apparel & Tech Gadgets",
    description: "Curated lifestyle brand delivering premium fashion apparel, bespoke accessories, and high-end consumer technology.",
    highlights: ["Authentic luxury", "Express delivery", "Exclusive drops"],
    accentColor: "from-slate-700 to-slate-900",
  },
  "Dolla": {
    category: "Fintech & Crypto",
    tagline: "Cross-Border Remittance & Transfers",
    description: "Next-gen global financial pipeline powering lightning-fast cross-border fiat transfers, currency exchange, and multi-currency wallets.",
    highlights: ["Competitive FX rates", "Global reach", "Real-time tracking"],
    accentColor: "from-emerald-500 to-blue-600",
  },
  "Famous": {
    category: "Lifestyle & Commerce",
    tagline: "Digital Influence & Brand Growth",
    description: "Strategic digital marketing and social media acceleration platform helping brands and creators achieve exponential reach.",
    highlights: ["Audience growth", "Brand strategy", "Campaign analytics"],
    accentColor: "from-purple-600 to-blue-600",
  },
  "Jetpay": {
    category: "Fintech & Crypto",
    tagline: "High-Volume Crypto Settlement",
    description: "Seamless cryptocurrency exchange and liquidity provider built for fast, secure crypto-to-fiat transactions and merchant payouts.",
    highlights: ["Over $120M+ yearly volume", "Deep liquidity", "Automated payouts"],
    accentColor: "from-blue-600 to-blue-400",
  },
};

const CATEGORIES = ["All Products", "Fintech & Crypto", "Real Estate & Auto", "Lifestyle & Commerce"] as const;

export function ProductCatalog({ products }: { products: HomeContent["products"] }) {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All Products");

  const sorted = [...products].sort((a, b) => a.order - b.order);

  const filtered = sorted.filter((p) => {
    if (activeCategory === "All Products") return true;
    const detail = PRODUCT_DETAILS[p.name];
    return detail?.category === activeCategory;
  });

  return (
    <section className="cx-shell py-16 sm:py-24">
      {/* Category Tabs */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 font-mono text-xs font-medium transition-all duration-300 ${
                isActive
                  ? "bg-[var(--color-brand)] text-white shadow-[0_4px_16px_rgba(0,51,255,0.35)]"
                  : "border border-[var(--color-line)] bg-white text-[var(--color-mist)] hover:border-[var(--color-brand)] hover:text-[var(--color-graphite)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of detailed cards */}
      <RevealStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => {
          const detail = PRODUCT_DETAILS[product.name] ?? {
            category: "Fintech & Crypto",
            tagline: "Digital Innovation",
            description: "Empowering financial and technological freedom for businesses and individuals.",
            highlights: ["Fast & secure", "Seamless integration", "24/7 Support"],
            accentColor: "from-blue-600 to-indigo-600",
          };

          return (
            <motion.div key={product.id} variants={revealItemVariants} className="h-full">
              <TiltCard tiltDeg={5} className="h-full">
                <div className="cx-card-shimmer group relative flex h-full flex-col justify-between rounded-3xl border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)]">
                  <div>
                    {/* Top Header with Icon and Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-paper-warm)] to-white p-2.5 shadow-sm">
                        {product.logoUrl ? (
                          <Image
                            src={product.logoUrl}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className={`flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${detail.accentColor} font-display text-xl font-bold text-white shadow-md`}>
                            {product.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <span className="rounded-full bg-[var(--color-brand)]/8 px-3 py-1 font-mono text-[0.68rem] font-medium text-[var(--color-brand)]">
                        {detail.category}
                      </span>
                    </div>

                    {/* Product Name & Tagline */}
                    <div className="mt-5">
                      <h3 className="font-display text-xl font-bold text-[var(--color-graphite)] group-hover:text-[var(--color-brand)] transition-colors">
                        {product.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs font-medium text-[var(--color-brand-light)]">
                        {detail.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--color-mist)]">
                      {detail.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="mt-5 border-t border-[var(--color-line)] pt-4">
                      <ul className="flex flex-col gap-2 text-xs text-[var(--color-graphite)]">
                        {detail.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="shrink-0 text-[var(--color-growth)]" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="mt-6 border-t border-[var(--color-line)] pt-4">
                    <Link
                      href={product.embedLink || "/contact"}
                      className="inline-flex w-full items-center justify-between rounded-xl bg-[var(--color-paper-warm)] px-4 py-2.5 font-mono text-xs font-medium text-[var(--color-graphite)] transition-all duration-200 group-hover:bg-[var(--color-brand)] group-hover:text-white"
                    >
                      <span>Explore {product.name}</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </RevealStagger>
    </section>
  );
}
