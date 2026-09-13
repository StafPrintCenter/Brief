import { CheckCircle2, Layout, Monitor, Package, PenTool } from "lucide-react";

export function BriefPreviewIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md min-w-0 lg:mx-0 lg:max-w-none">
      {/* Halo lumineux de fond */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl" />

      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Barre navigateur */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
          <span className="size-2.5 shrink-0 rounded-full bg-coral" />
          <span className="size-2.5 shrink-0 rounded-full bg-amber" />
          <span className="size-2.5 shrink-0 rounded-full bg-emerald" />
          <div className="ml-3 flex flex-1 items-center justify-center rounded-md bg-background px-3 py-1 font-mono text-[10px] text-muted-foreground">
            brief.spc.local
          </div>
        </div>

        <div className="p-4 bg-background/40">
          {/* Fausse barre de progression (6 étapes) */}
          <div className="mb-6 flex items-center justify-between gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex-1">
                <div
                  className={`h-1.5 w-full rounded-full ${step === 1 ? "bg-primary" : "bg-border"
                    }`}
                />
              </div>
            ))}
          </div>

          {/* Simulation Étape 1 : Choix du projet */}
          <div className="space-y-4">
            <div>
              <div className="h-3 w-1/3 rounded bg-foreground/80" />
              <div className="mt-2 h-2 w-2/3 rounded bg-muted-foreground/40" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Carte : Impression (Active) */}
              <div className="rounded-xl border-2 border-primary bg-primary/5 p-3 shadow-sm">
                <Layout className="mb-2 size-5 text-primary" />
                <div className="h-2 w-1/2 rounded bg-foreground/80" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-primary/40" />
              </div>

              {/* Carte : Packaging */}
              <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <Package className="mb-2 size-5 text-muted-foreground" />
                <div className="h-2 w-1/2 rounded bg-foreground/80" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-muted-foreground/40" />
              </div>

              {/* Carte : Branding */}
              <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <PenTool className="mb-2 size-5 text-muted-foreground" />
                <div className="h-2 w-1/2 rounded bg-foreground/80" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-muted-foreground/40" />
              </div>

              {/* Carte : Web */}
              <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <Monitor className="mb-2 size-5 text-muted-foreground" />
                <div className="h-2 w-1/2 rounded bg-foreground/80" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded bg-muted-foreground/40" />
              </div>
            </div>

            {/* Bouton Suivant simulé */}
            <div className="mt-4 flex justify-end">
              <div className="flex h-8 w-24 items-center justify-center rounded-lg bg-primary/20">
                <div className="h-2 w-12 rounded bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badge flottant rappelant la fonction 'saveDraft' */}
      <div className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg sm:flex">
        <CheckCircle2 className="size-4 text-emerald-500" />
        <span className="text-xs font-medium text-muted-foreground">
          Brouillon auto-sauvegardé
        </span>
      </div>
    </div>
  );
}