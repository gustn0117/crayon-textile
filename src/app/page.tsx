import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/site";
import styles from "./page.module.css";

const figures = [
  { value: "30", unit: "YEARS", note: "동대문 현장 경험" },
  { value: "1,000+", unit: "DESIGNS", note: "누적 디자인 개발" },
  { value: "IN-HOUSE", unit: "STUDIO", note: "자체 디자인 제도실 운영" },
  { value: "GLOBAL", unit: "SUPPLY", note: "국내외 텍스타일 공급" },
];

const index = [
  {
    href: "/about",
    en: "ABOUT",
    title: "시장을 이해하는 경험",
    description: "30년간 동대문 현장에서 쌓은 감각과 1,000개 이상의 디자인 개발 경험.",
  },
  {
    href: "/collection",
    en: "COLLECTION",
    title: "쓰임에 맞춘 패턴",
    description: "여성복, 아동복, 캐주얼, 홈패브릭까지 용도별로 원단을 제안합니다.",
  },
  {
    href: "/studio",
    en: "STUDIO",
    title: "직접 그리는 패턴",
    description: "자체 디자인 제도실에서 아이디어 구상부터 패턴 개발까지 관리합니다.",
  },
  {
    href: "/contact",
    en: "CONTACT",
    title: "원단 상담",
    description: "찾으시는 용도와 분위기를 알려주시면 알맞은 원단을 함께 찾아드립니다.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Reveal>
              <p className={styles.heroEyebrow}>
                <span>SEOUL · DONGDAEMUN</span>
                <span>30 YEARS OF PRINTED TEXTILE</span>
              </p>
            </Reveal>

            <Reveal delay={70}>
              <h1 className={`display-lg ${styles.heroTitle}`}>
                패턴의 차이가
                <br />
                원단의 가치를
                <br />
                만듭니다.
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className={styles.heroLead}>
                서울 동대문에서 30년간 나염 원단을 개발해 온 크레용. 자체 디자인실의
                독창적인 패턴으로 상품의 가능성을 넓힙니다.
              </p>
            </Reveal>

            <Reveal className={styles.heroActions} delay={210}>
              <Link className="btn btn-solid" href="/contact">
                원단 · 패턴 상담하기
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="arrow-link" href="/collection">
                컬렉션 보기
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>

          <Reveal className={styles.heroVisual} delay={120}>
            <div className={styles.heroImage}>
              <Image
                src="/images/crayon-textile-hero.jpg"
                alt="크레용이 개발한 오리지널 패턴이 인쇄된 텍스타일"
                fill
                preload
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
            <dl className={styles.heroCaption}>
              <div>
                <dt>ARCHIVE</dt>
                <dd>CR—2621</dd>
              </div>
              <div>
                <dt>TYPE</dt>
                <dd>ORIGINAL PATTERN</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className={styles.figures} aria-label="크레용 주요 지표">
        <div className={`container ${styles.figuresGrid}`}>
          {figures.map((item) => (
            <div className={styles.figure} key={item.unit}>
              <p className={styles.figureValue}>{item.value}</p>
              <p className={styles.figureUnit}>{item.unit}</p>
              <p className={styles.figureNote}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`section ${styles.indexSection}`}>
        <div className="container">
          <Reveal className={`split ${styles.indexHead}`}>
            <p className="label label-ink">INDEX</p>
            <h2 className="heading">
              크레용을 이루는 네 가지 이야기를
              <br className="wide-only" /> 나누어 담았습니다.
            </h2>
          </Reveal>

          <ul className={styles.indexList}>
            {index.map((item, i) => (
              <li key={item.href}>
                <Reveal delay={i * 60}>
                  <Link className={styles.indexRow} href={item.href}>
                    <span className={styles.indexEn}>{item.en}</span>
                    <span className={styles.indexBody}>
                      <strong className={styles.indexTitle}>{item.title}</strong>
                      <span className={styles.indexDescription}>{item.description}</span>
                    </span>
                    <span className={styles.indexArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <Reveal>
            <p className="label label-ink">NEW FABRIC, NEW POSSIBILITY</p>
            <h2 className={`display ${styles.closingTitle}`}>
              새로운 원단을
              <br />
              찾고 계신가요?
            </h2>
          </Reveal>

          <Reveal className={styles.closingSide} delay={80}>
            <p className={styles.closingNote}>
              원하는 용도와 분위기를 알려주세요. 크레용의 경험으로 함께 찾아드리겠습니다.
            </p>
            <div className={styles.closingActions}>
              <Link className="btn btn-solid" href="/contact">
                문의하기
                <span aria-hidden="true">↗</span>
              </Link>
              <a className="arrow-link" href={contact.telHref}>
                {contact.tel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
