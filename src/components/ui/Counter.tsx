"use client";

import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Rolling digit number ticker — inspired by danielpetho's NumberTicker
 * (21st.dev) and Build UI's animated counter pattern.
 *
 * Each digit rolls vertically like a slot machine when the component
 * scrolls into view. Non-numeric characters (currency symbols, %, M, B, +)
 * are rendered statically beside the rolling digits.
 */

function RollingDigit({ digit, delay }: { digit: number; delay: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { mass: 0.8, stiffness: 75, damping: 15 });
  const y = useTransform(spring, (v) => `${-v * 10}%`);

  useEffect(() => {
    const timeout = setTimeout(() => mv.set(digit), delay * 1000);
    return () => clearTimeout(timeout);
  }, [digit, delay, mv]);

  return (
    <span className="relative inline-block h-[1em] w-[0.6em] overflow-hidden" style={{ lineHeight: 1 }}>
      <motion.span className="absolute left-0 top-0 flex flex-col" style={{ y }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="flex h-[1em] items-center justify-center tabular-nums">
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Parse leading non-digits ($ etc), digits, trailing non-digits (M, %, + etc)
  const parts = value.match(/^([^\d]*)([\d,.]+)(.*)$/);

  if (!parts) {
    // Fallback — not a numeric string
    return <span ref={ref} className="cx-counter">{value}</span>;
  }

  const prefix = parts[1] || "";
  const numericStr = parts[2]!;
  const suffix = parts[3] || "";

  // Split numeric portion into individual characters (digits, commas, dots)
  const chars = numericStr.split("");

  if (!inView) {
    // Before scroll — show all zeros in same structure to reserve space
    return (
      <span ref={ref} className="cx-counter inline-flex items-baseline tabular-nums">
        {prefix && <span>{prefix}</span>}
        {chars.map((ch, i) =>
          /\d/.test(ch) ? (
            <RollingDigit key={i} digit={0} delay={0} />
          ) : (
            <span key={i}>{ch}</span>
          )
        )}
        {suffix && <span>{suffix}</span>}
      </span>
    );
  }

  return (
    <span ref={ref} className="cx-counter inline-flex items-baseline tabular-nums">
      {prefix && <span>{prefix}</span>}
      {chars.map((ch, i) =>
        /\d/.test(ch) ? (
          <RollingDigit key={i} digit={parseInt(ch, 10)} delay={0.06 * i} />
        ) : (
          <span key={i}>{ch}</span>
        )
      )}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
