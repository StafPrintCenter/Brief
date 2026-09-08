import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BriefShell } from "@/components/site";
import { BriefSummary } from "@/components/BriefSummary";
import { BriefNotFound, SummaryActions } from "@/components/pages/brief";
import { getBrief, type BriefData } from "@/lib/briefStorage";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Fiche projet - SPC Interactive Brief | ${SITE.name}`;
const PAGE_DESC = `Fiche récapitulative officielle de votre brief ${SITE.name}. Téléchargez-la en PDF ou envoyez-la par WhatsApp.`;

export const Route = createFileRoute("/summary/$briefId")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
    ],
  }),
  component: SummaryPage,
});

function SummaryPage() {
  const { briefId } = Route.useParams();
  const [brief, setBrief] = useState<BriefData | null | undefined>(undefined);

  useEffect(() => setBrief(getBrief(briefId) ?? null), [briefId]);

  return (
    <BriefShell>
      <main className="mx-auto w-full max-w-5xl px-4">
        {brief === undefined ? (
          <p className="text-muted-foreground">Chargement de la fiche…</p>
        ) : brief === null ? (
          <BriefNotFound briefId={briefId} />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <SummaryActions brief={brief} />
            <section className="min-w-0">
              <BriefSummary brief={brief} />
            </section>
          </div>
        )}
      </main>
    </BriefShell>
  );
}
