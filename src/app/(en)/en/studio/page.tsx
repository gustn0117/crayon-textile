import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/StudioPage";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary("en");
  return {
    title: d.studio.title,
    description: d.studio.description,
  };
}

export default async function Page() {
  const d = await getDictionary("en");
  return <StudioPage lang="en" d={d} />;
}
