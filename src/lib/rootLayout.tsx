import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Gothic_A1, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, siteUrl, type Locale } from "@/lib/routing";

// Gothic A1 ships Korean as ~100 unicode-range chunks per weight. Preloading
// them would put several megabytes of woff2 in <head>; letting the browser pull
// only the ranges a page actually uses keeps the first load small.
const gothic = Gothic_A1({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-gothic",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

/** Metadata shared by both locale trees, with hreflang alternates. */
export function rootMetadata(lang: Locale): Metadata {
  const d = getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: d.meta.titleDefault, template: d.meta.titleTemplate },
    description: d.meta.description,
    keywords: [...d.meta.keywords],
    icons: { icon: "/favicon.svg" },
    robots: { index: true, follow: true },
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { ko: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: d.meta.ogLocale,
      siteName: d.meta.siteName,
      url: localePath(lang, "/"),
      title: d.meta.titleDefault,
      description: d.meta.ogDescription,
    },
  };
}

export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const d = getDictionary(lang);
  return (
    <html lang={d.htmlLang} className={`${gothic.variable} ${plexMono.variable}`}>
      <body>
        <SiteHeader lang={lang} d={d} />
        <main id="main">{children}</main>
        <SiteFooter lang={lang} d={d} />
      </body>
    </html>
  );
}
