import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CguDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onConfirm: () => void;
}

export function CguDialog({
  open,
  onOpenChange,
  checked,
  onCheckedChange,
  onConfirm,
}: CguDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
          <DialogDescription>
            Avant l'envoi de votre brief à STAF PRINT CENTER, merci de valider les points
            suivants.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            Vos données servent uniquement à traiter votre demande et ne sont jamais
            revendues.
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            Le devis établi à partir de ce brief est gratuit et sans engagement.
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            Les créations restent la propriété de STAF PRINT CENTER jusqu'au règlement
            intégral.
          </li>
        </ul>
        <label className="mt-2 flex items-start gap-3 rounded-xl border border-border bg-surface/60 p-4 cursor-pointer">
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => onCheckedChange(v === true)}
            className="mt-0.5"
          />
          <span className="text-sm text-foreground">
            J'accepte les Conditions Générales d'Utilisation de STAF PRINT CENTER.{" "}
            <Link
              to="/cgu"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline underline-offset-4"
            >
              Lire les CGU
            </Link>
          </span>
        </label>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            disabled={!checked}
            className="bg-gradient-ember"
            onClick={onConfirm}
          >
            Confirmer et générer ma fiche
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}