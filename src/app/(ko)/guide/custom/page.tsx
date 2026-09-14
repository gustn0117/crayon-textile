import type { Metadata } from "next";
import { CustomPage } from "@/components/pages/CustomPage";
import { customMeta } from "@/content/custom";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export function generateMetadata(): Metadata {
  return { title: customMeta.title[lang], description: customMeta.description[lang] };
}

export default async function Page() {
  return <CustomPage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
