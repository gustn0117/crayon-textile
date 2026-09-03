import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { contact } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./contact.module.css";

export function ContactPage({ d }: { lang: Locale; d: Dictionary }) {
  const t = d.contact;

  return (
    <>
      <PageIntro
        en="CONTACT"
        imageSrc="/images/crayon-store-tall.jpg"
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
          <Reveal className={styles.actions}>
            <a className={styles.action} href={contact.mobileHref}>
              <span className={styles.actionLabel}>CALL</span>
              <span className={styles.actionValue}>{d.phone.mobile}</span>
              <span className={styles.actionNote}>{t.callNote}</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>

            <a className={styles.action} href={contact.emailHref}>
              <span className={styles.actionLabel}>EMAIL</span>
              <span className={styles.actionValue}>{contact.email}</span>
              <span className={styles.actionNote}>{t.emailNote}</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en={t.visitHead.en}
            note={t.visitHead.note}
            title={t.visitHead.title}
          />

          <div className={styles.visitGrid}>
            <Reveal className={styles.storeVisual}>
              <figure className={styles.store}>
                <div className={styles.storeImage}>
                  <Image
                    src="/images/crayon-store.jpg"
                    alt={t.storeAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                </div>
                <figcaption className={styles.storeCaption}>
                  <span>CRAYON · D—2621</span>
                  <span>{t.storeCaption}</span>
                </figcaption>
              </figure>
            </Reveal>

            <div className={styles.visitInfo}>
              <Reveal delay={40}>
                <dl className="facts">
                  {t.details.map((row) => (
                    <div key={row.term}>
                      <dt>{row.term}</dt>
                      <dd>
                        {row.lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  className={`arrow-link ${styles.mapLink}`}
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.mapLink}
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>

              <Reveal className={styles.visitAside} delay={70}>
                <p className={styles.visitNote}>{t.visitNote}</p>
                <a className="btn btn-ghost" href={contact.telHref}>
                  {t.visitCta}
                  <span aria-hidden="true">↗</span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.checklistSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en={t.checklistHead.en}
            note={t.checklistHead.note}
            title={t.checklistHead.title}
            lead={t.checklistHead.lead}
          />

          <ol className={styles.checklist}>
            {t.checklist.map((item, i) => (
              <li key={item.step}>
                <Reveal className={styles.checkRow} delay={i * 30}>
                  <span className={styles.checkStep}>{item.step}</span>
                  <b className={styles.checkTerm}>{item.term}</b>
                  <span className={styles.checkText}>{item.description}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <Reveal>
            <p className={styles.closingLabel}>{t.closingLabel}</p>
            <p className={styles.closingTitle}>
              {t.closingTitle[0]}
              <br />
              {t.closingTitle[1]}
            </p>
          </Reveal>

          <Reveal className={styles.closingActions} delay={40}>
            <a className="btn btn-invert" href={contact.mobileHref}>
              {d.phone.mobile}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="arrow-link arrow-link-light" href={contact.emailHref}>
              {contact.email}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
