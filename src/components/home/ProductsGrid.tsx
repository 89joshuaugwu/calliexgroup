"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";

export function ProductsGrid({
  title,
  products,
}: {
  title: string;
  products: HomeContent["products"];
}) {
  const sorted = [...products].sort((a, b) => a.order - b.order);

  return (
    <section id="products" className="cx-shell py-24 sm:py-28">
      <Reveal>
        <p className="cx-eyebrow mb-3">Portfolio</p>
        <h2 className="max-w-xl font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-[var(--color-graphite)]">
          {title}
        </h2>
      </Reveal>

      <RevealStagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sorted.map((product) => (
          <motion.div key={product.id} variants={revealItemVariants}>
            <Link
              href={product.embedLink || "/products"}
              className="cx-card group relative flex aspect-square flex-col items-center justify-center gap-3 border border-[var(--color-line)] bg-white p-5"
            >
              <div className="relative h-12 w-12 shrink-0">
                {product.logoUrl ? (
                  <Image src={product.logoUrl} alt={product.name} fill sizes="48px" className="object-contain" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-light)] font-display text-lg font-semibold text-white">
                    {product.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-center text-sm font-medium text-[var(--color-graphite)] transition-colors group-hover:text-[var(--color-brand)]">
                {product.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
