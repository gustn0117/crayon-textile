import type { Locale } from "./i18n";

/* The enquiry form's data shape and validation. No runtime imports, so the
   same code runs in the Server Action and in a plain node test. */

export const inquiryTypes = ["wholesale", "retail", "custom", "other"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export function isInquiryType(v: unknown): v is InquiryType {
  return typeof v === "string" && (inquiryTypes as readonly string[]).includes(v);
}

export type InquiryField = "type" | "name" | "phone" | "email" | "company" | "use" | "quantity" | "message" | "consent";

export type InquiryData = {
  lang: Locale;
  type: InquiryType;
  name: string;
  phone: string;
  email: string;
  company: string;
  use: string;
  quantity: string;
  message: string;
};

export type Inquiry = InquiryData & { id: string; createdAt: string; readAt: string | null };

export type InquiryErrors = Partial<Record<InquiryField, string>>;

const MSG = {
  required: { ko: "필수 항목입니다.", en: "Required." },
  tooLong: { ko: "너무 깁니다.", en: "Too long." },
  phone: { ko: "숫자와 - 로 입력해 주세요. 예) 010-1234-5678", en: "Digits and dashes only, e.g. +82-10-1234-5678" },
  email: { ko: "이메일 형식이 아닙니다.", en: "That is not an email address." },
  message: { ko: "내용을 10자 이상 적어 주세요.", en: "Please write at least 10 characters." },
  type: { ko: "문의 유형을 선택해 주세요.", en: "Please choose an enquiry type." },
  consent: { ko: "개인정보 수집·이용에 동의해 주세요.", en: "Please agree to the privacy terms." },
} as const;

const PHONE = /^[0-9+\-\s()]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server-side validation for the enquiry form. The browser's `required`
    attributes are a convenience; this is the check that counts. */
export function parseInquiry(
  input: Record<string, unknown>,
  lang: Locale,
): { ok: true; data: InquiryData } | { ok: false; errors: InquiryErrors } {
  const errors: InquiryErrors = {};
  const t = (k: keyof typeof MSG) => MSG[k][lang];
  const str = (field: InquiryField) => (typeof input[field] === "string" ? (input[field] as string).trim() : "");
  const text = (field: InquiryField, max: number, required: boolean) => {
    const v = str(field);
    if (required && !v) errors[field] = t("required");
    else if (v.length > max) errors[field] = t("tooLong");
    return v;
  };

  const typeRaw = str("type");
  const type: InquiryType = isInquiryType(typeRaw) ? typeRaw : "other";
  if (!isInquiryType(typeRaw)) errors.type = t("type");

  const name = text("name", 40, true);
  const phone = text("phone", 20, true);
  if (phone && !errors.phone && (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7)) {
    errors.phone = t("phone");
  }
  const email = text("email", 100, false);
  if (email && !errors.email && !EMAIL.test(email)) errors.email = t("email");
  const company = text("company", 60, false);
  const use = text("use", 80, false);
  const quantity = text("quantity", 40, false);
  const message = text("message", 2000, true);
  if (message && !errors.message && message.length < 10) errors.message = t("message");
  if (input.consent !== "on" && input.consent !== "true") errors.consent = t("consent");

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { lang, type, name, phone, email, company, use, quantity, message } };
}
