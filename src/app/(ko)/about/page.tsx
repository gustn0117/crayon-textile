import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary("ko");
  return {
    title: d.about.title,
    description: d.about.description,
  };
}

export default async function Page() {
  const d = await getDictionary("ko");
  return <AboutPage lang="ko" d={d} />;
}
