import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}