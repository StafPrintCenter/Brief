import type { BriefData } from "@/lib/briefStorage";

export interface Estimate {
  low: number;
  high: number;
}

export const ESTIMATE_NOTICE =
  "Estimation indicative en FCFA — devis ferme validé sous 24h par l'équipe commerciale";

type Range = [number, number];

const PRINT_SUPPORT: Record<string, Range> = {
  "Cartes de visite": [10000, 30000],
  "Flyers & dépliants": [20000, 60000],
  Affiches: [15000, 50000],
  "Bâches & banderoles": [25000, 90000],
  "Enseigne / Panneau": [80000, 350000],
  "Kakémono / Roll-up": [35000, 75000],
  "Brochures & catalogues": [60000, 250000],
  "Blocs & papeterie": [20000, 70000],
};

const FINISH_FACTOR: Record<string, number> = {
  "Finition mate": 0.05,
  "Finition brillante": 0.05,
  Pelliculage: 0.15,
  "Vernis sélectif": 0.25,
  "Dorure à chaud": 0.4,
  Gaufrage: 0.3,
};

const BRANDING: Record<string, Range> = {
  "Création de logo": [75000, 250000],
  "Refonte de logo": [60000, 200000],
  "Charte graphique complète": [150000, 500000],
  "Déclinaisons papeterie": [40000, 120000],
  "Habillage réseaux sociaux": [35000, 100000],
  "Nom de marque / baseline": [50000, 150000],
};

const PACKAGING: Record<string, Range> = {
  "Étiquettes produits": [25000, 80000],
  "Boîtes & emballages": [60000, 220000],
  "Sachets / Sacs": [40000, 150000],
  "Tee-shirts & textiles": [50000, 180000],
  "Mugs & gourdes": [40000, 140000],
  "Stylos & carnets": [25000, 90000],
  Casquettes: [40000, 140000],
};

const WEB: Record<string, Range> = {
  "Site vitrine": [250000, 600000],
  "Boutique en ligne": [600000, 1500000],
  "Application web": [1000000, 3000000],
  "Landing page événement": [120000, 300000],
  "Refonte de site existant": [200000, 500000],
  "Référencement / SEO": [80000, 250000],
  "Hébergement & nom de domaine": [30000, 80000],
};

const DEFAULT_BY_TYPE: Record<BriefData["projectType"], Range> = {
  print: [25000, 80000],
  branding: [100000, 300000],
  packaging: [50000, 150000],
  web: [250000, 600000],
};

function arr(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}

function parseQty(v: unknown): number {
  const m = String(v ?? "").replace(/\s/g, "").match(/\d+/);
  return m ? Number(m[0]) : 0;
}

function qtyMultiplier(q: number, base: number) {
  if (!q) return 1;
  return Math.max(1, Math.pow(q / base, 0.6));
}

function sumRanges(items: string[], table: Record<string, Range>): Range {
  return items.reduce<Range>(
    (acc, k) => {
      const r = table[k];
      return r ? [acc[0] + r[0], acc[1] + r[1]] : acc;
    },
    [0, 0],
  );
}

const round = (n: number) => Math.round(n / 5000) * 5000;

export function calculateEstimate(brief: BriefData): Estimate {
  const s = brief.technicalSpecs ?? {};
  let [low, high] = [0, 0];

  switch (brief.projectType) {
    case "print": {
      [low, high] = sumRanges(arr(s["Supports"]), PRINT_SUPPORT);
      const mult = qtyMultiplier(parseQty(s["Quantité"]), 250);
      low *= mult;
      high *= mult;
      const f = arr(s["Finitions"]).reduce((a, k) => a + (FINISH_FACTOR[k] ?? 0), 0);
      low *= 1 + f;
      high *= 1 + f;
      break;
    }
    case "branding":
      [low, high] = sumRanges(arr(s["Livrables"]), BRANDING);
      break;
    case "packaging": {
      [low, high] = sumRanges(arr(s["Articles"]), PACKAGING);
      const mult = qtyMultiplier(parseQty(s["Quantité"]), 100);
      low *= mult;
      high *= mult;
      break;
    }
    case "web": {
      [low, high] = sumRanges(arr(s["Besoins"]), WEB);
      const pages = parseQty(s["Pages"]);
      if (pages > 5) {
        low += (pages - 5) * 15000;
        high += (pages - 5) * 35000;
      }
      break;
    }
  }

  if (!low && !high) [low, high] = DEFAULT_BY_TYPE[brief.projectType];

  if (brief.hasLogo === "none" && brief.projectType !== "branding") {
    low += 40000;
    high += 120000;
  }

  const deadlineFactor =
    brief.deadline === "urgent" ? 1.3 : brief.deadline === "planned" ? 0.95 : 1;
  low *= deadlineFactor;
  high *= deadlineFactor;

  return { low: round(low), high: round(Math.max(high, low)) };
}

export function formatFcfa(n: number) {
  return `${new Intl.NumberFormat("fr-FR").format(n).replace(/\u202f|\u00a0/g, " ")} FCFA`;
}

export function estimateLabel(brief: BriefData) {
  const e = calculateEstimate(brief);
  return `${formatFcfa(e.low)} – ${formatFcfa(e.high)}`;
}
