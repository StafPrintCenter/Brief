import { Summary } from "lucide-react";
import { SITE, SITE_LINK } from "@/data/site";
import { BriefPreviewIllustration } from "./BriefPreviewIllustration";

export function HeroHeader() {
  return (
    <section className="relative mx-auto mb-10 grid max-w-6xl grid-cols-1 gap-14 py-10 lg:mb-16 lg:grid-cols-2 lg:items-center lg:gap-10">

      {/* Colonne Gauche : Textes et appel à l'action */}
      <div className="flex flex-col items-start text-left">
        <a
          href={SITE_LINK.landingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Summary className="h-3.5 w-3.5 text-primary" />
          Outil de brief de {SITE.name}
        </a>

        <h1 className="mt-7 text-balance text-4xl font-extralight leading-[1.08] tracking-tight sm:text-6xl">
          Décrivez votre projet, <span className="font-black text-gradient-ember">nous faisons le reste.</span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Six étapes simples, aucun jargon technique. À la fin, vous obtenez une fiche
          projet claire à envoyer à notre équipe pour un devis gratuit.
        </p>
      </div>

      {/* Colonne Droite : Illustration de l'outil */}
      <div className="w-full flex justify-center lg:justify-end">
        <BriefPreviewIllustration />
      </div>

    </section>
  );
}