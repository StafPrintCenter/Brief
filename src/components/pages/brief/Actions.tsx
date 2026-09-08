import { Link } from "@tanstack/react-router";
import { FileDown, Globe, Mail, MessageCircle, Pencil } from "lucide-react";
import { toast } from "sonner";
import { downloadBriefPdf } from "@/lib/briefPdf";
import { Button } from "@/components/ui/button";
import { mailtoLink, siteFormLink, whatsappLink, type BriefData } from "@/lib/briefStorage";

interface SummaryActionsProps {
  brief: BriefData;
}

export function SummaryActions({ brief }: SummaryActionsProps) {
  return (
    <aside className="no-print lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Actions
        </p>
        <h2 className="mt-1 text-lg font-semibold text-foreground">
          Envoyer ma fiche
        </h2>
        <div className="mt-4 flex flex-col gap-2.5">
          <Button
            className="w-full justify-start bg-gradient-ember"
            onClick={() => {
              downloadBriefPdf(brief);
              toast.success("PDF généré");
            }}
          >
            <FileDown className="size-4" />
            Télécharger en PDF
          </Button>
          <a
            href={whatsappLink(brief)}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full justify-start">
              <MessageCircle className="size-4" />
              Envoyer sur WhatsApp
            </Button>
          </a>
          <a href={mailtoLink(brief)} className="block">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="size-4" />
              Envoyer par e-mail
            </Button>
          </a>
          <a
            href={siteFormLink(brief)}
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full justify-start">
              <Globe className="size-4" />
              Via le formulaire du site
            </Button>
          </a>
        </div>
        <div className="mt-5 border-t border-border pt-4">
          <Link to="/" search={{ resume: brief.id }} className="block">
            <Button variant="ghost" className="w-full justify-start">
              <Pencil className="size-4" />
              Modifier le brief
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}