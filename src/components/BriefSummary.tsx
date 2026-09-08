import { deadlineLabel, logoLabel, projectTypeLabel, styleLabel, type BriefData } from "@/lib/briefStorage";
import { SITE, SITE_LINK } from "@/data/site";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/70 py-3 last:border-0 sm:flex-row sm:gap-6">
      <span className="w-56 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || "-"}</span>
    </div>
  );
}

export function BriefSummary({ brief }: { brief: BriefData }) {
  const specs = Object.entries(brief.technicalSpecs ?? {}).filter(
    ([, v]) => v !== "" && v != null && !(Array.isArray(v) && v.length === 0),
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="bg-gradient-ember px-6 py-6 text-primary-foreground">
        <p className="font-mono text-xs uppercase tracking-[0.22em] opacity-90">
          Staf Print Center • Porto-Novo
        </p>
        <h3 className="mt-2 text-2xl font-semibold">Fiche projet</h3>
        <p className="mt-1 font-mono text-sm opacity-95">
          {brief.id} · {new Date(brief.createdAt).toLocaleDateString("fr-FR")}
        </p>
      </div>
      <div className="px-6 py-2">
        <Row label="Type de projet" value={projectTypeLabel(brief.projectType)} />
        <Row label="Structure" value={brief.companyName} />
        {brief.slogan ? <Row label="Slogan" value={brief.slogan} /> : null}
        <Row label="Secteur d'activité" value={brief.industry} />
        <Row label="Objectifs prioritaires" value={brief.objectives.join(", ")} />
        <Row label="Ambiance visuelle" value={styleLabel(brief.visualStyle)} />
        <Row label="Éléments existants" value={logoLabel(brief.hasLogo)} />
        {brief.logoFileName ? (
          <Row label="Fichier logo transmis" value={brief.logoFileName} />
        ) : null}
        {specs.map(([k, v]) => (
          <Row key={k} label={k} value={Array.isArray(v) ? v.join(", ") : String(v)} />
        ))}
        <Row label="Délai souhaité" value={deadlineLabel(brief.deadline)} />
        <Row
          label="Mode de réception"
          value={
            brief.deliveryMode === "pickup"
              ? "Retrait à Porto-Novo"
              : "Livraison à l'adresse indiquée"
          }
        />
        <Row label="Tranche budgétaire" value={brief.budgetRange ?? ""} />
        {brief.contactName ? <Row label="Contact" value={brief.contactName} /> : null}
        {brief.contactPhone ? <Row label="Téléphone" value={brief.contactPhone} /> : null}
        {brief.notes ? <Row label="Précisions" value={brief.notes} /> : null}
        <Row
          label="CGU"
          value={brief.cguAccepted ? "Acceptées par le client" : "En attente d'acceptation"}
        />
      </div>
    </div>
  );
}
