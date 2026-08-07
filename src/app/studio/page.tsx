import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import styles from "./studio.module.css";

export const metadata: Metadata = {
  title: "디자인 스튜디오",
  description:
    "크레용은 자체 디자인 제도실을 운영하며 카피가 아닌 독자 개발 패턴을 제안합니다. 아이디어 구상부터 컬러웨이 전개까지의 과정을 소개합니다.",
};

const process = [
  {
    step: "01",
    en: "RESEARCH",
    title: "시장 리서치",
    description: "계절과 브랜드가 필요로 하는 방향을 동대문 현장에서 직접 확인합니다.",
  },
  {
    step: "02",
    en: "CONCEPT",
    title: "아이디어 구상",
    description: "모티프와 구성, 밀도를 정하고 손으로 초안을 그립니다.",
  },
  {
    step: "03",
    en: "PATTERN",
    title: "패턴 개발",
    description: "반복 단위를 다듬어 원단 위에서 이음매 없이 이어지도록 만듭니다.",
  },
  {
    step: "04",
    en: "COLORWAY",
    title: "컬러웨이 전개",
    description: "같은 패턴을 여러 색으로 전개해 선택의 폭을 넓힙니다.",
  },
];

const destinations = ["JAPAN", "TAIWAN", "EUROPE", "MIDDLE EAST"];

export default function StudioPage() {
  return (
    <>
      <PageIntro
        en="STUDIO"
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

      <section className="section-tight">
        <div className="container split">
          <Reveal>
            <p className="label label-ink">IN-HOUSE</p>
          </Reveal>

          <Reveal className={`prose ${styles.copy}`} delay={60}>
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
        </div>
      </section>

      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <Reveal className="split">
            <p className="label label-ink">PROCESS</p>
            <h2 className="heading">
              하나의 패턴이 원단이 되기까지
              <br className="wide-only" /> 네 단계를 거칩니다.
            </h2>
          </Reveal>

          <ol className={styles.process}>
            {process.map((item, i) => (
              <li key={item.step}>
                <Reveal className={styles.step} delay={i * 70}>
                  <p className={styles.stepNumber}>{item.step}</p>
                  <p className={styles.stepEn}>{item.en}</p>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepText}>{item.description}</p>
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
          <Reveal className="split">
            <p className={`label ${styles.labelLight}`}>GLOBAL SUPPLY</p>
            <h2 className={`heading ${styles.globalTitle}`}>
              서울에서 시작해
              <br />
              세계 시장으로.
            </h2>
          </Reveal>

          <Reveal className={styles.route} delay={70}>
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

          <Reveal className={`split ${styles.globalCopy}`} delay={130}>
            <span aria-hidden="true" />
            <div>
              <p>
                크레용의 텍스타일 디자인은 국내를 넘어 일본, 대만, 유럽, 중동 등 다양한
                해외 시장에 공급되고 있습니다. 서로 다른 시장과 취향을 이해하며 한국
                텍스타일 디자인의 경쟁력을 더 넓은 무대에 전하고 있습니다.
              </p>
              <Link className={`arrow-link ${styles.globalLink}`} href="/contact">
                수출 · 대량 공급 문의
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
