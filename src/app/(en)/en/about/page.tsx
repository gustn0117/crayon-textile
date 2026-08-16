import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { getDictionary } from "@/lib/dictionaries";

const d = getDictionary("en");

export const metadata: Metadata = {
  title: d.about.title,
  description: d.about.description,
};

export default function Page() {
  return <AboutPage lang="en" d={d} />;
}
