import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getPageContent } from "@/lib/cms/content";

/** Shell for every public marketing route (/, /about, /contact, /products). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const brand = await getPageContent("brand");

  return (
    <>
      <Navbar brand={brand} />
      {children}
      <Footer brand={brand} />
    </>
  );
}
