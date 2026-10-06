import { FileText } from "lucide-react";

import { ColorSwatches } from "@/components/site";
import { briefColors, deadlineLabel, logoLabel, projectTypeLabel, styleLabel, visibleSpecs, type BriefData } from "@/lib/briefStorage";
import { ESTIMATE_NOTICE, calculateEstimate, formatFcfa } from "@/lib/estimate";
import { SITE } from "@/data/site";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:gap-6">
      <span className="w-56 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{children || "-"}</span>
    </div>
  );
}

export function BriefSummary({ brief }: { brief: BriefData }) {
  const specs = visibleSpecs(brief);
  const colors = briefColors(brief);
  const est = calculateEstimate(brief);

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between gap-4 bg-gradient-ember px-6 py-6 text-primary-foreground">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-90">
            {SITE.name} • {SITE.tool}
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Fiche projet</h3>
          <p className="mt-1 font-mono text-sm opacity-95">
            {brief.id} · {new Date(brief.createdAt).toLocaleDateString("fr-FR")}
          </p>
        </div>
        {brief.logoPreviewData ? (
          <img
            src={brief.logoPreviewData}
            alt="Logo du client"
            className="size-16 shrink-0 rounded-xl bg-background object-contain p-1.5"
          />
        ) : null}
      </div>

      <div className="border-b border-border bg-accent/40 px-6 py-4">
        <p className="text-xs text-muted-foreground">Estimation indicative</p>
        <p className="text-xl font-semibold text-foreground">
          {formatFcfa(est.low)} – {formatFcfa(est.high)}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{ESTIMATE_NOTICE}</p>
      </div>

      <div className="px-6 py-2">
        <Row label="Type de projet">{projectTypeLabel(brief.projectType)}</Row>
        <Row label="Structure">{brief.companyName}</Row>
        {brief.slogan ? <Row label="Slogan">{brief.slogan}</Row> : null}
        <Row label="Secteur d'activité">{brief.industry}</Row>
        <Row label="Objectifs prioritaires">{brief.objectives.join(", ")}</Row>
        <Row label="Ambiance visuelle">{styleLabel(brief.visualStyle)}</Row>
        {colors.length ? (
          <Row label="Couleurs">
            <ColorSwatches colors={colors} />
          </Row>
        ) : null}
        <Row label="Éléments existants">{logoLabel(brief.hasLogo)}</Row>
        {brief.logoFileName ? (
          <Row label="Fichier transmis">
            <span className="inline-flex items-center gap-2">
              {brief.logoPreviewData ? (
                <img
                  src={brief.logoPreviewData}
                  alt=""
                  className="size-10 rounded border border-border object-contain"
                />
              ) : (
                <FileText className="size-4 text-primary" />
              )}
              {brief.referenceFileData ? (
                <a
                  href={brief.referenceFileData}
                  download={brief.logoFileName}
                  className="text-primary underline underline-offset-4"
                >
                  {brief.logoFileName}
                </a>
              ) : (
                brief.logoFileName
              )}
            </span>
          </Row>
        ) : null}
        {specs.map(([k, v]) => (
          <Row key={k} label={k}>
            {Array.isArray(v) ? v.join(", ") : String(v)}
          </Row>
        ))}
        <Row label="Délai souhaité">{deadlineLabel(brief.deadline)}</Row>
        <Row label="Mode de réception">
          {brief.deliveryMode === "pickup"
            ? "Retrait à Porto-Novo"
            : "Livraison à l'adresse indiquée"}
        </Row>
        <Row label="Tranche budgétaire">{brief.budgetRange ?? ""}</Row>
        {brief.contactName ? <Row label="Contact">{brief.contactName}</Row> : null}
        {brief.contactPhone ? <Row label="Téléphone">{brief.contactPhone}</Row> : null}
        {brief.notes ? <Row label="Précisions">{brief.notes}</Row> : null}
        <Row label="CGU">
          {brief.cguAccepted ? "Acceptées par le client" : "En attente d'acceptation"}
        </Row>
      </div>
    </div>
  );
}
