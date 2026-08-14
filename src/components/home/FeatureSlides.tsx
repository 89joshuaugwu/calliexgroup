"use client";

import Image from "next/image";
import type { HomeContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

export function FeatureSlides({
  header,
  slides,
}: {
  header: HomeContent["coreFeaturesHeader"];
  slides: HomeContent["featureSlides"];
}) {
  const sorted = [...slides].sort((a, b) => a.order - b.order);

  return (
    <section className="py-24 sm:py-28">
      <div className="cx-shell">
        <Reveal className="relative mb-10 overflow-hidden rounded-[28px]">
          <div className="relative h-56 sm:h-64">
            {header.bannerImageUrl && (
              <Image src={header.bannerImageUrl} alt="" fill sizes="100vw" className="object-cover" />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(5,6,15,0.82), rgba(5,6,15,0.35))" }}
            />
            <div className="relative flex h-full flex-col justify-center p-8 sm:p-12">
              <p className="cx-eyebrow cx-eyebrow--light mb-2">{header.eyebrow}</p>
              <h2 className="cx-text-balance max-w-lg font-display text-[clamp(1.7rem,3.6vw,2.5rem)] font-semibold text-white">
                {header.title}
              </h2>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="cx-shell scrollbar-none flex gap-4 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory]">
        {sorted.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[340px] w-[78vw] shrink-0 overflow-hidden rounded-3xl [scroll-snap-align:start] sm:w-[380px]"
          >
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt=""
                fill
                sizes="(min-width: 640px) 380px, 78vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(5,6,15,0.1) 40%, rgba(5,6,15,0.92) 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-mono text-[0.65rem] tracking-widest text-[var(--color-brand-light)]">
                {slide.overlayLabel}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">{slide.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">{slide.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
