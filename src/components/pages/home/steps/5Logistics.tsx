import { MapPin, Truck } from "lucide-react";
import { StepHeading, FieldLabel, SelectCard } from "@/components/site/Primitives";
import { Input } from "@/components/ui/input";
import { DEADLINES, BUDGETS, type BriefData } from "@/lib/briefStorage";

interface Step5Props {
  brief: BriefData;
  set: <K extends keyof BriefData>(key: K, value: BriefData[K]) => void;
}

export function Step5Logistics({ brief, set }: Step5Props) {
  return (
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
  );
}