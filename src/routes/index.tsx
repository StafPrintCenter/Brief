import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site";
import { emptyBrief, getBrief, saveBrief, type BriefData } from "@/lib/briefStorage";
import {
  HeroHeader,
  StepProgressBar,
  CguDialog,
  Step1Project,
  Step2Company,
  Step3Style,
  Step4Technical,
  Step5Logistics,
  Step6Validation,
} from "@/components/pages/home";
import { SITE } from "@/data/site";

const PAGE_TITLE = `SPC Interactive Brief - Qualifiez votre projet en 6 étapes | ${SITE.name}`;
const PAGE_DESC = `Assistant interactif de qualification de projet de ${SITE.name}. Décrivez votre projet d'impression, branding, packaging ou web en 6 étapes simples et recevez un devis gratuit.`;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { resume?: string } =>
    typeof search["resume"] === "string" ? { resume: search["resume"] } : {},
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
    ],
  }),
  component: WizardPage,
});

const STEPS = ["Projet", "Marque", "Style", "Technique", "Logistique", "Validation"];

function WizardPage() {
  const search = Route.useSearch();
  const resume = search.resume;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<BriefData>(() => emptyBrief());
  const [cguOpen, setCguOpen] = useState(false);
  const [cguChecked, setCguChecked] = useState(false);

  useEffect(() => {
    if (!resume) return;
    const existing = getBrief(resume);
    if (existing) {
      setBrief(existing);
      setCguChecked(existing.cguAccepted);
      toast.success(`Brouillon ${existing.id} repris`);
    }
  }, [resume]);

  const set = <K extends keyof BriefData>(key: K, value: BriefData[K]) =>
    setBrief((b) => ({ ...b, [key]: value }));

  const setSpec = (key: string, value: unknown) =>
    setBrief((b) => ({ ...b, technicalSpecs: { ...b.technicalSpecs, [key]: value } }));

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const toggleSpecArray = (key: string, value: string) => {
    const current: string[] = Array.isArray(brief.technicalSpecs[key])
      ? (brief.technicalSpecs[key] as string[])
      : [];
    setSpec(key, toggleInArray(current, value));
  };

  const specArray = (key: string): string[] =>
    Array.isArray(brief.technicalSpecs[key]) ? (brief.technicalSpecs[key] as string[]) : [];

  const canContinue = useMemo(() => {
    switch (step) {
      case 1:
        return Boolean(brief.projectType);
      case 2:
        return brief.companyName.trim().length > 1 && Boolean(brief.industry);
      case 3:
        return Boolean(brief.visualStyle);
      case 4:
        return true;
      case 5:
        return Boolean(brief.deadline && brief.deliveryMode);
      default:
        return true;
    }
  }, [step, brief]);

  const saveDraft = () => {
    saveBrief({ ...brief, status: "draft" });
    toast.success("Brouillon enregistré sur cet appareil");
  };

  const confirmBrief = () => {
    const finalBrief: BriefData = { ...brief, cguAccepted: true, status: "completed" };
    saveBrief(finalBrief);
    setCguOpen(false);
    toast.success(`Brief ${finalBrief.id} validé`);
    navigate({ to: "/summary/$briefId", params: { briefId: finalBrief.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteShell>
        <main className="mx-auto w-full max-w-5xl px-4">
          <HeroHeader />

          <StepProgressBar steps={STEPS} currentStep={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              {step === 1 && <Step1Project brief={brief} set={set} />}

              {step === 2 && (
                <Step2Company brief={brief} set={set} toggleInArray={toggleInArray} />
              )}

              {step === 3 && (
                <Step3Style brief={brief} set={set} setBrief={setBrief} />
              )}

              {step === 4 && (
                <Step4Technical
                  brief={brief}
                  set={set}
                  setSpec={setSpec}
                  toggleSpecArray={toggleSpecArray}
                  specArray={specArray}
                />
              )}

              {step === 5 && <Step5Logistics brief={brief} set={set} />}

              {step === 6 && (
                <Step6Validation
                  brief={brief}
                  onValidate={() => setCguOpen(true)}
                  onSaveDraft={saveDraft}
                />
              )}

              {/* Navigation de bas de formulaire */}
              <div className="no-print mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                >
                  <ArrowLeft className="size-4" />
                  Retour
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={saveDraft} className="hidden sm:inline-flex">
                    Sauvegarder
                  </Button>
                  {step < 6 && (
                    <Button
                      className="bg-gradient-ember"
                      onClick={() => setStep((s) => Math.min(6, s + 1))}
                      disabled={!canContinue}
                    >
                      Continuer
                      <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </SiteShell>

      <CguDialog
        open={cguOpen}
        onOpenChange={setCguOpen}
        checked={cguChecked}
        onCheckedChange={setCguChecked}
        onConfirm={confirmBrief}
      />
    </div>
  );
}