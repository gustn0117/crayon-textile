import { privacy, privacyMeta } from "@/content/privacy";
import { pick } from "@/lib/bi";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

/* A legal page: no photograph, no motion — just the text, set for reading. */
export function PrivacyPage({ lang, info }: Props) {
  const { effective, sections } = privacy(info);

  return (
    <section className="section">
      <div className="container">
        <p className={styles.legalMeta}>PRIVACY POLICY · {effective}</p>
        <h1 className={`heading ${styles.legalTitle}`}>{pick(privacyMeta.title, lang)}</h1>
        <div className={`${styles.prose} ${styles.legalBody}`}>
          {sections.map((s) => (
            <div id={s.id} key={s.id}>
              <h2>{pick(s.title, lang)}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.en}>{pick(p, lang)}</p>
              ))}
              {s.bullets ? (
                <ul className={styles.bullets}>
                  {s.bullets.map((b) => (
                    <li key={b.en}>{pick(b, lang)}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
