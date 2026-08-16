import type { Metadata } from "next";
import { CollectionPage } from "@/components/pages/CollectionPage";
import { getDictionary } from "@/lib/dictionaries";

const d = getDictionary("en");

export const metadata: Metadata = {
  title: d.collection.title,
  description: d.collection.description,
};

export default function Page() {
  return <CollectionPage lang="en" d={d} />;
}
