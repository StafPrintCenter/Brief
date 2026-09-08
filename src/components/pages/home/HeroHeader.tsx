import { ShieldCheck } from "lucide-react";
import { SITE, SITE_LINK } from "@/data/site";

export function HeroHeader() {
  return (
    <section className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
        brief.stafprint.com
      </p>


      <a
        href={SITE_LINK.landingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <Summary className="h-3.5 w-3.5 text-primary" />
        Outil de brief de {SITE.name}
      </a>
      <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
        Décrivez votre projet, <span className="text-gradient-ember">nous faisons le reste</span>
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Six étapes simples, aucun jargon technique. À la fin, vous obtenez une fiche
        projet claire à envoyer à notre équipe pour un devis gratuit.
      </p>
    </section>
  );
}