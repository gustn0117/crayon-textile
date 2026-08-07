import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { categories, contact } from "@/lib/site";
import styles from "./page.module.css";

const figures = [
  { value: "30", unit: "YEARS", note: "동대문 현장 경험" },
  { value: "1,000+", unit: "DESIGNS", note: "누적 디자인 개발" },
  { value: "IN-HOUSE", unit: "STUDIO", note: "자체 디자인 제도실 운영" },
  { value: "GLOBAL", unit: "SUPPLY", note: "국내외 텍스타일 공급" },
];

const processSteps = ["RESEARCH", "CONCEPT", "PATTERN", "COLORWAY"];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/images/crayon-textile-hero.jpg"
            alt=""
            fill
            preload
            sizes="100vw"
          />
          <div className={styles.heroScrim} />
        </div>

        <div className={`container ${styles.heroInner}`}>
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
              원단의 가치를 만듭니다.
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.heroLead}>
              서울 동대문에서 30년간 나염 원단을 개발해 온 크레용. 자체 디자인실의
              독창적인 패턴으로 상품의 가능성을 넓힙니다.
            </p>
          </Reveal>

          <Reveal className={styles.heroActions} delay={210}>
            <Link className="btn btn-invert" href="/contact">
              원단 · 패턴 상담하기
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="arrow-link arrow-link-light" href="/collection">
              컬렉션 보기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className={styles.heroCue} aria-hidden="true">
            <span>SCROLL</span>
            <i />
          </div>
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

      <section className="section">
        <div className={`container ${styles.aboutGrid}`}>
          <Reveal className={styles.aboutCopy}>
            <p className="label label-ink">ABOUT CRAYON</p>
            <h2 className={`heading ${styles.aboutTitle}`}>
              시장을 이해하는 경험,
              <br />
              상품을 완성하는 디자인.
            </h2>
            <div className={`prose ${styles.aboutProse}`}>
              <p>
                크레용은 서울 동대문종합시장을 기반으로 여성복, 아동복, 캐주얼, 침구용 등
                다양한 분야의 프린트 원단을 개발해 왔습니다.
              </p>
              <p>
                30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로,
                트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을
                제안합니다.
              </p>
            </div>
            <Link className={`arrow-link ${styles.aboutLink}`} href="/about">
              회사 소개 자세히 보기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <Reveal className={styles.aboutVisual} delay={80}>
            <div className={styles.aboutImage}>
              <Image
                src="/images/crayon-design-studio.jpg"
                alt="패턴 도안과 컬러칩, 원단 샘플을 검토하는 크레용 디자인 스튜디오"
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
              />
            </div>
            <p className={styles.aboutCaption}>
              <span>DESIGN PROCESS</span>
              <span>FROM IDEA TO TEXTILE</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.business}`}>
        <div className="container">
          <Reveal className={`split ${styles.businessHead}`}>
            <p className="label label-ink">BUSINESS</p>
            <div>
              <h2 className="heading">네 갈래의 원단을 다룹니다.</h2>
              <p className={styles.businessLead}>
                찾으시는 용도와 분위기를 알려주시면 알맞은 원단과 패턴을 함께 제안합니다.
              </p>
            </div>
          </Reveal>

          <ul className={styles.businessGrid}>
            {categories.map((item, i) => (
              <li key={item.code}>
                <Reveal delay={i * 60}>
                  <Link className={styles.businessCard} href="/collection">
                    <span className={styles.businessArt} aria-hidden="true">
                      <span className={`${styles.businessArtInner} ${item.swatch}`} />
                    </span>
                    <span className={styles.businessCode}>{item.code}</span>
                    <span className={styles.businessName}>{item.en}</span>
                    <span className={styles.businessKo}>{item.ko}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className={styles.businessFoot}>
            <Link className="arrow-link" href="/collection">
              컬렉션 전체 보기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className={`section ${styles.studio}`}>
        <div className="container split">
          <Reveal>
            <p className={`label ${styles.studioLabel}`}>STUDIO</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="heading">
              직접 그린 패턴으로
              <br className="wide-only" /> 더 안심할 수 있는 선택.
            </h2>
            <p className={styles.studioLead}>
              자체 디자인 제도실을 운영하며 브랜드 모방이나 카피가 아닌 독자 개발 패턴을
              중심으로 제안합니다. 아이디어 구상부터 컬러웨이 전개까지 직접 관리합니다.
            </p>

            <ol className={styles.studioSteps}>
              {processSteps.map((step, i) => (
                <li key={step}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>

            <Link
              className={`arrow-link arrow-link-light ${styles.studioLink}`}
              href="/studio"
            >
              디자인 스튜디오 보기
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
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
