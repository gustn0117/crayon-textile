import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/PrivacyPage";
import { privacyMeta } from "@/content/privacy";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export function generateMetadata(): Metadata {
  return { title: privacyMeta.title[lang], description: privacyMeta.description[lang] };
}

export default async function Page() {
  return <PrivacyPage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
