import { Awards } from "@/components/about/Awards";
import { BoardGrid } from "@/components/about/BoardGrid";
import { CoreValues, TeamGrid } from "@/components/about/AboutGrids";
import { History } from "@/components/about/History";
import { MissionVision } from "@/components/about/MissionVision";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getPageContent } from "@/lib/cms/content";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const about = await getPageContent("about");

  return (
    <main>
      <PageHero title={about.hero.title} imageUrl={about.hero.bgPosterUrl} />
      <MissionVision mission={about.mission} vision={about.vision} />

      <section className="bg-[var(--color-paper-warm)] py-24 sm:py-28">
        <div className="cx-shell">
          <Reveal className="mb-10 text-center">
            <p className="cx-eyebrow mb-3">{about.boardEyebrow}</p>
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.3rem)] font-semibold text-[var(--color-graphite)]">
              Leadership
            </h2>
          </Reveal>
          <BoardGrid members={about.board} />
        </div>
      </section>

      <TeamGrid team={about.team} />
      <Awards eyebrow={about.awardsEyebrow} data={about.awards} />
      <History eyebrow={about.historyEyebrow} data={about.history} />
      <CoreValues data={about.coreValues} />
    </main>
  );
}
