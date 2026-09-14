import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary("en");
  return {
    title: d.contact.title,
    description: d.contact.description,
  };
}

export default async function Page() {
  const d = await getDictionary("en");
  return <ContactPage lang="en" d={d} />;
}
