import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { destinations } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./studio.module.css";

const roomImages = [
  "/images/crayon-designroom-floor.jpg",
  "/images/crayon-designroom-desks.jpg",
  "/images/crayon-designroom-meeting.jpg",
];

const printingImages = [
  "/images/crayon-printing-table.jpg",
  "/images/crayon-printing-line.jpg",
];

export function StudioPage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.studio;

  return (
    <>
      <PageIntro
        en="STUDIO"
        imageSrc="/images/crayon-studio-hero.jpg"
        imagePosition="68% center"
        title={
          <>
            {t.introTitle[0]}
            <br />
            {t.introTitle[1]}
          </>
        }
        lead={t.introLead}
      />

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <figure className={styles.figure}>
              <div className={styles.figureImage}>
                <Image
                  src="/images/crayon-design-studio.jpg"
                  alt={t.figureAlt}
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 90vw"
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <span>DESIGN PROCESS</span>
                <span>FROM IDEA TO TEXTILE</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en={t.inhouseHead.en}
            note={t.inhouseHead.note}
            title={t.inhouseHead.title}
          />

          <div className="duo">
            <Reveal className="prose">
              <p className="lead">{t.inhouseLead}</p>
              <p>{t.inhouseBody}</p>
            </Reveal>

            <Reveal delay={70}>
              <dl className="facts">
                {t.assurances.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className={styles.room}>
            <figure className={styles.roomMain}>
              <Image
                src={roomImages[0]}
                alt={t.roomAlts[0]}
                fill
                sizes="(max-width: 760px) 100vw, 60vw"
              />
            </figure>
            {roomImages.slice(1).map((src, i) => (
              <figure className={styles.roomSide} key={src}>
                <Image
                  src={src}
                  alt={t.roomAlts[i + 1]}
                  fill
                  sizes="(max-width: 760px) 100vw, 30vw"
                />
              </figure>
            ))}
          </Reveal>

          <Reveal>
            <p className={styles.roomCaption}>
              <span>DESIGN ROOM</span>
              <span>{t.roomCaption}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en={t.processHead.en}
            note={t.processHead.note}
            title={t.processHead.title}
          />

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

          <Reveal>
            <p className={styles.note}>{t.processNote}</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="03"
            en={t.printingHead.en}
            note={t.printingHead.note}
            title={t.printingHead.title}
            lead={t.printingHead.lead}
          />

          <div className={styles.printing}>
            {printingImages.map((src, i) => (
              <Reveal delay={i * 80} key={src}>
                <figure className={styles.printFigure}>
                  <div className={styles.printImage}>
                    <Image
                      src={src}
                      alt={t.printingAlts[i]}
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                    />
                  </div>
                  <figcaption>
                    <span>{i === 0 ? "ON THE TABLE" : "PRINTING LINE"}</span>
                    <span>{t.printingCaptions[i]}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.globalSection}>
        <div className="container">
          <SectionHead
            index="04"
            en={t.globalHead.en}
            note={t.globalHead.note}
            title={
              <>
                {t.globalHead.title[0]}
                <br />
                {t.globalHead.title[1]}
              </>
            }
            lead={t.globalHead.lead}
            light
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

          <Reveal className={styles.globalFoot} delay={80}>
            <p>{t.globalNote}</p>
            <Link
              className={`arrow-link arrow-link-light ${styles.globalLink}`}
              href={localePath(lang, "/contact")}
            >
              {t.globalCta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
