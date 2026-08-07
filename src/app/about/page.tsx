import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { contact, principles } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "서울 동대문종합시장을 기반으로 30년간 나염 원단을 개발해 온 크레용의 경험과 일하는 방식을 소개합니다.",
};

const profile = [
  { term: "상호", value: "크레용 CRAYON" },
  { term: "소재지", value: `${contact.addressLines[0]} ${contact.addressLines[1]}` },
  { term: "취급 품목", value: "나염 프린트 원단, 텍스타일 패턴 디자인" },
  { term: "주요 분야", value: "여성복 · 아동복 · 캐주얼 · 침구 및 홈패브릭" },
  { term: "공급 지역", value: "대한민국, 일본, 대만, 유럽, 중동" },
  { term: "연락처", value: `T. ${contact.tel} / M. ${contact.mobile}` },
];

const stance = [
  {
    label: "합니다",
    items: [
      "자체 디자인 제도실에서 패턴을 직접 개발합니다.",
      "용도와 분위기를 듣고 그에 맞는 원단을 제안합니다.",
      "같은 패턴을 여러 컬러웨이로 전개합니다.",
      "국내는 물론 해외 시장에도 공급합니다.",
    ],
  },
  {
    label: "하지 않습니다",
    items: [
      "브랜드 디자인을 모방하거나 카피하지 않습니다.",
      "유행만 좇는 단발성 패턴에 기대지 않습니다.",
      "상품성을 확인하지 않은 디자인을 밀지 않습니다.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        en="ABOUT"
        title={
          <>
            시장을 이해하는 경험,
            <br />
            상품을 완성하는 디자인.
          </>
        }
        lead="크레용은 서울 동대문종합시장을 기반으로 여성복, 아동복, 캐주얼, 침구용 등 다양한 분야의 프린트 원단을 개발해 왔습니다."
      />

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en="ORIGIN"
            note="모든 제안은 현장에서 시작됩니다."
            title="원단은 옷의 인상을 가장 먼저 결정합니다."
          />

          <div className="duo">
            <Reveal className="prose">
              <p className="lead">
                30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로,
                트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을
                제안합니다.
              </p>
              <p>
                크레용은 어떤 브랜드가 어떤 계절에 무엇을 필요로 하는지를 동대문 현장에서
                직접 확인하며, 그 답을 패턴으로 옮깁니다. 매장에서 오가는 이야기, 실제로
                팔리는 원단, 다음 시즌에 준비해야 할 방향이 모두 개발의 재료가 됩니다.
              </p>
              <p>
                카피가 아닌 자체 개발 패턴을 중심으로 제안하기 때문에, 같은 원단을 쓰는
                브랜드가 늘어나는 상황을 걱정하지 않아도 됩니다.
              </p>
            </Reveal>

            <Reveal className={styles.stanceWrap} delay={70}>
              {stance.map((group) => (
                <div className={styles.stance} key={group.label}>
                  <p className={styles.stanceLabel}>{group.label}</p>
                  <ul className={styles.stanceList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className={`container ${styles.quoteInner}`}>
          <Reveal>
            <blockquote className={styles.quote}>
              유행을 좇는 데 그치지 않고,
              <br />
              오래 선택받을 수 있는 패턴을 고민합니다.
            </blockquote>
          </Reveal>
          <Reveal className={styles.quoteMeta} delay={70}>
            <span>CRAYON</span>
            <span>SEOUL · DONGDAEMUN · 2621</span>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="02"
            en="HOW WE WORK"
            note="감각은 새롭게, 제안은 현실적으로."
            title="크레용이 원단을 만드는 세 가지 기준."
          />

          <div className={styles.principles}>
            {principles.map((item, i) => (
              <Reveal className={styles.principle} delay={i * 70} key={item.en}>
                <p className={styles.principleEn}>{item.en}</p>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleText}>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.profileSection}`}>
        <div className="container">
          <SectionHead index="03" en="PROFILE" note="회사 개요" />

          <div className="duo">
            <Reveal>
              <dl className="facts">
                {profile.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal className={styles.profileAside} delay={70}>
              <p className={styles.profileNote}>
                더 궁금한 점이 있으시면 언제든 연락 주세요. 찾으시는 용도와 분위기를
                알려주시면 알맞은 원단을 함께 찾아드리겠습니다.
              </p>
              <div className={styles.profileLinks}>
                <Link className="arrow-link" href="/collection">
                  컬렉션 살펴보기
                  <span aria-hidden="true">→</span>
                </Link>
                <Link className="arrow-link" href="/contact">
                  문의하기
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
