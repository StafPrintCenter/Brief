import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileDown, MessageCircle, Pencil } from "lucide-react";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { BriefSummary } from "@/components/BriefSummary";
import { Button } from "@/components/ui/button";
import { getBrief, whatsappLink, type BriefData } from "@/lib/briefStorage";

export const Route = createFileRoute("/summary/$briefId")({
  head: () => ({
    meta: [
      { title: "Fiche projet — SPC Interactive Brief" },
      {
        name: "description",
        content:
          "Fiche récapitulative officielle de votre brief STAF PRINT CENTER : téléchargez-la en PDF ou envoyez-la par WhatsApp.",
      },
      { property: "og:title", content: "Fiche projet — STAF PRINT CENTER" },
      {
        property: "og:description",
        content: "Récapitulatif complet de votre demande, prêt à être envoyé.",
      },
    ],
  }),
  component: SummaryPage,
});

function SummaryPage() {
  const { briefId } = Route.useParams();
  const [brief, setBrief] = useState<BriefData | null | undefined>(undefined);

  useEffect(() => setBrief(getBrief(briefId) ?? null), [briefId]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pt-10">
        {brief === undefined ? (
          <p className="text-muted-foreground">Chargement de la fiche…</p>
        ) : brief === null ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <h1 className="text-xl font-semibold text-foreground">Fiche introuvable</h1>
            <p className="mt-2 text-muted-foreground">
              Le brief <span className="font-mono">{briefId}</span> n'existe pas sur cet
              appareil. Les briefs sont enregistrés localement.
            </p>
            <Link to="/history" className="mt-5 inline-block">
              <Button variant="outline">Voir mes briefs</Button>
            </Link>
          </div>
        ) : (
          <>
            <BriefSummary brief={brief} />
            <div className="no-print mt-6 flex flex-wrap gap-3">
              <Button className="bg-gradient-ember" onClick={() => window.print()}>
                <FileDown className="size-4" />
                Télécharger en PDF
              </Button>
              <a href={whatsappLink(brief)} target="_blank" rel="noreferrer">
                <Button variant="outline">
                  <MessageCircle className="size-4" />
                  Envoyer sur WhatsApp
                </Button>
              </a>
              <Link to="/" search={{ resume: brief.id }}>
                <Button variant="ghost">
                  <Pencil className="size-4" />
                  Modifier le brief
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
