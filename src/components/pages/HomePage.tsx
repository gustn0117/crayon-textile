import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { contact, destinations } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./home.module.css";

export function HomePage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.home;
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image src="/images/crayon-textile-hero.jpg" alt="" fill preload sizes="100vw" />
          <div className={styles.heroScrim} />
        </div>

        <div className={`container ${styles.heroInner}`}>
          <Reveal>
            <p className={styles.heroEyebrow}>
              {t.heroEyebrow.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className={`display-lg ${styles.heroTitle}`}>{t.heroTitle}</h1>
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.heroLead}>{t.heroLead}</p>
          </Reveal>

          <Reveal className={styles.heroActions} delay={210}>
            <Link className="btn btn-invert" href={to("/contact")}>
              {t.heroCtaContact}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="arrow-link arrow-link-light" href={to("/collection")}>
              {t.heroCtaCollection}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <div className={`container ${styles.heroFoot}`}>
          <ul className={styles.heroFields}>
            {d.categories.map((item) => (
              <li key={item.code}>
                <b>{item.en}</b>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          <div className={styles.heroCue} aria-hidden="true">
            <span>SCROLL</span>
            <i />
          </div>
        </div>
      </section>

      <section className={styles.figures} aria-label={t.figuresAria}>
        <div className={`container ${styles.figuresGrid}`}>
          {t.figures.map((item) => (
            <div className={styles.figure} key={item.unit}>
              <p className={styles.figureValue}>{item.value}</p>
              <p className={styles.figureUnit}>{item.unit}</p>
              <p className={styles.figureNote}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en={t.aboutHead.en}
            note={t.aboutHead.note}
            title={
              <>
                {t.aboutHead.title[0]}
                <br />
                {t.aboutHead.title[1]}
              </>
            }
          />

          <div className={styles.aboutGrid}>
            <Reveal className={styles.aboutCopy}>
              <div className={`prose ${styles.aboutProse}`}>
                <p className="lead">{t.aboutLead}</p>
                <p>{t.aboutBody}</p>
              </div>

              <dl className={`facts ${styles.aboutFacts}`}>
                {t.overview.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>

              <Link className={`arrow-link ${styles.aboutLink}`} href={to("/about")}>
                {t.aboutMore}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal className={styles.aboutVisual} delay={80}>
              <div className={styles.aboutImage}>
                <Image
                  src="/images/crayon-design-studio.jpg"
                  alt={t.studioAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 44vw"
                />
              </div>
              <p className={styles.aboutCaption}>
                <span>DESIGN PROCESS</span>
                <span>FROM IDEA TO TEXTILE</span>
              </p>

              <ul className={styles.principleList}>
                {d.principles.map((item) => (
                  <li key={item.en}>
                    <span>{item.en}</span>
                    <b>{item.title}</b>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.business}`}>
        <div className="container">
          <SectionHead
            index="02"
            en={t.businessHead.en}
            note={t.businessHead.note}
            title={t.businessHead.title}
            lead={t.businessHead.lead}
          />

          <ul className={styles.businessGrid}>
            {d.categories.map((item, i) => (
              <li key={item.code}>
                <Reveal delay={i * 60}>
                  <Link className={styles.businessCard} href={to("/collection")}>
                    <span className={styles.businessArt} aria-hidden="true">
                      <span className={`${styles.businessArtInner} ${item.swatch}`} />
                    </span>
                    <span className={styles.businessCode}>{item.code}</span>
                    <span className={styles.businessName}>{item.en}</span>
                    <span className={styles.businessKo}>{item.name}</span>
                    <span className={styles.businessNote}>{item.description}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className={styles.businessFoot}>
            <Link className="arrow-link" href={to("/collection")}>
              {t.businessMore}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.studio}`}>
        <div className="container">
          <SectionHead
            index="03"
            en={t.studioHead.en}
            note={t.studioHead.note}
            title={
              <>
                {t.studioHead.title[0]}
                <br />
                {t.studioHead.title[1]}
              </>
            }
            lead={t.studioHead.lead}
            light
          />

          <Reveal className={styles.studioVisual}>
            <div className={styles.studioImage}>
              <Image
                src="/images/crayon-printing-table.jpg"
                alt={t.printingAlt}
                fill
                sizes="100vw"
              />
            </div>
            <p className={styles.studioCaption}>
              <span>ON THE TABLE</span>
              <span>{t.printingCaption}</span>
            </p>
          </Reveal>

          <ol className={styles.process}>
            {d.processSteps.map((item, i) => (
              <li key={item.step}>
                <Reveal className={styles.step} delay={i * 60}>
                  <span className={styles.stepNumber}>{item.step}</span>
                  <span className={styles.stepEn}>{item.en}</span>
                  <b className={styles.stepTitle}>{item.title}</b>
                  <span className={styles.stepText}>{item.description}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className={styles.studioFoot}>
            <p className={styles.studioNote}>{t.studioNote}</p>
            <Link className="arrow-link arrow-link-light" href={to("/studio")}>
              {t.studioMore}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="04"
            en={t.globalHead.en}
            note={t.globalHead.note}
            title={t.globalHead.title}
            lead={t.globalHead.lead}
          />

          <Reveal className={styles.route}>
            <div className={styles.origin}>
              <span className={styles.originMark} aria-hidden="true" />
              <p className={styles.originName}>SEOUL</p>
              <p className={styles.originNote}>CRAYON · DONGDAEMUN</p>
            </div>

            <ul className={styles.destinations}>
              {destinations.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <Reveal>
            <p className="label label-ink">{t.closingLabel}</p>
            <h2 className={`display ${styles.closingTitle}`}>
              {t.closingTitle[0]}
              <br />
              {t.closingTitle[1]}
            </h2>
          </Reveal>

          <Reveal className={styles.closingSide} delay={80}>
            <p className={styles.closingNote}>{t.closingNote}</p>
            <div className={styles.closingActions}>
              <Link className="btn btn-solid" href={to("/contact")}>
                {t.closingCta}
                <span aria-hidden="true">↗</span>
              </Link>
              <a className="arrow-link" href={contact.telHref}>
                {d.phone.tel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
