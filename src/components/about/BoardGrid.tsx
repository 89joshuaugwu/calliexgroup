"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import type { PointerEvent } from "react";
import type { AboutContent } from "@/lib/cms/types";
import { RevealStagger, revealItemVariants } from "@/components/ui/Reveal";
import { formatPhoneHref } from "@/lib/utils";

function BoardCard({ member }: { member: AboutContent["board"][number] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 25 });

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div variants={revealItemVariants}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="cx-card-tilt group relative aspect-[3/4] overflow-hidden rounded-3xl bg-[var(--color-ink)] focus-within:ring-2 focus-within:ring-[var(--color-brand)]"
        tabIndex={0}
      >
        {member.imageUrl && (
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 25vw, 45vw"
            className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-40 group-focus-within:opacity-40"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 pt-14">
          <p className="font-display text-lg font-semibold text-white">{member.name}</p>
          <p className="text-sm text-[var(--color-brand-light)]">{member.role}</p>
        </div>
        <div className="absolute inset-0 flex translate-y-4 flex-col justify-end gap-1.5 bg-[var(--color-ink)]/92 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
          <p className="font-display text-lg font-semibold text-white">{member.name}</p>
          <p className="mb-2 text-sm text-[var(--color-brand-light)]">{member.role}</p>
          {member.email && (
            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs text-white/70 hover:text-white">
              <Mail size={13} /> {member.email}
            </a>
          )}
          {member.phone && (
            <a href={formatPhoneHref(member.phone)} className="flex items-center gap-2 text-xs text-white/70 hover:text-white">
              <Phone size={13} /> {member.phone}
            </a>
          )}
          {member.hoverCardExtra && <p className="mt-1 text-xs text-white/50">{member.hoverCardExtra}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BoardGrid({ members }: { members: AboutContent["board"] }) {
  const sorted = [...members].sort((a, b) => a.order - b.order);
  return (
    <RevealStagger className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {sorted.map((member) => (
        <BoardCard key={member.id} member={member} />
      ))}
    </RevealStagger>
  );
}
