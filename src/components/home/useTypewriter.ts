"use client";

import { useEffect, useState } from "react";

/** Reveals `text` one character at a time. Jumps straight to full text for prefers-reduced-motion. */
export function useTypewriter(text: string, { speed = 22, startDelay = 400 }: { speed?: number; startDelay?: number } = {}) {
  const [out, setOut] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    // Deferring even the reduced-motion case through setTimeout (rather
    // than calling setState synchronously at the top of the effect) keeps
    // this an "external system -> callback -> setState" subscription,
    // which is the update pattern React's effect rules ask for, instead
    // of a same-tick state write that forces an extra cascading render.
    const timeout = setTimeout(() => {
      if (reduced) {
        setOut(text);
        return;
      }
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, reduced ? 0 : startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return out;
}
