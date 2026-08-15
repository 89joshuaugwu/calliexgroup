"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);

    // Figure out which slide is most visible
    const children = Array.from(el.children) as HTMLElement[];
    let best = 0;
    let bestVisible = 0;
    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const parentRect = el.getBoundingClientRect();
      const visible = Math.max(
        0,
        Math.min(rect.right, parentRect.right) - Math.max(rect.left, parentRect.left)
      );
      if (visible > bestVisible) {
        bestVisible = visible;
        best = i;
      }
    });
    setActiveIdx(best);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  function scrollBy(dir: -1 | 1) {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 380;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  }

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

      {/* Slides container with navigation */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="cx-shell scrollbar-none flex gap-4 overflow-x-auto pb-4 [scroll-snap-type:x_mandatory]"
        >
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

        {/* Right-edge fade hint */}
        {canScrollRight && <div className="cx-scroll-fade hidden sm:block" />}

        {/* Desktop arrow buttons */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/90 p-2.5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-transform hover:scale-110 sm:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} className="text-[var(--color-graphite)]" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/90 p-2.5 shadow-[var(--shadow-card)] backdrop-blur-sm transition-transform hover:scale-110 sm:flex"
            aria-label="Next slide"
          >
            <ChevronRight size={18} className="text-[var(--color-graphite)]" />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {sorted.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => {
              const el = scrollRef.current;
              const child = el?.children[i] as HTMLElement | undefined;
              child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            }}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === activeIdx ? 24 : 8,
              background: i === activeIdx ? "var(--color-brand)" : "var(--color-line)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
