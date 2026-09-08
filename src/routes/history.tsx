import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Copy,
  Eye,
  FileDown,
  Mail,
  MessageCircle,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react";
import { downloadBriefPdf } from "@/lib/briefPdf";
import { toast } from "sonner";

import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  deleteBrief,
  getBriefs,
  mailtoLink,
  projectTypeLabel,
  whatsappLink,
  type BriefData,
} from "@/lib/briefStorage";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Mes briefs enregistrés — SPC Interactive Brief" },
      {
        name: "description",
        content:
          "Retrouvez, partagez ou supprimez les briefs projet créés sur cet appareil pour STAF PRINT CENTER.",
      },
      { property: "og:title", content: "Mes briefs — STAF PRINT CENTER" },
      {
        property: "og:description",
        content: "Consultez, partagez par WhatsApp ou supprimez vos briefs projet.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [briefs, setBriefs] = useState<BriefData[]>([]);
  const [toDelete, setToDelete] = useState<BriefData | null>(null);
  const [toShare, setToShare] = useState<BriefData | null>(null);

  useEffect(() => setBriefs(getBriefs()), []);

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteBrief(toDelete.id);
    setBriefs(getBriefs());
    toast.success(`Brief ${toDelete.id} supprimé`);
    setToDelete(null);
  };

  const copyLink = (brief: BriefData) => {
    const url = `${window.location.origin}/summary/${brief.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Lien du brief copié");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl px-4 pt-10">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Mes briefs</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Ces briefs sont enregistrés uniquement sur cet appareil. Vous pouvez les
          consulter, les envoyer à notre équipe ou les supprimer.
        </p>

        {briefs.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              Aucun brief pour l'instant sur cet appareil.
            </p>
            <Link to="/" className="mt-5 inline-block">
              <Button className="bg-gradient-ember">Créer mon premier brief</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <AnimatePresence>
              {briefs.map((b) => (
                <motion.article
                  key={b.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-primary">{b.id}</p>
                      <h2 className="mt-1 text-lg font-semibold text-foreground">
                        {b.companyName || "Sans nom"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {projectTypeLabel(b.projectType)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${b.status === "completed"
                        ? "bg-primary/10 text-primary"
                        : "bg-surface text-muted-foreground"
                        }`}
                    >
                      {b.status === "completed" ? "Validé" : "Brouillon"}
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    Créé le {new Date(b.createdAt).toLocaleDateString("fr-FR")}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {b.status === "completed" ? (
                      <Link to="/summary/$briefId" params={{ briefId: b.id }}>
                        <Button size="sm" variant="outline">
                          <Eye className="size-4" />
                          Consulter
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/" search={{ resume: b.id }}>
                        <Button size="sm" variant="outline">
                          <Pencil className="size-4" />
                          Reprendre
                        </Button>
                      </Link>
                    )}
                    <Button size="sm" variant="outline" onClick={() => setToShare(b)}>
                      <Share2 className="size-4" />
                      Partager
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setToDelete(b)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <SiteFooter />

      <Dialog open={Boolean(toDelete)} onOpenChange={(o) => !o && setToDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer ce brief ?</DialogTitle>
            <DialogDescription>
              Le brief {toDelete?.id} sera définitivement retiré de cet appareil. Cette
              action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setToDelete(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(toShare)} onOpenChange={(o) => !o && setToShare(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Envoyer le brief {toShare?.id}</DialogTitle>
            <DialogDescription>
              Choisissez comment transmettre votre brief à notre service commercial.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <a
              href={toShare ? whatsappLink(toShare) : "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-surface"
            >
              <MessageCircle className="size-5 text-primary" />
              <span>
                <span className="block font-medium">Envoyer sur WhatsApp</span>
                <span className="text-sm text-muted-foreground">
                  Message pré-rempli vers notre équipe
                </span>
              </span>
            </a>
            <a
              href={toShare ? mailtoLink(toShare) : "#"}
              className="flex items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-surface"
            >
              <Mail className="size-5 text-primary" />
              <span>
                <span className="block font-medium">Envoyer par e-mail</span>
                <span className="text-sm text-muted-foreground">
                  Message pré-rempli vers {"contact@stafprint.com"}
                </span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => {
                if (!toShare) return;
                downloadBriefPdf(toShare);
                toast.success("PDF généré");
              }}
              className="flex items-center gap-3 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/60 hover:bg-surface"
            >
              <FileDown className="size-5 text-primary" />
              <span>
                <span className="block font-medium">Télécharger en PDF</span>
                <span className="text-sm text-muted-foreground">
                  Fichier PDF prêt à envoyer
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => toShare && copyLink(toShare)}
              className="flex items-center gap-3 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/60 hover:bg-surface"
            >
              <Copy className="size-5 text-primary" />
              <span>
                <span className="block font-medium">Copier le lien du brief</span>
                <span className="text-sm text-muted-foreground">
                  Lien consultable sur cet appareil
                </span>
              </span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
