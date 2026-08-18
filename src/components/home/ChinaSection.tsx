"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Car, CreditCard, DollarSign, Shield, Ship } from "lucide-react";
import type { HomeContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";

const ICONS = { dollar: DollarSign, shield: Shield, card: CreditCard, ship: Ship, car: Car } as const;

function TradeRoute() {
  return (
    <svg viewBox="0 0 320 90" className="w-full max-w-xs" aria-hidden="true">
      <path
        d="M12 70 C 90 10, 220 10, 300 55"
        fill="none"
        stroke="var(--color-brand-light)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity={0.45}
      />
      <motion.circle
        r="4"
        fill="var(--color-brand-light)"
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ offsetPath: "path('M12 70 C 90 10, 220 10, 300 55')" }}
      />
      <circle cx="12" cy="70" r="4" fill="#fff" />
      <circle cx="300" cy="55" r="4" fill="#fff" />
      <text x="0" y="86" fontSize="9" fill="rgba(255,255,255,0.65)" fontFamily="var(--font-mono)">
        NIGERIA
      </text>
      <text x="256" y="72" fontSize="9" fill="rgba(255,255,255,0.65)" fontFamily="var(--font-mono)">
        GUANGZHOU
      </text>
    </svg>
  );
}

export function ChinaSection({ data }: { data: HomeContent["china"] }) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-ink-soft)] py-24 sm:py-28">
      <div className="cx-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="cx-eyebrow cx-eyebrow--light mb-3">{data.eyebrow}</p>
          <h2 className="cx-text-balance font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-white">
            {data.title}
          </h2>
          <div className="relative mt-8 h-40 overflow-hidden rounded-[var(--radius-card)]">
            {data.imageUrl && <Image src={data.imageUrl} alt="" fill sizes="480px" className="object-cover opacity-60" />}
            <div className="absolute inset-0 flex items-end p-4">
              <TradeRoute />
            </div>
          </div>
        </Reveal>

        <RevealStagger className="grid gap-3 sm:grid-cols-2">
          {data.services
            .slice()
            .sort((a, b) => a.no.localeCompare(b.no))
            .map((service) => {
              const Icon = ICONS[service.iconKey] ?? DollarSign;
              return (
                <motion.div
                  key={service.id}
                  variants={revealItemVariants}
                  className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[var(--color-brand-light)]/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--color-brand-light)]">{service.no}</span>
                    <Icon size={16} className="text-white/40" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 font-display text-[1.05rem] font-semibold text-white">{service.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{service.body}</p>
                </motion.div>
              );
            })}
        </RevealStagger>
      </div>
    </section>
  );
}
