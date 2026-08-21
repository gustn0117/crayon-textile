import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FabricCategoryPage } from "@/components/pages/FabricCategoryPage";
import { getDictionary } from "@/lib/dictionaries";
import { getCategory } from "@/lib/fabrics";

const lang = "ko" as const;
const category = getCategory("polyester")!;

export const metadata: Metadata = {
  title: category.title.ko,
  description: category.meta.ko,
  keywords: [...category.keywords.ko],
};

export default function Page() {
  if (!category) notFound();
  return (
    <FabricCategoryPage lang={lang} d={getDictionary(lang)} category={category} />
  );
}
