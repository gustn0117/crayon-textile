import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { contact } from "@/lib/site";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "문의",
  description:
    "원단 상담 및 견적 문의. 전화 02-2266-0786 / 010-7771-0786, 이메일 idhhhh@naver.com. 서울 동대문종합시장 D동 2층 2621호.",
};

const details = [
  { term: "ADDRESS", lines: contact.addressLines },
  { term: "TEL", lines: [`T. ${contact.tel}`, `M. ${contact.mobile}`] },
  { term: "FAX", lines: [`F. ${contact.fax}`] },
  { term: "EMAIL", lines: [contact.email] },
];

const checklist = [
  { term: "용도", description: "여성복 · 아동복 · 캐주얼 · 침구 등 어디에 쓰실 원단인지" },
  { term: "분위기", description: "참고 이미지나 원하시는 느낌" },
  { term: "수량", description: "예상하고 계신 발주 규모" },
  { term: "일정", description: "원하시는 납기" },
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

      <section className="section-tight">
        <div className="container split">
          <Reveal>
            <p className="label label-ink">DETAILS</p>
          </Reveal>

          <Reveal delay={60}>
            <dl className={styles.details}>
              {details.map((row) => (
                <div className={styles.detailRow} key={row.term}>
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
        </div>
      </section>

      <section className={`section ${styles.checklistSection}`}>
        <div className="container split">
          <Reveal>
            <p className="label label-ink">BEFORE YOU WRITE</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="heading">
              아래 네 가지를 함께 알려주시면
              <br className="wide-only" /> 첫 제안이 훨씬 정확해집니다.
            </h2>

            <dl className={styles.checklist}>
              {checklist.map((item) => (
                <div className={styles.checkRow} key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
