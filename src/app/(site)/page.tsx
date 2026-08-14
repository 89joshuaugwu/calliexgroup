import { BigStats } from "@/components/home/BigStats";
import { ChinaSection } from "@/components/home/ChinaSection";
import { FeatureSlides } from "@/components/home/FeatureSlides";
import { HeroSection } from "@/components/home/HeroSection";
import { InnovationSection } from "@/components/home/InnovationSection";
import { PaymentBand } from "@/components/home/PaymentBand";
import { ProductsGrid } from "@/components/home/ProductsGrid";
import { getPageContent } from "@/lib/cms/content";

export default async function HomePage() {
  const home = await getPageContent("home");

  return (
    <main>
      <HeroSection hero={home.hero} metrics={home.metrics} />
      <ProductsGrid title={home.productsSectionTitle} products={home.products} />
      <InnovationSection data={home.innovation} />
      <PaymentBand data={home.paymentBand} />
      <BigStats data={home.bigStats} />
      <ChinaSection data={home.china} />
      <FeatureSlides header={home.coreFeaturesHeader} slides={home.featureSlides} />
    </main>
  );
}
