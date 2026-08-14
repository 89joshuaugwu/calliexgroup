"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Animates a stat like "$120M" or "99.99%" counting up when scrolled
 * into view. Parses the leading numeric portion and keeps any prefix/
 * suffix (currency symbols, "M"/"B"/"%") static so odd formats never
 * break — this needs to survive real content like "1.9+M" or "$10B"
 * without a rewrite.
 */
export function Counter({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  const target = match ? parseFloat(match[2]!.replace(/,/g, "")) : 0;
  const decimals = match && match[2]!.includes(".") ? match[2]!.split(".")[1]!.length : 0;
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView && match) motionVal.set(target);
  }, [inView, target, match, motionVal]);

  useEffect(() => {
    if (!match) return;
    const unsub = spring.on("change", (v) => {
      const num = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-US");
      setDisplay(`${match[1]}${num}${match[3]}`);
    });
    return unsub;
  }, [spring, match, decimals]);

  return (
    <span ref={ref} className="cx-counter">
      {display}
    </span>
  );
}
