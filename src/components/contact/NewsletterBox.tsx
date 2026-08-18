"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import type { ContactContent } from "@/lib/cms/types";
import { subscribeNewsletter } from "@/lib/cms/actions";
import { Reveal } from "@/components/ui/Reveal";

export function NewsletterBox({ data }: { data: ContactContent["newsletter"] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const result = await subscribeNewsletter(email);
    if (result.ok) {
      setStatus("done");
      setEmail("");
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <section className="cx-shell pb-24 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-brand)] px-8 py-14 text-center sm:px-16">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 90% at 20% 0%, rgba(255,255,255,0.35), transparent), radial-gradient(50% 80% at 90% 100%, rgba(255,255,255,0.25), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-lg">
          <p className="cx-eyebrow cx-eyebrow--light mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
            {data.sectionEyebrow}
          </p>
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold text-white">{data.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{data.body}</p>

          {status === "done" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 flex flex-col items-center gap-2 text-white"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CheckCircle2 size={28} />
              <p className="font-medium">{data.successTitle}</p>
              <p className="text-sm text-white/75">{data.successMessage}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full flex-1 rounded-full border border-white/30 bg-white/15 px-5 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="cx-btn inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-sm font-medium text-[var(--color-brand)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {status === "loading" ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                Subscribe
              </button>
            </form>
          )}
          {status === "error" && <p className="mt-3 text-sm text-white">{error}</p>}
        </div>
      </Reveal>
    </section>
  );
}
