import type { ReactNode } from "react";
import { RootShell, rootMetadata, viewport } from "@/lib/rootLayout";
import "../globals.css";

export const metadata = rootMetadata("en");
export { viewport };

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
