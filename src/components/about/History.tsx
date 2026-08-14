import Image from "next/image";
import type { AboutContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

export function History({ eyebrow, data }: { eyebrow: string; data: AboutContent["history"] }) {
  return (
    <section className="cx-shell py-24 sm:py-28">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <Reveal>
          <p className="cx-eyebrow mb-3">{eyebrow}</p>
          <h2 className="cx-text-balance font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-[var(--color-graphite)]">
            {data.title}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-[var(--color-mist)]">{data.lead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl">
            {data.imageUrl && <Image src={data.imageUrl} alt="" fill sizes="600px" className="object-cover" />}
          </div>
          <div
            className="cx-history-body flex flex-col gap-4 text-[0.95rem] leading-relaxed text-[var(--color-graphite)]"
            dangerouslySetInnerHTML={{ __html: data.bodyHtml }}
          />
        </Reveal>
      </div>
    </section>
  );
}
