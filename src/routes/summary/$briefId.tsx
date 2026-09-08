import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileDown, Globe, Mail, MessageCircle, Pencil } from "lucide-react";
import { toast } from "sonner";
import { downloadBriefPdf } from "@/lib/briefPdf";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { BriefSummary } from "@/components/BriefSummary";
import { Button } from "@/components/ui/button";
import {
  getBrief,
  mailtoLink,
  siteFormLink,
  whatsappLink,
  type BriefData,
} from "@/lib/briefStorage";
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
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pt-10">
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
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Colonne gauche : actions */}
            <aside className="no-print lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Actions
                </p>
                <h2 className="mt-1 text-lg font-semibold text-foreground">
                  Envoyer ma fiche
                </h2>
                <div className="mt-4 flex flex-col gap-2.5">
                  <Button
                    className="w-full justify-start bg-gradient-ember"
                    onClick={() => {
                      downloadBriefPdf(brief);
                      toast.success("PDF généré");
                    }}
                  >
                    <FileDown className="size-4" />
                    Télécharger en PDF
                  </Button>
                  <a
                    href={whatsappLink(brief)}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <MessageCircle className="size-4" />
                      Envoyer sur WhatsApp
                    </Button>
                  </a>
                  <a href={mailtoLink(brief)} className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="size-4" />
                      Envoyer par e-mail
                    </Button>
                  </a>
                  <a
                    href={siteFormLink(brief)}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="size-4" />
                      Via le formulaire du site
                    </Button>
                  </a>
                </div>
                <div className="mt-5 border-t border-border pt-4">
                  <Link to="/" search={{ resume: brief.id }} className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <Pencil className="size-4" />
                      Modifier le brief
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Colonne droite : contenu du brief */}
            <section className="min-w-0">
              <BriefSummary brief={brief} />
            </section>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
