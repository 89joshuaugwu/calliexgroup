import Image from "next/image";
import Link from "next/link";

export function PageHero({
  title,
  imageUrl,
  eyebrow,
}: {
  title: string;
  imageUrl: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden bg-[var(--color-ink)]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,15,0.7) 0%, rgba(5,6,15,0.35) 45%, rgba(5,6,15,0.92) 100%)",
        }}
      />
      <div className="cx-shell relative pb-14">
        {/* Breadcrumb */}
        <nav className="cx-breadcrumb mb-4" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="cx-breadcrumb__sep" aria-hidden="true">/</span>
          <span className="cx-breadcrumb__current">{eyebrow ?? title}</span>
        </nav>

        {eyebrow && (
          <p className="cx-eyebrow cx-eyebrow--light mb-3">{eyebrow}</p>
        )}

        <h1 className="cx-text-balance font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
