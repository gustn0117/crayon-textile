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
