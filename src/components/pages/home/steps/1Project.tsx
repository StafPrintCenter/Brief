import { StepHeading, SelectCard } from "@/components/site/Primitives";
import { PROJECT_TYPES, type BriefData } from "@/lib/briefStorage";

interface Step1Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
}

export function Step1Project({ brief, set }: Step1Props) {
  return (
    <>
      <StepHeading
        step={1}
        title="Quel type de projet préparez-vous ?"
        subtitle="Choisissez la famille la plus proche de votre besoin. Les questions suivantes s'adapteront automatiquement."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECT_TYPES.map((p) => (
          <SelectCard
            key={p.value}
            emoji={p.emoji}
            title={p.label}
            description={p.desc}
            selected={brief.projectType === p.value}
            onClick={() => set("projectType", p.value)}
          />
        ))}
      </div>
    </>
  );
}