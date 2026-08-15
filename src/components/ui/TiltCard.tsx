"use client";

/**
 * TiltCard — A 3D perspective tilt card that responds to cursor position.
 *
 * Inspired by 21st.dev/tom_ui/tilt-card and ibelick.com's tilt hover pattern.
 * Uses framer-motion useMotionValue + useSpring + useTransform for
 * physics-based, GPU-composited 3D rotation that tracks the cursor.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { type ReactNode, useCallback } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDeg?: number;
}

const SPRING = { stiffness: 300, damping: 25, mass: 0.5 };

export function TiltCard({ children, className = "", tiltDeg = 8 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltDeg, -tiltDeg]), SPRING);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltDeg, tiltDeg]), SPRING);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
