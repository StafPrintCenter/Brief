import { Link } from "@tanstack/react-router";
import { FolderClock, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-ember font-display text-sm font-bold text-primary-foreground">
            SPC
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-tight text-foreground">
              STAF PRINT CENTER
            </span>
            <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              Interactive Brief
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            activeOptions={{ exact: true }}
            activeProps={{ className: "!text-foreground bg-surface" }}
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">Nouveau brief</span>
          </Link>
          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            activeProps={{ className: "!text-foreground bg-surface" }}
          >
            <FolderClock className="size-4" />
            <span className="hidden sm:inline">Mes briefs</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print mt-16 border-t border-border/70 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>STAF PRINT CENTER — Porto-Novo, Bénin</p>
        <Link to="/cgu" className="hover:text-foreground">
          Conditions Générales d'Utilisation
        </Link>
      </div>
    </footer>
  );
}
