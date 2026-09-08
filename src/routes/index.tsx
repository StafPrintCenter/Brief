import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Truck, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site";
import { BriefSummary } from "@/components/BriefSummary";
import { FieldLabel, SelectCard, StepHeading } from "@/components/brief/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  BRANDING_DELIVERABLES, BUDGETS, DEADLINES, FINISHES, INDUSTRIES, OBJECTIVES, PACKAGING_ITEMS, PRINT_SUPPORTS,
  PROJECT_TYPES, VISUAL_STYLES, WEB_NEEDS, emptyBrief, getBrief, saveBrief, type BriefData
} from "@/lib/briefStorage";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { resume?: string } =>
    typeof search["resume"] === "string" ? { resume: search["resume"] } : {},
  head: () => ({
    meta: [
      { title: "SPC Interactive Brief — Qualifiez votre projet en 6 étapes" },
      {
        name: "description",
        content:
          "Assistant interactif STAF PRINT CENTER (Porto-Novo) : décrivez votre projet d'impression, branding, packaging ou web en 6 étapes simples et recevez un devis gratuit.",
      },
      { property: "og:title", content: "SPC Interactive Brief — STAF PRINT CENTER" },
      {
        property: "og:description",
        content:
          "Formalisez votre cahier des charges en 6 étapes guidées, sans jargon technique, puis envoyez-le à STAF PRINT CENTER.",
      },
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
  const [dragging, setDragging] = useState(false);

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
      ? brief.technicalSpecs[key]
      : [];
    setSpec(key, toggleInArray(current, value));
  };

  const specArray = (key: string): string[] =>
    Array.isArray(brief.technicalSpecs[key]) ? brief.technicalSpecs[key] : [];

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

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setBrief((b) => ({ ...b, hasLogo: "hd", logoFileName: file.name }));
      toast.success(`Logo « ${file.name} » ajouté au brief`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteShell>

        <main className="mx-auto w-full max-w-5xl px-4 pb-8 pt-10">
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

          {/* Progression */}
          <div className="no-print mb-8">
            <div className="flex items-center gap-2">
              {STEPS.map((label, i) => {
                const index = i + 1;
                const done = index < step;
                const active = index === step;
                return (
                  <div key={label} className="flex flex-1 flex-col gap-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                      <motion.div
                        initial={false}
                        animate={{ width: done || active ? "100%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="h-full bg-gradient-ember"
                      />
                    </div>
                    <span
                      className={`hidden text-xs sm:block ${active ? "font-semibold text-foreground" : "text-muted-foreground"
                        }`}
                    >
                      {index}. {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
            >
              {step === 1 && (
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
              )}

              {step === 2 && (
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
              )}

              {step === 3 && (
                <>
                  <StepHeading
                    step={3}
                    title="Quelle ambiance vous ressemble ?"
                    subtitle="Fiez-vous à votre instinct : choisissez l'univers dans lequel vous imaginez votre marque."
                  />
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {VISUAL_STYLES.map((s) => (
                      <SelectCard
                        key={s.value}
                        emoji={s.emoji}
                        title={s.label}
                        description={s.desc}
                        selected={brief.visualStyle === s.value}
                        onClick={() => set("visualStyle", s.value)}
                      />
                    ))}
                  </div>

                  <div className="mt-8">
                    <FieldLabel tip="Un fichier « haute définition » est un logo net même très agrandi (formats .ai, .eps, .pdf ou .png de grande taille).">
                      Où en êtes-vous côté logo ?
                    </FieldLabel>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <SelectCard
                        title="J'ai un logo haute définition"
                        selected={brief.hasLogo === "hd"}
                        onClick={() => set("hasLogo", "hd")}
                      />
                      <SelectCard
                        title="J'ai un logo, mais de mauvaise qualité"
                        selected={brief.hasLogo === "low"}
                        onClick={() => set("hasLogo", "low")}
                      />
                      <SelectCard
                        title="Page blanche, tout est à créer"
                        selected={brief.hasLogo === "none"}
                        onClick={() => set("hasLogo", "none")}
                      />
                    </div>
                  </div>

                  {brief.hasLogo === "hd" && (
                    <motion.label
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      className={`mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${dragging ? "border-primary bg-accent/50" : "border-border bg-surface/60"
                        }`}
                    >
                      <UploadCloud className="size-7 text-primary" />
                      <span className="mt-3 text-sm font-medium text-foreground">
                        Glissez votre logo ici, ou cliquez pour le choisir
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        Le fichier reste sur votre appareil : seul son nom est joint au brief.
                      </span>
                      {brief.logoFileName ? (
                        <span className="mt-3 rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                          {brief.logoFileName}
                        </span>
                      ) : null}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) set("logoFileName", f.name);
                        }}
                      />
                    </motion.label>
                  )}
                </>
              )}

              {step === 4 && (
                <>
                  <StepHeading
                    step={4}
                    title="Précisons le côté technique"
                    subtitle="Questions adaptées à votre type de projet. Passez celles dont vous ne connaissez pas la réponse, nous vous conseillerons."
                  />

                  {brief.projectType === "print" && (
                    <div className="space-y-7">
                      <div>
                        <FieldLabel>Supports souhaités</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {PRINT_SUPPORTS.map((s) => (
                            <SelectCard
                              key={s}
                              title={s}
                              selected={specArray("Supports").includes(s)}
                              onClick={() => toggleSpecArray("Supports", s)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel tip="Par exemple 2 m x 1 m pour une bâche, ou A5 pour un flyer.">
                            Dimensions
                          </FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Dimensions"] ?? ""}
                            onChange={(e) => setSpec("Dimensions", e.target.value)}
                            placeholder="Ex : A5, ou 2m x 1m"
                          />
                        </div>
                        <div>
                          <FieldLabel>Quantité</FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Quantité"] ?? ""}
                            onChange={(e) => setSpec("Quantité", e.target.value)}
                            placeholder="Ex : 500 exemplaires"
                          />
                        </div>
                      </div>
                      <div>
                        <FieldLabel>Finitions</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {FINISHES.map((f) => (
                            <div key={f.value} className="flex items-start gap-2">
                              <div className="flex-1">
                                <SelectCard
                                  title={f.label}
                                  description={f.tip}
                                  selected={specArray("Finitions").includes(f.label)}
                                  onClick={() => toggleSpecArray("Finitions", f.label)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {brief.projectType === "branding" && (
                    <div className="space-y-7">
                      <div>
                        <FieldLabel>Livrables attendus</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {BRANDING_DELIVERABLES.map((d) => (
                            <SelectCard
                              key={d}
                              title={d}
                              selected={specArray("Livrables").includes(d)}
                              onClick={() => toggleSpecArray("Livrables", d)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel tip="Couleurs que vous aimez ou que vous refusez absolument.">
                            Couleurs souhaitées / à éviter
                          </FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Couleurs"] ?? ""}
                            onChange={(e) => setSpec("Couleurs", e.target.value)}
                            placeholder="Ex : vert et or, pas de rose"
                          />
                        </div>
                        <div>
                          <FieldLabel>Marques qui vous inspirent</FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Inspirations"] ?? ""}
                            onChange={(e) => setSpec("Inspirations", e.target.value)}
                            placeholder="Ex : Orange, MTN, Nestlé"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {brief.projectType === "packaging" && (
                    <div className="space-y-7">
                      <div>
                        <FieldLabel>Articles à personnaliser</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {PACKAGING_ITEMS.map((d) => (
                            <SelectCard
                              key={d}
                              title={d}
                              selected={specArray("Articles").includes(d)}
                              onClick={() => toggleSpecArray("Articles", d)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Quantité par article</FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Quantité"] ?? ""}
                            onChange={(e) => setSpec("Quantité", e.target.value)}
                            placeholder="Ex : 200 tee-shirts"
                          />
                        </div>
                        <div>
                          <FieldLabel tip="La sérigraphie convient aux grandes séries, le flocage aux petites quantités, l'impression numérique aux visuels très détaillés.">
                            Technique de marquage
                          </FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Marquage"] ?? ""}
                            onChange={(e) => setSpec("Marquage", e.target.value)}
                            placeholder="Ex : sérigraphie, flocage, je ne sais pas"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {brief.projectType === "web" && (
                    <div className="space-y-7">
                      <div>
                        <FieldLabel>Besoins digitaux</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {WEB_NEEDS.map((d) => (
                            <SelectCard
                              key={d}
                              title={d}
                              selected={specArray("Besoins").includes(d)}
                              onClick={() => toggleSpecArray("Besoins", d)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Nombre de pages estimé</FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Pages"] ?? ""}
                            onChange={(e) => setSpec("Pages", e.target.value)}
                            placeholder="Ex : 5 pages"
                          />
                        </div>
                        <div>
                          <FieldLabel tip="Un nom de domaine est l'adresse de votre site, par exemple monentreprise.com.">
                            Nom de domaine souhaité
                          </FieldLabel>
                          <Input
                            value={brief.technicalSpecs["Nom de domaine"] ?? ""}
                            onChange={(e) => setSpec("Nom de domaine", e.target.value)}
                            placeholder="Ex : monentreprise.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-7">
                    <FieldLabel>Précisions libres</FieldLabel>
                    <Textarea
                      value={brief.notes ?? ""}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Tout ce qui nous aiderait à mieux comprendre votre projet…"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <StepHeading
                    step={5}
                    title="Délais, budget et réception"
                    subtitle="Ces éléments nous permettent de vous proposer la solution la plus réaliste."
                  />
                  <div>
                    <FieldLabel>Délai souhaité</FieldLabel>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {DEADLINES.map((d) => (
                        <SelectCard
                          key={d.value}
                          title={d.label}
                          description={d.desc}
                          selected={brief.deadline === d.value}
                          onClick={() => set("deadline", d.value)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <FieldLabel>Mode de réception</FieldLabel>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => set("deliveryMode", "pickup")}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${brief.deliveryMode === "pickup"
                          ? "border-primary bg-accent/60"
                          : "border-border hover:border-primary/50"
                          }`}
                      >
                        <MapPin className="size-5 text-primary" />
                        <span>
                          <span className="block font-medium">Retrait à Porto-Novo</span>
                          <span className="text-sm text-muted-foreground">
                            Dans nos locaux, aux heures d'ouverture
                          </span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => set("deliveryMode", "delivery")}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${brief.deliveryMode === "delivery"
                          ? "border-primary bg-accent/60"
                          : "border-border hover:border-primary/50"
                          }`}
                      >
                        <Truck className="size-5 text-primary" />
                        <span>
                          <span className="block font-medium">Livraison</span>
                          <span className="text-sm text-muted-foreground">
                            À l'adresse de votre choix (frais selon la zone)
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-7">
                    <FieldLabel tip="Une simple fourchette suffit : elle nous aide à calibrer la proposition, sans engagement.">
                      Tranche budgétaire indicative
                    </FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => set("budgetRange", b)}
                          className={`rounded-full border px-4 py-2 text-sm transition-colors ${brief.budgetRange === b
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                            }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <FieldLabel>Votre nom</FieldLabel>
                      <Input
                        value={brief.contactName ?? ""}
                        onChange={(e) => set("contactName", e.target.value)}
                        placeholder="Ex : Michel Afovo"
                      />
                    </div>
                    <div>
                      <FieldLabel>Téléphone / WhatsApp</FieldLabel>
                      <Input
                        value={brief.contactPhone ?? ""}
                        onChange={(e) => set("contactPhone", e.target.value)}
                        placeholder="Ex : +229 97 00 00 00"
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <StepHeading
                    step={6}
                    title="Vérifiez et validez votre brief"
                    subtitle="Relisez la fiche projet. Une fois validée, elle est enregistrée sur cet appareil avec un numéro unique."
                  />
                  <BriefSummary brief={brief} />
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      className="bg-gradient-ember"
                      onClick={() => setCguOpen(true)}
                    >
                      <CheckCircle2 className="size-4" />
                      Valider mon brief
                    </Button>
                    <Button size="lg" variant="outline" onClick={saveDraft}>
                      Enregistrer comme brouillon
                    </Button>
                  </div>
                </>
              )}

              {/* Navigation */}
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

      <Dialog open={cguOpen} onOpenChange={setCguOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
            <DialogDescription>
              Avant l'envoi de votre brief à STAF PRINT CENTER, merci de valider les points
              suivants.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              Vos données servent uniquement à traiter votre demande et ne sont jamais
              revendues.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              Le devis établi à partir de ce brief est gratuit et sans engagement.
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              Les créations restent la propriété de STAF PRINT CENTER jusqu'au règlement
              intégral.
            </li>
          </ul>
          <label className="mt-2 flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4">
            <Checkbox
              checked={cguChecked}
              onCheckedChange={(v) => setCguChecked(v === true)}
              className="mt-0.5"
            />
            <span className="text-sm text-foreground">
              J'accepte les Conditions Générales d'Utilisation de STAF PRINT CENTER.{" "}
              <Link
                to="/cgu"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline underline-offset-4"
              >
                Lire les CGU
              </Link>
            </span>
          </label>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCguOpen(false)}>
              Annuler
            </Button>
            <Button
              disabled={!cguChecked}
              className="bg-gradient-ember"
              onClick={confirmBrief}
            >
              Confirmer et générer ma fiche
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div >
  );
}
