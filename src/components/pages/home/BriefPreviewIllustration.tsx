import { SITE_LINK } from "@/data/site";
import { Layout, Monitor, Package, PenTool } from "lucide-react";
import { stripProtocol } from "@/lib/domain";

export function BriefPreviewIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-2xl min-w-0 lg:mx-0">
      {/* Halo lumineux de fond */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl flex flex-col">
        {/* Barre navigateur */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-danger shrink-0" />
          <span className="size-2.5 rounded-full bg-warning shrink-0" />
          <span className="size-2.5 rounded-full bg-success shrink-0" />
          <div className="ml-3 flex flex-1 items-center justify-start rounded-md bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground max-w-50">
            {stripProtocol(SITE_LINK.briefUrl)}
          </div>
        </div>

        {/* Layout Horizontal : Sidebar + Contenu */}
        <div className="flex h-56 sm:h-64 bg-background/40">

          {/* Sidebar (Étapes) - Visible sur desktop */}
          <div className="hidden w-[35%] flex-col border-r border-border bg-muted/30 p-5 sm:flex">
            <div className="mb-6 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Progression
            </div>
            <div className="flex flex-col gap-4">
              {/* Étape 1 : Active */}
              <div className="flex items-center gap-3 text-primary">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  1
                </div>
                <div className="h-2 w-16 rounded bg-primary" />
              </div>

              {/* Étape 2 : À venir */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-[10px] font-bold text-muted-foreground">
                  2
                </div>
                <div className="h-2 w-20 rounded bg-muted-foreground/30" />
              </div>

              {/* Étape 3 : À venir */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-[10px] font-bold text-muted-foreground">
                  3
                </div>
                <div className="h-2 w-12 rounded bg-muted-foreground/30" />
              </div>
            </div>
          </div>

          {/* Contenu Principal (Grille de choix) */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="h-3.5 w-1/2 rounded bg-foreground/80" />
            <div className="mt-2 h-2 w-3/4 rounded bg-muted-foreground/40" />

            {/* Cartes horizontales */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Carte Active */}
              <div className="flex items-center gap-3 rounded-xl border-2 border-primary bg-primary/5 p-3 shadow-sm transition-transform hover:-translate-y-0.5">
                <div className="rounded-md bg-primary/10 p-2 text-primary">
                  <Layout className="size-4" />
                </div>
                <div className="h-2 w-16 rounded bg-primary/80" />
              </div>

              {/* Cartes Inactives */}
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="rounded-md bg-muted p-2 text-muted-foreground">
                  <Package className="size-4" />
                </div>
                <div className="h-2 w-20 rounded bg-muted-foreground/50" />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="rounded-md bg-muted p-2 text-muted-foreground">
                  <PenTool className="size-4" />
                </div>
                <div className="h-2 w-14 rounded bg-muted-foreground/50" />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="rounded-md bg-muted p-2 text-muted-foreground">
                  <Monitor className="size-4" />
                </div>
                <div className="h-2 w-12 rounded bg-muted-foreground/50" />
              </div>
            </div>

            {/* Bouton Suivant */}
            <div className="mt-auto flex justify-end pt-4">
              <div className="flex h-8 w-28 items-center justify-center rounded-lg bg-primary">
                <div className="h-1.5 w-12 rounded bg-primary-foreground/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge flottant positionné différemment pour accompagner la largeur */}
      <div className="absolute -bottom-4 right-8 hidden items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 shadow-lg sm:flex">
        <span className="text-xs font-medium text-muted-foreground">
          Devis généré en 2 min
        </span>
      </div>
    </div>
  );
}