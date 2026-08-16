import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./about.module.css";

export function AboutPage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.about;
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      <PageIntro
        en="ABOUT"
        imageSrc="/images/crayon-about-hero.jpg"
        imagePosition="center 54%"
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
            en={t.originHead.en}
            note={t.originHead.note}
            title={t.originHead.title}
          />

          <div className="duo">
            <Reveal className="prose">
              <p className="lead">{t.originLead}</p>
              {t.originBody.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </Reveal>

            <Reveal className={styles.stanceWrap} delay={70}>
              {t.stance.map((group) => (
                <div className={styles.stance} key={group.label}>
                  <p className={styles.stanceLabel}>{group.label}</p>
                  <ul className={styles.stanceList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {t.statement[0]}
              <br />
              {t.statement[1]}
            </blockquote>
          </Reveal>
          <Reveal className="statement-meta" delay={70}>
            {t.statementMeta.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02"
            en={t.workHead.en}
            note={t.workHead.note}
            title={t.workHead.title}
          />

          <div className={styles.principles}>
            {d.principles.map((item, i) => (
              <Reveal className={styles.principle} delay={i * 70} key={item.en}>
                <p className={styles.principleEn}>{item.en}</p>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleText}>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.pressSection}`}>
        <div className="container">
          <SectionHead
            index="03"
            en={t.pressHead.en}
            note={t.pressHead.note}
            title={t.pressHead.title}
            lead={t.pressHead.lead}
          />

          <Reveal>
            <figure className={styles.press}>
              <div className={styles.pressPlayer}>
                <video
                  controls
                  preload="metadata"
                  playsInline
                  poster="/video/crayon-kbs-docu-poster.jpg"
                >
                  <source src="/video/crayon-kbs-docu.mp4" type="video/mp4" />
                  {t.videoFallback}
                </video>
              </div>
              <figcaption className={styles.pressCaption}>
                {t.pressCaption.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.profileSection}`}>
        <div className="container">
          <SectionHead index="04" en={t.profileHead.en} note={t.profileHead.note} />

          <div className="duo">
            <Reveal>
              <dl className="facts">
                {t.profile.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className={styles.profileAside} delay={70}>
              <p className={styles.profileNote}>{t.profileNote}</p>
              <div className={styles.profileLinks}>
                <Link className="arrow-link" href={to("/collection")}>
                  {t.profileLinks[0]}
                  <span aria-hidden="true">→</span>
                </Link>
                <Link className="arrow-link" href={to("/contact")}>
                  {t.profileLinks[1]}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
