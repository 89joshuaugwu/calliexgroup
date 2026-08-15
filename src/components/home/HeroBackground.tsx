"use client";

/**
 * Animated hero background — replaces the Three.js constellation.
 * Three blurred gradient orbs drift slowly on GPU-composited transforms,
 * plus tiny CSS-only floating particles. Zero JavaScript animation frames,
 * zero external dependencies, instant load on every device.
 *
 * All styles live in globals.css (cx-hero-bg, cx-hero-orb, cx-hero-dot).
 */

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 37) % 90)}%`,
  top: `${10 + ((i * 53) % 80)}%`,
  delay: `${(i * 1.3) % 16}s`,
  size: i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 3,
}));

export function HeroBackground() {
  return (
    <div className="cx-hero-bg" aria-hidden="true">
      {/* Gradient orbs */}
      <div className="cx-hero-orb cx-hero-orb--1" />
      <div className="cx-hero-orb cx-hero-orb--2" />
      <div className="cx-hero-orb cx-hero-orb--3" />

      {/* Floating particles */}
      <div className="cx-hero-particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="cx-hero-dot"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Noise overlay for texture depth */}
      <div className="cx-noise absolute inset-0" />
    </div>
  );
}
