import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { cautions, customMeta, customSteps, methodTable, prepItems } from "@/content/custom";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

export function CustomPage({ lang, d }: Props) {
  const to = (path: string) => localePath(lang, path);
  const ko = lang === "ko";

  return (
    <>
      <PageIntro
        en="CUSTOM PRINTING"
        imageSrc="/images/crayon-print-bed.jpg"
        imagePosition="center 50%"
        title={ko ? <>내 디자인을<br />원단으로.</> : <>Your design,<br />on cloth.</>}
        lead={pick(customMeta.description, lang)}
      />
      <GuideNav lang={lang} d={d} current="custom" />

      <section className="section">
        <div className="container">
          <div className={styles.block} id="process">
            <SectionHead index="01" en="PROCESS" title={ko ? "여섯 단계로 진행됩니다." : "Six steps."} />
            <ol className={`${styles.steps} ${styles.prose}`}>
              {customSteps.map((s, i) => (
                <Reveal className={styles.step} delay={i * 25} key={s.n}>
                  <span className={styles.stepN}>{s.n}</span>
                  <div>
                    <p className={styles.stepTitle}>{pick(s.title, lang)}</p>
                    <p className={styles.stepBody}>{pick(s.body, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className={styles.block} id="prepare">
            <SectionHead
              index="02"
              en="WHAT TO PREPARE"
              title={ko ? "준비해 주시면 빨라집니다." : "Bring these and it goes faster."}
              lead={ko ? "전부 없어도 됩니다. 있는 것부터 보내 주세요." : "You do not need all of it — send what you have."}
            />
            <Reveal className={styles.prose}>
              <ul className={styles.bullets}>
                {prepItems.map((p) => (
                  <li key={p.en}>{pick(p, lang)}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className={styles.block} id="method">
            <SectionHead
              index="03"
              en="CHOOSING A METHOD"
              title={ko ? "기법은 원단과 수량이 정합니다." : "Fabric and quantity choose the method."}
              lead={
                ko ? (
                  <>
                    각 기법의 자세한 설명은{" "}
                    <Link className="arrow-link" href={to("/guide/fabric#methods")}>
                      원단 가이드<span aria-hidden="true">→</span>
                    </Link>
                  </>
                ) : (
                  <>
                    Each method is explained in the{" "}
                    <Link className="arrow-link" href={to("/guide/fabric#methods")}>
                      fabric guide<span aria-hidden="true">→</span>
                    </Link>
                  </>
                )
              }
            />
            <Reveal className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{ko ? "기법" : "Method"}</th>
                    <th>{ko ? "적합 원단" : "Fabrics"}</th>
                    <th>{ko ? "장점" : "Strengths"}</th>
                    <th>{ko ? "수량" : "Volume"}</th>
                  </tr>
                </thead>
                <tbody>
                  {methodTable.map((r) => (
                    <tr key={r.method.en}>
                      <td>{pick(r.method, lang)}</td>
                      <td data-label={ko ? "적합 원단" : "Fabrics"}>{pick(r.fabric, lang)}</td>
                      <td data-label={ko ? "장점" : "Strengths"}>{pick(r.good, lang)}</td>
                      <td data-label={ko ? "수량" : "Volume"}>{pick(r.volume, lang)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>

          <div className={styles.block} id="notes">
            <SectionHead index="04" en="GOOD TO KNOW" title={ko ? "미리 알아두실 것." : "Before you start."} />
            <Reveal className={styles.prose}>
              <ul className={styles.bullets}>
                {cautions.map((c) => (
                  <li key={c.en}>{pick(c, lang)}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {ko ? <>도안이 있어도, 없어도<br />시작할 수 있습니다.</> : <>With artwork or without,<br />you can start today.</>}
            </blockquote>
          </Reveal>
          <Reveal className={styles.quick} delay={40}>
            <Link className="btn" href={to("/contact?type=custom")}>
              {d.guide.contactCta}
              <span aria-hidden="true">→</span>
            </Link>
            <a className="arrow-link" href={d.links.tel}>
              {d.guide.callCta} · {d.phone.tel}
            </a>
            <Link className="arrow-link" href={to("/studio")}>
              {d.nav.find((n) => n.href === "/studio")?.label}
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
