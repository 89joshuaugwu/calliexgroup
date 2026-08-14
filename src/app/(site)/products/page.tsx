import { ProductsGrid } from "@/components/home/ProductsGrid";
import { getPageContent } from "@/lib/cms/content";

export const metadata = { title: "Our Products" };

export default async function ProductsPage() {
  const home = await getPageContent("home");

  return (
    <main className="pt-32">
      <div className="cx-shell pb-4">
        <p className="cx-eyebrow mb-3">Callie X Group</p>
        <h1 className="cx-text-balance max-w-xl font-display text-[clamp(2rem,4.6vw,3rem)] font-semibold text-[var(--color-graphite)]">
          Eight products. One group.
        </h1>
      </div>
      <ProductsGrid title={home.productsSectionTitle} products={home.products} />
    </main>
  );
}
