"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HomeContent } from "@/lib/cms/types";
import { HeroBackground } from "./HeroBackground";
import { useTypewriter } from "./useTypewriter";

export function HeroSection({
  hero,
  metrics,
  products,
}: {
  hero: HomeContent["hero"];
  metrics: HomeContent["metrics"];
  products: HomeContent["products"];
}) {
  const typed = useTypewriter(hero.subtitle, { speed: 18, startDelay: 700 });
  const sorted = [...metrics].sort((a, b) => a.order - b.order);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[var(--color-ink)]">
      {hero.bgVideoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src={hero.bgVideoUrl}
          poster={hero.bgPosterUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={hero.bgPosterUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 15%, rgba(5,6,15,0.15), rgba(5,6,15,0.92) 75%)" }}
      />

      <HeroBackground products={products} />

      <div className="cx-shell relative flex flex-1 flex-col items-center justify-center pt-32 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="cx-text-balance max-w-4xl font-display text-[clamp(2.4rem,6.4vw,4.75rem)] font-semibold text-[var(--color-brand-light)]"
        >
          {hero.title}
        </motion.h1>

        <p
          className="mt-6 min-h-[3.5em] max-w-2xl text-balance text-[1.05rem] leading-relaxed text-white/70 sm:min-h-[2.5em]"
          aria-label={hero.subtitle}
        >
          {typed}
          <span className="cx-typecursor" aria-hidden="true" />
        </p>

        <motion.a
          href={hero.ctaHref}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="cx-btn cx-btn-brand mt-9"
        >
          {hero.ctaText} <ArrowRight size={15} />
        </motion.a>
      </div>

      <div className="relative border-t border-white/10">
        <div className="cx-shell grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {sorted.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 px-4 py-7 text-center"
            >
              <span className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold text-white">
                {metric.value}
              </span>
              <span className="max-w-[18ch] text-xs text-white/55">{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
