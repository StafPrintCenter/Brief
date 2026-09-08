import { StepHeading, FieldLabel, SelectCard } from "@/components/site/PrimitivesTemp";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PRINT_SUPPORTS,
  FINISHES,
  BRANDING_DELIVERABLES,
  PACKAGING_ITEMS,
  WEB_NEEDS,
  type BriefData
} from "@/lib/briefStorage";

interface Step4Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
  setSpec: (key: string, value: unknown) => void;
  toggleSpecArray: (key: string, value: string) => void;
  specArray: (key: string) => string[];
}

export function Step4Technical({
  brief,
  set,
  setSpec,
  toggleSpecArray,
  specArray
}: Step4Props) {
  return (
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
  );
}