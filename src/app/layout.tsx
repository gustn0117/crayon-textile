import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "크레용 | 나염 원단 · 텍스타일 디자인 스튜디오",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f0e7",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
