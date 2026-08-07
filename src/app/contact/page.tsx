import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { contact } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "문의",
  description:
    "원단 상담 및 견적 문의. 전화 02-2266-0786 / 010-7771-0786, 이메일 idhhhh@naver.com. 서울 동대문종합시장 D동 2층 2621호.",
};

const details = [
  { term: "주소", lines: contact.addressLines },
  { term: "전화", lines: [`T. ${contact.tel}`, `M. ${contact.mobile}`] },
  { term: "팩스", lines: [`F. ${contact.fax}`] },
  { term: "이메일", lines: [contact.email] },
];

const checklist = [
  {
    step: "01",
    term: "용도",
    description: "여성복 · 아동복 · 캐주얼 · 침구 등 어디에 쓰실 원단인지 알려주세요.",
  },
  {
    step: "02",
    term: "분위기",
    description: "참고 이미지가 있으면 가장 빠릅니다. 원하시는 느낌을 말로 주셔도 됩니다.",
  },
  {
    step: "03",
    term: "수량",
    description: "예상하고 계신 발주 규모를 알려주시면 제안 범위를 좁힐 수 있습니다.",
  },
  {
    step: "04",
    term: "일정",
    description: "원하시는 납기를 함께 주시면 가능한 방법을 같이 찾아보겠습니다.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        en="CONTACT"
        title={
          <>
            새로운 원단을
            <br />
            찾고 계신가요?
          </>
        }
        lead="원하는 용도와 분위기를 알려주세요. 크레용의 경험으로 함께 찾아드리겠습니다."
      />

      <section className="section-tight">
        <div className="container">
          <Reveal className={styles.actions}>
            <a className={styles.action} href={contact.mobileHref}>
              <span className={styles.actionLabel}>CALL</span>
              <span className={styles.actionValue}>{contact.mobile}</span>
              <span className={styles.actionNote}>바로 통화로 상담</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>

            <a className={styles.action} href={contact.emailHref}>
              <span className={styles.actionLabel}>EMAIL</span>
              <span className={styles.actionValue}>{contact.email}</span>
              <span className={styles.actionNote}>참고 이미지와 함께 문의</span>
              <span className={styles.actionArrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            index="01"
            en="VISIT & CONTACT"
            note="동대문종합시장 D동 2층 2621호"
            title="오시는 길과 연락처."
          />

          <div className="duo">
            <Reveal>
              <dl className="facts">
                {details.map((row) => (
                  <div key={row.term}>
                    <dt>{row.term}</dt>
                    <dd>
                      {row.lines.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                className={`arrow-link ${styles.mapLink}`}
                href={contact.mapUrl}
                target="_blank"
                rel="noreferrer"
              >
                지도에서 보기
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>

            <Reveal className={styles.visitAside} delay={70}>
              <p className={styles.visitNote}>
                동대문종합시장은 층과 동이 넓어 처음 오시면 찾기 어려울 수 있습니다. 방문
                전에 전화 주시면 위치를 안내해 드리고, 보고 싶으신 방향의 원단을 미리
                준비해 두겠습니다.
              </p>
              <a className="btn btn-ghost" href={contact.telHref}>
                전화로 방문 문의
                <span aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${styles.checklistSection}`}>
        <div className="container">
          <SectionHead
            index="02"
            en="BEFORE YOU WRITE"
            note="첫 제안의 정확도를 좌우합니다."
            title="네 가지를 함께 알려주세요."
            lead="아래 항목이 모두 정해져 있지 않아도 괜찮습니다. 아는 것부터 알려주시면 나머지는 상담하며 좁혀가겠습니다."
          />

          <ol className={styles.checklist}>
            {checklist.map((item, i) => (
              <li key={item.step}>
                <Reveal className={styles.checkRow} delay={i * 60}>
                  <span className={styles.checkStep}>{item.step}</span>
                  <b className={styles.checkTerm}>{item.term}</b>
                  <span className={styles.checkText}>{item.description}</span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
