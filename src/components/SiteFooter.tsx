import Link from "next/link";
import { contact, navigation } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link className={styles.brandKo} href="/">
            크레용
          </Link>
          <p className={styles.brandEn}>CRAYON TEXTILE · SEOUL</p>
          <p className={styles.brandNote}>
            차별화된 디자인과 신뢰할 수 있는 품질로 함께 성장하겠습니다.
          </p>
        </div>

        <nav className={styles.column} aria-label="사이트맵">
          <p className={styles.columnLabel}>SITEMAP</p>
          <Link href="/">홈</Link>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.ko}
            </Link>
          ))}
        </nav>

        <div className={styles.column}>
          <p className={styles.columnLabel}>CONTACT</p>
          <a href={contact.telHref}>T. {contact.tel}</a>
          <span>F. {contact.fax}</span>
          <a href={contact.emailHref}>{contact.email}</a>
        </div>

        <div className={styles.column}>
          <p className={styles.columnLabel}>ADDRESS</p>
          <address className={styles.address}>
            {contact.addressLines[0]}
            <br />
            {contact.addressLines[1]}
          </address>
        </div>
      </div>

      <div className={`container ${styles.baseline}`}>
        <span>SEOUL · DONGDAEMUN · 2621</span>
        <span>© 2026 CRAYON. ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
