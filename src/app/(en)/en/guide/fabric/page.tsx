import type { Metadata } from "next";
import { FabricGuidePage } from "@/components/pages/FabricGuidePage";
import { fabricGuideMeta } from "@/content/fabricGuide";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "en" as const;

export function generateMetadata(): Metadata {
  return { title: fabricGuideMeta.title[lang], description: fabricGuideMeta.description[lang] };
}

export default async function Page() {
  return <FabricGuidePage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
