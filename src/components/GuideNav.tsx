import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./GuideNav.module.css";

export type GuideSlug = "hub" | "faq" | "order" | "fabric" | "custom";

const items: { slug: GuideSlug; href: string }[] = [
  { slug: "hub", href: "/guide" },
  { slug: "faq", href: "/guide/faq" },
  { slug: "order", href: "/guide/order" },
  { slug: "fabric", href: "/guide/fabric" },
  { slug: "custom", href: "/guide/custom" },
];

/* The second-level menu for the guide branch — the same sticky bar the fabric
   pages use, so the two branches read as one site. */
export function GuideNav({ lang, d, current }: { lang: Locale; d: Dictionary; current: GuideSlug }) {
  return (
    <nav className={styles.nav} aria-label={d.guide.navAria}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.label}>{d.guide.hub}</span>
        <ul>
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={localePath(lang, item.href)}
                aria-current={item.slug === current ? "page" : undefined}
                className={item.slug === current ? styles.active : undefined}
              >
                {d.guide[item.slug]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
