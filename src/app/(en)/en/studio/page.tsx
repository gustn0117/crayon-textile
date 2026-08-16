import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/StudioPage";
import { getDictionary } from "@/lib/dictionaries";

const d = getDictionary("en");

export const metadata: Metadata = {
  title: d.studio.title,
  description: d.studio.description,
};

export default function Page() {
  return <StudioPage lang="en" d={d} />;
}
