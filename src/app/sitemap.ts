import type { MetadataRoute } from "next";
import { navigation, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...navigation.map((item) => ({
      url: `${siteUrl}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
