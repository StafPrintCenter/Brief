import { motion } from "motion/react";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

import { Calculator, FileText, Plus, UploadCloud, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { COLOR_PALETTES, type BriefData } from "@/lib/briefStorage";
import { ESTIMATE_NOTICE, calculateEstimate, formatFcfa } from "@/lib/estimate";

/* ---------- Estimation ---------- */

export function EstimateCard({ brief, compact }: { brief: BriefData; compact?: boolean }) {
  const e = calculateEstimate(brief);
  return (
    <div className="rounded-2xl border border-primary/30 bg-accent/40 p-4">
      <div className="flex items-center gap-2 text-primary">
        <Calculator className="size-4" />
        <span className="font-mono text-xs uppercase tracking-[0.2em]">
          Estimation en direct
        </span>
      </div>
      <motion.p
        key={`${e.low}-${e.high}`}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-2 font-semibold text-foreground ${compact ? "text-lg" : "text-2xl"}`}
      >
        {formatFcfa(e.low)} <span className="text-muted-foreground">–</span>{" "}
        {formatFcfa(e.high)}
      </motion.p>
      <p className="mt-1 text-xs text-muted-foreground">{ESTIMATE_NOTICE}</p>
    </div>
  );
}

/* ---------- Palette ---------- */

const HEX = /^#[0-9a-fA-F]{6}$/;

export function ColorPalettePicker({
  colors,
  paletteName,
  onChange,
}: {
  colors: string[];
  paletteName?: string;
  onChange: (colors: string[], paletteName?: string) => void;
}) {
  const [hex, setHex] = useState("#D65A1F");

  const add = (c: string) => {
    const v = c.toUpperCase();
    if (!HEX.test(v)) { toast.error("Code HEX invalide (ex : #D65A1F)"); return; }
    if (colors.includes(v)) return;
    if (colors.length >= 8) { toast.error("8 couleurs maximum"); return; }
    onChange([...colors, v], undefined);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COLOR_PALETTES.map((p) => {
          const selected = paletteName === p.name;
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => onChange(p.colors, p.name)}
              className={`cursor-pointer rounded-2xl border p-3 text-left transition-colors ${selected ? "border-primary bg-accent/60" : "border-border hover:border-primary/50"
                }`}
            >
              <div className="flex overflow-hidden rounded-lg border border-border">
                {p.colors.map((c) => (
                  <span key={c} className="h-10 flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="mt-2 block text-sm font-medium text-foreground">{p.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          type="color"
          value={HEX.test(hex) ? hex : "#000000"}
          onChange={(e) => setHex(e.target.value.toUpperCase())}
          className="h-10 w-12 cursor-pointer rounded-md border border-border bg-card"
          aria-label="Choisir une couleur"
        />
        <Input
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="w-32 font-mono"
          placeholder="#D65A1F"
        />
        <button
          type="button"
          onClick={() => add(hex)}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border px-3 py-2 text-sm hover:border-primary/50"
        >
          <Plus className="size-4" /> Ajouter
        </button>
      </div>

      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2 font-mono text-xs"
            >
              <span className="size-5 rounded-full border border-border" style={{ backgroundColor: c }} />
              {c}
              <button
                type="button"
                aria-label={`Retirer ${c}`}
                onClick={() => onChange(colors.filter((x) => x !== c), undefined)}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ColorSwatches({ colors }: { colors: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <span key={c} className="inline-flex items-center gap-1.5 font-mono text-xs">
          <span className="size-5 rounded-full border border-border" style={{ backgroundColor: c }} />
          {c}
        </span>
      ))}
    </div>
  );
}

/* ---------- Upload ---------- */

const MAX_SIZE = 5 * 1024 * 1024;
const ACCEPT = "image/png,image/jpeg,image/svg+xml,image/webp,application/pdf";

function readAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

/** Convertit une image (y compris SVG) en miniature PNG ≤ 400px, compatible jsPDF. */
function toPngThumb(dataUrl: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const max = 400;
      const w = img.naturalWidth || max;
      const h = img.naturalHeight || max;
      const ratio = Math.min(1, max / Math.max(w, h));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(w * ratio));
      canvas.height = Math.max(1, Math.round(h * ratio));
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

export function FileDropzone({
  brief,
  onChange,
}: {
  brief: BriefData;
  onChange: (patch: Partial<BriefData>) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const handle = async (file?: File) => {
    if (!file) return;
    if (!ACCEPT.split(",").includes(file.type)) {
      toast.error("Format non pris en charge (PNG, JPG, SVG, WebP ou PDF)");
      return;
    }
    if (file.size > MAX_SIZE) { toast.error("Fichier trop lourd (5 Mo maximum)"); return; }
    try {
      const data = await readAsDataUrl(file);
      const isImage = file.type.startsWith("image/");
      onChange({
        logoFileName: file.name,
        referenceFileType: file.type,
        referenceFileData: isImage ? undefined : data,
        logoPreviewData: isImage ? await toPngThumb(data) : undefined,
      });
      toast.success(`« ${file.name} » ajouté au brief`);
    } catch {
      toast.error("Impossible de lire ce fichier");
    }
  };

  const clear = () =>
    onChange({
      logoFileName: undefined,
      logoPreviewData: undefined,
      referenceFileData: undefined,
      referenceFileType: undefined,
    });

  return (
    <div className="mt-6">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handle(e.dataTransfer.files?.[0]);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${dragging ? "border-primary bg-accent/50" : "border-border bg-surface/60"
          }`}
      >
        <UploadCloud className="size-7 text-primary" />
        <span className="mt-3 text-sm font-medium text-foreground">
          Glissez votre logo ou un fichier de référence, ou cliquez pour le choisir
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          PNG, JPG, SVG, WebP ou PDF — 5 Mo maximum
        </span>
        <input
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => void handle(e.target.files?.[0])}
        />
      </label>

      {brief.logoFileName && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          {brief.logoPreviewData ? (
            <img
              src={brief.logoPreviewData}
              alt="Aperçu du fichier déposé"
              className="size-14 rounded-lg border border-border bg-background object-contain"
            />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-lg border border-border bg-surface">
              <FileText className="size-6 text-primary" />
            </span>
          )}
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
            {brief.logoFileName}
          </span>
          <button
            type="button"
            onClick={clear}
            aria-label="Retirer le fichier"
            className="cursor-pointer rounded-full p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- QR Code ---------- */

export function briefUrl(id: string) {
  return `${window.location.origin}/summary/${id}`;
}

export function BriefQrCode({ id }: { id: string }) {
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    QRCode.toDataURL(briefUrl(id), { margin: 1, width: 240 }).then(setSrc).catch(() => { });
  }, [id]);
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-background p-3">
      {src ? (
        <img src={src} alt={`QR code du brief ${id}`} className="size-36" />
      ) : (
        <div className="size-36 animate-pulse rounded bg-surface" />
      )}
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Scannez pour retrouver ce brief
      </p>
    </div>
  );
}
