import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type BriefData } from "@/lib/briefStorage";

interface DeleteBriefDialogProps {
  brief: BriefData | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteBriefDialog({
  brief,
  onClose,
  onConfirm,
}: DeleteBriefDialogProps) {
  return (
    <Dialog open={Boolean(brief)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Supprimer ce brief ?</DialogTitle>
          <DialogDescription>
            Le brief {brief?.id} sera définitivement retiré de cet appareil. Cette
            action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}