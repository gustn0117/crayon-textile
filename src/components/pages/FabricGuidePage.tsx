import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { care, conversions, fabricGuideMeta, materials, methods, quantityGuide, terms } from "@/content/fabricGuide";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

export function FabricGuidePage({ lang, d }: Props) {
  const to = (path: string) => localePath(lang, path);
  const ko = lang === "ko";
  const toc = [
    { id: "materials", label: ko ? "소재별 특징" : "Materials" },
    { id: "terms", label: ko ? "용어" : "Terms" },
    { id: "quantity", label: ko ? "필요 수량 계산" : "How much to buy" },
    { id: "care", label: ko ? "세탁 · 관리" : "Care" },
    { id: "methods", label: ko ? "나염 기법" : "Printing methods" },
  ];

  return (
    <>
      <PageIntro
        en="FABRIC GUIDE"
        imageSrc="/images/crayon-print-color.jpg"
        imagePosition="center 50%"
        title={ko ? <>원단을 고르기 전에<br />알아두면 좋은 것.</> : <>Worth knowing<br />before you choose.</>}
        lead={pick(fabricGuideMeta.description, lang)}
      />
      <GuideNav lang={lang} d={d} current="fabric" />

      <section className="section">
        <div className="container">
          <nav className={styles.toc} aria-label={d.guide.tocLabel}>
            {toc.map((t) => (
              <a href={`#${t.id}`} key={t.id}>
                {t.label}
              </a>
            ))}
          </nav>

          <div className={styles.block} id="materials">
            <SectionHead index="01" en="MATERIALS" title={ko ? "소재별 특징." : "What each material is like."} />
            <Reveal className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{ko ? "소재" : "Material"}</th>
                    <th>{ko ? "특징" : "Traits"}</th>
                    <th>{ko ? "관리" : "Care"}</th>
                    <th>{ko ? "원단 보기" : "See fabrics"}</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.id}>
                      <td>{pick(m.name, lang)}</td>
                      <td data-label={ko ? "특징" : "Traits"}>{pick(m.traits, lang)}</td>
                      <td data-label={ko ? "관리" : "Care"}>{pick(m.care, lang)}</td>
                      <td>
                        <Link className="arrow-link" href={to(m.href)}>
                          {ko ? "보기" : "View"}
                          <span aria-hidden="true">→</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>

          <div className={styles.block} id="terms">
            <SectionHead index="02" en="TERMS" title={ko ? "매장에서 쓰는 말." : "The words used in the shop."} />
            <dl className={styles.faqList}>
              {terms.map((t, i) => (
                <Reveal className={styles.faqItem} delay={i * 20} key={t.term.en}>
                  <dt className={styles.faqQ}>{pick(t.term, lang)}</dt>
                  <dd className={styles.faqA}>{pick(t.body, lang)}</dd>
                </Reveal>
              ))}
            </dl>
            <h3 className={styles.subhead}>{ko ? "환산" : "Conversions"}</h3>
            <ul className={styles.bullets} style={{ marginTop: 12 }}>
              {conversions.map((c) => (
                <li key={c.en}>{pick(c, lang)}</li>
              ))}
            </ul>
          </div>

          <div className={styles.block} id="quantity">
            <SectionHead index="03" en="HOW MUCH" title={ko ? "필요한 양 계산하기." : "Working out how much."} lead={pick(quantityGuide.lead, lang)} />
            <Reveal className={styles.prose}>
              <ol className={styles.numbered}>
                {quantityGuide.rules.map((r) => (
                  <li key={r.en}>{pick(r, lang)}</li>
                ))}
              </ol>
              <h3 className={styles.subhead}>{ko ? "참고치" : "Rules of thumb"}</h3>
              <ul className={styles.bullets} style={{ marginTop: 12 }}>
                {quantityGuide.examples.map((e) => (
                  <li key={e.en}>{pick(e, lang)}</li>
                ))}
              </ul>
              <p style={{ marginTop: 20 }}>{pick(quantityGuide.note, lang)}</p>
            </Reveal>
          </div>

          <div className={styles.block} id="care">
            <SectionHead index="04" en="CARE" title={ko ? "세탁과 관리." : "Washing and care."} />
            <div className={styles.policies}>
              {care.map((s, i) => (
                <Reveal className={styles.policy} delay={i * 25} key={s.id}>
                  <h3 className={styles.policyTitle}>{pick(s.title, lang)}</h3>
                  <ul className={styles.bullets} style={{ marginTop: 12 }}>
                    {s.bullets?.map((b) => (
                      <li key={b.en}>{pick(b, lang)}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={styles.block} id="methods">
            <SectionHead
              index="05"
              en="PRINTING METHODS"
              title={ko ? "나염 기법 다섯 가지." : "The five printing methods."}
              lead={ko ? "원단과 수량에 가장 맞는 기법을 제안합니다." : "We propose the method that fits the fabric and the quantity."}
            />
            <div className={styles.policies}>
              {methods.map((m, i) => (
                <Reveal className={styles.policy} delay={i * 25} key={m.id}>
                  <div id={m.id}>
                    <p className={styles.policyEn}>{m.name.en.toUpperCase()}</p>
                    <h3 className={styles.policyTitle}>{pick(m.name, lang)}</h3>
                    <p className={styles.policyBody}>{pick(m.body, lang)}</p>
                    <p className={styles.policyNote}>{pick(m.fit, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {ko ? <>내 디자인으로<br />나염하고 싶다면.</> : <>Want your own design<br />on cloth?</>}
            </blockquote>
          </Reveal>
          <Reveal className={styles.quick} delay={40}>
            <Link className="btn" href={to("/guide/custom")}>
              {d.guide.custom}
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="arrow-link" href={to("/contact")}>
              {d.guide.contactCta}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
