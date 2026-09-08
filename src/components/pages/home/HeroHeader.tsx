export function HeroHeader() {
  return (
    <section className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
        brief.stafprint.com
      </p>
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