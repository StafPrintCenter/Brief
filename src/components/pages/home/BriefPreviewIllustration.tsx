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
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3.5 sm:px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-danger shrink-0" />
          <span className="size-2.5 rounded-full bg-warning shrink-0" />
          <span className="size-2.5 rounded-full bg-success shrink-0" />
          <div className="ml-2 sm:ml-3 flex flex-1 items-center justify-start rounded-md bg-background px-2.5 py-1 font-mono text-[10px] text-muted-foreground max-w-44 sm:max-w-50 truncate">
            {stripProtocol(SITE_LINK.briefUrl)}
          </div>
        </div>

        {/* Layout Horizontal : Sidebar + Contenu */}
        <div className="flex min-h-[22rem] sm:h-64 bg-background/40">

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
          <div className="flex flex-1 flex-col p-4 sm:p-6">
            {/* Barre de progression compacte sur mobile */}
            <div className="flex items-center gap-2 mb-3 sm:hidden">
              <div className="h-1.5 flex-1 rounded-full bg-primary" />
              <div className="h-1.5 flex-1 rounded-full bg-muted" />
              <div className="h-1.5 flex-1 rounded-full bg-muted" />
              <span className="text-[10px] font-medium text-muted-foreground ml-1">1/3</span>
            </div>

            <div className="h-3.5 w-1/2 rounded bg-foreground/80" />
            <div className="mt-2 h-2 w-3/4 rounded bg-muted-foreground/40" />

            {/* Cartes (Grille 2 cols adaptative) */}
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Carte Active */}
              <div className="flex items-center gap-2 sm:gap-3 rounded-xl border-2 border-primary bg-primary/5 p-2.5 sm:p-3 shadow-sm">
                <div className="rounded-md bg-primary/10 p-1.5 sm:p-2 text-primary shrink-0">
                  <Layout className="size-3.5 sm:size-4" />
                </div>
                <div className="h-2 w-12 sm:w-16 rounded bg-primary/80" />
              </div>

              {/* Cartes Inactives */}
              <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-sm">
                <div className="rounded-md bg-muted p-1.5 sm:p-2 text-muted-foreground shrink-0">
                  <Package className="size-3.5 sm:size-4" />
                </div>
                <div className="h-2 w-14 sm:w-20 rounded bg-muted-foreground/50" />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-sm">
                <div className="rounded-md bg-muted p-1.5 sm:p-2 text-muted-foreground shrink-0">
                  <PenTool className="size-3.5 sm:size-4" />
                </div>
                <div className="h-2 w-10 sm:w-14 rounded bg-muted-foreground/50" />
              </div>

              <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-sm">
                <div className="rounded-md bg-muted p-1.5 sm:p-2 text-muted-foreground shrink-0">
                  <Monitor className="size-3.5 sm:size-4" />
                </div>
                <div className="h-2 w-12 sm:w-12 rounded bg-muted-foreground/50" />
              </div>
            </div>

            {/* Bouton Suivant */}
            <div className="mt-auto flex justify-end pt-4">
              <div className="flex h-7 sm:h-8 w-24 sm:w-28 items-center justify-center rounded-lg bg-primary">
                <div className="h-1.5 w-10 sm:w-12 rounded bg-primary-foreground/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge flottant adaptatif */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-8 sm:-bottom-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg whitespace-nowrap">
        <span className="text-[11px] sm:text-xs font-medium text-muted-foreground">
          Devis généré en 2 min
        </span>
      </div>
    </div>
  );
}