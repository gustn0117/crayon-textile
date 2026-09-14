import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, locales, siteUrl } from "@/lib/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nav = (await getDictionary("ko")).nav.map((item) => item.href);
  const extra = ["/guide/faq", "/guide/order", "/guide/fabric", "/guide/custom", "/privacy"];
  const paths = [...new Set(["/", ...nav, ...extra])];

  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${siteUrl}${localePath(lang, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`]),
        ),
      },
    })),
  );
}
