import type { Metadata } from "next";
import { GuidePage } from "@/components/pages/GuidePage";
import { guideMeta } from "@/content/guide";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "en" as const;

export function generateMetadata(): Metadata {
  return { title: guideMeta.title[lang], description: guideMeta.description[lang] };
}

export default async function Page() {
  return <GuidePage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
