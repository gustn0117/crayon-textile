import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/StudioPage";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary("ko");
  return {
    title: d.studio.title,
    description: d.studio.description,
  };
}

export default async function Page() {
  const d = await getDictionary("ko");
  return <StudioPage lang="ko" d={d} />;
}
