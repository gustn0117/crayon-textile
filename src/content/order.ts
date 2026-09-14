import type { Bi } from "@/lib/bi";
import type { SiteInfo } from "@/lib/siteInfo";
import type { Meta, Step } from "./types";

export const orderMeta: Meta = {
  title: { ko: "주문·배송 안내", en: "Ordering & delivery" },
  description: {
    ko: "크레용 나염 원단 도매 주문 절차와 개인 소량 구매 방법, 결제·배송·샘플·교환 기준.",
    en: "How wholesale ordering and small-quantity buying work at CRAYON, with payment, delivery, sample and return terms.",
  },
};

export type Policy = {
  id: "retail" | "payment" | "shipping" | "sample" | "returns";
  en: string;
  title: Bi;
  body: Bi;
  /** True when the wording came from the admin page rather than the fallback. */
  fromAdmin: boolean;
};

const or = (v: Bi, fallback: Bi) => ({
  body: { ko: v.ko || fallback.ko, en: v.en || fallback.en },
  fromAdmin: Boolean(v.ko || v.en),
});

export function order(info: SiteInfo): { wholesale: Step[]; retail: Step[]; policies: Policy[] } {
  return {
    wholesale: [
      {
        n: "01",
        title: { ko: "상담", en: "Consultation" },
        body: {
          ko: "용도·소재·수량·납기를 전화나 문의 폼으로 알려주세요. 원단과 나염 기법을 제안해 드립니다.",
          en: "Tell us the use, material, quantity and timing by phone or the form. We propose fabric and printing method.",
        },
      },
      {
        n: "02",
        title: { ko: "샘플 · 확인", en: "Sample & check" },
        body: {
          ko: "스와치나 시직으로 색과 촉감을 확인합니다.",
          en: "Confirm colour and hand on a swatch or strike-off.",
        },
      },
      {
        n: "03",
        title: { ko: "수량 · 납기 확정", en: "Quantity & schedule" },
        body: {
          ko: "롤 단위 수량과 납기를 확정합니다.",
          en: "Fix roll quantities and the delivery date.",
        },
      },
      {
        n: "04",
        title: { ko: "결제", en: "Payment" },
        body: {
          ko: "거래 조건에 따라 결제합니다.",
          en: "Payment on the agreed terms.",
        },
      },
      {
        n: "05",
        title: { ko: "출고", en: "Dispatch" },
        body: {
          ko: "검수 후 출고합니다. 수출 물량은 별도로 안내합니다.",
          en: "Inspected and dispatched; export orders are handled separately.",
        },
      },
    ],
    retail: [
      {
        n: "01",
        title: { ko: "방문", en: "Visit" },
        body: {
          ko: "동대문종합시장 D동 크레용 매장에 오세요. 방문 전에 전화 주시면 원하시는 방향의 원단을 준비해 둡니다.",
          en: "Come to the CRAYON shop in Building D, Dongdaemun Comprehensive Market. Call ahead and we will have the right fabrics out.",
        },
      },
      {
        n: "02",
        title: { ko: "원단 고르기", en: "Choose" },
        body: {
          ko: "용도를 말씀하시면 소재와 무늬를 함께 골라 드립니다.",
          en: "Tell us what you are making; we pick material and print with you.",
        },
      },
      {
        n: "03",
        title: { ko: "수량 계산", en: "Work out the amount" },
        body: {
          ko: "원단 폭과 만들 것의 크기로 필요한 길이를 계산합니다. 여유분을 조금 더 두세요.",
          en: "Length follows the cloth width and what you are making. Leave a margin.",
        },
      },
      {
        n: "04",
        title: { ko: "결제 · 재단", en: "Pay & cut" },
        body: {
          ko: "매장에서 결제하고 바로 끊어 드립니다.",
          en: "Pay in store and we cut it there and then.",
        },
      },
    ],
    policies: [
      {
        id: "retail",
        en: "SMALL QUANTITIES",
        title: { ko: "소량 구매", en: "Small quantities" },
        ...or(info.retail, {
          ko: "매장에서 소량으로 끊어 드립니다. 단위와 최소 수량은 원단에 따라 달라 상담 시 안내해 드립니다.",
          en: "We cut small quantities in store. Units and minimums vary by fabric and are confirmed during consultation.",
        }),
      },
      {
        id: "payment",
        en: "PAYMENT",
        title: { ko: "결제", en: "Payment" },
        body: {
          ko: "소량 구매는 매장에서 결제합니다. 도매 거래 조건은 첫 상담 때 함께 정하고, 사업자 거래는 세금계산서 발행을 도와드립니다.",
          en: "Small purchases are paid in the shop. Wholesale terms are agreed at the first consultation, and tax invoices are available for business customers.",
        },
        fromAdmin: false,
      },
      {
        id: "shipping",
        en: "DELIVERY",
        title: { ko: "배송", en: "Delivery" },
        ...or(info.shipping, {
          ko: "택배 발송 가능 여부와 비용은 수량·지역에 따라 상담 시 안내해 드립니다.",
          en: "Whether we can ship, and what it costs, depends on quantity and destination — confirmed during consultation.",
        }),
      },
      {
        id: "sample",
        en: "SAMPLES",
        title: { ko: "샘플", en: "Samples" },
        ...or(info.sample, {
          ko: "매장에서 스와치를 직접 확인하실 수 있습니다. 우편 샘플은 상담 시 안내해 드립니다.",
          en: "Swatches can be seen in store; mailed samples are arranged during consultation.",
        }),
      },
      {
        id: "returns",
        en: "RETURNS",
        title: { ko: "교환 · 반품", en: "Returns" },
        body: {
          ko: "재단(컷팅) 후에는 원단 특성상 교환·반품이 어렵습니다. 수령 직후 이상이 있으면 바로 연락 주세요.",
          en: "Once cut, fabric cannot normally be exchanged or returned. If something is wrong on arrival, contact us straight away.",
        },
        fromAdmin: false,
      },
    ],
  };
}
