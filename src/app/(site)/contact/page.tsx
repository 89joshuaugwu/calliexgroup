import { NewsletterBox } from "@/components/contact/NewsletterBox";
import { OfficesGrid } from "@/components/contact/OfficesGrid";
import { PageHero } from "@/components/layout/PageHero";
import { getPageContent } from "@/lib/cms/content";

export const metadata = { title: "Contact Us" };

export default async function ContactPage() {
  const contact = await getPageContent("contact");

  return (
    <main>
      <PageHero title={contact.hero.title} imageUrl={contact.hero.bgPosterUrl} />
      <OfficesGrid data={{ ...contact.hero, offices: contact.offices }} />
      <NewsletterBox data={contact.newsletter} />
    </main>
  );
}
