import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { faq, faqMeta } from "@/content/faq";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

export function FaqPage({ lang, d, info }: Props) {
  const to = (path: string) => localePath(lang, path);
  const groups = faq(info);
  const ko = lang === "ko";

  return (
    <>
      <PageIntro
        en="FAQ"
        imageSrc="/images/crayon-store.jpg"
        imagePosition="center 42%"
        title={ko ? <>자주 묻는<br />질문.</> : <>Frequently asked<br />questions.</>}
        lead={pick(faqMeta.description, lang)}
      />
      <GuideNav lang={lang} d={d} current="faq" />

      <section className="section">
        <div className="container">
          <nav className={styles.toc} aria-label={d.guide.tocLabel}>
            {groups.map((g) => (
              <a href={`#${g.id}`} key={g.id}>
                {pick(g.title, lang)}
              </a>
            ))}
          </nav>

          {groups.map((g, gi) => (
            <div className={`${styles.faqGroup} ${styles.block}`} id={g.id} key={g.id}>
              <SectionHead index={String(gi + 1).padStart(2, "0")} en={g.en} title={pick(g.title, lang)} />
              {/* Every answer is on the page, not behind a toggle — buyers search
                  these pages, and readers who are not 25 should not have to hunt. */}
              <dl className={styles.faqList}>
                {g.items.map((item, i) => (
                  <Reveal className={styles.faqItem} delay={i * 20} key={item.id}>
                    <dt className={styles.faqQ} id={item.id}>
                      {pick(item.q, lang)}
                    </dt>
                    <dd className={styles.faqA}>
                      {pick(item.a, lang)}
                      {item.links?.length ? (
                        <div className={styles.faqLinks}>
                          {item.links.map((l) =>
                            /^https?:/.test(l.href) ? (
                              <a className="arrow-link" href={l.href} target="_blank" rel="noreferrer" key={l.href}>
                                {pick(l.label, lang)}
                                <span aria-hidden="true">↗</span>
                              </a>
                            ) : (
                              <Link className="arrow-link" href={to(l.href)} key={l.href}>
                                {pick(l.label, lang)}
                                <span aria-hidden="true">→</span>
                              </Link>
                            ),
                          )}
                        </div>
                      ) : null}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {ko ? <>여기 없는 질문은<br />바로 물어보세요.</> : <>Not answered here?<br />Just ask.</>}
            </blockquote>
          </Reveal>
          <Reveal className={styles.quick} delay={40}>
            <Link className="btn" href={to("/contact")}>
              {d.guide.contactCta}
              <span aria-hidden="true">→</span>
            </Link>
            <a className="arrow-link" href={d.links.tel}>
              {d.guide.callCta} · {d.phone.tel}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
