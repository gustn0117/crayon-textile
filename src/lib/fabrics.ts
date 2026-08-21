import type { Locale } from "./i18n";

/* One source for the whole fabric taxonomy. Both locales live on the same node
   so the Korean and English trees can never drift apart. */

export type Bi = { ko: string; en: string };
export type FabricItem = { name: Bi; note: Bi };
export type FabricGroup = { slug: string; name: Bi; items: FabricItem[] };

export type FabricCategory = {
  /** URL after /fabrics, or the full path when `path` is set. */
  slug: string;
  path?: string;
  nav: Bi;
  label: Bi;
  title: Bi;
  lead: Bi;
  meta: Bi;
  keywords: { ko: string[]; en: string[] };
  /** Appended to each group name to build its H2 — "레이온" + " 나염 원단". */
  headingSuffix: Bi;
  note?: Bi;
  groups: FabricGroup[];
};

export function pick(v: Bi, lang: Locale) {
  return v[lang];
}

export function categoryPath(c: FabricCategory) {
  return c.path ?? `/fabrics/${c.slug}`;
}

const cotton: FabricCategory = {
  slug: "cotton",
  nav: { ko: "면·셀룰로오스", en: "Cotton & Cellulose" },
  label: { ko: "COTTON · CELLULOSE", en: "COTTON · CELLULOSE" },
  title: {
    ko: "면·셀룰로오스 나염 원단",
    en: "Printed cotton and cellulose fabric",
  },
  lead: {
    ko: "면 100%부터 레이온, 다이마루, 골덴, 기모지까지. 수량과 용도를 알려주시면 알맞은 번수와 가공을 함께 잡아드립니다.",
    en: "From 100% cotton through rayon, interlock knit, corduroy and brushed fleece. Tell us the use and the volume and we will settle the yarn count and finish with you.",
  },
  meta: {
    ko: "면 80수·60수·40수·10수 나염 원단, 레이온 나염, 다이마루 나염, 골덴 나염, 겨울 기모 나염까지. 동대문 나염 원단 전문 크레용.",
    en: "Printed cotton in 80s, 60s, 40s and 10s, plus rayon, interlock knit, corduroy and brushed winter fabric from CRAYON in Dongdaemun, Seoul.",
  },
  keywords: {
    ko: [
      "면 나염 원단",
      "면 80수",
      "면 60수",
      "면 40수",
      "레이온 나염",
      "다이마루 나염",
      "골덴 나염",
      "기모 나염",
      "RN 나염",
      "동대문 원단 도매",
    ],
    en: [
      "printed cotton fabric",
      "cotton 80s",
      "cotton 60s",
      "rayon print",
      "interlock knit print",
      "corduroy print",
      "brushed fleece print",
      "Dongdaemun fabric wholesale",
    ],
  },
  headingSuffix: { ko: " 나염 원단", en: " printed fabric" },
  groups: [
    {
      slug: "cotton-100",
      name: { ko: "면 100%", en: "100% cotton" },
      items: [
        {
          name: { ko: "면 80수(80s) 나염 원단", en: "Cotton 80s printed fabric" },
          note: {
            ko: "가장 얇고 부드러운 번수. 블라우스·원피스·아동복 안감에 주로 씁니다.",
            en: "The finest, softest count — blouses, dresses and childrenswear linings.",
          },
        },
        {
          name: { ko: "면 60수(60s) 나염 원단", en: "Cotton 60s printed fabric" },
          note: {
            ko: "가장 폭넓게 쓰이는 번수. 셔츠와 원피스에 무난하게 맞습니다.",
            en: "The most widely used count — sits comfortably in shirts and dresses.",
          },
        },
        {
          name: { ko: "면 40수(40s) 나염 원단", en: "Cotton 40s printed fabric" },
          note: {
            ko: "적당한 두께와 힘. 셔츠, 팬츠, 아동복 겉감에 두루 쓰입니다.",
            en: "Moderate weight with body — shirts, trousers and children's outerwear.",
          },
        },
        {
          name: { ko: "면 10수(10s) 나염 원단", en: "Cotton 10s printed fabric" },
          note: {
            ko: "두껍고 튼튼한 번수. 가방, 쿠션, 홈패브릭 쪽에 적합합니다.",
            en: "Heavy and hard-wearing — bags, cushions and home fabric.",
          },
        },
      ],
    },
    {
      slug: "rayon",
      name: { ko: "레이온", en: "Rayon" },
      items: [
        {
          name: { ko: "레이온 나염 원단", en: "Rayon printed fabric" },
          note: {
            ko: "떨어짐이 좋고 발색이 깊습니다. 여성복 원피스와 블라우스에 잘 맞습니다.",
            en: "Fluid drape and deep colour — suited to women's dresses and blouses.",
          },
        },
        {
          name: { ko: "RN(레이온·나일론) 나염 원단", en: "RN (rayon·nylon) printed fabric" },
          note: {
            ko: "레이온의 촉감에 나일론의 강도를 더한 혼방입니다.",
            en: "Rayon's hand with nylon's strength — a blend for pieces that take wear.",
          },
        },
      ],
    },
    {
      slug: "cr",
      name: { ko: "CR (면·레이온)", en: "CR (cotton·rayon)" },
      items: [
        {
          name: { ko: "CR 나염 원단", en: "CR printed fabric" },
          note: {
            ko: "면의 안정감과 레이온의 촉감을 함께 가져가는 혼방입니다.",
            en: "A blend that keeps cotton's stability and rayon's touch.",
          },
        },
      ],
    },
    {
      slug: "dymaru",
      name: { ko: "다이마루 (니트)", en: "Interlock knit" },
      items: [
        {
          name: { ko: "면 다이마루 나염 원단", en: "Cotton interlock knit print" },
          note: {
            ko: "신축성이 있는 편직 원단. 티셔츠와 아동복에 많이 나갑니다.",
            en: "A knit with stretch — heavily used for tees and childrenswear.",
          },
        },
      ],
    },
    {
      slug: "corduroy",
      name: { ko: "골덴 (코듀로이)", en: "Corduroy" },
      items: [
        {
          name: { ko: "면 골덴 나염 원단", en: "Cotton corduroy print" },
          note: {
            ko: "결이 있는 표면 위에 무늬를 얹습니다. 가을·겨울 아이템에 씁니다.",
            en: "Pattern laid over a ribbed surface — an autumn and winter cloth.",
          },
        },
      ],
    },
    {
      slug: "fleece",
      name: { ko: "기모지 · 본딩", en: "Brushed & bonded" },
      items: [
        {
          name: { ko: "겨울 기모 나염 원단", en: "Brushed winter print" },
          note: {
            ko: "뒷면을 기모 처리해 보온성을 올린 겨울용 원단입니다.",
            en: "Brushed on the reverse for warmth — a winter-weight fabric.",
          },
        },
        {
          name: { ko: "본딩용 나염 원단", en: "Fabric for bonding" },
          note: {
            ko: "안감과 접합해 두께와 보온을 확보하는 겨울 의류용입니다.",
            en: "Bonded to a backing for thickness and warmth in winter garments.",
          },
        },
      ],
    },
  ],
};

const polyester: FabricCategory = {
  slug: "polyester",
  nav: { ko: "폴리에스터", en: "Polyester" },
  label: { ko: "POLYESTER", en: "POLYESTER" },
  title: { ko: "폴리에스터 나염 원단", en: "Printed polyester fabric" },
  lead: {
    ko: "QDC, 새틴, 쉬폰, 메쉬, 아문젠, 올피치, CDC 등 여성복에 많이 나가는 품목을 다룹니다.",
    en: "QDC, satin, chiffon, mesh, amunzen, all-peach and CDC — the polyester bases womenswear leans on.",
  },
  meta: {
    ko: "QDC 나염, 폴리 새틴 나염, 쉬폰 프린트, 메쉬 프린트, 아문젠·올피치·CDC 나염 원단. 블라우스·원피스용 폴리 원단 상담.",
    en: "QDC, satin, chiffon, mesh, amunzen, all-peach and CDC printed polyester for blouses and dresses, from CRAYON in Dongdaemun.",
  },
  keywords: {
    ko: [
      "폴리 나염",
      "QDC 원단",
      "쉬폰 나염",
      "CDC 원단",
      "폴리 새틴 나염",
      "메쉬 프린트 원단",
      "아문젠 나염",
      "블라우스 원단",
      "원피스 원단",
    ],
    en: [
      "printed polyester",
      "QDC fabric",
      "chiffon print",
      "CDC fabric",
      "satin print",
      "mesh print fabric",
      "blouse fabric",
      "dress fabric",
    ],
  },
  note: {
    ko: "폴리에스터는 취급 품목이 넓습니다. 아래에 없는 소재도 상담해 주시면 확인해 드립니다.",
    en: "Our polyester range is wider than the list below. Ask about anything you don't see here.",
  },
  headingSuffix: { ko: " 나염 원단", en: " printed fabric" },
  groups: [
    {
      slug: "qdc",
      name: { ko: "QDC", en: "QDC" },
      items: [
        {
          name: { ko: "QDC 나염 원단", en: "QDC printed fabric" },
          note: {
            ko: "가볍고 형태가 잘 잡혀 블라우스와 원피스에 폭넓게 쓰입니다.",
            en: "Light with good form — a staple for blouses and dresses.",
          },
        },
      ],
    },
    {
      slug: "satin",
      name: { ko: "새틴", en: "Satin" },
      items: [
        {
          name: { ko: "폴리 새틴 나염 원단", en: "Polyester satin print" },
          note: {
            ko: "광택이 있는 표면. 발색이 선명하게 올라옵니다.",
            en: "A lustrous face that lifts colour sharply.",
          },
        },
      ],
    },
    {
      slug: "chiffon",
      name: { ko: "쉬폰", en: "Chiffon" },
      items: [
        {
          name: { ko: "쉬폰 프린트 원단", en: "Chiffon print fabric" },
          note: {
            ko: "얇고 비치는 원단. 레이어드와 여름 블라우스에 씁니다.",
            en: "Sheer and light — layering pieces and summer blouses.",
          },
        },
      ],
    },
    {
      slug: "mesh",
      name: { ko: "메쉬", en: "Mesh" },
      items: [
        {
          name: { ko: "메쉬 프린트 원단", en: "Mesh print fabric" },
          note: {
            ko: "망 구조로 통기성이 좋습니다. 배색과 겹침 효과를 노릴 때 씁니다.",
            en: "An open structure that breathes, and layers for colour effects.",
          },
        },
      ],
    },
    {
      slug: "amunzen",
      name: { ko: "아문젠", en: "Amunzen" },
      items: [
        {
          name: { ko: "아문젠 나염 원단", en: "Amunzen printed fabric" },
          note: {
            ko: "잔주름 같은 표면 조직으로 차분한 인상을 냅니다.",
            en: "A finely crinkled surface that reads calm rather than shiny.",
          },
        },
      ],
    },
    {
      slug: "all-peach",
      name: { ko: "올피치", en: "All-peach" },
      items: [
        {
          name: { ko: "올피치 나염 원단", en: "All-peach printed fabric" },
          note: {
            ko: "표면을 기모 처리해 부드러운 촉감을 낸 원단입니다.",
            en: "Peach-finished on the surface for a soft, matte hand.",
          },
        },
      ],
    },
    {
      slug: "cdc",
      name: { ko: "CDC", en: "CDC" },
      items: [
        {
          name: { ko: "CDC 나염 원단", en: "CDC printed fabric" },
          note: {
            ko: "적당한 무게와 떨어짐. 원피스와 셋업에 두루 맞습니다.",
            en: "Weight and drape in balance — dresses and co-ord sets.",
          },
        },
      ],
    },
    {
      slug: "polyester-etc",
      name: { ko: "기타 폴리에스터", en: "Other polyester" },
      items: [
        {
          name: { ko: "여성복용 폴리 원단", en: "Polyester for womenswear" },
          note: {
            ko: "시즌과 아이템에 맞춰 적합한 폴리 베이스를 함께 고릅니다.",
            en: "We pick the base together, against the season and the garment.",
          },
        },
        {
          name: { ko: "원피스용 폴리 원단", en: "Polyester for dresses" },
          note: {
            ko: "떨어짐과 무게를 기준으로 후보를 좁혀 제안합니다.",
            en: "Narrowed down by drape and weight before we propose.",
          },
        },
        {
          name: { ko: "블라우스용 폴리 원단", en: "Polyester for blouses" },
          note: {
            ko: "비침과 다림질 편의까지 고려해 안내해 드립니다.",
            en: "Chosen with opacity and ease of pressing in mind.",
          },
        },
      ],
    },
  ],
};

const use: FabricCategory = {
  slug: "use",
  nav: { ko: "용도별 원단", en: "Fabric by use" },
  label: { ko: "BY USE", en: "BY USE" },
  title: { ko: "용도별 나염 원단", en: "Printed fabric by use" },
  lead: {
    ko: "원단 이름을 정확히 몰라도 괜찮습니다. 만드실 옷의 종류를 알려주시면 거기에 맞는 소재와 번수를 저희가 좁혀드립니다.",
    en: "You don't need the fabric's name. Tell us the garment you're making and we will narrow the base and the count for you.",
  },
  meta: {
    ko: "여성 블라우스·원피스 원단, 아동복 나염 원단, 남성 캐주얼 원단, 침구·쿠션용 원단, 겨울 기모·본딩 원단을 용도별로 안내합니다.",
    en: "Fabric organised by garment — blouses, dresses, childrenswear, men's casual, bedding and cushions, and brushed or bonded winter cloth.",
  },
  keywords: {
    ko: [
      "블라우스 원단",
      "원피스 원단",
      "아동복 원단",
      "여성복 원단",
      "겨울 의류 원단",
      "침구용 원단",
      "쿠션용 원단",
      "남성 캐주얼 원단",
    ],
    en: [
      "blouse fabric",
      "dress fabric",
      "childrenswear fabric",
      "womenswear fabric",
      "winter garment fabric",
      "bedding fabric",
      "cushion fabric",
    ],
  },
  headingSuffix: { ko: " 원단", en: " fabric" },
  groups: [
    {
      slug: "womens",
      name: { ko: "여성복", en: "Womenswear" },
      items: [
        {
          name: { ko: "여성 블라우스 원단", en: "Fabric for women's blouses" },
          note: {
            ko: "면 60수·80수, QDC, 쉬폰 쪽에서 주로 후보를 잡습니다.",
            en: "Usually drawn from cotton 60s and 80s, QDC and chiffon.",
          },
        },
        {
          name: { ko: "여성 원피스 원단", en: "Fabric for women's dresses" },
          note: {
            ko: "떨어짐이 중요해 레이온, CDC, 새틴을 자주 제안합니다.",
            en: "Drape leads here — rayon, CDC and satin come up most.",
          },
        },
        {
          name: { ko: "여성 바지 원단", en: "Fabric for women's trousers" },
          note: {
            ko: "형태 유지가 필요해 면 40수 이상이나 혼방을 봅니다.",
            en: "Form matters, so cotton 40s and up, or a blend.",
          },
        },
      ],
    },
    {
      slug: "kids",
      name: { ko: "아동복", en: "Childrenswear" },
      items: [
        {
          name: { ko: "아동복 나염 원단", en: "Printed childrenswear fabric" },
          note: {
            ko: "촉감과 세탁 내구성을 함께 봅니다. 면과 다이마루가 중심입니다.",
            en: "Hand and wash durability together — mostly cotton and interlock.",
          },
        },
        {
          name: { ko: "아동 바지 원단", en: "Fabric for children's trousers" },
          note: {
            ko: "활동량을 견디도록 조금 두꺼운 번수로 잡습니다.",
            en: "A heavier count, set to take the wear children give it.",
          },
        },
      ],
    },
    {
      slug: "mens",
      name: { ko: "남성복", en: "Menswear" },
      items: [
        {
          name: { ko: "남성 캐주얼 원단", en: "Men's casual fabric" },
          note: {
            ko: "셔츠와 팬츠에 맞는 면·혼방 위주로 제안합니다.",
            en: "Cotton and blends set against shirts and trousers.",
          },
        },
      ],
    },
    {
      slug: "home",
      name: { ko: "침구 · 홈패브릭", en: "Bedding & home fabric" },
      items: [
        {
          name: { ko: "침구용 원단", en: "Bedding fabric" },
          note: {
            ko: "넓은 면적에 무늬가 반복되므로 리피트 설계가 중요합니다.",
            en: "Large areas mean the repeat has to be built carefully.",
          },
        },
        {
          name: { ko: "쿠션용 원단", en: "Cushion fabric" },
          note: {
            ko: "두께가 필요해 면 10수 같은 굵은 번수를 주로 씁니다.",
            en: "Body is needed, so heavier counts such as cotton 10s.",
          },
        },
      ],
    },
    {
      slug: "winter",
      name: { ko: "겨울 의류", en: "Winter garments" },
      items: [
        {
          name: { ko: "겨울 기모 원단", en: "Brushed winter fabric" },
          note: {
            ko: "뒷면 기모로 보온을 확보한 원단입니다.",
            en: "Brushed on the reverse to hold warmth.",
          },
        },
        {
          name: { ko: "본딩 겨울 의류 원단", en: "Bonded winter fabric" },
          note: {
            ko: "접합으로 두께를 만들어 아우터와 겨울 아이템에 씁니다.",
            en: "Bonded for thickness — outerwear and winter pieces.",
          },
        },
      ],
    },
    {
      slug: "casual",
      name: { ko: "캐주얼웨어", en: "Casualwear" },
      items: [
        {
          name: { ko: "캐주얼 셔츠 원단", en: "Casual shirt fabric" },
          note: {
            ko: "일상복에 무리 없이 스며드는 밀도와 무늬로 잡습니다.",
            en: "Density and motif set to sit easily in everyday clothing.",
          },
        },
        {
          name: { ko: "캐주얼 팬츠 원단", en: "Casual trouser fabric" },
          note: {
            ko: "면 다이마루, 골덴 등 계절에 맞는 베이스를 고릅니다.",
            en: "Interlock, corduroy and other bases chosen by season.",
          },
        },
      ],
    },
  ],
};

const design: FabricCategory = {
  slug: "design",
  nav: { ko: "디자인별 원단", en: "Fabric by design" },
  label: { ko: "BY DESIGN", en: "BY DESIGN" },
  title: { ko: "디자인별 나염 원단", en: "Printed fabric by design" },
  lead: {
    ko: "크레용의 패턴은 모두 자체 디자인 제도실에서 개발합니다. 원하시는 무늬 계열을 고르시면 그 안에서 소재와 용도에 맞춰 제안합니다.",
    en: "Every CRAYON pattern is developed in our own design room. Pick the family you want and we will propose within it, against base and use.",
  },
  meta: {
    ko: "플라워, 스트라이프, 체크, 도트, 동물, 기하학, 빈티지, 클래식, 아동, 시즌 디자인까지. 자체 개발 나염 패턴을 계열별로 안내합니다.",
    en: "Floral, stripe, check, dot, animal, geometric, vintage, classic, children's and seasonal — CRAYON's in-house printed patterns by family.",
  },
  keywords: {
    ko: [
      "자체 디자인 원단",
      "플라워 나염 원단",
      "스트라이프 원단",
      "체크 나염",
      "도트 나염",
      "기하학 패턴 원단",
      "빈티지 나염",
      "아동 패턴 원단",
    ],
    en: [
      "original printed fabric",
      "floral print fabric",
      "stripe fabric",
      "check print",
      "dot print",
      "geometric pattern fabric",
      "vintage print",
    ],
  },
  note: {
    ko: "상품명은 소재 + 디자인 + 용도 순으로 안내해 드립니다. 예를 들어 “면 60수 플라워 나염 원단 – 여성 블라우스·원피스용”처럼요.",
    en: "We name a fabric base first, then design, then use — for example “Cotton 60s floral print — for women's blouses and dresses”.",
  },
  headingSuffix: { ko: " 나염 원단", en: " print" },
  groups: [
    {
      slug: "flower",
      name: { ko: "플라워", en: "Floral" },
      items: [
        {
          name: {
            ko: "면 60수 플라워 나염 원단 – 여성 블라우스·원피스용",
            en: "Cotton 60s floral print — women's blouses and dresses",
          },
          note: {
            ko: "크레용에서 가장 많이 나가는 계열입니다. 밀도와 크기를 폭넓게 전개합니다.",
            en: "Our busiest family, developed across a wide range of scale and density.",
          },
        },
        {
          name: {
            ko: "레이온 플라워 나염 원단 – 원피스용",
            en: "Rayon floral print — dresses",
          },
          note: {
            ko: "떨어짐이 좋아 큰 꽃무늬도 부담 없이 소화합니다.",
            en: "The drape carries a larger floral without weighing it down.",
          },
        },
      ],
    },
    {
      slug: "stripe",
      name: { ko: "스트라이프", en: "Stripe" },
      items: [
        {
          name: {
            ko: "면 40수 스트라이프 나염 원단 – 셔츠·캐주얼용",
            en: "Cotton 40s stripe print — shirts and casual",
          },
          note: {
            ko: "굵기와 간격에 따라 인상이 크게 달라지는 계열입니다.",
            en: "Weight and interval change the impression more than anything.",
          },
        },
      ],
    },
    {
      slug: "check",
      name: { ko: "체크", en: "Check" },
      items: [
        {
          name: {
            ko: "면 다이마루 체크 나염 원단 – 아동복용",
            en: "Cotton interlock check print — childrenswear",
          },
          note: {
            ko: "아동복에서 가장 오래 사랑받는 무늬 계열입니다.",
            en: "The pattern family childrenswear keeps coming back to.",
          },
        },
      ],
    },
    {
      slug: "dot",
      name: { ko: "도트", en: "Dot" },
      items: [
        {
          name: {
            ko: "면 80수 도트 나염 원단 – 블라우스용",
            en: "Cotton 80s dot print — blouses",
          },
          note: {
            ko: "크기를 줄이면 잔잔하게, 키우면 대담하게 읽힙니다.",
            en: "Small reads quiet; enlarged, the same dot turns bold.",
          },
        },
      ],
    },
    {
      slug: "animal",
      name: { ko: "동물", en: "Animal" },
      items: [
        {
          name: {
            ko: "아동 동물 나염 원단 – 아동복·홈패브릭용",
            en: "Children's animal print — childrenswear and home",
          },
          note: {
            ko: "아동복과 침구 양쪽에서 꾸준히 찾는 계열입니다.",
            en: "Steadily asked for in both childrenswear and bedding.",
          },
        },
      ],
    },
    {
      slug: "geometric",
      name: { ko: "기하학", en: "Geometric" },
      items: [
        {
          name: {
            ko: "폴리 기하학 나염 원단 – 원피스·셋업용",
            en: "Polyester geometric print — dresses and co-ords",
          },
          note: {
            ko: "반복 구조가 뚜렷해 리피트 설계가 특히 중요한 계열입니다.",
            en: "The structure is explicit, so the repeat has to be exact.",
          },
        },
      ],
    },
    {
      slug: "vintage",
      name: { ko: "빈티지", en: "Vintage" },
      items: [
        {
          name: {
            ko: "레이온 빈티지 나염 원단 – 여성복용",
            en: "Rayon vintage print — womenswear",
          },
          note: {
            ko: "채도를 낮춘 배색으로 오래된 원단의 인상을 냅니다.",
            en: "Muted colourways that carry the feel of an older cloth.",
          },
        },
      ],
    },
    {
      slug: "classic",
      name: { ko: "클래식 (페이즐리 등)", en: "Classic (paisley etc.)" },
      items: [
        {
          name: {
            ko: "페이즐리 나염 원단 – 여성복·홈패브릭용",
            en: "Paisley print — womenswear and home fabric",
          },
          note: {
            ko: "시즌을 크게 타지 않아 오래 쓰이는 계열입니다.",
            en: "Barely seasonal, which is why it stays in the line for years.",
          },
        },
      ],
    },
    {
      slug: "kids-design",
      name: { ko: "아동 디자인", en: "Children's designs" },
      items: [
        {
          name: {
            ko: "아동 패턴 나염 원단 – 아동복 전용",
            en: "Children's pattern print — childrenswear",
          },
          note: {
            ko: "밝은 배색과 자유로운 모티프로 전개합니다.",
            en: "Bright colourways and motifs that move freely.",
          },
        },
      ],
    },
    {
      slug: "seasonal",
      name: { ko: "시즌 디자인", en: "Seasonal designs" },
      items: [
        {
          name: {
            ko: "시즌 나염 원단 – 봄·여름 / 가을·겨울",
            en: "Seasonal print — S/S and F/W",
          },
          note: {
            ko: "시즌마다 새로 개발하는 디자인은 상담 시 보여드립니다.",
            en: "Newly developed each season — shown during consultation.",
          },
        },
      ],
    },
  ],
};

const season: FabricCategory = {
  slug: "new",
  path: "/new",
  nav: { ko: "신상품", en: "New" },
  label: { ko: "NEW FABRIC", en: "NEW FABRIC" },
  title: { ko: "신상품 · 시즌 원단", en: "New and seasonal fabric" },
  lead: {
    ko: "크레용은 시즌마다 새 디자인을 개발합니다. 이번 시즌의 방향과 준비 중인 품목을 아래에 정리했습니다.",
    en: "CRAYON develops new designs every season. Below is where this season is heading and what is being prepared.",
  },
  meta: {
    ko: "2026 F/W 시즌 원단, 겨울 기모·본딩 원단, 봄·여름 및 가을·겨울 시즌 나염 원단과 신규 개발 디자인 안내.",
    en: "2026 F/W season fabric, brushed and bonded winter cloth, S/S and F/W seasonal prints and newly developed designs.",
  },
  keywords: {
    ko: [
      "신상품 나염 원단",
      "2026 FW 원단",
      "겨울 기모 원단",
      "겨울 본딩 원단",
      "시즌 나염 원단",
      "신규 개발 디자인",
    ],
    en: [
      "new printed fabric",
      "2026 FW fabric",
      "brushed winter fabric",
      "bonded winter fabric",
      "seasonal print",
    ],
  },
  note: {
    ko: "재고와 신규 디자인은 수시로 바뀝니다. 지금 나와 있는 품목은 전화나 이메일로 문의해 주시면 바로 안내해 드립니다.",
    en: "Stock and new designs change constantly. Call or email and we will tell you what is available right now.",
  },
  headingSuffix: { ko: " 원단", en: " fabric" },
  groups: [
    {
      slug: "fw-2026",
      name: { ko: "2026 F/W", en: "2026 F/W" },
      items: [
        {
          name: { ko: "2026 F/W 시즌 나염 원단", en: "2026 F/W seasonal print" },
          note: {
            ko: "이번 가을·겨울 시즌에 맞춰 개발한 디자인을 준비하고 있습니다.",
            en: "Designs developed for this autumn and winter season.",
          },
        },
      ],
    },
    {
      slug: "winter-fleece",
      name: { ko: "겨울 기모", en: "Winter brushed" },
      items: [
        {
          name: { ko: "겨울 기모 나염 원단", en: "Brushed winter print" },
          note: {
            ko: "기모 가공으로 보온성을 올린 겨울 시즌 품목입니다.",
            en: "Brushed for warmth — the winter staple.",
          },
        },
      ],
    },
    {
      slug: "winter-bonding",
      name: { ko: "겨울 본딩", en: "Winter bonded" },
      items: [
        {
          name: { ko: "겨울 본딩 원단", en: "Bonded winter fabric" },
          note: {
            ko: "접합으로 두께를 확보해 아우터에 쓰이는 품목입니다.",
            en: "Bonded for thickness, used in outerwear.",
          },
        },
      ],
    },
    {
      slug: "ss",
      name: { ko: "봄 · 여름", en: "Spring · Summer" },
      items: [
        {
          name: { ko: "봄·여름 시즌 나염 원단", en: "S/S seasonal print" },
          note: {
            ko: "얇은 번수와 밝은 배색 중심으로 전개합니다.",
            en: "Finer counts and lighter colourways.",
          },
        },
      ],
    },
    {
      slug: "fw",
      name: { ko: "가을 · 겨울", en: "Autumn · Winter" },
      items: [
        {
          name: { ko: "가을·겨울 시즌 나염 원단", en: "F/W seasonal print" },
          note: {
            ko: "골덴, 기모지 등 두께가 있는 베이스로 전개합니다.",
            en: "Built on heavier bases such as corduroy and brushed cloth.",
          },
        },
      ],
    },
    {
      slug: "best",
      name: { ko: "베스트셀러", en: "Bestsellers" },
      items: [
        {
          name: { ko: "꾸준히 나가는 디자인", en: "Designs that keep selling" },
          note: {
            ko: "시즌을 넘겨 반복 주문이 이어지는 패턴들을 따로 관리합니다.",
            en: "Patterns that carry over seasons and keep being reordered.",
          },
        },
      ],
    },
    {
      slug: "newly-developed",
      name: { ko: "신규 개발 디자인", en: "Newly developed" },
      items: [
        {
          name: { ko: "신규 개발 나염 디자인", en: "Newly developed prints" },
          note: {
            ko: "자체 제도실에서 막 나온 패턴입니다. 독점 여부는 상담 시 안내합니다.",
            en: "Straight out of our design room. Exclusivity is confirmed on consultation.",
          },
        },
      ],
    },
  ],
};

export const fabricCategories: FabricCategory[] = [
  season,
  cotton,
  polyester,
  use,
  design,
];

export function getCategory(slug: string) {
  return fabricCategories.find((c) => c.slug === slug);
}
