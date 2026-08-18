"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { AboutContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";

export function Awards({ eyebrow, data }: { eyebrow: string; data: AboutContent["awards"] }) {
  return (
    <section className="bg-[var(--color-ink)] py-24 sm:py-28">
      <div className="cx-shell">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <p className="cx-eyebrow cx-eyebrow--light mb-3">{eyebrow}</p>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.3rem)] font-semibold text-white">
            {data.sectionTitle}
            <span className="text-[var(--color-brand-light)]">{data.accentWord}</span>
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-white/55">{data.subtitle}</p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.items.map((item, i) => (
            <motion.div
              key={i}
              variants={revealItemVariants}
              className="overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/3]">
                {item.imageUrl && <Image src={item.imageUrl} alt={item.title} fill sizes="360px" className="object-cover" />}
              </div>
              <div className="p-5">
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-white/45">{item.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
