import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { destinations, processSteps } from "@/lib/site";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "디자인 스튜디오",
  description:
    "크레용은 자체 디자인 제도실을 운영하며 카피가 아닌 독자 개발 패턴을 제안합니다. 아이디어 구상부터 컬러웨이 전개까지의 과정을 소개합니다.",
};

const assurances = [
  { term: "개발 주체", value: "자체 디자인 제도실" },
  { term: "패턴 출처", value: "독자 개발 (외부 도안 카피 없음)" },
  { term: "전개 범위", value: "패턴 개발 · 컬러웨이 전개" },
  { term: "사용 범위", value: "디자인별 상담 시 안내" },
];

export default function StudioPage() {
  return (
    <>
      <PageIntro
        en="STUDIO"
        imageSrc="/images/crayon-studio-hero.jpg"
        imagePosition="68% center"
        title={
          <>
            직접 그린 패턴으로
            <br />
            더 안심할 수 있는 선택.
          </>
        }
        lead="크레용은 자체 디자인 제도실을 운영하며 브랜드 모방이나 카피가 아닌 독자 개발 패턴을 중심으로 제안합니다."
      />

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <figure className={styles.figure}>
              <div className={styles.figureImage}>
                <Image
                  src="/images/crayon-design-studio.jpg"
                  alt="패턴 도안과 컬러칩, 원단 샘플을 검토하는 크레용 디자인 스튜디오"
                  fill
                  loading="eager"
                  sizes="(max-width: 900px) 100vw, 90vw"
                />
              </div>
              <figcaption className={styles.figureCaption}>
                <span>DESIGN PROCESS</span>
                <span>FROM IDEA TO TEXTILE</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en="IN-HOUSE"
            note="아이디어부터 패턴까지 직접 관리합니다."
            title="사들인 도안을 그대로 옮기지 않습니다."
          />

          <div className="duo">
            <Reveal className="prose">
              <p className="lead">
                아이디어 구상부터 패턴 개발까지 직접 관리하여 크레용만의 감도와 차별성을
                원단에 담습니다.
              </p>
              <p>
                외부에서 사들인 도안을 그대로 옮기지 않기 때문에 같은 패턴이 시장에 흩어져
                있을 위험이 적습니다. 필요한 경우 브랜드의 요청에 맞춰 밀도나 모티프를
                조정한 변형본도 함께 개발합니다.
              </p>
            </Reveal>

            <Reveal delay={70}>
              <dl className="facts">
                {assurances.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en="PROCESS"
            note="하나의 패턴이 원단이 되기까지."
            title="네 단계를 거쳐 원단이 됩니다."
          />

          <ol className={styles.process}>
            {processSteps.map((item, i) => (
              <li key={item.step}>
                <Reveal className={styles.step} delay={i * 60}>
                  <span className={styles.stepNumber}>{item.step}</span>
                  <span className={styles.stepEn}>{item.en}</span>
                  <b className={styles.stepTitle}>{item.title}</b>
                  <span className={styles.stepText}>{item.description}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <p className={styles.note}>
              ※ 디자인별 사용 범위와 독점 여부는 상담 시 안내해 드립니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.globalSection}>
        <div className="container">
          <SectionHead
            index="03"
            en="GLOBAL SUPPLY"
            note="서로 다른 시장과 취향을 이해합니다."
            title={
              <>
                서울에서 시작해
                <br />
                세계 시장으로.
              </>
            }
            lead="크레용의 텍스타일 디자인은 국내를 넘어 일본, 대만, 유럽, 중동 등 다양한 해외 시장에 공급되고 있습니다. 한국 텍스타일 디자인의 경쟁력을 더 넓은 무대에 전하고 있습니다."
            light
          />

          <Reveal className={styles.route}>
            <div className={styles.origin}>
              <span className={styles.originMark} aria-hidden="true" />
              <p className={styles.originName}>SEOUL</p>
              <p className={styles.originNote}>CRAYON · DONGDAEMUN</p>
            </div>

            <ul className={styles.destinations}>
              {destinations.map((place) => (
                <li key={place}>{place}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={styles.globalFoot} delay={80}>
            <p>수출 물량이나 대량 공급 조건도 상담을 통해 안내해 드립니다.</p>
            <Link className="arrow-link arrow-link-light" href="/contact">
              수출 · 대량 공급 문의
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
