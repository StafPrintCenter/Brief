import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BriefShell } from "@/components/site";
import { BriefList, DeleteBriefDialog, ShareBriefDialog } from "@/components/pages/history";
import { deleteBrief, getBriefs, type BriefData } from "@/lib/briefStorage";
import { SITE } from "@/data/site";

const PAGE_TITLE = `Mes briefs enregistrés - SPC Interactive Brief | ${SITE.name}`;
const PAGE_DESC = `Retrouvez, partagez ou supprimez les briefs projet créés sur cet appareil pour ${SITE.name}.`;

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
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

  return (
    <div className="min-h-screen bg-background">
      <BriefShell>
        <main className="mx-auto w-full max-w-5xl px-4">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Mes briefs
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Ces briefs sont enregistrés uniquement sur cet appareil. Vous pouvez les
            consulter, les envoyer à notre équipe ou les supprimer.
          </p>

          <BriefList
            briefs={briefs}
            onShare={setToShare}
            onDelete={setToDelete}
          />
        </main>
      </BriefShell>

      <DeleteBriefDialog
        brief={toDelete}
        onClose={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />

      <ShareBriefDialog
        brief={toShare}
        onClose={() => setToShare(null)}
      />
    </div>
  );
}
