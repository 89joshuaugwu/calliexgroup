"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { HomeContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

function ItalicHeadline({ text, italicWords }: { text: string; italicWords: string[] }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const isItalic = italicWords.some((iw) => iw.trim().toLowerCase() === word.replace(/[.,]/g, "").toLowerCase());
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="inline-block"
            style={isItalic ? { fontStyle: "italic", color: "var(--color-brand)" } : undefined}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </>
  );
}

export function InnovationSection({ data }: { data: HomeContent["innovation"] }) {
  const italicWords = data.headlineItalic.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="cx-shell py-8 sm:py-12">
      <Reveal>
        <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[var(--shadow-card)] md:grid-cols-2">
          <div className="relative min-h-[280px]">
            {data.imageUrl && (
              <Image src={data.imageUrl} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            )}
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h3 className="cx-text-balance font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-tight text-[var(--color-graphite)]">
              <ItalicHeadline text={data.headlineLine1} italicWords={italicWords} />
              <br />
              <ItalicHeadline text={data.headlineLine2} italicWords={italicWords} />
            </h3>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--color-mist)]">{data.body}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
