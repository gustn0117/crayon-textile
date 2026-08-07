export const siteUrl = "https://crayon-textile.hsweb.pics";

export const navigation = [
  { href: "/about", en: "ABOUT", ko: "회사 소개" },
  { href: "/collection", en: "COLLECTION", ko: "컬렉션" },
  { href: "/studio", en: "STUDIO", ko: "디자인 스튜디오" },
  { href: "/contact", en: "CONTACT", ko: "문의" },
] as const;

/* The four fields Crayon develops fabric for. `swatch` names a global class in
   globals.css that draws the pattern. */
export const categories = [
  {
    code: "CR—W01",
    en: "WOMEN",
    ko: "여성복",
    description: "계절의 감도와 실용성을 함께 고려한 섬세한 패턴.",
    swatch: "swatch-women",
  },
  {
    code: "CR—K02",
    en: "KIDS",
    ko: "아동복",
    description: "밝고 생동감 있는 리듬과 자유로운 모티프.",
    swatch: "swatch-kids",
  },
  {
    code: "CR—C03",
    en: "CASUAL",
    ko: "캐주얼",
    description: "일상의 옷에 자연스럽게 스며드는 균형 잡힌 디자인.",
    swatch: "swatch-casual",
  },
  {
    code: "CR—H04",
    en: "HOME",
    ko: "침구 · 홈패브릭",
    description: "공간의 분위기를 완성하는 편안한 반복 패턴.",
    swatch: "swatch-home",
  },
] as const;

/* Shared so the home summaries and the detail pages can never drift apart. */
export const processSteps = [
  {
    step: "01",
    en: "RESEARCH",
    title: "시장 리서치",
    description: "계절과 브랜드가 필요로 하는 방향을 동대문 현장에서 직접 확인합니다.",
  },
  {
    step: "02",
    en: "CONCEPT",
    title: "아이디어 구상",
    description: "모티프와 구성, 밀도를 정하고 손으로 초안을 그립니다.",
  },
  {
    step: "03",
    en: "PATTERN",
    title: "패턴 개발",
    description: "반복 단위를 다듬어 원단 위에서 이음매 없이 이어지도록 만듭니다.",
  },
  {
    step: "04",
    en: "COLORWAY",
    title: "컬러웨이 전개",
    description: "같은 패턴을 여러 색으로 전개해 선택의 폭을 넓힙니다.",
  },
] as const;

export const principles = [
  {
    en: "MARKET SENSE",
    title: "시장을 읽는 경험",
    description:
      "30년간 동대문 현장에서 쌓은 감각으로 지금 필요한 원단이 무엇인지 읽습니다.",
  },
  {
    en: "ORIGINALITY",
    title: "직접 만드는 패턴",
    description: "자체 디자인 제도실에서 아이디어 구상부터 패턴 개발까지 직접 관리합니다.",
  },
  {
    en: "COMMERCIAL BALANCE",
    title: "상품이 되는 디자인",
    description: "보기 좋은 감각을 넘어 대중성과 활용도까지 현실적으로 설계합니다.",
  },
] as const;

export const destinations = ["JAPAN", "TAIWAN", "EUROPE", "MIDDLE EAST"] as const;

export const contact = {
  tel: "02-2266-0786",
  telHref: "tel:+82222660786",
  mobile: "010-7771-0786",
  mobileHref: "tel:+821077710786",
  fax: "02-2266-0787",
  email: "idhhhh@naver.com",
  emailHref: "mailto:idhhhh@naver.com",
  addressLines: ["서울특별시 종로구 종로 266", "동대문종합시장 D동 2층 2621호"],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%A2%85%EB%A1%9C%EA%B5%AC+%EC%A2%85%EB%A1%9C+266+%EB%8F%99%EB%8C%80%EB%AC%B8%EC%A2%85%ED%95%A9%EC%8B%9C%EC%9E%A5",
} as const;
