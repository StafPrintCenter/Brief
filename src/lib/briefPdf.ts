import { jsPDF } from "jspdf";

import { SITE } from "@/data/site";
import {
  deadlineLabel,
  logoLabel,
  projectTypeLabel,
  styleLabel,
  type BriefData,
} from "@/lib/briefStorage";

type Line = [string, string];

function briefLines(brief: BriefData): Line[] {
  const specs = Object.entries(brief.technicalSpecs ?? {}).filter(
    ([, v]) => v !== "" && v != null && !(Array.isArray(v) && v.length === 0),
  );

  const rows: Line[] = [
    ["Type de projet", projectTypeLabel(brief.projectType)],
    ["Structure", brief.companyName],
  ];
  if (brief.slogan) rows.push(["Slogan", brief.slogan]);
  rows.push(
    ["Secteur d'activité", brief.industry],
    ["Objectifs prioritaires", brief.objectives.join(", ")],
    ["Ambiance visuelle", styleLabel(brief.visualStyle)],
    ["Éléments existants", logoLabel(brief.hasLogo)],
  );
  if (brief.logoFileName) rows.push(["Fichier logo transmis", brief.logoFileName]);
  for (const [k, v] of specs) {
    rows.push([k, Array.isArray(v) ? v.join(", ") : String(v)]);
  }
  rows.push(
    ["Délai souhaité", deadlineLabel(brief.deadline)],
    [
      "Mode de réception",
      brief.deliveryMode === "pickup"
        ? "Retrait à Porto-Novo"
        : "Livraison à l'adresse indiquée",
    ],
    ["Tranche budgétaire", brief.budgetRange ?? ""],
  );
  if (brief.contactName) rows.push(["Contact", brief.contactName]);
  if (brief.contactPhone) rows.push(["Téléphone", brief.contactPhone]);
  if (brief.notes) rows.push(["Précisions", brief.notes]);
  rows.push([
    "CGU",
    brief.cguAccepted ? "Acceptées par le client" : "En attente d'acceptation",
  ]);

  return rows.map(([k, v]) => [k, v || "—"]);
}

export function generateBriefPdf(brief: BriefData): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  const labelW = 52;
  const valueW = pageW - margin * 2 - labelW;

  // En-tête
  doc.setFillColor(214, 90, 31);
  doc.rect(0, 0, pageW, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(SITE.name, margin, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`${SITE.slogan} — ${SITE.city}`, margin, 21);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Fiche projet", margin, 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `${brief.id} · ${new Date(brief.createdAt).toLocaleDateString("fr-FR")}`,
    pageW - margin,
    30,
    { align: "right" },
  );

  let y = 48;
  doc.setTextColor(30, 30, 30);

  for (const [label, value] of briefLines(brief)) {
    const valueLines = doc.splitTextToSize(value, valueW) as string[];
    const blockH = Math.max(valueLines.length * 5, 6) + 4;

    if (y + blockH > pageH - 24) {
      doc.addPage();
      y = 24;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(label, margin, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(25, 25, 25);
    doc.text(valueLines, margin + labelW, y);

    y += blockH;
    doc.setDrawColor(228, 228, 228);
    doc.line(margin, y - 3, pageW - margin, y - 3);
  }

  // Pied de page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text(
      `${SITE.name} · ${SITE.phone} · ${SITE.email}`,
      margin,
      pageH - 10,
    );
    doc.text(`Page ${i}/${pages}`, pageW - margin, pageH - 10, { align: "right" });
  }

  return doc;
}

export function downloadBriefPdf(brief: BriefData) {
  const doc = generateBriefPdf(brief);
  const safeName = (brief.companyName || "brief").replace(/[^\p{L}\p{N}]+/gu, "-");
  doc.save(`SPC-${brief.id}-${safeName}.pdf`);
}
