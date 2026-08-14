import Image from "next/image";

export function PageHero({ title, imageUrl }: { title: string; imageUrl: string }) {
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
        <h1 className="cx-text-balance font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
