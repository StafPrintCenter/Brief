import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  step: number;
  canContinue: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

export function StepNavigation({
  step,
  canContinue,
  onPrev,
  onNext,
  onSaveDraft,
}: StepNavigationProps) {
  return (
    <div className="no-print mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
      <Button
        variant="ghost"
        onClick={onPrev}
        disabled={step === 1}
      >
        <ArrowLeft className="size-4" />
        Retour
      </Button>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          className="hidden sm:inline-flex"
        >
          Sauvegarder
        </Button>
        {step < 6 && (
          <Button
            className="bg-gradient-ember"
            onClick={onNext}
            disabled={!canContinue}
          >
            Continuer
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}