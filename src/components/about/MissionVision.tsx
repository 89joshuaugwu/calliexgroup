"use client";

import type { AboutContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";
import { Target, Compass } from "lucide-react";

export function MissionVision({ mission, vision }: { mission: AboutContent["mission"]; vision: AboutContent["vision"] }) {
  return (
    <section className="cx-shell py-20 sm:py-28">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Vision Card - Dark theme with brand glow */}
        <Reveal>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[var(--color-ink)] p-8 sm:p-12 text-white shadow-[var(--shadow-elevated)]">
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--color-brand), transparent 70%)" }}
            />
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--color-brand-light)]">
                <Compass size={14} />
                <span>VISION</span>
              </div>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-tight">
                {vision.title}
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-white/80">
                &ldquo;{vision.body}&rdquo;
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-3 border-t border-white/10 pt-6 font-mono text-xs text-white/50">
              <span className="h-2 w-2 rounded-full bg-[var(--color-growth)] animate-pulse" />
              <span>Pioneering African Fintech & Digital Commerce</span>
            </div>
          </div>
        </Reveal>

        {/* Mission Card - Clean elevated surface with brand points */}
        <Reveal delay={0.1}>
          <div className="relative flex h-full flex-col justify-between rounded-3xl border border-[var(--color-line)] bg-white p-8 sm:p-12 shadow-[var(--shadow-card)]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand)]/8 px-3.5 py-1.5 font-mono text-xs font-medium text-[var(--color-brand)]">
                <Target size={14} />
                <span>MISSION</span>
              </div>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold text-[var(--color-graphite)]">
                {mission.introTitle}
              </h2>
              <p className="mt-2 font-medium text-[var(--color-mist)]">{mission.introLine}</p>
              
              <ul className="mt-6 flex flex-col gap-4">
                {mission.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-[0.95rem] leading-relaxed text-[var(--color-graphite)]">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/10 font-mono text-[0.65rem] font-bold text-[var(--color-brand)]">
                      {i + 1}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
