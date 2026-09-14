"use client";

import { useActionState, useState } from "react";
import { intlPhone, type SiteInfo, type SiteInfoField } from "@/lib/siteInfo";
import { saveInfoAction, type FormState } from "./actions";
import styles from "./admin.module.css";

type Values = Record<SiteInfoField, string>;

type Field = {
  name: SiteInfoField;
  label: string;
  type?: "text" | "tel" | "email" | "url";
  placeholder?: string;
  required?: boolean;
  wide?: boolean;
  hint?: string | ((values: Values) => string);
  multiline?: boolean;
};

const englishSpelling = (value: string) =>
  value.trim() ? `영문 페이지에는 ${intlPhone(value)} 로 표시됩니다.` : "";

const groups: { id: string; title: string; note: string; fields: Field[] }[] = [
  {
    id: "contact",
    title: "연락처",
    note: "상단 메뉴, 푸터, 문의 페이지에 표시됩니다.",
    fields: [
      { name: "tel", label: "대표 전화", type: "tel", placeholder: "예) 02-1234-5678", required: true, hint: (v) => englishSpelling(v.tel) },
      { name: "mobile", label: "휴대폰", type: "tel", placeholder: "예) 010-1234-5678", required: true, hint: (v) => englishSpelling(v.mobile) },
      { name: "fax", label: "팩스", type: "tel", placeholder: "예) 02-1234-5679", hint: "비워두면 사이트에서 팩스 줄이 사라집니다." },
      { name: "email", label: "이메일", type: "email", placeholder: "예) name@example.com", required: true },
    ],
  },
  {
    id: "address-ko",
    title: "주소 · 한국어",
    note: "회사 소개와 문의 페이지, 푸터에 표시됩니다.",
    fields: [
      { name: "addressKo0", label: "주소", placeholder: "예) 서울특별시 종로구 종로 266", required: true, wide: true },
      { name: "addressKo1", label: "상세 주소", placeholder: "예) 동대문종합시장 D동 2층 2621호", wide: true },
    ],
  },
  {
    id: "address-en",
    title: "주소 · 영문",
    note: "영문 페이지(/en)에 표시됩니다.",
    fields: [
      { name: "addressEn0", label: "Address line 1", placeholder: "e.g. Room 2621, 2F, Building D, …", required: true, wide: true },
      { name: "addressEn1", label: "Address line 2", placeholder: "e.g. 266 Jong-ro, Jongno-gu, Seoul, Korea", wide: true },
    ],
  },
  {
    id: "map",
    title: "지도",
    note: "문의 페이지의 ‘지도에서 보기’ 버튼이 여는 주소입니다.",
    fields: [
      {
        name: "mapUrl",
        label: "지도 링크",
        type: "url",
        placeholder: "예) https://naver.me/…",
        wide: true,
        hint: "네이버·구글 지도에서 ‘공유 → 링크 복사’한 주소를 붙여 넣으세요. 비워두면 버튼이 사라집니다.",
      },
    ],
  },
  {
    id: "operating",
    title: "운영 안내",
    note: "비워두면 사이트에 기본 안내문(‘자세한 조건은 상담 시 안내’)이 나오고, 채우면 그 문구가 대신 나옵니다. 국문·영문을 각각 적어 주세요.",
    fields: [
      { name: "hoursKo", label: "영업시간 · 국문", multiline: true, placeholder: "예) 평일 09:00–18:00 · 토요일 09:00–15:00 · 일요일·공휴일 휴무" },
      { name: "hoursEn", label: "영업시간 · 영문", multiline: true, placeholder: "e.g. Mon–Fri 9am–6pm · Sat 9am–3pm · Closed Sun & holidays" },
      { name: "retailKo", label: "소량 구매 안내 · 국문", multiline: true, placeholder: "예) 1마 단위로 끊어 드립니다. 원단에 따라 최소 수량이 다를 수 있습니다." },
      { name: "retailEn", label: "소량 구매 안내 · 영문", multiline: true, placeholder: "e.g. Sold by the yard in store; minimums vary by fabric." },
      { name: "shippingKo", label: "배송 안내 · 국문", multiline: true, placeholder: "예) 택배 발송 가능, 배송비는 수량에 따라 안내" },
      { name: "shippingEn", label: "배송 안내 · 영문", multiline: true, placeholder: "e.g. Courier delivery available; shipping quoted by quantity." },
      { name: "sampleKo", label: "샘플·스와치 안내 · 국문", multiline: true, placeholder: "예) 매장에서 스와치 확인 가능, 우편 샘플은 상담" },
      { name: "sampleEn", label: "샘플·스와치 안내 · 영문", multiline: true, placeholder: "e.g. Swatches available in store; mailed samples on request." },
    ],
  },
  {
    id: "links",
    title: "링크",
    note: "주소를 넣으면 문의·이용 안내·홈에 버튼이 생기고, 비우면 버튼이 사라집니다.",
    fields: [
      { name: "kakaoUrl", label: "카카오톡 채널", type: "url", placeholder: "예) https://pf.kakao.com/_xxxxx", wide: true },
      { name: "storeUrl", label: "온라인 스토어", type: "url", placeholder: "예) https://smartstore.naver.com/xxxxx", wide: true },
    ],
  },
];

function toValues(info: SiteInfo): Values {
  return {
    tel: info.tel,
    mobile: info.mobile,
    fax: info.fax,
    email: info.email,
    addressKo0: info.addressKo[0],
    addressKo1: info.addressKo[1],
    addressEn0: info.addressEn[0],
    addressEn1: info.addressEn[1],
    mapUrl: info.mapUrl,
    hoursKo: info.hours.ko,
    hoursEn: info.hours.en,
    retailKo: info.retail.ko,
    retailEn: info.retail.en,
    shippingKo: info.shipping.ko,
    shippingEn: info.shipping.en,
    sampleKo: info.sample.ko,
    sampleEn: info.sample.en,
    kakaoUrl: info.kakaoUrl,
    storeUrl: info.storeUrl,
  };
}

const initialState: FormState = { status: "idle", message: "" };

export function InfoForm({ info }: { info: SiteInfo }) {
  const saved = toValues(info);
  const [values, setValues] = useState<Values>(saved);
  const [state, formAction, pending] = useActionState(saveInfoAction, initialState);

  const dirty = (Object.keys(saved) as SiteInfoField[]).some((key) => values[key] !== saved[key]);

  let status = "";
  let tone = "";
  if (pending) status = "저장 중입니다…";
  else if (state.status === "error") [status, tone] = [state.message, styles.statusError];
  else if (dirty) status = "저장하지 않은 변경 사항이 있습니다.";
  else if (state.status === "success") [status, tone] = [state.message, styles.statusSuccess];

  return (
    <form action={formAction} noValidate>
      {groups.map((group) => (
        <section className={styles.card} key={group.id} aria-labelledby={`${group.id}-title`}>
          <h2 className={styles.cardTitle} id={`${group.id}-title`}>
            {group.title}
          </h2>
          <p className={styles.cardNote}>{group.note}</p>

          <div className={styles.fields}>
            {group.fields.map((field) => {
              const error = state.errors?.[field.name];
              const hint = typeof field.hint === "function" ? field.hint(values) : field.hint;
              const describedBy =
                [hint ? `${field.name}-hint` : "", error ? `${field.name}-error` : ""]
                  .filter(Boolean)
                  .join(" ") || undefined;

              return (
                <div className={field.wide ? `${styles.field} ${styles.wide}` : styles.field} key={field.name}>
                  <label className={styles.label} htmlFor={field.name}>
                    {field.label}
                    {field.required ? <span className={styles.required}> 필수</span> : null}
                  </label>
                  {field.multiline ? (
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      id={field.name}
                      name={field.name}
                      rows={2}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, [field.name]: event.target.value }))
                      }
                    />
                  ) : (
                    <input
                      className={styles.input}
                      id={field.name}
                      name={field.name}
                      type={field.type ?? "text"}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      required={field.required}
                      autoComplete="off"
                      aria-invalid={error ? true : undefined}
                      aria-describedby={describedBy}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, [field.name]: event.target.value }))
                      }
                    />
                  )}
                  {hint ? (
                    <p className={styles.hint} id={`${field.name}-hint`}>
                      {hint}
                    </p>
                  ) : null}
                  {error ? (
                    <p className={styles.error} id={`${field.name}-error`}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <div className={styles.actionsBar}>
        <p className={`${styles.status} ${tone}`} role="status">
          {status}
        </p>
        <button className={styles.primary} type="submit" disabled={pending}>
          {pending ? "저장 중…" : "저장하기"}
        </button>
      </div>
    </form>
  );
}
