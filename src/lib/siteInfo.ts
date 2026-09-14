/* The company details the admin page can edit. Every other form of a number
   the site shows — the international spelling, the tel: link — is derived from
   these, so a change is made in exactly one place. */

import type { Bi } from "./bi";

export type SiteInfo = {
  tel: string;
  mobile: string;
  fax: string;
  email: string;
  addressKo: [string, string];
  addressEn: [string, string];
  mapUrl: string;
  /* Operating notes the owner fills in over time. Empty means "not decided
     yet" and the site shows its generic wording instead. */
  hours: Bi;
  retail: Bi;
  shipping: Bi;
  sample: Bi;
  kakaoUrl: string;
  storeUrl: string;
};

const none: Bi = { ko: "", en: "" };

export const defaultSiteInfo: SiteInfo = {
  tel: "02-2266-0786",
  mobile: "010-7771-0786",
  fax: "02-2266-0787",
  email: "idhhhh@naver.com",
  addressKo: ["서울특별시 종로구 종로 266", "동대문종합시장 D동 2층 2621호"],
  addressEn: [
    "Room 2621, 2F, Building D, Dongdaemun Comprehensive Market",
    "266 Jong-ro, Jongno-gu, Seoul, Korea",
  ],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%A2%85%EB%A1%9C%EA%B5%AC+%EC%A2%85%EB%A1%9C+266+%EB%8F%99%EB%8C%80%EB%AC%B8%EC%A2%85%ED%95%A9%EC%8B%9C%EC%9E%A5",
  hours: none,
  retail: none,
  shipping: none,
  sample: none,
  kakaoUrl: "",
  storeUrl: "",
};

/** "02-2266-0786" → "+82-2-2266-0786". A number already written with + passes through. */
export function intlPhone(phone: string) {
  const n = phone.trim();
  return n.startsWith("0") ? `+82-${n.slice(1)}` : n;
}

/** E.164 tel: link, so it dials from abroad as well as from Korea. */
export function telHref(phone: string) {
  const intl = intlPhone(phone);
  return `tel:${intl.startsWith("+") ? "+" : ""}${intl.replace(/\D/g, "")}`;
}

/** Every input the admin form sends, in display order. The server action
    reads the form by this list, so a field added here is saved without
    touching the action. */
export const siteInfoFields = [
  "tel",
  "mobile",
  "fax",
  "email",
  "addressKo0",
  "addressKo1",
  "addressEn0",
  "addressEn1",
  "mapUrl",
  "hoursKo",
  "hoursEn",
  "retailKo",
  "retailEn",
  "shippingKo",
  "shippingEn",
  "sampleKo",
  "sampleEn",
  "kakaoUrl",
  "storeUrl",
] as const;
export type SiteInfoField = (typeof siteInfoFields)[number];

export type SiteInfoInput = Partial<Record<SiteInfoField, unknown>>;

export type ParseResult =
  | { ok: true; info: SiteInfo }
  | { ok: false; errors: Partial<Record<SiteInfoField, string>> };

const PHONE = /^[0-9+\-\s()]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates everything the admin form sends. Runs on the server — the form's
    own `required` attributes are only a convenience. Keys missing from the
    input (a site-info.json written before a field existed) read as empty. */
export function parseSiteInfo(input: SiteInfoInput): ParseResult {
  const errors: Partial<Record<SiteInfoField, string>> = {};
  const text = (field: SiteInfoField, max: number, required: boolean) => {
    const value = typeof input[field] === "string" ? (input[field] as string).trim() : "";
    if (required && !value) errors[field] = "필수 항목입니다.";
    else if (value.length > max) errors[field] = `${max}자 이내로 입력해 주세요.`;
    return value;
  };
  const phone = (field: SiteInfoField, required: boolean) => {
    const value = text(field, 20, required);
    if (value && !errors[field]) {
      const digits = value.replace(/\D/g, "").length;
      if (!PHONE.test(value) || digits < 7) errors[field] = "숫자와 - 로 입력해 주세요. 예) 02-1234-5678";
    }
    return value;
  };
  const link = (field: SiteInfoField) => {
    const value = text(field, 2000, false);
    if (value && !errors[field]) {
      let url: URL | null = null;
      try {
        url = new URL(value);
      } catch {}
      if (!url || (url.protocol !== "https:" && url.protocol !== "http:")) {
        errors[field] = "https:// 로 시작하는 주소를 넣어 주세요.";
      }
    }
    return value;
  };
  const note = (field: SiteInfoField) => text(field, 300, false);

  const tel = phone("tel", true);
  const mobile = phone("mobile", true);
  const fax = phone("fax", false);

  const email = text("email", 100, true);
  if (email && !errors.email && !EMAIL.test(email)) errors.email = "이메일 형식이 아닙니다.";

  const addressKo: [string, string] = [text("addressKo0", 80, true), text("addressKo1", 80, false)];
  const addressEn: [string, string] = [text("addressEn0", 120, true), text("addressEn1", 120, false)];

  const mapUrl = link("mapUrl");

  const hours: Bi = { ko: note("hoursKo"), en: note("hoursEn") };
  const retail: Bi = { ko: note("retailKo"), en: note("retailEn") };
  const shipping: Bi = { ko: note("shippingKo"), en: note("shippingEn") };
  const sample: Bi = { ko: note("sampleKo"), en: note("sampleEn") };
  const kakaoUrl = link("kakaoUrl");
  const storeUrl = link("storeUrl");

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    info: { tel, mobile, fax, email, addressKo, addressEn, mapUrl, hours, retail, shipping, sample, kakaoUrl, storeUrl },
  };
}

/** The inverse of the form fields, for re-validating what is already stored. */
export function toInput(info: SiteInfo): SiteInfoInput {
  return {
    tel: info.tel,
    mobile: info.mobile,
    fax: info.fax,
    email: info.email,
    addressKo0: info.addressKo?.[0],
    addressKo1: info.addressKo?.[1],
    addressEn0: info.addressEn?.[0],
    addressEn1: info.addressEn?.[1],
    mapUrl: info.mapUrl,
    hoursKo: info.hours?.ko,
    hoursEn: info.hours?.en,
    retailKo: info.retail?.ko,
    retailEn: info.retail?.en,
    shippingKo: info.shipping?.ko,
    shippingEn: info.shipping?.en,
    sampleKo: info.sample?.ko,
    sampleEn: info.sample?.en,
    kakaoUrl: info.kakaoUrl,
    storeUrl: info.storeUrl,
  };
}
