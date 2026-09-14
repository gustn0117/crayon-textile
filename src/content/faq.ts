import type { Bi } from "@/lib/bi";
import type { SiteInfo } from "@/lib/siteInfo";
import type { LinkItem, Meta } from "./types";

export type FaqItem = { id: string; q: Bi; a: Bi; links?: LinkItem[] };
export type FaqGroup = { id: string; en: string; title: Bi; items: FaqItem[] };

export const faqMeta: Meta = {
  title: { ko: "자주 묻는 질문", en: "FAQ" },
  description: {
    ko: "크레용 나염 원단 구매·수량·샘플·배송·세탁·커스텀 나염·방문에 대한 답변.",
    en: "Answers about buying CRAYON printed fabric — quantities, samples, delivery, care, custom printing and visiting.",
  },
};

/** The owner's wording when it has been set in the admin page; the generic
    line otherwise. Numbers the shop has not decided never appear here. */
const or = (v: Bi, fallback: Bi): Bi => ({ ko: v.ko || fallback.ko, en: v.en || fallback.en });

const consult: Bi = {
  ko: "자세한 조건은 상담 시 안내해 드립니다.",
  en: "Full terms are confirmed during consultation.",
};

const join = (a: Bi, b: Bi): Bi => ({ ko: `${a.ko} ${b.ko}`, en: `${a.en} ${b.en}` });

export function faq(info: SiteInfo): FaqGroup[] {
  const retail = or(info.retail, {
    ko: "단위와 최소 수량은 원단에 따라 달라 상담 시 안내해 드립니다.",
    en: "Units and minimums vary by fabric and are confirmed during consultation.",
  });
  const sample = or(info.sample, {
    ko: "매장에서 직접 확인하실 수 있고, 우편 샘플은 상담 시 안내해 드립니다.",
    en: "You can see them in the shop; mailed samples are arranged during consultation.",
  });
  const shipping = or(info.shipping, {
    ko: "택배 발송 가능 여부와 비용은 수량·지역에 따라 상담 시 안내해 드립니다.",
    en: "Whether we can ship, and what it costs, depends on quantity and destination — confirmed during consultation.",
  });
  const hours = or(info.hours, {
    ko: "영업시간은 전화로 확인해 주세요.",
    en: "Please call to confirm opening hours.",
  });
  const address: Bi = {
    ko: info.addressKo.filter(Boolean).join(" "),
    en: info.addressEn.filter(Boolean).join(", "),
  };
  const storeLink: LinkItem[] = info.storeUrl
    ? [{ label: { ko: "온라인 스토어", en: "Online store" }, href: info.storeUrl }]
    : [];

  return [
    {
      id: "buying",
      en: "BUYING",
      title: { ko: "구매 · 수량", en: "Buying & quantities" },
      items: [
        {
          id: "personal",
          q: { ko: "개인도 구매할 수 있나요?", en: "Can individuals buy?" },
          a: join(
            {
              ko: "네. 동대문종합시장 매장에 오시면 소량으로 끊어 드립니다. 처음이라도 용도만 말씀해 주시면 알맞은 원단을 함께 골라 드립니다.",
              en: "Yes. Visit the shop in Dongdaemun Comprehensive Market and we cut small quantities. If it is your first time, just tell us what you are making and we choose with you.",
            },
            retail,
          ),
          links: [{ label: { ko: "소량 구매 방법", en: "How buying works" }, href: "/guide/order#retail" }, ...storeLink],
        },
        {
          id: "minimum",
          q: { ko: "최소 구매 수량이 있나요?", en: "Is there a minimum order?" },
          a: join(
            {
              ko: "도매는 롤 단위가 기본입니다. 소량 구매는 매장에서 원단별로 안내해 드립니다.",
              en: "Wholesale is by the roll. For small quantities we advise fabric by fabric in the shop.",
            },
            retail,
          ),
        },
        {
          id: "price",
          q: { ko: "가격은 어디서 볼 수 있나요?", en: "Where are the prices?" },
          a: {
            ko: "원단 종류·수량·나염 기법에 따라 달라서 사이트에 가격을 표시하지 않습니다. 전화나 문의 폼으로 원단명과 수량을 알려주시면 바로 안내해 드립니다.",
            en: "Prices depend on fabric, quantity and printing method, so we do not list them online. Tell us the fabric and quantity by phone or the enquiry form and we quote straight away.",
          },
          links: [{ label: { ko: "문의하기", en: "Send an enquiry" }, href: "/contact" }],
        },
        {
          id: "stock",
          q: { ko: "재고 확인은 어떻게 하나요?", en: "How do I check stock?" },
          a: {
            ko: "전화로 품명과 색상을 말씀해 주시면 바로 확인해 드립니다. 시즌 신상품은 신상품 페이지에서 먼저 보실 수 있습니다.",
            en: "Call us with the fabric name and colour and we check on the spot. Seasonal arrivals are on the New page first.",
          },
          links: [{ label: { ko: "신상품 보기", en: "New arrivals" }, href: "/new" }],
        },
        {
          id: "howmuch",
          q: { ko: "필요한 양은 어떻게 계산하나요?", en: "How much do I need?" },
          a: {
            ko: "원단 폭, 만드는 것의 크기, 무늬를 맞출지에 따라 달라집니다. 대략의 기준과 계산법은 원단 가이드에 정리해 두었고, 매장에서 함께 계산해 드립니다. 여유분을 10–15% 정도 두시면 안전합니다.",
            en: "It depends on the cloth width, what you are making and whether the print needs matching. The fabric guide has rules of thumb, and we work it out with you in the shop. A 10–15% margin is safe.",
          },
          links: [{ label: { ko: "수량 계산법", en: "Working out quantity" }, href: "/guide/fabric#quantity" }],
        },
      ],
    },
    {
      id: "sample",
      en: "SAMPLES & COLOUR",
      title: { ko: "샘플 · 색상", en: "Samples & colour" },
      items: [
        {
          id: "swatch",
          q: { ko: "샘플(스와치)을 받아볼 수 있나요?", en: "Can I get a swatch?" },
          a: sample,
        },
        {
          id: "colour",
          q: { ko: "화면 색과 실물 색이 다를 수 있나요?", en: "Will the colour match my screen?" },
          a: {
            ko: "모니터와 조명에 따라 달라 보이고, 생산 로트에 따라 미세한 차이가 있을 수 있습니다. 색이 중요한 작업이라면 실물 스와치로 확인하시길 권합니다.",
            en: "Screens and lighting shift colour, and production lots can differ slightly. If colour matters, check a physical swatch first.",
          },
        },
        {
          id: "colourway",
          q: { ko: "같은 디자인을 다른 색으로도 받을 수 있나요?", en: "Can I have the same design in another colour?" },
          a: {
            ko: "네. 컬러웨이 전개가 가능합니다. 수량과 나염 기법에 따라 조건이 달라 상담 시 안내해 드립니다.",
            en: "Yes — we develop colourways. Terms depend on quantity and printing method and are confirmed during consultation.",
          },
        },
      ],
    },
    {
      id: "delivery",
      en: "DELIVERY & PAYMENT",
      title: { ko: "배송 · 결제 · 교환", en: "Delivery, payment & returns" },
      items: [
        {
          id: "shipping",
          q: { ko: "배송이 되나요?", en: "Do you deliver?" },
          a: shipping,
        },
        {
          id: "payment",
          q: { ko: "결제는 어떻게 하나요?", en: "How do I pay?" },
          a: join(
            {
              ko: "소량 구매는 매장에서 결제합니다. 도매 거래 조건은 첫 상담 때 함께 정합니다.",
              en: "Small purchases are paid in the shop. Wholesale terms are agreed at the first consultation.",
            },
            consult,
          ),
        },
        {
          id: "returns",
          q: { ko: "교환·반품이 되나요?", en: "Can I return or exchange?" },
          a: {
            ko: "재단(컷팅) 후에는 원단 특성상 교환·반품이 어렵습니다. 수령 직후 이상이 있으면 바로 연락 주세요 — 확인 후 처리해 드립니다.",
            en: "Once cut, fabric cannot normally be exchanged or returned. If something is wrong on arrival, contact us straight away and we sort it out.",
          },
        },
        {
          id: "invoice",
          q: { ko: "세금계산서가 필요합니다.", en: "I need a tax invoice." },
          a: {
            ko: "사업자 거래 시 말씀해 주시면 안내해 드립니다.",
            en: "For business purchases, just ask and we will guide you through it.",
          },
        },
      ],
    },
    {
      id: "custom",
      en: "CUSTOM & DESIGN",
      title: { ko: "커스텀 나염 · 디자인", en: "Custom printing & design" },
      items: [
        {
          id: "own-design",
          q: { ko: "제 디자인으로 나염할 수 있나요?", en: "Can you print my own design?" },
          a: {
            ko: "네. 도안을 주시면 원단과 기법을 제안하고, 도수분리·리피트 작업부터 시직, 본생산까지 진행합니다.",
            en: "Yes. Send the artwork; we propose fabric and method, then handle separation, repeat, strike-off and production.",
          },
          links: [{ label: { ko: "의뢰 절차 보기", en: "How it works" }, href: "/guide/custom" }],
        },
        {
          id: "no-design",
          q: { ko: "도안이 없어도 의뢰할 수 있나요?", en: "What if I have no artwork?" },
          a: {
            ko: "자체 디자인 제도실에서 의뢰 디자인을 진행합니다. 참고 이미지와 방향만 알려주셔도 됩니다.",
            en: "Our in-house design room develops commissioned designs. Reference images and a direction are enough to start.",
          },
          links: [{ label: { ko: "디자인 개발", en: "Design development" }, href: "/studio" }],
        },
        {
          id: "methods",
          q: { ko: "어떤 나염 기법이 있나요?", en: "Which printing methods do you use?" },
          a: {
            ko: "DTP(디지털), 로터리, 분사, 반응성, 안료 나염을 원단과 수량에 맞게 제안합니다. 각 기법의 특징은 원단 가이드에 있습니다.",
            en: "DTP (digital), rotary, spray, reactive and pigment printing, matched to fabric and quantity. Each is explained in the fabric guide.",
          },
          links: [{ label: { ko: "나염 기법 설명", en: "Printing methods" }, href: "/guide/fabric#methods" }],
        },
        {
          id: "rights",
          q: { ko: "크레용 디자인은 독점인가요? 저작권은요?", en: "Are CRAYON designs exclusive? Who owns the rights?" },
          a: {
            ko: "크레용 패턴은 자체 개발 디자인입니다. 사용 범위와 독점 여부는 디자인별로 달라 상담 시 안내해 드립니다. 의뢰하신 도안의 저작권·초상권 확인은 의뢰인 책임입니다.",
            en: "CRAYON patterns are developed in-house. Usage scope and exclusivity vary by design and are confirmed during consultation. Rights clearance for artwork you supply is your responsibility.",
          },
        },
        {
          id: "custom-min",
          q: { ko: "커스텀 나염 최소 수량과 기간은요?", en: "Minimum quantity and lead time for custom printing?" },
          a: join(
            {
              ko: "원단과 기법에 따라 크게 달라집니다. 도안 작업이 필요한 경우 기간이 더 걸릴 수 있습니다.",
              en: "Both depend heavily on fabric and method. Artwork preparation adds time.",
            },
            consult,
          ),
        },
      ],
    },
    {
      id: "visit",
      en: "VISITING",
      title: { ko: "방문 · 기타", en: "Visiting & other" },
      items: [
        {
          id: "where",
          q: { ko: "매장은 어디에 있고 언제 여나요?", en: "Where is the shop and when is it open?" },
          a: {
            ko: `${address.ko}. ${hours.ko} 시장이 넓어 처음 오시면 찾기 어려울 수 있으니 방문 전에 전화 주시면 안내해 드립니다.`,
            en: `${address.en}. ${hours.en} The market is large and easy to get lost in, so call before you come and we guide you in.`,
          },
          links: [{ label: { ko: "오시는 길", en: "How to find us" }, href: "/contact" }],
        },
        {
          id: "parking",
          q: { ko: "주차는 되나요?", en: "Is there parking?" },
          a: {
            ko: "시장 주변 주차 사정이 복잡해 대중교통을 권합니다. 지하철 1·4호선 동대문역에서 걸어오실 수 있습니다. 차량으로 오셔야 하면 미리 문의해 주세요.",
            en: "Parking around the market is difficult, so public transport is best — it is a short walk from Dongdaemun Station (Lines 1 and 4). If you must drive, ask us beforehand.",
          },
        },
        {
          id: "english",
          q: { ko: "영어로 문의할 수 있나요?", en: "Can I enquire in English?" },
          a: {
            ko: "영문 페이지를 운영하고 있습니다. 이메일이나 문의 폼으로 보내 주시면 답변드립니다.",
            en: "Yes — this site is in English too. Send an email or use the enquiry form and we reply in English.",
          },
          links: [{ label: { ko: "문의하기", en: "Send an enquiry" }, href: "/contact" }],
        },
        {
          id: "export",
          q: { ko: "해외 수출도 하나요?", en: "Do you export?" },
          a: {
            ko: "일본·대만·유럽·중동에 공급해 왔습니다. 수출 물량과 조건은 상담을 통해 안내해 드립니다.",
            en: "We have supplied Japan, Taiwan, Europe and the Middle East. Export quantities and terms are arranged through consultation.",
          },
          links: [{ label: { ko: "수출 · 대량 공급 문의", en: "Export & bulk enquiry" }, href: "/contact?type=wholesale" }],
        },
      ],
    },
  ];
}
