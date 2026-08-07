import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { categories } from "@/lib/site";
import styles from "./collection.module.css";

export const metadata: Metadata = {
  title: "컬렉션",
  description:
    "여성복, 아동복, 캐주얼, 침구 및 홈패브릭까지. 크레용이 개발하는 용도별 나염 원단 패턴을 소개합니다.",
};

const guidance = [
  {
    en: "SCALE",
    title: "스케일",
    description:
      "같은 도안이라도 리피트를 키우면 대담해지고, 줄이면 잔잔해집니다. 옷의 면적과 재단 방식에 따라 알맞은 크기가 달라집니다.",
  },
  {
    en: "DENSITY",
    title: "밀도",
    description:
      "모티프 사이의 여백이 원단의 인상을 좌우합니다. 촘촘하면 무늬가 색처럼 읽히고, 성기면 하나하나가 도드라집니다.",
  },
  {
    en: "COLORWAY",
    title: "컬러웨이",
    description:
      "하나의 패턴을 여러 색으로 전개하면 한 시즌 안에서 라인을 넓힐 수 있습니다. 배색에 따라 같은 도안도 전혀 다르게 보입니다.",
  },
];

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
          <SectionHead
            index="01"
            en="REPEAT UNIT"
            note="반복의 최소 단위가 패턴의 성격을 정합니다."
            title="모든 나염 패턴은 하나의 타일에서 시작합니다."
          />

          <div className={`duo ${styles.legend}`}>
            <Reveal className="prose">
              <p className="lead">
                나염 원단의 무늬는 작은 타일 하나가 이음매 없이 반복되며 완성됩니다. 아래
                스와치에 표시된 점선이 그 반복의 최소 단위, 리피트입니다.
              </p>
              <p>
                리피트를 어떻게 짜느냐에 따라 같은 모티프도 전혀 다른 원단이 됩니다. 이음이
                눈에 띄지 않게 맞물리도록 다듬는 일이 패턴 개발에서 가장 손이 많이 가는
                부분입니다.
              </p>
            </Reveal>

            <Reveal className={styles.legendAside} delay={70}>
              <p>
                아래 네 가지는 크레용이 개발하는 분야와 그 방향을 보여주는 콘셉트입니다.
                실제 보유 디자인과 컬러웨이는 상담 시 안내해 드립니다.
              </p>
            </Reveal>
          </div>

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
        </div>
      </section>

      <section className={`section ${styles.guideSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en="HOW TO CHOOSE"
            note="상담 전에 알아두시면 좋은 세 가지."
            title="같은 도안도 이 셋에 따라 달라집니다."
          />

          <div className={styles.guideGrid}>
            {guidance.map((item, i) => (
              <Reveal className={styles.guide} delay={i * 70} key={item.en}>
                <p className={styles.guideEn}>{item.en}</p>
                <h3 className={styles.guideTitle}>{item.title}</h3>
                <p className={styles.guideText}>{item.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.guideFoot}>
            <p className={styles.guideNote}>
              어떤 쪽이 맞을지 판단이 어려우시면 사용하실 옷의 종류와 참고 이미지를
              보내주세요. 함께 방향을 잡아드리겠습니다.
            </p>
            <Link className="arrow-link" href="/contact">
              용도별 원단 상담하기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
