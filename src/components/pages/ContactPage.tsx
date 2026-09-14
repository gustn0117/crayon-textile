import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";
import { SectionHead } from "@/components/SectionHead";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { InquiryType } from "@/lib/inquiry";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./contact.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo; initialType?: InquiryType };

export function ContactPage({ lang, d, info, initialType }: Props) {
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
            <a className={styles.action} href={d.links.mobile}>
              <span className={styles.actionLabel}>CALL</span>
              <span className={styles.actionValue}>{d.phone.mobile}</span>
              <span className={styles.actionNote}>{t.callNote}</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>

            <a className={styles.action} href={d.links.email}>
              <span className={styles.actionLabel}>EMAIL</span>
              <span className={styles.actionValue}>{d.phone.email}</span>
              <span className={styles.actionNote}>{t.emailNote}</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section" id="inquiry">
        <div className="container">
          <SectionHead
            index="01"
            en={t.formHead.en}
            note={t.formHead.note}
            title={t.formHead.title}
            lead={d.inquiry.lead}
          />
          <Reveal>
            <InquiryForm
              lang={lang}
              t={d.inquiry}
              telHref={d.links.mobile}
              telLabel={`${d.guide.callCta} · ${d.phone.mobile}`}
              privacyHref={localePath(lang, "/privacy")}
              initialType={initialType}
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02"
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
                  <div>
                    <dt>{t.hoursLabel}</dt>
                    <dd>
                      <span>{d.phone.hours || d.hours.fallback}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>{t.transit.label}</dt>
                    <dd>
                      {t.transit.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* Optional in the admin page — no link, no button. */}
                {d.links.map ? (
                  <a
                    className={`arrow-link ${styles.mapLink}`}
                    href={d.links.map}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.mapLink}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {info.kakaoUrl ? (
                  <a className={`arrow-link ${styles.mapLink}`} href={info.kakaoUrl} target="_blank" rel="noreferrer">
                    {d.guide.kakao}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {info.storeUrl ? (
                  <a className={`arrow-link ${styles.mapLink}`} href={info.storeUrl} target="_blank" rel="noreferrer">
                    {d.guide.store}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </Reveal>

              <Reveal className={styles.visitAside} delay={70}>
                <p className={styles.visitNote}>{t.visitNote}</p>
                <a className="btn btn-ghost" href={d.links.tel}>
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
            index="03"
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
            <a className="btn btn-invert" href={d.links.mobile}>
              {d.phone.mobile}
              <span aria-hidden="true">↗</span>
            </a>
            <a className="arrow-link arrow-link-light" href={d.links.email}>
              {d.phone.email}
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
