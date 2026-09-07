# StafPrint Brief Builder

# PROMPT : DEVELOPPEMENT DE LA PLATEFORME "SPC INTERACTIVE BRIEF" (`brief.stafprint.com`)

Tu es un développeur Full-Stack Senior & UI/UX Designer Expert React / TypeScript / Tailwind CSS / Framer Motion / TanStack Router.

Tu dois concevoir et développer une application web moderne, ultra-intuitive et fluide appelée **SPC Interactive Brief** (`brief.stafprint.com`). Elle sert d'assistant interactif de qualification de besoin pour tout l'écosystème **STAF PRINT CENTER** (Porto-Novo, Bénin). Elle permet aux clients de formaliser leurs cahiers des charges (Impression, Branding, Web, Packaging) sans jargon technique, puis d'exporter ou d'envoyer leur brief.

---

## 🎨 1. DESIGN SYSTEM & CHARTE GRAPHIQUE

- **Palette STAF PRINT :**
  - **Background :** Off-white chaud (`#fdfbf7`) ou Slate très sombre (`#0f172a` / `#020617`) en mode sombre.
  - **Accentuation :** Orange Ambre signature (`#f97316` / `#ea580c`) pour les boutons d'action, indicateurs d'étapes et sélections actives.
  - **Bordures & Cartes :** Cartes cliquables réactives au survol (*hover*) avec micro-animations de sélection (`Framer Motion`).
- **Typographies :** **Space Grotesk** ou **Fraunces** (Titres), **Inter Tight** (Formulaires et textes), **JetBrains Mono** (Codes de briefs, métriques).

---

## 🗺️ 2. ARCHITECTURE MULTI-ROUTES & NAVIGATION (`TanStack Router`)

L'application s'articule autour des routes suivantes :



brief.stafprint.com

├── / --> Tunnel Interactif (Wizard Single Page - Étapes 1 à 6)

├── /history --> Gestionnaire de mes briefs (Historique local, Partage, Suppression)

├── /summary/$briefId --> Fiche récapitulative officielle d'un brief généré

└── /cgu --> Page des Conditions Générales d'Utilisation





---

## 🧙‍♂️ 3. FONCTIONNALITES & PARCOURS UTILISATEUR

### A. Tunnel de Qualification (Route `/`)
Un parcours dynamique en **6 étapes** guidées :

1. **Étape 1 : Type de Projet (Aiguillage)**
   - Cartes visuelles : *🖨️ Imprimerie & Signalétique*, *🎨 Identité Visuelle & Branding*, *📦 Packaging & Objets Publicitaires*, *🌐 Web & Solution Digitale*.
2. **Étape 2 : Profil de la Marque & Objectif**
   - Nom de la structure, Slogan, Domaine d'activité (BTP, Restauration, Santé, Éducation, etc.).
   - Objectifs prioritaires (Sélection de cartes à puces).
3. **Étape 3 : Moodboard & Style Visuel (100% Visuel)**
   - Ambiance visuelle : *Corporate*, *Audacieux & Dynamique*, *Épuré & Minimaliste*, *Naturel*, *Créatif/Pop*.
   - Statut des éléments existants (Logo HD disponible avec zone de Drag & Drop / Logo basse qualité / Page blanche).
4. **Étape 4 : Spécifications Techniques Conditionnelles**
   - Questions adaptées à la catégorie choisie à l'Étape 1 (Supports, dimensions, quantités, finitions mat/brillant/pelliculage/vernis avec tooltips explicatifs `ⓘ`).
5. **Étape 5 : Délais, Budget & Logistique**
   - Délai souhaité (*Ultra Express < 48h*, *Standard 3-5j*, *Planifié > 2semaines*).
   - Mode de réception (Retrait à Porto-Novo ou Livraison). Tranche budgétaire indicative.
6. **Étape 6 : Validation & Modale des CGU**
   - Récapitulatif visuel sous forme de Fiche Projet.
   - **Modale obligatoire d'acceptation des CGU :**
     - Case à cocher : *"J'accepte les Conditions Générales d'Utilisation de STAF PRINT CENTER"*.
     - Résumé des points clés (protection des données, devis gratuit sans engagement, propriété intellectuelle).
     - Lien ouvrant `/cgu` dans un nouvel onglet.
   - Validation ➔ Sauvegarde automatique dans l'historique local (`localStorage`) et génération d'un identifiant unique (ex: `SPC-2026-8940`).

---

### B. Gestionnaire d'Historique (Route `/history`)
- Affiche la liste des briefs créés sur l'appareil de l'utilisateur sous forme de cartes.
- **Actions disponibles pour chaque brief :**
  - 👁️ **Consulter / Reprendre :** Ouvre la fiche `/summary/$briefId` ou reprend la saisie d'un d'un brief en mode brouillon.
  - 📲 **Partager / Envoyer :** Sélecteur de canal d'envoi (Message WhatsApp pré-rempli vers le service commercial, téléchargement du PDF, ou copie du lien du brief).
  - 🗑️ **Supprimer :** Modale de confirmation avant retrait du brief de l'historique local (`localStorage`).

---

### C. Fiche Récapitulative (`/summary/$briefId`)
- Affiche la fiche technique complète du brief avec en-tête officiel STAF PRINT CENTER.
- Boutons d'action rapide : *Télécharger en PDF*, *Envoyer sur WhatsApp*, *Modifier le brief*.

---

## 📊 4. STRUCTURE DES DONNEES (MOCK TYPESCRIPT)

Créer un fichier de types et helpers `briefStorage.ts` structuré ainsi :

```typescript
export interface BriefData {
  id: string; // Ex: "SPC-2026-8940"
  createdAt: string;
  projectType: 'print' | 'branding' | 'packaging' | 'web';
  companyName: string;
  industry: string;
  objectives: string[];
  visualStyle: string;
  hasLogo: 'hd' | 'low' | 'none';
  technicalSpecs: Record<string, any>;
  deadline: 'urgent' | 'standard' | 'planned';
  deliveryMode: 'pickup' | 'delivery';
  budgetRange?: string;
  cguAccepted: boolean;
  status: 'draft' | 'completed';
}


🎯 LIVRABLE ATTENDU

Génère le code TypeScript / React / Tailwind CSS / Framer Motion complet pour SPC Interactive Brief (brief.stafprint.com), incluant TanStack Router, le wizard 6 étapes avec tooltips, la modale de validation des CGU, la gestion de l'historique local (localStorage) avec options de partage/suppression, et la génération de la fiche /summary/$briefId.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/58dcc762-2612-47ac-bf32-c5e825261b02).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
