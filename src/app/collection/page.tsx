import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { categories } from "@/lib/site";
import styles from "./collection.module.css";

export const metadata: Metadata = {
  title: "컬렉션",
  description:
    "여성복, 아동복, 캐주얼, 침구 및 홈패브릭까지. 크레용이 개발하는 용도별 나염 원단 패턴을 소개합니다.",
};

export default function CollectionPage() {
  return (
    <>
      <PageIntro
        en="COLLECTION"
        title={
          <>
            다양한 쓰임에 맞춘
            <br />
            네 갈래의 패턴.
          </>
        }
        lead="찾으시는 용도와 분위기를 알려주시면 알맞은 원단과 패턴을 함께 제안합니다."
      />

      <section className="section">
        <div className="container">
          <Reveal className={`split ${styles.legend}`}>
            <p className="label label-ink">REPEAT UNIT</p>
            <p className={styles.legendText}>
              모든 나염 패턴은 하나의 작은 타일이 이음매 없이 반복되며 완성됩니다. 아래
              스와치에 표시된 점선이 그 반복의 최소 단위입니다.
            </p>
          </Reveal>

          <ul className={styles.grid}>
            {categories.map((item, i) => (
              <li key={item.code}>
                <Reveal delay={i * 70}>
                  <article className={styles.card}>
                    <div className={`${styles.art} ${item.swatch}`} aria-hidden="true">
                      <span className={styles.repeatBox} />
                      <span className={styles.repeatLabel}>REPEAT UNIT</span>
                    </div>

                    <div className={styles.meta}>
                      <p className={styles.code}>{item.code}</p>
                      <h2 className={styles.name}>
                        {item.en}
                        <span className={styles.nameKo}>{item.ko}</span>
                      </h2>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className={`split ${styles.footnote}`}>
            <p className="label">NOTE</p>
            <div>
              <p className={styles.footnoteText}>
                보고 계신 패턴은 크레용의 디자인 방향을 표현한 콘셉트입니다. 실제 보유
                디자인과 컬러웨이는 상담 시 안내해 드립니다.
              </p>
              <Link className={`arrow-link ${styles.footnoteLink}`} href="/contact">
                용도별 원단 상담하기
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
