import type { AboutContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

export function MissionVision({ mission, vision }: { mission: AboutContent["mission"]; vision: AboutContent["vision"] }) {
  return (
    <section className="cx-shell grid gap-12 py-24 sm:py-28 md:grid-cols-2">
      <Reveal>
        <p className="cx-eyebrow mb-3">{vision.title}</p>
        <p className="cx-text-balance text-lg leading-relaxed text-[var(--color-graphite)]">{vision.body}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="cx-eyebrow mb-3">{mission.introTitle}</p>
        <p className="mb-4 font-medium text-[var(--color-graphite)]">{mission.introLine}</p>
        <ul className="flex flex-col gap-3">
          {mission.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-[var(--color-mist)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
