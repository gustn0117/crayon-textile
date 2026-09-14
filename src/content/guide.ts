import type { Bi } from "@/lib/bi";
import type { LinkItem, Meta } from "./types";

export const guideMeta: Meta = {
  title: { ko: "이용 안내", en: "Guide" },
  description: {
    ko: "크레용 원단을 처음 찾으시는 분을 위한 안내. 브랜드·제조사와 개인·소규모 제작자 각각의 구매 방법, 자주 묻는 질문, 주문·배송, 원단 가이드, 커스텀 나염 의뢰.",
    en: "Where to start with CRAYON fabric — for brands and makers alike: how to buy, FAQ, ordering and delivery, a fabric guide, and custom printing.",
  },
};

export type Audience = {
  id: "brand" | "personal";
  en: string;
  title: Bi;
  lead: Bi;
  points: Bi[];
  links: LinkItem[];
};

/* The two kinds of customer the shop serves. The home page and the guide hub
   both render this, so the promise made to each stays identical. */
export const audiences: Audience[] = [
  {
    id: "brand",
    en: "FOR BRANDS & MAKERS",
    title: { ko: "브랜드 · 제조사", en: "Brands & manufacturers" },
    lead: {
      ko: "롤 단위 공급과 시즌 신상, 독자 개발 패턴까지 한 곳에서.",
      en: "Roll supply, seasonal new arrivals and original patterns from one source.",
    },
    points: [
      { ko: "면·레이온·폴리에스터 전 소재 롤 단위 공급", en: "Roll supply across cotton, rayon and polyester" },
      { ko: "자체 디자인실의 독자 개발 패턴 — 카피 리스크가 적습니다", en: "Original patterns from our own design room — less copy risk" },
      { ko: "의뢰 디자인부터 도수분리·시직·본생산까지 원스톱", en: "Commissioned design, separation, strike-off and production in one place" },
    ],
    links: [
      { label: { ko: "도매 주문 절차", en: "Wholesale ordering" }, href: "/guide/order#wholesale" },
      { label: { ko: "커스텀 나염 의뢰", en: "Custom printing" }, href: "/guide/custom" },
      { label: { ko: "도매 문의", en: "Wholesale enquiry" }, href: "/contact?type=wholesale" },
    ],
  },
  {
    id: "personal",
    en: "FOR INDIVIDUALS",
    title: { ko: "개인 · 소규모 제작자", en: "Individuals & small studios" },
    lead: {
      ko: "동대문 매장에 오시면 소량으로 끊어 드립니다. 처음이라도 괜찮습니다.",
      en: "Visit the Dongdaemun shop and we cut small quantities. First time is fine.",
    },
    points: [
      { ko: "매장에서 실물을 보고 소량 구매", en: "See the cloth in person and buy a small cut" },
      { ko: "용도를 말씀하시면 알맞은 원단을 함께 골라 드립니다", en: "Tell us what you are making and we pick with you" },
      { ko: "세탁·관리와 필요 수량 계산은 원단 가이드에", en: "Care and how much to buy are in the fabric guide" },
    ],
    links: [
      { label: { ko: "소량 구매 방법", en: "Buying in small quantities" }, href: "/guide/order#retail" },
      { label: { ko: "원단 가이드", en: "Fabric guide" }, href: "/guide/fabric" },
      { label: { ko: "자주 묻는 질문", en: "FAQ" }, href: "/guide/faq" },
    ],
  },
];

export type GuideCard = {
  slug: "faq" | "order" | "fabric" | "custom";
  href: string;
  en: string;
  title: Bi;
  summary: Bi;
};

export const guidePages: GuideCard[] = [
  {
    slug: "faq",
    href: "/guide/faq",
    en: "FAQ",
    title: { ko: "자주 묻는 질문", en: "FAQ" },
    summary: { ko: "구매·수량, 샘플·색상, 배송·결제, 커스텀, 방문까지 21문항.", en: "21 answers on buying, samples, delivery, custom work and visiting." },
  },
  {
    slug: "order",
    href: "/guide/order",
    en: "ORDER & DELIVERY",
    title: { ko: "주문·배송 안내", en: "Ordering & delivery" },
    summary: { ko: "도매와 소량, 두 가지 절차와 결제·배송·교환 기준.", en: "Wholesale and retail flows, plus payment, delivery and returns." },
  },
  {
    slug: "fabric",
    href: "/guide/fabric",
    en: "FABRIC GUIDE",
    title: { ko: "원단 가이드", en: "Fabric guide" },
    summary: { ko: "소재별 특징, 용어, 필요 수량 계산, 세탁·관리, 나염 기법.", en: "Materials, terms, how much to buy, care, and printing methods." },
  },
  {
    slug: "custom",
    href: "/guide/custom",
    en: "CUSTOM PRINTING",
    title: { ko: "커스텀 나염 의뢰", en: "Custom printing" },
    summary: { ko: "내 디자인으로 나염하기 — 절차, 준비물, 기법 선택.", en: "Print your own design — process, what to prepare, choosing a method." },
  },
];
