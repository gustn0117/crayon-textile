import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { getDictionary } from "@/lib/dictionaries";
import { isInquiryType } from "@/lib/inquiry";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary(lang);
  return { title: d.contact.title, description: d.contact.description };
}

/* ?type=custom|retail|wholesale preselects the enquiry type — the custom
   printing and personal-buyer links land here with it set. */
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return (
    <ContactPage
      lang={lang}
      d={await getDictionary(lang)}
      info={await getSiteInfo()}
      initialType={isInquiryType(type) ? type : undefined}
    />
  );
}
