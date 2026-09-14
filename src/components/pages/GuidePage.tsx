import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { audiences, guidePages } from "@/content/guide";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

export function GuidePage({ lang, d, info }: Props) {
  const to = (path: string) => localePath(lang, path);
  const ko = lang === "ko";

  return (
    <>
      <PageIntro
        en="GUIDE"
        imageSrc="/images/crayon-store-wide.jpg"
        imagePosition="center 46%"
        title={ko ? <>처음 오셨나요?<br />이렇게 시작하세요.</> : <>New here?<br />Start with this.</>}
        lead={
          ko
            ? "브랜드도, 개인 제작자도 같은 원단을 씁니다. 필요한 만큼, 맞는 방법으로 안내해 드립니다."
            : "Brands and individual makers use the same cloth. We guide you to the right amount, the right way."
        }
      />
      <GuideNav lang={lang} d={d} current="hub" />

      <section className="section">
        <div className="container">
          <SectionHead index="01" en="WHO ARE YOU BUYING FOR" title={ko ? "두 가지 길이 있습니다." : "Two ways in."} />
          <div className={styles.audience}>
            {audiences.map((a, i) => (
              <Reveal className={styles.audienceCol} delay={i * 40} key={a.id}>
                <p className={styles.audienceEn}>{a.en}</p>
                <h3 className={styles.audienceTitle}>{pick(a.title, lang)}</h3>
                <p className={styles.audienceLead}>{pick(a.lead, lang)}</p>
                <ul className={styles.audienceList}>
                  {a.points.map((p) => (
                    <li key={p.en}>{pick(p, lang)}</li>
                  ))}
                </ul>
                <div className={styles.audienceLinks}>
                  {a.links.map((l) => (
                    <Link className="arrow-link" href={to(l.href)} key={l.href}>
                      {pick(l.label, lang)}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                  {a.id === "personal" && info.storeUrl ? (
                    <a className="arrow-link" href={info.storeUrl} target="_blank" rel="noreferrer">
                      {d.guide.store}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHead index="02" en="GUIDES" title={ko ? "궁금한 것부터 보세요." : "Pick what you need."} />
          <div className={styles.cards}>
            {guidePages.map((g, i) => (
              <Reveal delay={i * 30} key={g.slug}>
                <Link className={styles.card} href={to(g.href)}>
                  <span className={styles.cardEn}>{g.en}</span>
                  <span className={styles.cardTitle}>{pick(g.title, lang)}</span>
                  <span className={styles.cardSummary}>{pick(g.summary, lang)}</span>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {ko ? (
                <>고르기 어려우면 용도만 말씀해 주세요.<br />나머지는 함께 좁혀 드립니다.</>
              ) : (
                <>If choosing is hard, just tell us the use.<br />We narrow the rest down together.</>
              )}
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
            {info.kakaoUrl ? (
              <a className="arrow-link" href={info.kakaoUrl} target="_blank" rel="noreferrer">
                {d.guide.kakao}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
