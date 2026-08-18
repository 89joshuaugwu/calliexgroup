"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Building2 } from "lucide-react";
import type { ContactContent } from "@/lib/cms/types";
import { Reveal, RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { formatPhoneHref } from "@/lib/utils";

export function OfficesGrid({ data }: { data: ContactContent["hero"] & { offices: ContactContent["offices"] } }) {
  const sorted = [...data.offices].sort((a, b) => a.order - b.order);

  return (
    <section className="cx-shell py-24 sm:py-28">
      <Reveal className="mb-14 max-w-xl">
        <p className="cx-eyebrow mb-3">{data.locationsEyebrow}</p>
        <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-bold text-[var(--color-graphite)]">
          {data.locationsTitle}
        </h2>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--color-mist)]">{data.locationsSubtitle}</p>
      </Reveal>

      <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((office) => {
          const isHQ = office.badge === "HQ";
          const isINT = office.badge === "INT";

          return (
            <motion.div key={office.id} variants={revealItemVariants} className="h-full">
              <div className="cx-card group flex h-full flex-col justify-between border border-[var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)]">
                <div>
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-badge)] bg-[var(--color-brand)]/8 text-[var(--color-brand)]">
                        <Building2 size={18} />
                      </div>
                      <h3 className="font-display text-[1.05rem] font-bold text-[var(--color-graphite)] transition-colors group-hover:text-[var(--color-brand)]">
                        {office.name}
                      </h3>
                    </div>
                    {office.badge && (
                      <span
                        className={`shrink-0 rounded-full px-3 py-0.5 font-mono text-[0.65rem] font-bold tracking-wider uppercase ${
                          isHQ
                            ? "bg-[var(--color-brand)] text-white"
                            : isINT
                              ? "bg-[var(--color-growth)]/15 text-[var(--color-growth)]"
                              : "bg-[var(--color-brand)]/10 text-[var(--color-brand)]"
                        }`}
                      >
                        {office.badge}
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <p className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-mist)]">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                    <span>{office.address}</span>
                  </p>
                </div>

                {/* Contact links */}
                <div className="mt-6 flex flex-col gap-2 border-t border-[var(--color-line)] pt-4">
                  {office.phone && (
                    <a
                      href={formatPhoneHref(office.phone)}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-graphite)] transition-colors hover:text-[var(--color-brand)]"
                    >
                      <Phone size={13} className="text-[var(--color-brand-light)]" />
                      <span>{office.phone}</span>
                    </a>
                  )}
                  {office.email && (
                    <a
                      href={`mailto:${office.email}`}
                      className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-graphite)] transition-colors hover:text-[var(--color-brand)]"
                    >
                      <Mail size={13} className="text-[var(--color-brand-light)]" />
                      <span>{office.email}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </RevealStagger>
    </section>
  );
}
