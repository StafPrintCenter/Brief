import { SITE, SITE_LINK } from "@/data/site";
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
  logoFileName?: string;
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
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return next;
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
    `*STAF PRINT CENTER — Brief ${brief.id}*`,
    ``,
    `Structure : ${brief.companyName}`,
    brief.slogan ? `Slogan : ${brief.slogan}` : "",
    `Secteur : ${brief.industry}`,
    `Type de projet : ${projectTypeLabel(brief.projectType)}`,
    `Objectifs : ${brief.objectives.join(", ") || "—"}`,
    `Style visuel : ${styleLabel(brief.visualStyle)}`,
    `Logo : ${logoLabel(brief.hasLogo)}`,
    ...Object.entries(brief.technicalSpecs).map(
      ([k, v]) => `${k} : ${Array.isArray(v) ? v.join(", ") : String(v)}`,
    ),
    `Délai : ${deadlineLabel(brief.deadline)}`,
    `Réception : ${brief.deliveryMode === "pickup" ? "Retrait à Porto-Novo" : "Livraison"}`,
    brief.budgetRange ? `Budget : ${brief.budgetRange}` : "",
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
  return `https://stafprint.com/?quote=autre&custom=${encodeURIComponent(
    `Brief interactif ${brief.id}`,
  )}&details=${encodeURIComponent(details)}#contact`;
}
