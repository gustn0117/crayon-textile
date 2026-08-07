import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "서울 동대문종합시장을 기반으로 30년간 나염 원단을 개발해 온 크레용의 경험과 일하는 방식을 소개합니다.",
};

const principles = [
  {
    en: "MARKET SENSE",
    title: "시장을 읽는 경험",
    description:
      "30년간 동대문 현장에서 쌓은 감각으로 지금 필요한 원단이 무엇인지 읽습니다.",
  },
  {
    en: "ORIGINALITY",
    title: "직접 만드는 패턴",
    description:
      "자체 디자인 제도실에서 아이디어 구상부터 패턴 개발까지 직접 관리합니다.",
  },
  {
    en: "COMMERCIAL BALANCE",
    title: "상품이 되는 디자인",
    description:
      "보기 좋은 감각을 넘어 대중성과 활용도까지 현실적으로 설계합니다.",
  },
];

const profile = [
  { term: "상호", value: "크레용 CRAYON" },
  { term: "소재지", value: `${contact.addressLines[0]} ${contact.addressLines[1]}` },
  { term: "취급 품목", value: "나염 프린트 원단, 텍스타일 패턴 디자인" },
  { term: "주요 분야", value: "여성복 · 아동복 · 캐주얼 · 침구 및 홈패브릭" },
  { term: "공급 지역", value: "대한민국, 일본, 대만, 유럽, 중동" },
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
        <div className="container split">
          <Reveal>
            <p className="label label-ink">ORIGIN</p>
          </Reveal>

          <Reveal className={`prose ${styles.origin}`} delay={60}>
            <p className="lead">
              30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로,
              트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을 제안합니다.
            </p>
            <p>
              원단은 완성된 옷의 인상을 가장 먼저 결정합니다. 크레용은 어떤 브랜드가 어떤
              계절에 무엇을 필요로 하는지를 현장에서 직접 확인하며, 그 답을 패턴으로
              옮깁니다.
            </p>
            <p>
              카피가 아닌 자체 개발 패턴을 중심으로 제안하기 때문에 같은 원단을 쓰는
              브랜드가 늘어나는 상황을 걱정하지 않아도 됩니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className="container">
          <Reveal>
            <blockquote className={styles.quote}>
              유행을 좇는 데 그치지 않고,
              <br />
              오래 선택받을 수 있는 패턴을 고민합니다.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="split">
            <p className="label label-ink">HOW WE WORK</p>
            <h2 className="heading">
              감각은 새롭게,
              <br className="wide-only" /> 제안은 현실적으로.
            </h2>
          </Reveal>

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
        <div className="container split">
          <Reveal>
            <p className="label label-ink">PROFILE</p>
          </Reveal>

          <Reveal delay={60}>
            <dl className={styles.profile}>
              {profile.map((row) => (
                <div className={styles.profileRow} key={row.term}>
                  <dt>{row.term}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

            <Link className={`arrow-link ${styles.profileLink}`} href="/collection">
              컬렉션 살펴보기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
