import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FabricCategoryPage } from "@/components/pages/FabricCategoryPage";
import { getDictionary } from "@/lib/dictionaries";
import { getCategory } from "@/lib/fabrics";

const lang = "en" as const;
const category = getCategory("use")!;

export const metadata: Metadata = {
  title: category.title.en,
  description: category.meta.en,
  keywords: [...category.keywords.en],
};

export default function Page() {
  if (!category) notFound();
  return (
    <FabricCategoryPage lang={lang} d={getDictionary(lang)} category={category} />
  );
}
