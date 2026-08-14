"use client";

import type { AboutContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import Image from "next/image";

export function TeamGrid({ team }: { team: AboutContent["team"] }) {
  if (team.images.length === 0) return null;
  return (
    <section className="bg-[var(--color-paper-warm)] py-24 sm:py-28">
      <div className="cx-shell">
        <Reveal>
          <h2 className="mb-10 font-display text-[clamp(1.7rem,3.4vw,2.3rem)] font-semibold text-[var(--color-graphite)]">
            {team.title}
          </h2>
        </Reveal>
        <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {team.images.map((src, i) => (
            <motion.div key={i} variants={revealItemVariants} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
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
        <p className="cx-eyebrow mb-3">Values</p>
        <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.3rem)] font-semibold text-[var(--color-graphite)]">
          {data.introTitle}
        </h2>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--color-mist)]">{data.introBody}</p>
      </Reveal>

      <RevealStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item) => (
          <motion.div
            key={item.title}
            variants={revealItemVariants}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-brand)]"
          >
            <h3 className="font-display text-lg font-semibold text-[var(--color-graphite)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{item.body}</p>
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
