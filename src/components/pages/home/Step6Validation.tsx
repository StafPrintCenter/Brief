import { CheckCircle2 } from "lucide-react";
import { StepHeading } from "@/components/brief/primitives";
import { BriefSummary } from "@/components/BriefSummary";
import { Button } from "@/components/ui/button";
import type { BriefData } from "@/lib/briefStorage";

interface Step6Props {
  brief: BriefData;
  onValidate: () => void;
  onSaveDraft: () => void;
}

export function Step6Validation({ brief, onValidate, onSaveDraft }: Step6Props) {
  return (
    <>
      <StepHeading
        step={6}
        title="Vérifiez et validez votre brief"
        subtitle="Relisez la fiche projet. Une fois validée, elle est enregistrée sur cet appareil avec un numéro unique."
      />
      <BriefSummary brief={brief} />
      <div className="mt-6 flex flex-wrap gap-3">
        <Button size="lg" className="bg-gradient-ember" onClick={onValidate}>
          <CheckCircle2 className="size-4" />
          Valider mon brief
        </Button>
        <Button size="lg" variant="outline" onClick={onSaveDraft}>
          Enregistrer comme brouillon
        </Button>
      </div>
    </>
  );
}