import type { ReactNode } from "react";
import { RootShell, rootMetadata, viewport } from "@/lib/rootLayout";
import "../globals.css";

export function generateMetadata() {
  return rootMetadata("ko");
}
export { viewport };

export default function KoLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="ko">{children}</RootShell>;
}
