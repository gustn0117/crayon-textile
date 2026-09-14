import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FabricCategoryPage } from "@/components/pages/FabricCategoryPage";
import { getDictionary } from "@/lib/dictionaries";
import { getCategory } from "@/lib/fabrics";

const lang = "ko" as const;
const category = getCategory("new")!;

export const metadata: Metadata = {
  title: category.title.ko,
  description: category.meta.ko,
  keywords: [...category.keywords.ko],
};

export default async function Page() {
  if (!category) notFound();
  const d = await getDictionary(lang);
  return (
    <FabricCategoryPage lang={lang} d={d} category={category} />
  );
}
