import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { getDictionary } from "@/lib/dictionaries";

const d = getDictionary("en");

export const metadata: Metadata = {
  title: d.contact.title,
  description: d.contact.description,
};

export default function Page() {
  return <ContactPage lang="en" d={d} />;
}
