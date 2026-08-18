import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import type { AboutContent } from "@/lib/cms/types";
import { Reveal } from "@/components/ui/Reveal";

/**
 * data.bodyHtml is admin-authored rich text saved via the CMS richtext
 * field, so the trust boundary here is "compromised admin account," not
 * "arbitrary site visitor" — but that's still a real boundary (Firebase
 * Auth passwords get reused, browser sessions get left open), so it goes
 * through DOMPurify before it ever reaches dangerouslySetInnerHTML rather
 * than trusting Firestore content implicitly.
 */
export function History({ eyebrow, data }: { eyebrow: string; data: AboutContent["history"] }) {
  const safeHtml = DOMPurify.sanitize(data.bodyHtml, {
    ALLOWED_TAGS: ["p", "b", "strong", "i", "em", "a", "ul", "ol", "li", "br", "h3", "h4", "blockquote"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });

  return (
    <section className="cx-shell py-24 sm:py-28">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <Reveal>
          <p className="cx-eyebrow mb-3">{eyebrow}</p>
          <h2 className="cx-text-balance font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-[var(--color-graphite)]">
            {data.title}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-[var(--color-mist)]">{data.lead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
            {data.imageUrl && (
              <Image src={data.imageUrl} alt={`${data.title} — Callie X Group`} fill sizes="600px" className="object-cover" />
            )}
          </div>
          <div
            className="cx-history-body flex flex-col gap-4 text-[0.95rem] leading-relaxed text-[var(--color-graphite)]"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </Reveal>
      </div>
    </section>
  );
}
