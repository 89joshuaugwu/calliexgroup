"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ContactContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { formatPhoneHref } from "@/lib/utils";

export function OfficesGrid({ data }: { data: ContactContent["hero"] & { offices: ContactContent["offices"] } }) {
  const sorted = [...data.offices].sort((a, b) => a.order - b.order);

  return (
    <section className="cx-shell py-24 sm:py-28">
      <Reveal className="mb-12 max-w-xl">
        <p className="cx-eyebrow mb-3">{data.locationsEyebrow}</p>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-[var(--color-graphite)]">
          {data.locationsTitle}
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-mist)]">{data.locationsSubtitle}</p>
      </Reveal>

      <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((office) => (
          <motion.div
            key={office.id}
            variants={revealItemVariants}
            className="rounded-2xl border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-brand)]"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-display text-[1.05rem] font-semibold text-[var(--color-graphite)]">
                {office.name}
              </h3>
              {office.badge && (
                <span className="shrink-0 rounded-full bg-[var(--color-brand)]/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-medium text-[var(--color-brand)]">
                  {office.badge}
                </span>
              )}
            </div>
            <p className="flex gap-2 text-sm leading-relaxed text-[var(--color-mist)]">
              <MapPin size={15} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
              {office.address}
            </p>
            {office.phone && (
              <a
                href={formatPhoneHref(office.phone)}
                className="mt-2 flex items-center gap-2 text-sm text-[var(--color-graphite)] hover:text-[var(--color-brand)]"
              >
                <Phone size={14} /> {office.phone}
              </a>
            )}
            {office.email && (
              <a
                href={`mailto:${office.email}`}
                className="mt-1 flex items-center gap-2 text-sm text-[var(--color-graphite)] hover:text-[var(--color-brand)]"
              >
                <Mail size={14} /> {office.email}
              </a>
            )}
          </motion.div>
        ))}
      </RevealStagger>
    </section>
  );
}
