"use client";

import { motion } from "framer-motion";
import type { HomeContent } from "@/lib/cms/types";

/**
 * Hero signature visual — the org chart, for real.
 *
 * One hub (Callie X Group) with a spoke and node for every live product
 * line, read straight from CMS `products` data — not a hardcoded list,
 * so it stays correct the moment a product is renamed, added, or
 * reordered in /admin. This is what the README originally promised as
 * a Three.js constellation; same idea, delivered as ~3KB of SVG instead
 * of a 3D dependency and a WebGL context. No extra JS on the wire, no
 * bundle weight, works on every device.
 *
 * It draws itself in once on load — an orchestrated entrance, not
 * ambient noise — then sits quiet, with an occasional signal pulse
 * traveling along each spoke (the same offset-path technique already
 * used for the Nigeria→Guangzhou route in ChinaSection, reused here on
 * purpose so the site has one consistent "network" visual language
 * instead of two unrelated effects).
 *
 * Respects prefers-reduced-motion via the app-wide <MotionConfig> in
 * (site)/layout.tsx — every animation below is skipped/snapped to its
 * end state automatically for users who've asked for that.
 */

const VIEW = 640;
const CENTER = VIEW / 2;
const HUB_R = 34;
const NODE_R = 5;
const ORBIT_R = 232;
const MAX_NODES = 10;

function nodePosition(index: number, count: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + ORBIT_R * Math.cos(angle),
    y: CENTER + ORBIT_R * Math.sin(angle),
    angle,
  };
}

export function HeroBackground({ products }: { products: HomeContent["products"] }) {
  const nodes = [...products].sort((a, b) => a.order - b.order).slice(0, MAX_NODES);
  const count = Math.max(nodes.length, 1);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="h-full w-full min-w-[640px] max-w-none opacity-45 sm:min-w-0"
      >
        {nodes.map((p, i) => {
          const pos = nodePosition(i, count);
          return (
            <motion.line
              key={`line-${p.id}`}
              x1={CENTER}
              y1={CENTER}
              x2={pos.x}
              y2={pos.y}
              stroke="var(--color-brand-light)"
              strokeWidth={1}
              strokeOpacity={0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {/* Signal pulses — staggered so the network feels alive, not busy */}
        {nodes.map((p, i) => {
          const pos = nodePosition(i, count);
          const path = `M ${CENTER} ${CENTER} L ${pos.x} ${pos.y}`;
          return (
            <motion.circle
              key={`pulse-${p.id}`}
              r={2.5}
              fill="#fff"
              initial={{ opacity: 0 }}
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 2.2,
                delay: 2.2 + i * 0.85,
                repeat: Infinity,
                repeatDelay: count * 0.85 + 2.5,
                ease: "easeInOut",
              }}
              style={{ offsetPath: `path('${path}')` }}
            />
          );
        })}

        {nodes.map((p, i) => {
          const pos = nodePosition(i, count);
          const lx = pos.x + Math.cos(pos.angle) * 20;
          const ly = pos.y + Math.sin(pos.angle) * 20;
          const anchor = Math.cos(pos.angle) > 0.3 ? "start" : Math.cos(pos.angle) < -0.3 ? "end" : "middle";
          return (
            <motion.g
              key={`node-${p.id}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              <circle cx={pos.x} cy={pos.y} r={NODE_R + 6} fill="var(--color-brand)" opacity={0.18} />
              <circle cx={pos.x} cy={pos.y} r={NODE_R} fill="#fff" />
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fontFamily="var(--font-mono)"
                fontSize={12}
                letterSpacing="0.08em"
                fill="rgba(255,255,255,0.5)"
              >
                {p.name.toUpperCase()}
              </text>
            </motion.g>
          );
        })}

        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={HUB_R}
          fill="var(--color-ink)"
          stroke="var(--color-brand-light)"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
        <text
          x={CENTER}
          y={CENTER}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-display)"
          fontSize={26}
          fontWeight={600}
          fill="var(--color-brand-light)"
        >
          X
        </text>
      </svg>

      <div className="cx-noise absolute inset-0 opacity-60" />
    </div>
  );
}
