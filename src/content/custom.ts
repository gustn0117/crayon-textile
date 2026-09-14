import type { Bi } from "@/lib/bi";
import type { Meta, Step } from "./types";

export const customMeta: Meta = {
  title: { ko: "커스텀 나염 의뢰", en: "Custom printing" },
  description: {
    ko: "내 디자인으로 나염 원단 만들기 — 상담부터 도수분리·리피트, 시직, 본생산, 납품까지의 절차와 준비물, 기법 선택 안내.",
    en: "Print your own design on fabric — the process from consultation through separation, repeat, strike-off, production and delivery, what to prepare, and how to choose a method.",
  },
};

export const customSteps: Step[] = [
  {
    n: "01",
    title: { ko: "상담", en: "Consultation" },
    body: {
      ko: "용도, 원단, 수량, 희망 납기를 알려주세요. 도안 상태를 보고 알맞은 원단과 나염 기법을 제안합니다.",
      en: "Tell us the use, fabric, quantity and timing. We look at the artwork and propose fabric and printing method.",
    },
  },
  {
    n: "02",
    title: { ko: "디자인 준비 · 의뢰", en: "Artwork or commission" },
    body: {
      ko: "도안이 있으면 파일을 보내 주세요. 없으면 자체 디자인 제도실에서 방향을 잡고 의뢰 디자인을 진행합니다.",
      en: "Send the file if you have artwork. If not, our design room sets a direction and develops the design for you.",
    },
  },
  {
    n: "03",
    title: { ko: "도수분리 · 리피트", en: "Separation & repeat" },
    body: {
      ko: "도안의 색을 나누고(도수분리) 이음매 없이 이어지도록 반복 단위(리피트)를 만듭니다. 이 작업은 제도실에서 직접 합니다.",
      en: "Colours are separated and the artwork is built into a seamless repeat. Done in-house in the design room.",
    },
  },
  {
    n: "04",
    title: { ko: "시직 · 샘플", en: "Strike-off & sample" },
    body: {
      ko: "실제 원단에 시험 인쇄해 색과 크기를 확인합니다. 여기서 수정합니다.",
      en: "A trial print on the actual cloth to check colour and scale. Changes happen here.",
    },
  },
  {
    n: "05",
    title: { ko: "본생산", en: "Production" },
    body: {
      ko: "확정한 시직을 기준으로 생산합니다.",
      en: "Production runs against the approved strike-off.",
    },
  },
  {
    n: "06",
    title: { ko: "검수 · 납품", en: "Inspection & delivery" },
    body: {
      ko: "검수 후 출고합니다. 납품 방식은 상담 때 정합니다.",
      en: "Inspected, then dispatched. Delivery is agreed at consultation.",
    },
  },
];

export const prepItems: Bi[] = [
  { ko: "도안 파일: AI·PDF·PSD, 또는 고해상도 JPG·PNG", en: "Artwork: AI, PDF, PSD, or high-resolution JPG/PNG" },
  { ko: "리피트 여부와 원하는 무늬 크기", en: "Whether it repeats, and the pattern scale you want" },
  { ko: "색 수와 참고색 (팬톤 번호나 실물)", en: "Number of colours and references (Pantone or physical)" },
  { ko: "원단 종류와 폭 — 정하지 못했으면 용도만", en: "Fabric type and width — or just the use, if undecided" },
  { ko: "예상 수량", en: "Estimated quantity" },
  { ko: "용도 (의류·침구·소품 등)", en: "Intended use (garments, bedding, goods…)" },
  { ko: "희망 납기", en: "Target date" },
];

export type MethodRow = { method: Bi; fabric: Bi; good: Bi; volume: Bi };

export const methodTable: MethodRow[] = [
  {
    method: { ko: "DTP (디지털)", en: "DTP (digital)" },
    fabric: { ko: "면 · 레이온 · 폴리에스터", en: "Cotton · rayon · polyester" },
    good: { ko: "색 수 제한 없음, 세밀한 표현, 판 비용 없음", en: "Unlimited colours, fine detail, no screen cost" },
    volume: { ko: "소량·샘플에 유리", en: "Best for small runs and samples" },
  },
  {
    method: { ko: "로터리", en: "Rotary" },
    fabric: { ko: "면 · 폴리에스터", en: "Cotton · polyester" },
    good: { ko: "대량에서 단가·속도 유리", en: "Cost and speed at volume" },
    volume: { ko: "대량에 유리 (도수별 스크린 필요)", en: "Best at volume (one screen per colour)" },
  },
  {
    method: { ko: "분사", en: "Spray" },
    fabric: { ko: "면 · 폴리에스터", en: "Cotton · polyester" },
    good: { ko: "그라데이션·번짐 표현", en: "Gradients and blended effects" },
    volume: { ko: "상담", en: "By consultation" },
  },
  {
    method: { ko: "반응성", en: "Reactive" },
    fabric: { ko: "면 · 레이온 · 텐셀", en: "Cotton · rayon · tencel" },
    good: { ko: "깊은 발색, 좋은 견뢰도, 원단 촉감 유지", en: "Deep colour, good fastness, natural hand" },
    volume: { ko: "상담", en: "By consultation" },
  },
  {
    method: { ko: "안료", en: "Pigment" },
    fabric: { ko: "폴리에스터 · 혼방 · 면", en: "Polyester · blends · cotton" },
    good: { ko: "진하고 불투명한 색, 소재 제약 적음", en: "Dense opaque colour on almost any fibre" },
    volume: { ko: "상담", en: "By consultation" },
  },
];

export const cautions: Bi[] = [
  {
    ko: "의뢰하신 도안의 저작권·초상권 확인은 의뢰인 책임입니다. 타인의 디자인은 받지 않습니다.",
    en: "Rights clearance for artwork you supply is your responsibility. We do not print other people's designs.",
  },
  {
    ko: "모니터와 실물 색은 다를 수 있습니다. 시직으로 확인하시길 권합니다.",
    en: "Screen colour and cloth colour differ. Approve a strike-off first.",
  },
  {
    ko: "수량·기간·단가는 원단과 기법에 따라 달라 상담 시 안내해 드립니다.",
    en: "Quantity, lead time and price depend on fabric and method and are confirmed during consultation.",
  },
  {
    ko: "리피트·도수분리 작업이 필요한 도안은 기간이 더 걸릴 수 있습니다.",
    en: "Artwork that needs repeat or separation work takes longer.",
  },
];
