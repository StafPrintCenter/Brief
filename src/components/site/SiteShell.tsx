import type { ReactNode } from "react";
import { BriefHeader, BriefFooter } from "./";

export function BriefShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <BriefHeader />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <BriefFooter />
    </div>
  );
}