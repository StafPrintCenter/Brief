import { Link } from "@tanstack/react-router";
import { FileText, FileQuestion, Home, ArrowLeft, CheckCircle2, XCircle, Sparkles, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundComponent() {
  const steps = [
    { num: 1, label: "Projet" },
    { num: 2, label: "Marque" },
    { num: 3, label: "Style" },
    { num: 4, label: "Technique" },
    { num: 5, label: "Logistique" },
    { num: 6, label: "Validation" },
  ];

  return (
    <div className="flex h-dvh w-full flex-col bg-background text-foreground select-none overflow-hidden font-sans">

      {/* 1. BARRE D'EN-TÊTE DU BRIEF */}
      <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList size={18} />
          </div>
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-foreground">
            BRIEF_BUILDER // PROJECT_QUALIFIER
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-destructive">
            <XCircle size={13} /> FICHE_INVALIDE
          </span>
        </div>
      </header>

      {/* 2. STEPPER DE PROGRESSION DU BRIEFING */}
      <div className="w-full border-b border-border bg-card/50 px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="mx-auto flex max-w-3xl items-center justify-between min-w-125">
          {steps.map((step) => (
            <div key={step.num} className="flex items-center gap-1.5 opacity-40">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[11px] font-mono font-bold text-muted-foreground">
                <CheckCircle2 size={13} className="text-emerald-500" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{step.label}</span>
              {step.num < 6 && <div className="h-0.5 w-4 sm:w-8 bg-border" />}
            </div>
          ))}

          {/* Étape hors-limite / Erreur */}
          <div className="flex items-center gap-1.5 border-l border-border pl-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[11px] font-mono font-bold animate-pulse">
              ?
            </div>
            <span className="font-mono text-xs font-bold text-destructive">Erreur 404</span>
          </div>
        </div>
      </div>

      {/* 3. CONTENU PRINCIPAL : FICHE PROJET PERDUE */}
      <main className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-6 bg-muted/20 overflow-y-auto">

        {/* Carte principale style "Fiche de Synthèse" */}
        <div className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl backdrop-blur-md">

          {/* Filigrane d'erreur en fond de fiche */}
          <div className="pointer-events-none absolute right-4 top-4 text-muted-foreground/10">
            <FileQuestion size={120} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">

            {/* Icône de brief corrompu */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
              <FileText size={28} />
            </div>

            <h1 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              Fiche projet introuvable
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Le briefing de projet que vous tentez d'afficher, d'éditer ou de soumettre pour devis n'existe pas ou a expiré.
            </p>

            {/* Récapitulatif de statut de la fiche */}
            <div className="mt-6 w-full rounded-xl border border-border bg-muted/30 p-4 font-mono text-[11px] sm:text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground">Progression :</span>
                <span className="text-destructive font-semibold">0 / 6 Étapes validées</span>
              </div>
              <div className="flex justify-between border-b border-border/60 pb-2">
                <span className="text-muted-foreground">ID du Brief :</span>
                <span className="text-foreground">NULL_REF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Statut devis :</span>
                <span className="text-destructive">IMPOSSIBLE_À_GÉNÉRER</span>
              </div>
            </div>

            {/* Actions de redirection vers le workflow */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full justify-center">
              <Button asChild size="default" className="w-full sm:w-auto rounded-full font-semibold shadow-md">
                <Link to="/">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Nouveau Brief
                </Link>
              </Button>

              <Button
                variant="outline"
                size="default"
                className="w-full sm:w-auto rounded-full font-semibold"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Button>
            </div>
          </div>
        </div>

      </main>

      {/* 4. PIED DE PAGE INTERACTIF */}
      <footer className="flex h-10 w-full shrink-0 items-center justify-between border-t border-border bg-card px-4 font-mono text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Home size={12} /> SPC_INTERACTIVE_BRIEF
        </span>
        <span className="hidden sm:inline">ETAPES: 1.PROJET &gt; 2.MARQUE &gt; 3.STYLE &gt; 4.TECHNIQUE &gt; 5.LOGISTIQUE &gt; 6.VALIDATION</span>
      </footer>

    </div>
  );
}