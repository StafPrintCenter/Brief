import { StepHeading, FieldLabel, SelectCard } from "@/components/site/Primitives";
import { VISUAL_STYLES, briefColors, type BriefData } from "@/lib/briefStorage";
import { ColorPalettePicker, FileDropzone } from "@/components/site";

interface Step3Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
  setBrief: React.Dispatch<React.SetStateAction<BriefData>>;
}

export function Step3Style({ brief, set, setBrief }: Step3Props) {

  return (
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

      <FileDropzone
        brief={brief}
        onChange={(patch) => setBrief((b) => ({ ...b, ...patch }))}
      />

      <div className="mt-8">
        <FieldLabel tip="Choisissez une palette signature ou composez la vôtre avec des codes couleur.">
          Palette chromatique & moodboard
        </FieldLabel>
        <ColorPalettePicker
          colors={briefColors(brief)}
          paletteName={brief.technicalSpecs["Palette"]}
          onChange={(colors, name) =>
            setBrief((b) => ({
              ...b,
              technicalSpecs: {
                ...b.technicalSpecs,
                colors,
                Palette: name ?? (colors.length ? "Personnalisée" : ""),
              },
            }))
          }
        />
      </div>
    </>
  );
}