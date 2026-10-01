"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/* 네이버 검색광고 공통 인증키. A site's own key, visible in the page source of
   every site that runs the script — nothing to keep out of the repo. */
const WCS_ACCOUNT = "s_2bd190266f01";

declare global {
  interface Window {
    wcs?: { inflow: (domain?: string) => void; cnv: (type: string, value: string) => string };
    wcs_add?: Record<string, string>;
    wcs_do?: (conversion?: unknown) => void;
    _nasa?: Record<string, unknown>;
  }
}

/* Naver ships this as two plain <script> tags, where the second one runs only
   because the first is a blocking load. next/script loads async, so that inline
   half would run before wcslog.js defined `wcs` and silently log nothing — it
   goes in onLoad instead, which is the ordering guarantee we actually need. */
export function NaverWcs() {
  const pathname = usePathname();
  // The path last logged. Same reasoning as MetaPixel: compare paths rather
  // than count effect runs, so Strict Mode's double invocation cannot
  // double-count a visit.
  const logged = useRef<string | null>(null);

  const log = useCallback((path: string) => {
    if (!window.wcs || logged.current === path) return;
    window.wcs_add = window.wcs_add ?? {};
    window.wcs_add.wa = WCS_ACCOUNT;
    window._nasa = window._nasa ?? {};
    window.wcs.inflow();
    window.wcs_do?.();
    logged.current = path;
  }, []);

  // Route changes never reload the document, so without this Naver would see
  // one visit per session however many pages were read.
  useEffect(() => {
    log(pathname);
  }, [pathname, log]);

  return (
    <Script
      id="naver-wcslog"
      src="https://wcs.naver.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={() => log(window.location.pathname)}
    />
  );
}
