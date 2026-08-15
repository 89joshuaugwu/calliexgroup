import { PageHero } from "@/components/layout/PageHero";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getPageContent } from "@/lib/cms/content";

export const metadata = {
  title: "Our Products",
  description: "Explore the Callie X Group portfolio spanning fintech, crypto settlements, verified real estate, and digital commerce.",
};

export default async function ProductsPage() {
  const home = await getPageContent("home");

  return (
    <main>
      <PageHero
        title="Our Products & Ecosystem"
        eyebrow="Group Portfolio"
        imageUrl={home.hero.bgPosterUrl}
      />
      <ProductCatalog products={home.products} />
    </main>
  );
}
