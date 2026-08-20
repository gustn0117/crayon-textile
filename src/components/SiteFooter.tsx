import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ lang, d }: { lang: Locale; d: Dictionary }) {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link className={styles.brandLink} href={localePath(lang, "/")}>
            <Image
              className={styles.logo}
              src="/images/logo-crayon.png"
              alt={d.brand.ko}
              width={760}
              height={341}
            />
          </Link>
          <p className={styles.brandEn}>CRAYON TEXTILE · SEOUL</p>
          <p className={styles.brandNote}>{d.footer.tagline}</p>
        </div>

        <nav className={styles.column} aria-label={d.footer.sitemapAria}>
          <p className={styles.columnLabel}>{d.footer.sitemap}</p>
          <Link href={localePath(lang, "/")}>{d.footer.home}</Link>
          {d.nav.map((item) => (
            <Link key={item.href} href={localePath(lang, item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <p className={styles.columnLabel}>{d.footer.contact}</p>
          <a href={contact.telHref}>T. {d.phone.tel}</a>
          <span>F. {d.phone.fax}</span>
          <a href={contact.emailHref}>{contact.email}</a>
        </div>

        <div className={styles.column}>
          <p className={styles.columnLabel}>{d.footer.address}</p>
          <address className={styles.address}>
            {d.contact.details[0].lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>
      </div>

      <div className={`container ${styles.baseline}`}>
        <span>SEOUL · DONGDAEMUN · 2621</span>
        <span>{d.footer.rights}</span>
      </div>
    </footer>
  );
}
