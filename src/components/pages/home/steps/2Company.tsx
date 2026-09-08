import { StepHeading, FieldLabel, SelectCard } from "@/components/site/Primitives";
import { Input } from "@/components/ui/input";
import { INDUSTRIES, OBJECTIVES, type BriefData } from "@/lib/briefStorage";

interface Step2Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
  toggleInArray: (arr: string[], value: string) => string[];
}

export function Step2Company({ brief, set, toggleInArray }: Step2Props) {
  return (
    <>
      <StepHeading
        step={2}
        title="Parlez-nous de votre structure"
        subtitle="Ces informations nous permettent d'adapter le ton et le contenu de vos supports."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Nom de la structure</FieldLabel>
          <Input
            value={brief.companyName}
            onChange={(e) => set("companyName", e.target.value)}
            placeholder="Ex : Résidence Les Palmiers"
          />
        </div>
        <div>
          <FieldLabel tip="Une phrase courte qui résume votre promesse. Laissez vide si vous n'en avez pas encore.">
            Slogan (facultatif)
          </FieldLabel>
          <Input
            value={brief.slogan ?? ""}
            onChange={(e) => set("slogan", e.target.value)}
            placeholder="Ex : Bâtir la confiance"
          />
        </div>
      </div>

      <div className="mt-7">
        <FieldLabel>Domaine d'activité</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => set("industry", i)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${brief.industry === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <FieldLabel tip="Plusieurs choix possibles : cela nous aide à hiérarchiser les messages.">
          Objectifs prioritaires
        </FieldLabel>
        <div className="grid gap-3 sm:grid-cols-2">
          {OBJECTIVES.map((o) => (
            <SelectCard
              key={o}
              title={o}
              selected={brief.objectives.includes(o)}
              onClick={() => set("objectives", toggleInArray(brief.objectives, o))}
            />
          ))}
        </div>
      </div>
    </>
  );
}