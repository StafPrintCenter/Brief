import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, ExternalLink, FileDown, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { downloadBriefPdf } from "@/lib/briefPdf";
import { mailtoLink, siteFormLink, whatsappLink, type BriefData } from "@/lib/briefStorage";

interface ShareBriefDialogProps {
  brief: BriefData | null;
  onClose: () => void;
}

export function ShareBriefDialog({ brief, onClose }: ShareBriefDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = (targetBrief: BriefData) => {
    const url = `${window.location.origin}/summary/${targetBrief.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Lien du brief copié");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={Boolean(brief)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-md flex flex-col p-6">
        <DialogHeader className="shrink-0 border-b pb-1">
          <DialogTitle>Envoyer le brief {brief?.id}</DialogTitle>
          <DialogDescription>
            Choisissez comment transmettre votre brief à notre service commercial.
          </DialogDescription>
        </DialogHeader>

        {/* Zone défilante avec barre de scroll personnalisée */}
        <div className="mt-2 grid gap-3 overflow-y-auto pr-1">
          <a
            href={brief ? whatsappLink(brief) : "#"}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-surface"
          >
            <MessageCircle className="size-5 shrink-0 text-primary" />
            <span>
              <span className="block font-medium">Envoyer sur WhatsApp</span>
              <span className="text-sm text-muted-foreground">
                Message pré-rempli vers notre équipe
              </span>
            </span>
          </a>

          <a
            href={brief ? mailtoLink(brief) : "#"}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-surface"
          >
            <Mail className="size-5 shrink-0 text-primary" />
            <span>
              <span className="block font-medium">Envoyer par e-mail</span>
              <span className="text-sm text-muted-foreground">
                Message pré-rempli vers contact@stafprint.com
              </span>
            </span>
          </a>

          <a
            href={brief ? siteFormLink(brief) : "#"}
            target="_blank"
            rel="noreferrer"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-primary/60 hover:bg-surface"
          >
            <ExternalLink className="size-5 shrink-0 text-primary" />
            <span>
              <span className="block font-medium">Envoyer via le formulaire du site</span>
              <span className="text-sm text-muted-foreground">
                Ouvre stafprint.com pré-rempli
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (!brief) return;
              downloadBriefPdf(brief);
              toast.success("PDF généré");
            }}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/60 hover:bg-surface"
          >
            <FileDown className="size-5 shrink-0 text-primary" />
            <span>
              <span className="block font-medium">Télécharger en PDF</span>
              <span className="text-sm text-muted-foreground">
                Fichier PDF prêt à envoyer
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => brief && copyLink(brief)}
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border p-4 text-left transition-colors hover:border-primary/60 hover:bg-surface"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="size-5 text-green-500" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Copy className="size-5 shrink-0 text-primary" />
                </motion.span>
              )}
            </AnimatePresence>
            <span>
              <span className="block font-medium">Copier le lien du brief</span>
              <span className="text-sm text-muted-foreground">
                Lien consultable sur cet appareil
              </span>
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}