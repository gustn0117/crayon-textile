"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

/* Public by design — a pixel id is visible in the page source of every site
   that runs one, so there is nothing to keep out of the repo. Keeping it here
   rather than in an env var also survives deploy-new.sh, which regenerates
   docker-compose.yml and drops anything set there. */
const PIXEL_ID = "2177293442851090";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/* Meta's snippet fires PageView once, when it loads. Every route change after
   that is client-side, so the document never reloads and Meta would see a
   single page view per session. The effect below sends the rest. */
export function MetaPixel() {
  const pathname = usePathname();
  // The path the last PageView was reported for — the snippet reported the one
  // we mounted on. Comparing paths rather than counting runs is what keeps this
  // honest: Strict Mode fires effects twice in development, and a "skip the
  // first run" flag would let that second run send a duplicate view.
  const reported = useRef<string | null>(null);

  useEffect(() => {
    if (reported.current === null) {
      reported.current = pathname; // counted by the snippet, not by us
      return;
    }
    if (reported.current === pathname) return; // a re-run, not a navigation
    reported.current = pathname;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
