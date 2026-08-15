"use client";

import type { AboutContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { motion } from "framer-motion";
import Image from "next/image";

export function TeamGrid({ team }: { team: AboutContent["team"] }) {
  if (team.images.length === 0) return null;
  return (
    <section className="bg-[var(--color-paper-warm)] py-24 sm:py-28">
      <div className="cx-shell">
        <Reveal className="mb-10">
          <p className="cx-eyebrow mb-2">Culture & People</p>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.3rem)] font-semibold text-[var(--color-graphite)]">
            {team.title}
          </h2>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {team.images.map((src, i) => (
            <motion.div key={i} variants={revealItemVariants} className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-sm">
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

export function CoreValues({ data }: { data: AboutContent["coreValues"] }) {
  return (
    <section className="cx-shell py-24 sm:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="cx-eyebrow mb-3">Our DNA</p>
        <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold text-[var(--color-graphite)]">
          {data.introTitle}
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-mist)]">{data.introBody}</p>
      </Reveal>

      <RevealStagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, i) => (
          <motion.div key={item.title} variants={revealItemVariants}>
            <TiltCard tiltDeg={6}>
              <div className="cx-card-shimmer group relative flex h-full flex-col justify-between rounded-3xl border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-[var(--shadow-elevated)]">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-light)] font-mono text-xs font-bold text-white shadow-[0_4px_12px_rgba(0,51,255,0.3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]/30 group-hover:bg-[var(--color-brand)] transition-colors" />
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-[var(--color-graphite)] group-hover:text-[var(--color-brand)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{item.body}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
