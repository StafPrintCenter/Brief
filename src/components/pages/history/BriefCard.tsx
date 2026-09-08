import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, Pencil, Share2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectTypeLabel, type BriefData } from "@/lib/briefStorage";

interface BriefCardProps {
  brief: BriefData;
  onShare: (brief: BriefData) => void;
  onDelete: (brief: BriefData) => void;
}

export function BriefCard({ brief, onShare, onDelete }: BriefCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-primary">{brief.id}</p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">
            {brief.companyName || "Sans nom"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {projectTypeLabel(brief.projectType)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${brief.status === "completed"
            ? "bg-primary/10 text-primary"
            : "bg-surface text-muted-foreground"
            }`}
        >
          {brief.status === "completed" ? "Validé" : "Brouillon"}
        </span>
      </div>

      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Créé le {new Date(brief.createdAt).toLocaleDateString("fr-FR")}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {brief.status === "completed" ? (
          <Link to="/summary/$briefId" params={{ briefId: brief.id }}>
            <Button size="sm" variant="outline">
              <Eye className="size-4" />
              Consulter
            </Button>
          </Link>
        ) : (
          <Link to="/" search={{ resume: brief.id }}>
            <Button size="sm" variant="outline">
              <Pencil className="size-4" />
              Reprendre
            </Button>
          </Link>
        )}
        <Button size="sm" variant="outline" onClick={() => onShare(brief)}>
          <Share2 className="size-4" />
          Partager
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(brief)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </motion.article>
  );
}