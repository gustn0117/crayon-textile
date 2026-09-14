import type { Metadata } from "next";
import { OrderPage } from "@/components/pages/OrderPage";
import { orderMeta } from "@/content/order";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export function generateMetadata(): Metadata {
  return { title: orderMeta.title[lang], description: orderMeta.description[lang] };
}

export default async function Page() {
  return <OrderPage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
