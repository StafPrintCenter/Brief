import type { ReactNode } from "react";
import { BriefHeader, BriefFooter } from ".";

export function BriefShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <BriefHeader />
      <main className="flex-1 pt-8">{children}</main>
      <BriefFooter />
    </div>
  );
}