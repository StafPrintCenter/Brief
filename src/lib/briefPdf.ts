import { jsPDF } from "jspdf";
import QRCode from "qrcode";

import { SITE } from "@/data/site";
import {
  briefColors,
  deadlineLabel,
  logoLabel,
  projectTypeLabel,
  styleLabel,
  visibleSpecs,
  type BriefData,
} from "@/lib/briefStorage";
import { ESTIMATE_NOTICE, estimateLabel } from "@/lib/estimate";

type Line = [string, string];

function briefLines(brief: BriefData): Line[] {
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
  if (brief.logoFileName) rows.push(["Fichier transmis", brief.logoFileName]);
  for (const [k, v] of visibleSpecs(brief)) {
    rows.push([k, Array.isArray(v) ? v.join(", ") : String(v)]);
  }
  rows.push(
    ["Délai souhaité", deadlineLabel(brief.deadline)],
    [
      "Mode de réception",
      brief.deliveryMode === "pickup" ? "Retrait à Porto-Novo" : "Livraison à l'adresse indiquée",
    ],
    ["Tranche budgétaire", brief.budgetRange ?? ""],
  );
  if (brief.contactName) rows.push(["Contact", brief.contactName]);
  if (brief.contactPhone) rows.push(["Téléphone", brief.contactPhone]);
  if (brief.notes) rows.push(["Précisions", brief.notes]);
  rows.push(["CGU", brief.cguAccepted ? "Acceptées par le client" : "En attente d'acceptation"]);

  return rows.map(([k, v]) => [k, v || "—"]);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export async function generateBriefPdf(brief: BriefData): Promise<jsPDF> {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  const labelW = 52;
  const valueW = pageW - margin * 2 - labelW;

  // En-tête
  doc.setFillColor(214, 90, 31);
  doc.rect(0, 0, pageW, 36, "F");
  let textX = margin;
  if (brief.logoPreviewData) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, 6, 24, 24, 2, 2, "F");
      const props = doc.getImageProperties(brief.logoPreviewData);
      const r = Math.min(22 / props.width, 22 / props.height);
      const w = props.width * r;
      const h = props.height * r;
      doc.addImage(brief.logoPreviewData, "PNG", margin + 1 + (22 - w) / 2, 7 + (22 - h) / 2, w, h);
      textX = margin + 30;
    } catch {
      /* image illisible : on ignore */
    }
  }
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(SITE.name, textX, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`${SITE.slogan} - ${SITE.city}`, textX, 21);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Fiche projet", textX, 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `${brief.id} · ${new Date(brief.createdAt).toLocaleDateString("fr-FR")}`,
    pageW - margin,
    30,
    { align: "right" },
  );

  // Bloc estimation + QR code
  const qrSize = 30;
  const blockTop = 42;
  const url = `${window.location.origin}/summary/${brief.id}`;
  const qr = await QRCode.toDataURL(url, { margin: 1, width: 300 });
  doc.addImage(qr, "PNG", pageW - margin - qrSize, blockTop, qrSize, qrSize);
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text("Scannez pour la version en ligne", pageW - margin - qrSize / 2, blockTop + qrSize + 3, {
    align: "center",
  });

  doc.setFillColor(253, 240, 232);
  doc.roundedRect(margin, blockTop, pageW - margin * 2 - qrSize - 6, qrSize, 3, 3, "F");
  doc.setTextColor(120, 120, 120);
  doc.setFontSize(9);
  doc.text("Estimation indicative", margin + 5, blockTop + 8);
  doc.setTextColor(25, 25, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text(estimateLabel(brief), margin + 5, blockTop + 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(
    doc.splitTextToSize(ESTIMATE_NOTICE, pageW - margin * 2 - qrSize - 16) as string[],
    margin + 5,
    blockTop + 24,
  );

  let y = blockTop + qrSize + 14;

  // Couleurs
  const colors = briefColors(brief);
  if (colors.length) {
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Couleurs", margin, y);
    let x = margin + labelW;
    for (const c of colors) {
      if (x + 26 > pageW - margin) {
        x = margin + labelW;
        y += 8;
      }
      doc.setFillColor(...hexToRgb(c));
      doc.setDrawColor(200, 200, 200);
      doc.circle(x + 2.5, y - 1.3, 2.5, "FD");
      doc.setTextColor(25, 25, 25);
      doc.text(c, x + 7, y);
      x += 27;
    }
    y += 7;
    doc.setDrawColor(228, 228, 228);
    doc.line(margin, y - 3, pageW - margin, y - 3);
  }

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
    doc.text(`${SITE.name} · ${SITE.phone} · ${SITE.email}`, margin, pageH - 10);
    doc.text(`Page ${i}/${pages}`, pageW - margin, pageH - 10, { align: "right" });
  }

  return doc;
}

export async function downloadBriefPdf(brief: BriefData) {
  const doc = await generateBriefPdf(brief);
  const safeName = (brief.companyName || "brief").replace(/[^\p{L}\p{N}]+/gu, "-");
  doc.save(`SPC-${brief.id}-${safeName}.pdf`);
}
