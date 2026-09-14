import type { Bi } from "@/lib/bi";
import type { Meta, Section } from "./types";

export const fabricGuideMeta: Meta = {
  title: { ko: "원단 가이드", en: "Fabric guide" },
  description: {
    ko: "나염 원단 소재별 특징, 수·밀도·폭 같은 용어, 마·야드·미터 환산과 필요 수량 계산법, 세탁·관리, 나염 기법 5종 설명.",
    en: "Printed-fabric materials and their traits, terms like count, density and width, yard and metre conversions, how much to buy, care, and the five printing methods.",
  },
};

/* Names follow the fabric taxonomy in lib/fabrics.ts so a term here and a
   heading there never disagree. Anchors point at real group slugs. */
export type Material = { id: string; name: Bi; traits: Bi; care: Bi; href: string };

export const materials: Material[] = [
  {
    id: "cotton",
    name: { ko: "면 (코튼)", en: "Cotton" },
    traits: {
      ko: "통기성과 흡습성이 좋고 나염 발색이 안정적입니다. 수(s)가 높을수록 얇고 부드럽습니다 — 80수는 블라우스와 아동복, 40수·10수는 두께감 있는 옷과 홈패브릭에.",
      en: "Breathable and absorbent with stable print colour. Higher counts are finer — 80s for blouses and childrenswear, 40s and 10s for heavier garments and home textiles.",
    },
    care: { ko: "첫 세탁에서 약간 줄 수 있어 여유분을 두세요.", en: "May shrink a little on first wash; allow a margin." },
    href: "/fabrics/cotton#cotton-100",
  },
  {
    id: "rayon",
    name: { ko: "레이온", en: "Rayon" },
    traits: { ko: "드레이프와 은은한 광택. 원피스·블라우스에 많이 씁니다.", en: "Drape and a soft sheen — dresses and blouses." },
    care: { ko: "물세탁 시 수축·구김이 크니 손세탁이나 드라이를 권합니다.", en: "Shrinks and creases in the wash; hand wash or dry clean." },
    href: "/fabrics/cotton#rayon",
  },
  {
    id: "cr",
    name: { ko: "CR (면·레이온 혼방)", en: "CR (cotton·rayon)" },
    traits: { ko: "면의 안정감과 레이온의 드레이프를 함께 갖습니다.", en: "Cotton's stability with rayon's drape." },
    care: { ko: "레이온 비율이 높을수록 부드럽게 세탁하세요.", en: "The more rayon, the gentler the wash." },
    href: "/fabrics/cotton#cr",
  },
  {
    id: "knit",
    name: { ko: "다이마루 (니트)", en: "Interlock knit" },
    traits: { ko: "신축성이 있어 티셔츠·아동복·이너에 적합합니다.", en: "Stretchy — tees, childrenswear, inner layers." },
    care: { ko: "늘어나지 않게 뉘어서 말리세요.", en: "Dry flat to keep the shape." },
    href: "/fabrics/cotton#dymaru",
  },
  {
    id: "corduroy",
    name: { ko: "골덴 (코듀로이)", en: "Corduroy" },
    traits: { ko: "골이 있는 두께감 있는 면 원단. 가을·겨울 아동복과 캐주얼에.", en: "Ribbed, weighty cotton for autumn and winter childrenswear and casual." },
    care: { ko: "뒤집어서 세탁하고 골 방향으로 다림질하세요.", en: "Wash inside out; iron along the rib." },
    href: "/fabrics/cotton#corduroy",
  },
  {
    id: "brushed",
    name: { ko: "기모 · 본딩", en: "Brushed & bonded" },
    traits: {
      ko: "기모는 안쪽을 긁어 보온성을 높인 겨울 원단, 본딩은 두 겹을 붙여 두께와 보온을 더한 원단입니다.",
      en: "Brushed cloth is raised on the back for winter warmth; bonded cloth laminates two layers for body and warmth.",
    },
    care: { ko: "뒤집어서 세탁하고 건조기는 피하세요.", en: "Wash inside out; avoid tumble drying." },
    href: "/fabrics/cotton#fleece",
  },
  {
    id: "polyester",
    name: { ko: "폴리에스터", en: "Polyester" },
    traits: {
      ko: "형태 안정성이 좋고 빨리 마르며 구김이 적습니다. 새틴·쉬폰·아문젠·올피치·CDC 등 조직이 다양합니다.",
      en: "Stable, quick-drying and crease-resistant; satin, chiffon, amunzen, all-peach, CDC and more.",
    },
    care: { ko: "고온 다림질을 피하세요.", en: "Avoid a hot iron." },
    href: "/fabrics/polyester",
  },
];

export type Term = { term: Bi; body: Bi };

export const terms: Term[] = [
  {
    term: { ko: "수 (s)", en: "Count (s)" },
    body: {
      ko: "실의 굵기. 숫자가 클수록 실이 가늘어 원단이 얇고 부드럽습니다. 면 80수는 얇은 블라우스감, 면 40수는 셔츠·홈패브릭감, 10수는 두꺼운 캔버스감입니다.",
      en: "Yarn thickness. A higher number means finer yarn and a lighter, softer cloth — cotton 80s for blouses, 40s for shirts and home textiles, 10s for canvas weight.",
    },
  },
  {
    term: { ko: "밀도", en: "Density" },
    body: { ko: "일정 폭 안에 들어가는 실의 수. 같은 수라도 밀도가 높으면 더 촘촘하고 탄탄합니다.", en: "Threads per unit width. At the same count, higher density is tighter and firmer." },
  },
  {
    term: { ko: "폭", en: "Width" },
    body: {
      ko: "원단의 가로 너비. 인치로 부르며 44인치(약 112cm), 58인치(약 147cm)가 흔합니다. 폭이 넓을수록 같은 옷에 원단이 덜 듭니다.",
      en: "Cloth width, quoted in inches — 44\" (about 112 cm) and 58\" (about 147 cm) are common. Wider cloth needs less length for the same garment.",
    },
  },
  {
    term: { ko: "마 · 야드 · 미터", en: "Ma · yard · metre" },
    body: {
      ko: "동대문에서 길이는 '마'로 부릅니다. 1마 = 1야드 = 91.44cm. 1미터는 약 1.09마입니다.",
      en: "Length in Dongdaemun is quoted in 'ma'. 1 ma = 1 yard = 91.44 cm; 1 metre is about 1.09 ma.",
    },
  },
  {
    term: { ko: "롤 (절)", en: "Roll" },
    body: { ko: "도매 단위. 원단 한 롤에 감긴 길이는 원단마다 다릅니다.", en: "The wholesale unit. The length on one roll varies by fabric." },
  },
  {
    term: { ko: "나염 · 무지", en: "Print · solid" },
    body: { ko: "나염은 무늬를 찍은 원단, 무지는 한 가지 색으로 염색한 원단입니다.", en: "A print carries a pattern; a solid is dyed one colour." },
  },
  {
    term: { ko: "리피트", en: "Repeat" },
    body: {
      ko: "무늬가 반복되는 한 단위. 큰 리피트 무늬를 옷에서 맞추려면 그만큼 원단이 더 듭니다.",
      en: "One unit of the pattern before it repeats. Matching a large repeat across a garment takes extra cloth.",
    },
  },
  {
    term: { ko: "도수", en: "Colour count" },
    body: { ko: "무늬에 쓰인 색의 수. 로터리 나염은 도수마다 스크린이 필요합니다.", en: "The number of colours in a print. Rotary printing needs one screen per colour." },
  },
];

export const conversions: Bi[] = [
  { ko: "1마 = 1야드 = 91.44cm", en: "1 ma = 1 yard = 91.44 cm" },
  { ko: "1m ≈ 1.09마", en: "1 m ≈ 1.09 ma" },
  { ko: "폭 44인치 ≈ 112cm · 58인치 ≈ 147cm", en: "Width 44\" ≈ 112 cm · 58\" ≈ 147 cm" },
];

export const quantityGuide: { lead: Bi; rules: Bi[]; examples: Bi[]; note: Bi } = {
  lead: {
    ko: "필요한 길이는 원단 폭, 만드는 것의 크기, 무늬를 맞출지에 따라 달라집니다. 아래는 계산 순서와 참고치입니다.",
    en: "How much you need depends on cloth width, what you are making and whether the print must match. Here is the order of work and some rules of thumb.",
  },
  rules: [
    { ko: "패턴(옷본)의 세로 길이에 만들 벌 수를 곱합니다.", en: "Multiply the pattern's length by the number of pieces." },
    { ko: "여유분을 10–15% 더합니다. 첫 세탁 수축과 재단 오차를 위한 것입니다.", en: "Add 10–15% for first-wash shrinkage and cutting loss." },
    { ko: "폭이 넓은 원단(58인치)은 좁은 원단(44인치)보다 덜 듭니다.", en: "Wide cloth (58\") needs less length than narrow (44\")." },
    { ko: "큰 무늬를 앞뒤·소매에서 맞추려면 리피트 한 단위만큼 더 두세요.", en: "To match a large print across pieces, allow one extra repeat." },
  ],
  examples: [
    { ko: "블라우스·상의 1벌: 약 1.5–2마 안팎", en: "A blouse or top: roughly 1.5–2 ma" },
    { ko: "원피스 1벌: 약 2.5–3마 안팎", en: "A dress: roughly 2.5–3 ma" },
    { ko: "아동복 상의 1벌: 약 1마 안팎", en: "A child's top: roughly 1 ma" },
    { ko: "침구·커튼: 완성 치수에 시접을 더해 계산", en: "Bedding and curtains: finished size plus seam allowance" },
  ],
  note: {
    ko: "참고치입니다. 사이즈와 디자인에 따라 달라지니, 정확한 양은 매장에서 함께 계산해 드립니다.",
    en: "Rules of thumb only — size and design change them. We work out the exact amount with you in the shop.",
  },
};

export const care: Section[] = [
  {
    id: "care-first",
    title: { ko: "첫 세탁", en: "First wash" },
    bullets: [
      { ko: "처음에는 단독으로, 찬물에 세탁하세요. 진한 색은 이염될 수 있습니다.", en: "Wash alone in cold water the first time; dark colours can bleed." },
      { ko: "뒤집어서 세탁하면 무늬 면이 덜 쓸립니다.", en: "Inside out protects the printed face." },
    ],
  },
  {
    id: "care-detergent",
    title: { ko: "세제 · 표백", en: "Detergent & bleach" },
    bullets: [
      { ko: "중성세제를 쓰고 표백제는 피하세요.", en: "Use a neutral detergent; no bleach." },
      { ko: "오래 담가 두지 마세요.", en: "Do not soak for long." },
    ],
  },
  {
    id: "care-dry",
    title: { ko: "건조", en: "Drying" },
    bullets: [
      { ko: "그늘에서 말리세요. 직사광선은 색을 바래게 합니다.", en: "Dry in shade; direct sun fades colour." },
      { ko: "건조기는 수축과 색 빠짐의 원인이 되니 피하세요. 니트는 뉘어서 말립니다.", en: "Avoid tumble drying — shrinkage and fading. Dry knits flat." },
    ],
  },
  {
    id: "care-iron",
    title: { ko: "다림질", en: "Ironing" },
    bullets: [
      { ko: "원단 종류에 맞는 온도로, 되도록 뒷면에서 다리세요.", en: "Set the iron for the fibre and iron on the back where you can." },
      { ko: "폴리에스터는 저온, 면은 중온. 안료 나염은 무늬 면에 직접 고온을 대지 마세요.", en: "Low for polyester, medium for cotton. Keep a hot iron off the face of pigment prints." },
    ],
  },
];

export type Method = { id: string; name: Bi; body: Bi; fit: Bi };

export const methods: Method[] = [
  {
    id: "dtp",
    name: { ko: "DTP (디지털 나염)", en: "DTP (digital printing)" },
    body: {
      ko: "판 없이 프린터처럼 직접 찍습니다. 색 수 제한이 없고 세밀한 표현에 강해 샘플과 소량, 다색 도안에 유리합니다.",
      en: "Printed directly like a large printer, with no screens. Unlimited colours and fine detail — suits samples, small runs and multicolour artwork.",
    },
    fit: { ko: "소량 · 다색 · 정밀 도안", en: "Small runs · many colours · fine detail" },
  },
  {
    id: "rotary",
    name: { ko: "로터리 나염", en: "Rotary printing" },
    body: {
      ko: "원통형 스크린으로 연속해서 찍습니다. 색(도수)마다 스크린을 만들며, 대량 생산에서 단가와 속도가 유리합니다.",
      en: "Cylindrical screens print continuously, one screen per colour. Best on cost and speed for volume production.",
    },
    fit: { ko: "대량 · 정해진 도수", en: "Volume · fixed colour count" },
  },
  {
    id: "spray",
    name: { ko: "분사 나염", en: "Spray printing" },
    body: {
      ko: "노즐로 염료를 뿌려 찍습니다. 그라데이션과 자연스러운 번짐 표현에 씁니다.",
      en: "Dye sprayed through nozzles — used for gradients and soft, blended effects.",
    },
    fit: { ko: "그라데이션 · 번짐 효과", en: "Gradients · blended effects" },
  },
  {
    id: "reactive",
    name: { ko: "반응성 나염", en: "Reactive printing" },
    body: {
      ko: "반응성 염료가 면·레이온 같은 셀룰로오스 섬유와 화학적으로 결합합니다. 발색이 깊고 견뢰도가 좋으며 원단 촉감이 그대로 남습니다.",
      en: "Reactive dyes bond chemically with cellulose fibres such as cotton and rayon. Deep colour, good fastness, and the cloth keeps its natural hand.",
    },
    fit: { ko: "면 · 레이온 · 텐셀", en: "Cotton · rayon · tencel" },
  },
  {
    id: "pigment",
    name: { ko: "안료 나염", en: "Pigment printing" },
    body: {
      ko: "안료를 바인더로 원단 표면에 고착합니다. 원단을 가리지 않고 진하고 불투명한 색이 나오며 폴리에스터·혼방에도 쓸 수 있습니다. 촉감은 약간 단단해질 수 있습니다.",
      en: "Pigment is fixed to the surface with a binder. Dense, opaque colour on almost any fibre including polyester and blends; the hand can be slightly firmer.",
    },
    fit: { ko: "폴리에스터 · 혼방 · 진한 색", en: "Polyester · blends · dense colour" },
  },
];
