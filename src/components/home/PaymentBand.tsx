"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { HomeContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

export function PaymentBand({ data }: { data: HomeContent["paymentBand"] }) {
  return (
    <section className="cx-shell py-24 sm:py-28">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
          {data.mockImage1Url && (
            <Image
              src={data.mockImage1Url}
              alt=""
              fill
              sizes="380px"
              className="rounded-[24px] object-cover shadow-[var(--shadow-elevated)]"
            />
          )}

          <motion.div
            initial={{ x: 90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="cx-glass-light absolute -right-6 top-10 w-44 rounded-2xl p-4 shadow-[var(--shadow-card)]"
          >
            {data.mockImage2Url && (
              <div className="relative h-16 w-full overflow-hidden rounded-lg">
                <Image src={data.mockImage2Url} alt="" fill sizes="176px" className="object-cover" />
              </div>
            )}
            <p className="mt-2 font-mono text-[0.68rem] font-medium text-[var(--color-graphite)]">
              {data.payBillsLabel}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 90, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="cx-glass-light absolute -right-4 bottom-10 w-48 rounded-2xl p-4 shadow-[var(--shadow-card)]"
          >
            {data.mockImage3Url && (
              <div className="relative h-16 w-full overflow-hidden rounded-lg">
                <Image src={data.mockImage3Url} alt="" fill sizes="192px" className="object-cover" />
              </div>
            )}
            <p className="mt-2 font-mono text-[0.68rem] font-medium text-[var(--color-graphite)]">
              {data.managePayLabel}
            </p>
          </motion.div>
        </div>

        <Reveal>
          <p className="cx-eyebrow mb-3">{data.exploreCta}</p>
          <h2 className="cx-text-balance font-display text-[clamp(1.9rem,4vw,2.75rem)] font-semibold text-[var(--color-graphite)]">
            {data.manageTitle}
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
