import Image from "next/image";
import type { HomeContent } from "@/lib/cms/types";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function BigStats({ data }: { data: HomeContent["bigStats"] }) {
  const stats = [
    { value: data.stat1Value, label: data.stat1Label },
    { value: data.stat2Value, label: data.stat2Label },
    { value: data.stat3Value, label: data.stat3Label },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] py-24 sm:py-28">
      {data.bgImageUrl && (
        <Image src={data.bgImageUrl} alt="" fill sizes="100vw" className="object-cover opacity-15" />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(5,6,15,0.4), var(--color-ink) 85%)" }}
      />
      <div className="cx-shell relative">
        <Reveal className="mb-14 text-center">
          <p className="cx-text-balance mx-auto max-w-xl font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-medium text-white">
            <span className="text-[var(--color-brand-light)]">{data.eyebrowHighlight}</span>{" "}
            {data.eyebrowSuffix}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-semibold text-white">
                <Counter value={stat.value} />
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-wide text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
