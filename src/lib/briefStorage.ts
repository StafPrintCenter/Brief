import { SITE, SITE_LINK } from "@/data/site";
import { estimateLabel } from "@/lib/estimate";

export type ProjectType = "print" | "branding" | "packaging" | "web";

export interface BriefData {
  id: string; // Ex: "SPC-2026-8940"
  createdAt: string;
  updatedAt?: string;
  projectType: ProjectType;
  companyName: string;
  slogan?: string;
  industry: string;
  objectives: string[];
  visualStyle: string;
  hasLogo: "hd" | "low" | "none";
  logoFileName?: string | undefined;
  logoPreviewData?: string | undefined;
  referenceFileData?: string | undefined;
  referenceFileType?: string | undefined;
  technicalSpecs: Record<string, any>;
  deadline: "urgent" | "standard" | "planned";
  deliveryMode: "pickup" | "delivery";
  budgetRange?: string;
  contactName?: string;
  contactPhone?: string;
  notes?: string;
  cguAccepted: boolean;
  status: "draft" | "completed";
}

const STORAGE_KEY = "spc_briefs_v1";

export const emptyBrief = (): BriefData => ({
  id: generateBriefId(),
  createdAt: new Date().toISOString(),
  projectType: "print",
  companyName: "",
  slogan: "",
  industry: "",
  objectives: [],
  visualStyle: "",
  hasLogo: "none",
  technicalSpecs: {},
  deadline: "standard",
  deliveryMode: "pickup",
  budgetRange: "",
  cguAccepted: false,
  status: "draft",
});

export function generateBriefId(): string {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `SPC-${year}-${n}`;
}

export function getBriefs(): BriefData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BriefData[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getBrief(id: string): BriefData | undefined {
  return getBriefs().find((b) => b.id === id);
}

export function saveBrief(brief: BriefData): BriefData {
  if (typeof window === "undefined") return brief;
  const all = getBriefs();
  const next: BriefData = { ...brief, updatedAt: new Date().toISOString() };
  const idx = all.findIndex((b) => b.id === brief.id);
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Espace local saturé : on retire le fichier de référence lourd et on réessaie
    const light = { ...next, referenceFileData: undefined };
    all[all.findIndex((b) => b.id === next.id)] = light;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return light;
  }
  return next;
}

export function duplicateBrief(id: string): BriefData | undefined {
  const src = getBrief(id);
  if (!src) return undefined;
  const now = new Date().toISOString();
  const copy: BriefData = {
    ...structuredClone(src),
    id: generateBriefId(),
    createdAt: now,
    companyName: src.companyName.startsWith("(Copie)")
      ? src.companyName
      : `(Copie) ${src.companyName}`,
    status: "draft",
    cguAccepted: false,
  };
  return saveBrief(copy);
}

export const COLOR_PALETTES: { name: string; colors: string[] }[] = [
  { name: "Corporate & Confiance", colors: ["#0D47A1", "#1976D2", "#FFFFFF"] },
  { name: "Luxe & Prestige", colors: ["#111111", "#D4AF37", "#FFFFFF"] },
  { name: "Éco & Nature", colors: ["#2E7D32", "#8D6E63", "#F5F5DC"] },
  { name: "Créatif & Dynamique", colors: ["#FF6D00", "#6200EA", "#00B0FF"] },
  { name: "Afro-Contemporain", colors: ["#E65100", "#3E2723", "#FFD54F"] },
];

/** Clés de technicalSpecs affichées de façon spécifique (pas dans la liste générique). */
export const HIDDEN_SPEC_KEYS = ["colors"];

export function briefColors(brief: BriefData): string[] {
  const c = brief.technicalSpecs?.["colors"];
  return Array.isArray(c) ? c : [];
}

export function visibleSpecs(brief: BriefData): [string, unknown][] {
  return Object.entries(brief.technicalSpecs ?? {}).filter(
    ([k, v]) =>
      !HIDDEN_SPEC_KEYS.includes(k) &&
      v !== "" &&
      v != null &&
      !(Array.isArray(v) && v.length === 0),
  );
}

export function deleteBrief(id: string) {
  if (typeof window === "undefined") return;
  const all = getBriefs().filter((b) => b.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/* ---------- Libellés ---------- */

export const PROJECT_TYPES: {
  value: ProjectType;
  emoji: string;
  label: string;
  desc: string;
}[] = [
    {
      value: "print",
      emoji: "🖨️",
      label: "Imprimerie & Signalétique",
      desc: "Flyers, affiches, bâches, enseignes, cartes de visite",
    },
    {
      value: "branding",
      emoji: "🎨",
      label: "Identité Visuelle & Branding",
      desc: "Logo, charte graphique, refonte de marque",
    },
    {
      value: "packaging",
      emoji: "📦",
      label: "Packaging & Objets Publicitaires",
      desc: "Étiquettes, boîtes, tee-shirts, gadgets",
    },
    {
      value: "web",
      emoji: "🌐",
      label: "Web & Solution Digitale",
      desc: "Site vitrine, e-commerce, application",
    },
  ];

export const INDUSTRIES = [
  "BTP & Immobilier",
  "Restauration & Hôtellerie",
  "Santé & Pharmacie",
  "Éducation & Formation",
  "Commerce & Distribution",
  "Agroalimentaire",
  "Transport & Logistique",
  "Mode & Beauté",
  "ONG & Institution",
  "Technologie & Services",
  "Autre",
];

export const OBJECTIVES = [
  "Gagner en notoriété",
  "Attirer de nouveaux clients",
  "Moderniser mon image",
  "Lancer un nouveau produit",
  "Fidéliser ma clientèle",
  "Me démarquer de la concurrence",
  "Professionnaliser mes supports",
  "Préparer un événement",
];

export const VISUAL_STYLES = [
  { value: "corporate", emoji: "🏛️", label: "Corporate", desc: "Sérieux, institutionnel, rassurant" },
  { value: "bold", emoji: "⚡", label: "Audacieux & Dynamique", desc: "Couleurs fortes, énergie, impact" },
  { value: "minimal", emoji: "◻️", label: "Épuré & Minimaliste", desc: "Blanc, espace, élégance discrète" },
  { value: "natural", emoji: "🌿", label: "Naturel", desc: "Tons terre, matières, authenticité" },
  { value: "pop", emoji: "🎈", label: "Créatif / Pop", desc: "Fun, coloré, jeune et décalé" },
];

export const DEADLINES: { value: BriefData["deadline"]; label: string; desc: string }[] = [
  { value: "urgent", label: "Ultra Express", desc: "Moins de 48 heures" },
  { value: "standard", label: "Standard", desc: "3 à 5 jours ouvrés" },
  { value: "planned", label: "Planifié", desc: "Plus de 2 semaines" },
];

export const BUDGETS = [
  "Moins de 50 000 FCFA",
  "50 000 – 150 000 FCFA",
  "150 000 – 500 000 FCFA",
  "500 000 – 1 500 000 FCFA",
  "Plus de 1 500 000 FCFA",
  "À définir avec le conseiller",
];

export const FINISHES = [
  { value: "mat", label: "Finition mate", tip: "Surface sans reflet, rendu doux et haut de gamme." },
  { value: "brillant", label: "Finition brillante", tip: "Surface qui reflète la lumière, couleurs plus vives." },
  { value: "pelliculage", label: "Pelliculage", tip: "Fin film plastique collé sur le papier : plus résistant à l'eau et aux déchirures." },
  { value: "vernis", label: "Vernis sélectif", tip: "Vernis appliqué sur une zone précise (logo, titre) pour la faire ressortir au toucher." },
  { value: "dorure", label: "Dorure à chaud", tip: "Effet métallisé or ou argent appliqué à chaud, très prestige." },
  { value: "gaufrage", label: "Gaufrage", tip: "Relief embossé dans le papier, élégant et perceptible au toucher." },
];

export const PRINT_SUPPORTS = [
  "Cartes de visite",
  "Flyers & dépliants",
  "Affiches",
  "Bâches & banderoles",
  "Enseigne / Panneau",
  "Kakémono / Roll-up",
  "Brochures & catalogues",
  "Blocs & papeterie",
];

export const BRANDING_DELIVERABLES = [
  "Création de logo",
  "Refonte de logo",
  "Charte graphique complète",
  "Déclinaisons papeterie",
  "Habillage réseaux sociaux",
  "Nom de marque / baseline",
];

export const PACKAGING_ITEMS = [
  "Étiquettes produits",
  "Boîtes & emballages",
  "Sachets / Sacs",
  "Tee-shirts & textiles",
  "Mugs & gourdes",
  "Stylos & carnets",
  "Casquettes",
];

export const WEB_NEEDS = [
  "Site vitrine",
  "Boutique en ligne",
  "Application web",
  "Landing page événement",
  "Refonte de site existant",
  "Référencement / SEO",
  "Hébergement & nom de domaine",
];

export function projectTypeLabel(t: ProjectType) {
  return PROJECT_TYPES.find((p) => p.value === t)?.label ?? t;
}

export function deadlineLabel(d: BriefData["deadline"]) {
  const item = DEADLINES.find((x) => x.value === d);
  return item ? `${item.label} (${item.desc})` : d;
}

export function logoLabel(l: BriefData["hasLogo"]) {
  return l === "hd"
    ? "Logo haute définition disponible"
    : l === "low"
      ? "Logo existant mais de mauvaise qualité"
      : "Aucun logo (page blanche)";
}

export function styleLabel(v: string) {
  return VISUAL_STYLES.find((s) => s.value === v)?.label ?? v;
}

export function buildWhatsAppMessage(brief: BriefData) {
  const lines = [
    `*${SITE.name} - Brief ${brief.id}*`,
    ``,
    `Structure : ${brief.companyName}`,
    brief.slogan ? `Slogan : ${brief.slogan}` : "",
    `Secteur : ${brief.industry}`,
    `Type de projet : ${projectTypeLabel(brief.projectType)}`,
    `Objectifs : ${brief.objectives.join(", ") || "—"}`,
    `Style visuel : ${styleLabel(brief.visualStyle)}`,
    `Logo : ${logoLabel(brief.hasLogo)}`,
    brief.logoFileName ? `Fichier transmis : ${brief.logoFileName}` : "",
    briefColors(brief).length ? `Couleurs : ${briefColors(brief).join(", ")}` : "",
    ...visibleSpecs(brief).map(
      ([k, v]) => `${k} : ${Array.isArray(v) ? v.join(", ") : String(v)}`,
    ),
    `Délai : ${deadlineLabel(brief.deadline)}`,
    `Réception : ${brief.deliveryMode === "pickup" ? "Retrait à Porto-Novo" : "Livraison"}`,
    brief.budgetRange ? `Budget : ${brief.budgetRange}` : "",
    `Estimation indicative : ${estimateLabel(brief)}`,
    brief.contactName ? `Contact : ${brief.contactName}` : "",
    brief.contactPhone ? `Téléphone : ${brief.contactPhone}` : "",
    brief.notes ? `Précisions : ${brief.notes}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

export const WHATSAPP_NUMBER = SITE.whatsapp.replace(/\D/g, "");

export function whatsappLink(brief: BriefData) {
  return `${SITE.whatsappLink}?text=${encodeURIComponent(buildWhatsAppMessage(brief))}`;
}

export function mailtoLink(brief: BriefData) {
  const subject = `Brief ${brief.id} — ${brief.companyName || "Nouveau projet"}`;
  const body = buildWhatsAppMessage(brief).replace(/\*/g, "");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function siteFormLink(brief: BriefData) {
  const details = [
    `Bonjour,`,
    ``,
    `Je viens de compléter un brief interactif sur SPC Interactive Brief (réf. ${brief.id}).`,
    `Voici le contenu de ma demande :`,
    ``,
    buildWhatsAppMessage(brief).replace(/\*/g, ""),
    ``,
    `Merci de me recontacter pour échanger sur les modalités et le devis.`,
  ].join("\n");
  return `${SITE_LINK.landingUrl}/?quote=autre&custom=${encodeURIComponent(
    `Brief interactif ${brief.id}`,
  )}&details=${encodeURIComponent(details)}#contact`;
}
