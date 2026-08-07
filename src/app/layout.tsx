import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Gothic_A1, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { siteUrl } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "크레용 | 나염 원단 · 텍스타일 디자인 스튜디오",
    template: "%s | 크레용",
  },
  description:
    "서울 동대문에서 30년간 나염 원단을 개발·공급해 온 텍스타일 전문 기업 크레용. 자체 디자인실의 독창적인 패턴을 만나보세요.",
  keywords: [
    "크레용",
    "나염 원단",
    "동대문 원단",
    "텍스타일 디자인",
    "패턴 디자인",
    "동대문종합시장",
  ],
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "크레용",
    url: siteUrl,
    title: "크레용 | 나염 원단 · 텍스타일 디자인 스튜디오",
    description:
      "서울 동대문에서 30년간 나염 원단을 개발해 온 크레용. 자체 디자인실의 독창적인 패턴으로 상품의 가능성을 넓힙니다.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko" className={`${gothic.variable} ${plexMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
