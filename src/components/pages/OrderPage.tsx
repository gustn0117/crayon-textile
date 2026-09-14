import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { order, orderMeta } from "@/content/order";
import type { Step } from "@/content/types";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

function Flow({ id, en, title, steps, lang }: { id: string; en: string; title: string; steps: Step[]; lang: Locale }) {
  return (
    <div className={styles.flow} id={id}>
      <p className={styles.flowHead}>{en}</p>
      <h3 className={styles.flowTitle}>{title}</h3>
      <ol className={styles.steps}>
        {steps.map((s, i) => (
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
  );
}

export function OrderPage({ lang, d, info }: Props) {
  const to = (path: string) => localePath(lang, path);
  const { wholesale, retail, policies } = order(info);
  const ko = lang === "ko";

  return (
    <>
      <PageIntro
        en="ORDER & DELIVERY"
        imageSrc="/images/crayon-warehouse-aisle.jpg"
        imagePosition="center 58%"
        title={ko ? <>주문과 배송,<br />이렇게 진행됩니다.</> : <>Ordering and delivery,<br />step by step.</>}
        lead={pick(orderMeta.description, lang)}
      />
      <GuideNav lang={lang} d={d} current="order" />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en="TWO WAYS TO BUY"
            title={ko ? "도매와 소량, 두 가지 절차." : "Wholesale and retail, two flows."}
          />
          <div className={styles.flows}>
            <Flow id="wholesale" en="WHOLESALE" title={ko ? "도매 · 롤 단위" : "Wholesale · by the roll"} steps={wholesale} lang={lang} />
            <Flow id="retail" en="RETAIL" title={ko ? "소량 · 매장 방문" : "Small quantities · in store"} steps={retail} lang={lang} />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHead index="02" en="TERMS" title={ko ? "결제 · 배송 · 샘플 · 교환." : "Payment, delivery, samples, returns."} />
          <div className={styles.policies}>
            {policies.map((p, i) => (
              <Reveal className={styles.policy} delay={i * 25} key={p.id}>
                <div id={p.id}>
                  <p className={styles.policyEn}>{p.en}</p>
                  <h3 className={styles.policyTitle}>{pick(p.title, lang)}</h3>
                  <p className={styles.policyBody}>{pick(p.body, lang)}</p>
                  {p.fromAdmin ? null : <p className={styles.policyNote}>{d.guide.consultNote}</p>}
                  {p.id === "retail" && info.storeUrl ? (
                    <div className={styles.policyLinks}>
                      <a className="arrow-link" href={info.storeUrl} target="_blank" rel="noreferrer">
                        {d.guide.store}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal>
            <blockquote className="statement">
              {ko ? <>수량과 용도를 알려주시면<br />조건을 바로 안내해 드립니다.</> : <>Tell us quantity and use<br />and we quote straight away.</>}
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
