import { useState } from "react";
import { motion } from "motion/react";
import { UploadCloud } from "lucide-react";
import { StepHeading, FieldLabel, SelectCard } from "@/components/site/Primitives";
import { VISUAL_STYLES, type BriefData } from "@/lib/briefStorage";
import { toast } from "sonner";

interface Step3Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
  setBrief: React.Dispatch<React.SetStateAction<BriefData>>;
}

export function Step3Style({ brief, set, setBrief }: Step3Props) {
  const [dragging, setDragging] = useState(false);

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
  );
}