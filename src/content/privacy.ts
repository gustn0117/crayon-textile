import type { SiteInfo } from "@/lib/siteInfo";
import type { Meta, Section } from "./types";

export const privacyMeta: Meta = {
  title: { ko: "개인정보처리방침", en: "Privacy policy" },
  description: {
    ko: "크레용 홈페이지 문의 폼으로 수집하는 개인정보의 항목·목적·보관 기간과 정보주체의 권리.",
    en: "What the CRAYON enquiry form collects, why, for how long, and your rights.",
  },
};

/* Every statement here is something the inquiry store actually does: the
   fields match the form, and the one-year retention is enforced by
   lib/server/inquiryStore.ts. Change one, change the other. */
export function privacy(info: SiteInfo): { effective: string; sections: Section[] } {
  return {
    effective: "2026-09-14",
    sections: [
      {
        id: "items",
        title: { ko: "1. 수집하는 항목", en: "1. What we collect" },
        bullets: [
          { ko: "필수: 이름, 연락처, 문의 유형, 문의 내용", en: "Required: name, phone, enquiry type, message" },
          { ko: "선택: 이메일, 회사·브랜드명, 용도, 수량", en: "Optional: email, company or brand, intended use, quantity" },
          { ko: "자동으로 수집하는 항목은 없습니다. 접속 기록이나 쿠키로 개인을 식별하지 않습니다.", en: "Nothing is collected automatically; no cookies identify you." },
        ],
      },
      {
        id: "purpose",
        title: { ko: "2. 이용 목적", en: "2. Why" },
        paragraphs: [
          { ko: "문의에 답변하고 상담 이력을 확인하기 위해서만 이용합니다.", en: "Only to answer your enquiry and keep track of the conversation." },
        ],
      },
      {
        id: "retention",
        title: { ko: "3. 보관 기간", en: "3. Retention" },
        paragraphs: [
          {
            ko: "접수일로부터 1년간 보관한 뒤 자동으로 파기합니다. 삭제를 요청하시면 즉시 파기합니다.",
            en: "Kept for one year from receipt, then deleted automatically. Deleted immediately on request.",
          },
        ],
      },
      {
        id: "sharing",
        title: { ko: "4. 제3자 제공 · 위탁", en: "4. Sharing" },
        paragraphs: [
          { ko: "제3자에게 제공하거나 외부에 처리를 위탁하지 않습니다.", en: "Not shared with third parties or outsourced." },
        ],
      },
      {
        id: "rights",
        title: { ko: "5. 정보주체의 권리", en: "5. Your rights" },
        paragraphs: [
          {
            ko: `열람·정정·삭제를 원하시면 ${info.email}로 요청해 주세요. 지체 없이 처리합니다.`,
            en: `Ask for access, correction or deletion at ${info.email}; we act without delay.`,
          },
        ],
      },
      {
        id: "security",
        title: { ko: "6. 안전성 확보 조치", en: "6. Security" },
        paragraphs: [
          {
            ko: "문의 내용은 접근이 통제된 자체 서버에 저장하며, 비밀번호 인증을 거친 관리자만 열람합니다.",
            en: "Enquiries are stored on our own access-controlled server and read only by a password-authenticated administrator.",
          },
        ],
      },
      {
        id: "officer",
        title: { ko: "7. 개인정보 보호책임자", en: "7. Contact" },
        bullets: [{ ko: `크레용 · ${info.email} · ${info.tel}`, en: `CRAYON · ${info.email} · ${info.tel}` }],
      },
      {
        id: "effective",
        title: { ko: "8. 시행일", en: "8. Effective date" },
        paragraphs: [{ ko: "이 방침은 2026년 9월 14일부터 적용됩니다.", en: "In force from 14 September 2026." }],
      },
    ],
  };
}
