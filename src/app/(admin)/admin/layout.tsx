import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/* Its own root layout: the admin shares nothing with the public site's header,
   footer, fonts or motion, and must never be indexed. */
export const metadata: Metadata = {
  title: "관리자 | 크레용",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
