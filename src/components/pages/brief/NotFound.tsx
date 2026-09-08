import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface BriefNotFoundProps {
  briefId: string;
}

export function BriefNotFound({ briefId }: BriefNotFoundProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
      <h1 className="text-xl font-semibold text-foreground">Fiche introuvable</h1>
      <p className="mt-2 text-muted-foreground">
        Le brief <span className="font-mono">{briefId}</span> n'existe pas sur cet
        appareil. Les briefs sont enregistrés localement.
      </p>
      <Link to="/history" className="mt-5 inline-block">
        <Button variant="outline">Voir mes briefs</Button>
      </Link>
    </div>
  );
}