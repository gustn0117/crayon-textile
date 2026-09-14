import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { faqMeta } from "@/content/faq";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export function generateMetadata(): Metadata {
  return { title: faqMeta.title[lang], description: faqMeta.description[lang] };
}

export default async function Page() {
  return <FaqPage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
