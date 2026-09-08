import { Link } from "@tanstack/react-router";
import { SITE, SITE_LINK } from "@/data/site";


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
