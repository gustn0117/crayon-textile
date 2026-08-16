import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, locales, siteUrl } from "@/lib/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...getDictionary("ko").nav.map((item) => item.href)];

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
