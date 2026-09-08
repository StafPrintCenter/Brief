import { Link } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { type BriefData } from "@/lib/briefStorage";
import { BriefCard } from "./Card";

interface BriefListProps {
  briefs: BriefData[];
  onShare: (brief: BriefData) => void;
  onDelete: (brief: BriefData) => void;
}

export function BriefList({ briefs, onShare, onDelete }: BriefListProps) {
  if (briefs.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-muted-foreground">
          Aucun brief pour l'instant sur cet appareil.
        </p>
        <Link to="/" className="mt-5 inline-block">
          <Button className="bg-gradient-ember">Créer mon premier brief</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      <AnimatePresence>
        {briefs.map((b) => (
          <BriefCard
            key={b.id}
            brief={b}
            onShare={onShare}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}