import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SiteHeader } from "@/components/SiteHeader";

const collections = [
  {
    code: "CR—WOMEN / 01",
    en: "WOMEN",
    ko: "여성복",
    description: "계절의 감도와 실용성을 함께 고려한 섬세한 패턴",
    pattern: "pattern-women",
  },
  {
    code: "CR—KIDS / 02",
    en: "KIDS",
    ko: "아동복",
    description: "밝고 생동감 있는 컬러와 자유로운 모티프",
    pattern: "pattern-kids",
  },
  {
    code: "CR—CASUAL / 03",
    en: "CASUAL",
    ko: "캐주얼",
    description: "일상의 옷에 자연스럽게 스며드는 균형 잡힌 디자인",
    pattern: "pattern-casual",
  },
  {
    code: "CR—HOME / 04",
    en: "HOME",
    ko: "침구 · 홈패브릭",
    description: "공간의 분위기를 완성하는 편안한 반복 패턴",
    pattern: "pattern-home",
  },
];

const principles = [
  {
    number: "01",
    en: "MARKET SENSE",
    title: "시장을 읽는 경험",
    description: "30년간 동대문 현장에서 쌓은 감각으로 지금 필요한 원단을 읽습니다.",
  },
  {
    number: "02",
    en: "ORIGINALITY",
    title: "직접 만드는 패턴",
    description: "자체 디자인 제도실에서 아이디어부터 패턴 개발까지 직접 관리합니다.",
  },
  {
    number: "03",
    en: "COMMERCIAL BALANCE",
    title: "상품이 되는 디자인",
    description: "보기 좋은 감각을 넘어 대중성과 활용도까지 현실적으로 설계합니다.",
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M4 12h15m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" id="top">
          <div className="hero__texture" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__copy">
              <Reveal>
                <p className="eyebrow">
                  <span>SEOUL · DONGDAEMUN</span>
                  <span>TEXTILE STUDIO</span>
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1>
                  패턴의 차이가
                  <br />
                  원단의 <em>가치</em>를
                  <br />
                  만듭니다.
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="hero__description">
                  서울 동대문에서 30년간 나염 원단을 개발해 온 크레용.
                  <br className="desktop-only" /> 자체 디자인실의 독창적인 패턴으로
                  상품의 가능성을 넓힙니다.
                </p>
              </Reveal>

              <Reveal className="hero__actions" delay={220}>
                <a className="button button--primary" href="#contact">
                  원단 · 패턴 상담하기
                  <Arrow diagonal />
                </a>
                <a className="text-link" href="#about">
                  크레용 알아보기
                  <Arrow />
                </a>
              </Reveal>
            </div>

            <Reveal className="hero__visual" delay={130}>
              <div className="hero__image-wrap">
                <Image
                  src="/images/crayon-textile-hero.jpg"
                  alt="다양한 오리지널 패턴이 인쇄된 크레용의 텍스타일 이미지"
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 57vw"
                />
              </div>
              <div className="specimen-tag">
                <span>ORIGINAL PATTERN</span>
                <b>CR—ARCHIVE 2621</b>
                <i>SEOUL / 30 YEARS</i>
              </div>
              <div className="hero__stitch" aria-hidden="true">
                ✦
              </div>
            </Reveal>
          </div>

          <div className="hero__bottom container">
            <span className="hero__scroll">SCROLL TO EXPLORE</span>
            <span className="hero__index">01 / 06</span>
          </div>
        </section>

        <section className="proof-strip" aria-label="크레용 주요 성과">
          <div className="container proof-strip__inner">
            <div className="proof-item">
              <strong>30</strong>
              <span>YEARS</span>
              <p>동대문 현장 경험</p>
            </div>
            <div className="proof-item">
              <strong>1,000</strong>
              <span>+</span>
              <p>누적 디자인 개발</p>
            </div>
            <div className="proof-item proof-item--word">
              <strong>ORIGINAL</strong>
              <p>자체 디자인 제도실 운영</p>
            </div>
            <div className="proof-item proof-item--word">
              <strong>GLOBAL</strong>
              <p>국내외 텍스타일 공급</p>
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container">
            <Reveal className="section-heading section-heading--split">
              <div>
                <span className="section-index">02</span>
                <p className="section-label">ABOUT CRAYON</p>
              </div>
              <h2>
                시장을 이해하는 경험,
                <br />
                상품을 완성하는 <span>디자인.</span>
              </h2>
            </Reveal>

            <div className="about__grid">
              <Reveal className="about__archive" delay={70}>
                <div className="archive-paper">
                  <div className="archive-paper__head">
                    <span>PATTERN ARCHIVE</span>
                    <span>NO. 2621</span>
                  </div>
                  <div className="archive-motif" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <b>CR</b>
                  </div>
                  <div className="archive-paper__foot">
                    <span>EST. 30 YEARS</span>
                    <span>SEOUL</span>
                  </div>
                </div>
                <p className="archive-caption">
                  <span>CRAFTED IN DONGDAEMUN</span>
                  크레용의 모든 제안은 현장에서 시작됩니다.
                </p>
              </Reveal>

              <Reveal className="about__copy" delay={140}>
                <p className="lead-copy">
                  크레용은 서울 동대문 종합시장을 기반으로 여성복, 아동복, 캐주얼,
                  침구용 등 다양한 분야의 프린트 원단을 개발해 왔습니다.
                </p>
                <p>
                  30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로,
                  트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을
                  제안합니다.
                </p>
                <blockquote>
                  <span aria-hidden="true">“</span>
                  유행을 좇는 데 그치지 않고,
                  <br />
                  오래 선택받을 수 있는 패턴을 고민합니다.
                </blockquote>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="collection section" id="collection">
          <div className="container">
            <Reveal className="collection__heading">
              <div>
                <span className="section-index">03</span>
                <p className="section-label">COLLECTION</p>
              </div>
              <h2>다양한 쓰임에 맞춘 패턴</h2>
              <p>
                찾으시는 용도와 분위기를 알려주시면
                <br /> 알맞은 원단과 패턴을 함께 제안합니다.
              </p>
            </Reveal>

            <div className="swatch-grid">
              {collections.map((item, index) => (
                <Reveal
                  className={`swatch-card swatch-card--${index + 1}`}
                  delay={index * 70}
                  key={item.en}
                >
                  <article>
                    <div className={`swatch-art ${item.pattern}`} aria-hidden="true">
                      <div className="swatch-art__weave" />
                      <span className="swatch-pin" />
                      <span className="swatch-selvedge">CRAYON ORIGINAL TEXTILE</span>
                    </div>
                    <div className="swatch-meta">
                      <span>{item.code}</span>
                      <h3>
                        {item.en}
                        <small>{item.ko}</small>
                      </h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal className="collection__cta">
              <p>보고 계신 패턴은 크레용의 디자인 방향을 표현한 콘셉트입니다.</p>
              <a className="text-link" href="#contact">
                용도별 원단 상담하기
                <Arrow />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="studio" id="studio">
          <div className="studio__visual">
            <Image
              src="/images/crayon-design-studio.jpg"
              alt="패턴 도안과 컬러칩, 원단 샘플을 검토하는 크레용 디자인 스튜디오"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="studio__image-label">
              <span>DESIGN PROCESS</span>
              <b>FROM IDEA TO TEXTILE</b>
            </div>
          </div>

          <div className="studio__content">
            <Reveal>
              <span className="section-index section-index--light">04</span>
              <p className="section-label section-label--light">ORIGINAL DESIGN STUDIO</p>
              <h2>
                직접 그린 패턴으로
                <br />
                더 안심할 수 있는 선택
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="studio__lead">
                크레용은 자체 디자인 제도실을 운영하며 브랜드 모방이나 카피가 아닌 독자
                개발 패턴을 중심으로 제안합니다.
              </p>
              <p>
                아이디어 구상부터 패턴 개발까지 직접 관리하여 크레용만의 감도와 차별성을
                원단에 담습니다.
              </p>
            </Reveal>

            <Reveal className="studio__features" delay={160}>
              <div>
                <span>01</span>
                <p>IN-HOUSE DESIGN</p>
                <b>자체 디자인실</b>
              </div>
              <div>
                <span>02</span>
                <p>ORIGINAL PATTERN</p>
                <b>독자 패턴 개발</b>
              </div>
              <div>
                <span>03</span>
                <p>RELIABLE QUALITY</p>
                <b>신뢰할 수 있는 품질</b>
              </div>
            </Reveal>

            <p className="studio__note">※ 디자인별 사용 범위와 독점 여부는 상담 시 안내해 드립니다.</p>
          </div>
        </section>

        <section className="principles section">
          <div className="container">
            <Reveal className="principles__intro">
              <p className="section-label">HOW WE WORK</p>
              <h2>
                감각은 새롭게,
                <br />
                제안은 현실적으로.
              </h2>
            </Reveal>

            <div className="principles__list">
              {principles.map((item, index) => (
                <Reveal className="principle" delay={index * 80} key={item.number}>
                  <span className="principle__number">{item.number}</span>
                  <p className="principle__en">{item.en}</p>
                  <h3>{item.title}</h3>
                  <p className="principle__description">{item.description}</p>
                  <span className="principle__mark" aria-hidden="true">
                    ✣
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="global" id="global">
          <div className="global__ticker" aria-hidden="true">
            <div>
              <span>FROM DONGDAEMUN TO THE WORLD</span>
              <i>✦</i>
              <span>FROM DONGDAEMUN TO THE WORLD</span>
              <i>✦</i>
            </div>
          </div>

          <div className="container global__inner">
            <Reveal className="global__heading">
              <span className="section-index section-index--light">05</span>
              <p className="section-label section-label--light">GLOBAL NETWORK</p>
              <h2>
                서울에서 시작해
                <br />
                세계 시장으로.
              </h2>
            </Reveal>

            <Reveal className="global__route" delay={80}>
              <div className="global__origin">
                <span className="pulse" />
                <strong>SEOUL</strong>
                <small>CRAYON / DONGDAEMUN</small>
              </div>
              <div className="route-line" aria-hidden="true">
                <span />
              </div>
              <div className="global__destinations">
                <span>JAPAN</span>
                <span>TAIWAN</span>
                <span>EUROPE</span>
                <span>MIDDLE EAST</span>
              </div>
            </Reveal>

            <Reveal className="global__description" delay={160}>
              <p>
                크레용의 텍스타일 디자인은 국내를 넘어 일본, 대만, 유럽, 중동 등 다양한
                해외 시장에 공급되고 있습니다.
              </p>
              <p>
                서로 다른 시장과 취향을 이해하며 한국 텍스타일 디자인의 경쟁력을 더 넓은
                무대에 전하고 있습니다.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container">
            <Reveal className="contact__card">
              <div className="contact__topline">
                <span>06 · CONTACT</span>
                <span>CRAYON TEXTILE STUDIO</span>
              </div>

              <div className="contact__main">
                <div className="contact__message">
                  <p>NEW FABRIC, NEW POSSIBILITY</p>
                  <h2>
                    새로운 원단을
                    <br />
                    찾고 계신가요?
                  </h2>
                  <span>
                    원하는 용도와 분위기를 알려주세요.
                    <br /> 크레용의 경험으로 함께 찾아드리겠습니다.
                  </span>
                </div>

                <div className="contact__actions">
                  <a className="contact-button" href="tel:+821077710786">
                    <span>
                      전화 상담
                      <small>010-7771-0786</small>
                    </span>
                    <Arrow diagonal />
                  </a>
                  <a className="contact-button" href="mailto:idhhhh@naver.com">
                    <span>
                      이메일 문의
                      <small>idhhhh@naver.com</small>
                    </span>
                    <Arrow diagonal />
                  </a>
                </div>
              </div>

              <div className="contact__details">
                <div>
                  <span>ADDRESS</span>
                  <p>
                    서울특별시 종로구 종로 266
                    <br /> 동대문종합시장 D동 2층 2621호
                  </p>
                </div>
                <div>
                  <span>CONTACT</span>
                  <p>
                    T. 02-2266-0786
                    <br /> F. 02-2266-0787
                  </p>
                </div>
                <a
                  className="map-link"
                  href="https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%A2%85%EB%A1%9C%EA%B5%AC+%EC%A2%85%EB%A1%9C+266+%EB%8F%99%EB%8C%80%EB%AC%B8%EC%A2%85%ED%95%A9%EC%8B%9C%EC%9E%A5"
                  target="_blank"
                  rel="noreferrer"
                >
                  지도에서 보기
                  <Arrow diagonal />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <a
            className="footer__brand"
            href="#top"
            title="페이지 상단으로 이동"
          >
            <span>크레용</span>
            <small>NOW CRAYON</small>
          </a>
          <p>차별화된 디자인과 신뢰할 수 있는 품질로 함께 성장하겠습니다.</p>
          <div className="footer__legal">
            <span>SEOUL · DONGDAEMUN · 2621</span>
            <span>© 2026 CRAYON. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
