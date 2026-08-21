import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "@/components/pages/collection.module.css";

/** The repeat-unit explainer and the four mounted swatches, lifted off the old
    collection page so the design category keeps that content. */
export function SwatchShowcase({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.collection;
  void lang;

  return (
    <section className="section">
      <div className="container">
        <SectionHead
          index="00"
          en={t.repeatHead.en}
          note={t.repeatHead.note}
          title={t.repeatHead.title}
        />

        <div className={`duo ${styles.legend}`}>
          <Reveal className="prose">
            <p className="lead">{t.repeatLead}</p>
            <p>{t.repeatBody}</p>
          </Reveal>

          <Reveal className={styles.legendAside} delay={70}>
            <p>{t.repeatAside}</p>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {d.categories.map((item, i) => (
            <li key={item.code}>
              <Reveal delay={i * 70}>
                <article className={styles.card}>
                  <div className={styles.mount}>
                    <span className={styles.hole} aria-hidden="true" />
                    <div className={`${styles.art} ${item.swatch}`} aria-hidden="true">
                      <span className={styles.repeatBox} />
                      <span className={styles.repeatLabel}>{t.repeatLabel}</span>
                    </div>
                    <p className={styles.mountFoot} aria-hidden="true">
                      <span>{item.code}</span>
                      <span>{t.selvedge}</span>
                    </p>
                  </div>

                  <div className={styles.meta}>
                    <h3 className={styles.name}>
                      {item.en}
                      <span className={styles.nameKo}>{item.name}</span>
                    </h3>
                    <p className={styles.description}>{item.description}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
