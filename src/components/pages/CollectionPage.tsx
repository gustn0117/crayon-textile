import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./collection.module.css";

export function CollectionPage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.collection;

  return (
    <>
      <PageIntro
        en="COLLECTION"
        imageSrc="/images/crayon-collection-hero.jpg"
        imagePosition="center 52%"
        title={
          <>
            {t.introTitle[0]}
            <br />
            {t.introTitle[1]}
          </>
        }
        lead={t.introLead}
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
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
                      <h2 className={styles.name}>
                        {item.en}
                        <span className={styles.nameKo}>{item.name}</span>
                      </h2>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <p className="statement">
              {t.statement[0]}
              <br />
              {t.statement[1]}
            </p>
          </Reveal>
          <Reveal className="statement-meta" delay={70}>
            {t.statementMeta.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.guideSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en={t.chooseHead.en}
            note={t.chooseHead.note}
            title={t.chooseHead.title}
          />

          <div className={styles.guideGrid}>
            {t.guidance.map((item, i) => (
              <Reveal className={styles.guide} delay={i * 70} key={item.en}>
                <p className={styles.guideEn}>{item.en}</p>
                <h3 className={styles.guideTitle}>{item.title}</h3>
                <p className={styles.guideText}>{item.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.guideFoot}>
            <p className={styles.guideNote}>{t.chooseNote}</p>
            <Link className="arrow-link" href={localePath(lang, "/contact")}>
              {t.chooseCta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
