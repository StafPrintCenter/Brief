import { Link } from "@tanstack/react-router";
import { SITE, SITE_LINK } from "@/data/site";

export function BriefFooter() {
  const landingBase = SITE_LINK.landingUrl.replace(/\/$/, "");

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-3">
        {/* Copyright */}
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} SPC Interactive Brief · Tous droits réservés.
          <span className="mx-1.5 hidden text-muted-foreground/50 sm:inline">|</span>

          <a
            href={SITE_LINK.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-medium underline underline-offset-4 transition-colors hover:text-primary sm:mt-0 sm:inline"
          >
            {SITE.name}
          </a>
        </p>

        {/* Liens */}
        <nav
          aria-label="Liens légaux"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:justify-end"
        >
          <a
            href={`${SITE_LINK.docsUrl}/docs/brief/parcours-de-qualification`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            Lire la Documentation
          </a>

            <span className="text-muted-foreground/50">·</span>

          <a
            href={`${landingBase}/legal/privacy`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-primary"
          >
            Confidentialité
          </a>

          <span className="text-muted-foreground/50">·</span>

            <Link
              to="/cgu"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Conditions Générales d'Utilisation
            </Link>
          </nav>

          <span className="hidden text-muted-foreground/30 sm:inline">|</span>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
