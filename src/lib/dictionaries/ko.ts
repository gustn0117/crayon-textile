import { contact } from "@/lib/site";

export const ko = {
  htmlLang: "ko",
  brand: { ko: "크레용", en: "TEXTILE · SEOUL" },

  meta: {
    titleDefault: "크레용 | 나염 원단 · 텍스타일 디자인 스튜디오",
    titleTemplate: "%s | 크레용",
    description:
      "서울 동대문에서 30년간 나염 원단을 개발·공급해 온 텍스타일 전문 기업 크레용. 자체 디자인실의 독창적인 패턴을 만나보세요.",
    ogDescription:
      "서울 동대문에서 30년간 나염 원단을 개발해 온 크레용. 자체 디자인실의 독창적인 패턴으로 상품의 가능성을 넓힙니다.",
    keywords: [
      "크레용",
      "나염 원단",
      "동대문 원단",
      "텍스타일 디자인",
      "패턴 디자인",
      "동대문종합시장",
    ],
    siteName: "크레용",
    ogLocale: "ko_KR",
  },

  /* Display formats. The tel: hrefs in site.ts stay international either way. */
  phone: {
    // `as string` widens the literals from site.ts so other locales can differ.
    tel: contact.tel as string,
    mobile: contact.mobile as string,
    fax: contact.fax as string,
    addressShort: contact.addressLines[1] as string,
  },

  nav: [
    { href: "/new", en: "NEW", label: "신상품" },
    { href: "/fabrics/cotton", en: "COTTON", label: "면·셀룰로오스" },
    { href: "/fabrics/polyester", en: "POLYESTER", label: "폴리에스터" },
    { href: "/fabrics/use", en: "BY USE", label: "용도별 원단" },
    { href: "/fabrics/design", en: "BY DESIGN", label: "디자인별 원단" },
    { href: "/studio", en: "STUDIO", label: "디자인 개발" },
    { href: "/about", en: "ABOUT", label: "회사 소개" },
    { href: "/contact", en: "CONTACT", label: "문의" },
  ],

  fabrics: {
    jumpTo: "바로가기",
    askAbout: "이 원단 문의",
    closingLabel: "NEW FABRIC, NEW POSSIBILITY",
    closingTitle: "찾으시는 원단이 목록에 없어도 괜찮습니다.",
    closingNote:
      "취급 품목은 목록보다 넓습니다. 만드실 옷과 원하시는 느낌을 알려주시면 맞는 원단을 함께 찾아드립니다.",
    closingCta: "원단 상담하기",
    studioLink: "디자인 개발 과정 보기",
  },

  header: {
    navAria: "주요 메뉴",
    fullNavAria: "전체 메뉴",
    open: "메뉴 열기",
    close: "메뉴 닫기",
    indexLabel: "홈",
    langAria: "언어 선택",
    langOther: "EN",
    langOtherTitle: "View in English",
  },

  footer: {
    sitemap: "SITEMAP",
    contact: "CONTACT",
    address: "ADDRESS",
    home: "홈",
    sitemapAria: "사이트맵",
    tagline: "차별화된 디자인과 신뢰할 수 있는 품질로 함께 성장하겠습니다.",
    rights: "© 2026 CRAYON. ALL RIGHTS RESERVED.",
  },

  categories: [
    {
      code: "CR—W01",
      en: "WOMEN",
      name: "여성복",
      description: "계절의 감도와 실용성을 함께 고려한 섬세한 패턴.",
      swatch: "swatch-women",
    },
    {
      code: "CR—K02",
      en: "KIDS",
      name: "아동복",
      description: "밝고 생동감 있는 리듬과 자유로운 모티프.",
      swatch: "swatch-kids",
    },
    {
      code: "CR—C03",
      en: "CASUAL",
      name: "캐주얼",
      description: "일상의 옷에 자연스럽게 스며드는 균형 잡힌 디자인.",
      swatch: "swatch-casual",
    },
    {
      code: "CR—H04",
      en: "HOME",
      name: "침구 · 홈패브릭",
      description: "공간의 분위기를 완성하는 편안한 반복 패턴.",
      swatch: "swatch-home",
    },
  ],

  principles: [
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
  ],

  processSteps: [
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
  ],

  home: {
    heroEyebrow: ["동대문 나염 원단 전문", "자체 디자인 개발"],
    heroTitle: "패턴의 차이가 원단의 가치를 만듭니다.",
    heroLead:
      "면·레이온·폴리에스터·다이마루·기모까지, 서울 동대문에서 30년간 나염 원단을 개발해 온 크레용. 자체 디자인 제도실의 독창적인 패턴으로 상품의 가능성을 넓힙니다.",
    heroCtaContact: "원단 · 패턴 상담하기",
    heroCtaCollection: "원단 종류 보기",
    figuresAria: "크레용 주요 지표",
    figures: [
      { value: "30", unit: "YEARS", note: "동대문 현장 경험" },
      { value: "1,000+", unit: "DESIGNS", note: "누적 디자인 개발" },
      { value: "IN-HOUSE", unit: "STUDIO", note: "자체 디자인 제도실 운영" },
      { value: "GLOBAL", unit: "SUPPLY", note: "국내외 텍스타일 공급" },
    ],
    aboutHead: {
      en: "ABOUT CRAYON",
      note: "현장에서 쌓은 감각을 패턴으로 옮깁니다.",
      title: ["시장을 이해하는 경험,", "상품을 완성하는 디자인."],
    },
    aboutLead:
      "크레용은 서울 동대문종합시장을 기반으로 여성복, 아동복, 캐주얼, 침구용 등 다양한 분야의 프린트 원단을 개발해 왔습니다.",
    aboutBody:
      "30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로, 트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을 제안합니다.",
    overview: [
      { term: "기반", value: "서울 동대문종합시장" },
      { term: "취급 품목", value: "나염 프린트 원단 · 텍스타일 패턴 디자인" },
      { term: "주요 분야", value: "여성복 · 아동복 · 캐주얼 · 침구 및 홈패브릭" },
      { term: "공급 지역", value: "대한민국 · 일본 · 대만 · 유럽 · 중동" },
      { term: "방송 소개", value: "KBS 다큐ON 「DDP, 디자인으로 소통하다」" },
    ],
    aboutMore: "회사 소개 자세히 보기",
    aboutVisualAlt:
      "패턴 도안과 컬러칩, 원단 스와치를 놓고 작업 중인 크레용 디자인 제도실 책상",
    aboutVisualCaption: ["DESIGN PROCESS", "FROM IDEA TO TEXTILE"],
    businessHead: {
      en: "FABRICS",
      note: "소재로 찾으셔도, 용도로 찾으셔도 됩니다.",
      title: "취급 원단을 네 갈래로 정리했습니다.",
      lead: "면·셀룰로오스와 폴리에스터는 소재로, 용도별·디자인별은 만드실 옷과 원하시는 무늬로 찾으실 수 있습니다.",
    },
    businessMore: "신상품 · 시즌 원단 보기",
    materialsLabel: "취급 소재",
    materials: [
      { en: "COTTON", ko: "면" },
      { en: "RAYON", ko: "레이온" },
      { en: "POLYESTER", ko: "폴리에스터" },
      { en: "KNIT", ko: "다이마루" },
      { en: "FLEECE", ko: "기모지" },
    ],
    studioHead: {
      en: "DESIGN STUDIO",
      note: "카피가 아닌 독자 개발 패턴을 제안합니다.",
      title: ["직접 그린 패턴으로", "더 안심할 수 있는 선택."],
      lead: "자체 디자인 제도실을 운영하며 아이디어 구상부터 컬러웨이 전개까지 직접 관리합니다. 하나의 패턴이 원단이 되기까지 네 단계를 거칩니다.",
    },
    printingAlt: "나염 인쇄대 위로 꽃무늬가 인쇄되어 나오는 원단",
    printingCaption: "인쇄대 위의 원단",
    studioNote: "※ 디자인별 사용 범위와 독점 여부는 상담 시 안내해 드립니다.",
    studioMore: "디자인 스튜디오 보기",
    globalHead: {
      en: "GLOBAL SUPPLY",
      note: "서로 다른 시장과 취향을 이해합니다.",
      title: "서울에서 시작해 세계 시장으로.",
      lead: "크레용의 텍스타일 디자인은 국내를 넘어 일본, 대만, 유럽, 중동 등 다양한 해외 시장에 공급되고 있습니다.",
    },
    closingLabel: "NEW FABRIC, NEW POSSIBILITY",
    closingTitle: ["새로운 원단을", "찾고 계신가요?"],
    closingNote:
      "원하는 용도와 분위기를 알려주세요. 크레용의 경험으로 함께 찾아드리겠습니다.",
    closingCta: "문의하기",
  },

  about: {
    title: "회사 소개",
    description:
      "서울 동대문종합시장을 기반으로 30년간 나염 원단을 개발해 온 크레용의 경험과 일하는 방식을 소개합니다.",
    introTitle: ["시장을 이해하는 경험,", "상품을 완성하는 디자인."],
    introLead:
      "크레용은 서울 동대문종합시장을 기반으로 여성복, 아동복, 캐주얼, 침구용 등 다양한 분야의 프린트 원단을 개발해 왔습니다.",
    originHead: {
      en: "ORIGIN",
      note: "모든 제안은 현장에서 시작됩니다.",
      title: "원단은 옷의 인상을 가장 먼저 결정합니다.",
    },
    originLead:
      "30년간 축적한 시장 경험과 1,000개 이상의 디자인 개발 경험을 바탕으로, 트렌드와 활용도는 물론 대중성과 상품성까지 세심하게 고려한 원단을 제안합니다.",
    originBody: [
      "크레용은 어떤 브랜드가 어떤 계절에 무엇을 필요로 하는지를 동대문 현장에서 직접 확인하며, 그 답을 패턴으로 옮깁니다. 매장에서 오가는 이야기, 실제로 팔리는 원단, 다음 시즌에 준비해야 할 방향이 모두 개발의 재료가 됩니다.",
      "카피가 아닌 자체 개발 패턴을 중심으로 제안하기 때문에, 같은 원단을 쓰는 브랜드가 늘어나는 상황을 걱정하지 않아도 됩니다.",
    ],
    stance: [
      {
        label: "합니다",
        items: [
          "자체 디자인 제도실에서 패턴을 직접 개발합니다.",
          "용도와 분위기를 듣고 그에 맞는 원단을 제안합니다.",
          "같은 패턴을 여러 컬러웨이로 전개합니다.",
          "국내는 물론 해외 시장에도 공급합니다.",
        ],
      },
      {
        label: "하지 않습니다",
        items: [
          "브랜드 디자인을 모방하거나 카피하지 않습니다.",
          "유행만 좇는 단발성 패턴에 기대지 않습니다.",
          "상품성을 확인하지 않은 디자인을 밀지 않습니다.",
        ],
      },
    ],
    statement: ["유행을 좇는 데 그치지 않고,", "오래 선택받을 수 있는 패턴을 고민합니다."],
    statementMeta: ["CRAYON", "SEOUL · DONGDAEMUN · 2621"],
    workHead: {
      en: "HOW WE WORK",
      note: "감각은 새롭게, 제안은 현실적으로.",
      title: "크레용이 원단을 만드는 세 가지 기준.",
    },
    pressHead: {
      en: "ON AIR",
      note: "방송에 소개된 크레용.",
      title: "KBS 다큐ON에 크레용의 작업이 담겼습니다.",
      lead: "동대문과 DDP를 다룬 KBS 다큐ON 「DDP, 디자인으로 소통하다」 편에 크레용의 원단 아카이브와 자체 개발 디자인이 소개되었습니다.",
    },
    pressCaption: ["KBS 다큐ON 「DDP, 디자인으로 소통하다」", "6월 29일 방영 · © KBS · 사용 허락을 받아 게재"],
    videoFallback: "브라우저가 동영상 재생을 지원하지 않습니다.",
    profileHead: { en: "PROFILE", note: "회사 개요" },
    profile: [
      { term: "상호", value: "크레용 CRAYON" },
      { term: "소재지", value: `${contact.addressLines[0]} ${contact.addressLines[1]}` },
      { term: "취급 품목", value: "나염 프린트 원단, 텍스타일 패턴 디자인" },
      { term: "주요 분야", value: "여성복 · 아동복 · 캐주얼 · 침구 및 홈패브릭" },
      { term: "공급 지역", value: "대한민국, 일본, 대만, 유럽, 중동" },
      { term: "연락처", value: `T. ${contact.tel} / M. ${contact.mobile}` },
    ],
    profileNote:
      "더 궁금한 점이 있으시면 언제든 연락 주세요. 찾으시는 용도와 분위기를 알려주시면 알맞은 원단을 함께 찾아드리겠습니다.",
    profileLinks: ["컬렉션 살펴보기", "문의하기"],
  },

  collection: {
    title: "컬렉션",
    description:
      "여성복, 아동복, 캐주얼, 침구 및 홈패브릭까지. 크레용이 개발하는 용도별 나염 원단 패턴을 소개합니다.",
    introTitle: ["다양한 쓰임에 맞춘", "네 갈래의 패턴."],
    introLead:
      "찾으시는 용도와 분위기를 알려주시면 알맞은 원단과 패턴을 함께 제안합니다.",
    repeatHead: {
      en: "REPEAT UNIT",
      note: "반복의 최소 단위가 패턴의 성격을 정합니다.",
      title: "모든 나염 패턴은 하나의 타일에서 시작합니다.",
    },
    repeatLead:
      "나염 원단의 무늬는 작은 타일 하나가 이음매 없이 반복되며 완성됩니다. 아래 스와치에 표시된 점선이 그 반복의 최소 단위, 리피트입니다.",
    repeatBody:
      "리피트를 어떻게 짜느냐에 따라 같은 모티프도 전혀 다른 원단이 됩니다. 이음이 눈에 띄지 않게 맞물리도록 다듬는 일이 패턴 개발에서 가장 손이 많이 가는 부분입니다.",
    repeatAside:
      "아래 네 가지는 크레용이 개발하는 분야와 그 방향을 보여주는 콘셉트입니다. 실제 보유 디자인과 컬러웨이는 상담 시 안내해 드립니다.",
    repeatLabel: "REPEAT UNIT",
    selvedge: "CRAYON ORIGINAL TEXTILE",
    statement: ["잘 맞물린 리피트는", "눈에 띄지 않습니다."],
    statementMeta: ["SEAMLESS REPEAT", "CRAYON ORIGINAL"],
    chooseHead: {
      en: "HOW TO CHOOSE",
      note: "상담 전에 알아두시면 좋은 세 가지.",
      title: "같은 도안도 이 셋에 따라 달라집니다.",
    },
    guidance: [
      {
        en: "SCALE",
        title: "스케일",
        description:
          "같은 도안이라도 리피트를 키우면 대담해지고, 줄이면 잔잔해집니다. 옷의 면적과 재단 방식에 따라 알맞은 크기가 달라집니다.",
      },
      {
        en: "DENSITY",
        title: "밀도",
        description:
          "모티프 사이의 여백이 원단의 인상을 좌우합니다. 촘촘하면 무늬가 색처럼 읽히고, 성기면 하나하나가 도드라집니다.",
      },
      {
        en: "COLORWAY",
        title: "컬러웨이",
        description:
          "하나의 패턴을 여러 색으로 전개하면 한 시즌 안에서 라인을 넓힐 수 있습니다. 배색에 따라 같은 도안도 전혀 다르게 보입니다.",
      },
    ],
    chooseNote:
      "어떤 쪽이 맞을지 판단이 어려우시면 사용하실 옷의 종류와 참고 이미지를 보내주세요. 함께 방향을 잡아드리겠습니다.",
    chooseCta: "용도별 원단 상담하기",
  },

  studio: {
    title: "디자인 스튜디오",
    description:
      "크레용은 자체 디자인 제도실을 운영하며 카피가 아닌 독자 개발 패턴을 제안합니다. 아이디어 구상부터 컬러웨이 전개까지의 과정을 소개합니다.",
    introTitle: ["직접 그린 패턴으로", "더 안심할 수 있는 선택."],
    introLead:
      "크레용은 자체 디자인 제도실을 운영하며 브랜드 모방이나 카피가 아닌 독자 개발 패턴을 중심으로 제안합니다.",
    figureAlt: "패턴 도안과 컬러칩, 원단 샘플을 검토하는 크레용 디자인 스튜디오",
    inhouseHead: {
      en: "IN-HOUSE",
      note: "아이디어부터 패턴까지 직접 관리합니다.",
      title: "사들인 도안을 그대로 옮기지 않습니다.",
    },
    inhouseLead:
      "아이디어 구상부터 패턴 개발까지 직접 관리하여 크레용만의 감도와 차별성을 원단에 담습니다.",
    inhouseBody:
      "외부에서 사들인 도안을 그대로 옮기지 않기 때문에 같은 패턴이 시장에 흩어져 있을 위험이 적습니다. 필요한 경우 브랜드의 요청에 맞춰 밀도나 모티프를 조정한 변형본도 함께 개발합니다.",
    assurances: [
      { term: "개발 주체", value: "자체 디자인 제도실" },
      { term: "패턴 출처", value: "독자 개발 (외부 도안 카피 없음)" },
      { term: "전개 범위", value: "패턴 개발 · 컬러웨이 전개" },
      { term: "사용 범위", value: "디자인별 상담 시 안내" },
    ],
    roomAlts: [
      "여러 대의 작업 자리가 늘어선 크레용 디자인 제도실 내부",
      "모니터와 자료가 놓인 디자인 제도실 작업 자리",
      "디자인 제도실 회의 공간",
    ],
    roomCaption: "디자인 제도실 · 자체 운영",
    processHead: {
      en: "PROCESS",
      note: "하나의 패턴이 원단이 되기까지.",
      title: "네 단계를 거쳐 원단이 됩니다.",
    },
    processNote: "※ 디자인별 사용 범위와 독점 여부는 상담 시 안내해 드립니다.",
    printingHead: {
      en: "PRINTING",
      note: "도안이 원단 위에 올라가는 자리.",
      title: "패턴은 나염 공정을 거쳐 원단이 됩니다.",
      lead: "개발이 끝난 도안은 제판을 거쳐 나염 현장으로 넘어갑니다. 같은 도안이라도 원단과 공정에 따라 색과 선의 표현이 달라지기 때문에, 현장에서 나온 결과를 보고 다시 조정합니다.",
    },
    printingAlts: [
      "나염 인쇄대 위로 꽃무늬가 인쇄되어 나오는 원단",
      "원단이 지나가는 나염 생산 라인과 대기 중인 원단 롤",
    ],
    printingCaptions: ["인쇄대 위의 원단", "나염 생산 라인"],
    globalHead: {
      en: "GLOBAL SUPPLY",
      note: "서로 다른 시장과 취향을 이해합니다.",
      title: ["서울에서 시작해", "세계 시장으로."],
      lead: "크레용의 텍스타일 디자인은 국내를 넘어 일본, 대만, 유럽, 중동 등 다양한 해외 시장에 공급되고 있습니다. 한국 텍스타일 디자인의 경쟁력을 더 넓은 무대에 전하고 있습니다.",
    },
    globalNote: "수출 물량이나 대량 공급 조건도 상담을 통해 안내해 드립니다.",
    globalCta: "수출 · 대량 공급 문의",
  },

  contact: {
    title: "문의",
    description:
      "원단 상담 및 견적 문의. 전화 02-2266-0786 / 010-7771-0786, 이메일 idhhhh@naver.com. 서울 동대문종합시장 D동 2층 2621호.",
    introTitle: ["새로운 원단을", "찾고 계신가요?"],
    introLead:
      "원하는 용도와 분위기를 알려주세요. 크레용의 경험으로 함께 찾아드리겠습니다.",
    callNote: "바로 통화로 상담",
    emailNote: "참고 이미지와 함께 문의",
    visitHead: {
      en: "VISIT & CONTACT",
      note: "동대문종합시장 D동 2층 2621호",
      title: "오시는 길과 연락처.",
    },
    storeAlt:
      "동대문종합시장 D동 2621호 크레용 매장. 파란 간판 아래로 원단 스와치와 샘플이 진열되어 있다.",
    storeCaption: "이 간판을 찾으시면 됩니다",
    details: [
      { term: "주소", lines: [...contact.addressLines] },
      { term: "전화", lines: [`T. ${contact.tel}`, `M. ${contact.mobile}`] },
      { term: "팩스", lines: [`F. ${contact.fax}`] },
      { term: "이메일", lines: [contact.email] },
    ],
    mapLink: "지도에서 보기",
    visitNote:
      "동대문종합시장은 층과 동이 넓어 처음 오시면 찾기 어려울 수 있습니다. 방문 전에 전화 주시면 위치를 안내해 드리고, 보고 싶으신 방향의 원단을 미리 준비해 두겠습니다.",
    visitCta: "전화로 방문 문의",
    checklistHead: {
      en: "BEFORE YOU WRITE",
      note: "첫 제안의 정확도를 좌우합니다.",
      title: "네 가지를 함께 알려주세요.",
      lead: "아래 항목이 모두 정해져 있지 않아도 괜찮습니다. 아는 것부터 알려주시면 나머지는 상담하며 좁혀가겠습니다.",
    },
    checklist: [
      {
        step: "01",
        term: "용도",
        description: "여성복 · 아동복 · 캐주얼 · 침구 등 어디에 쓰실 원단인지 알려주세요.",
      },
      {
        step: "02",
        term: "분위기",
        description:
          "참고 이미지가 있으면 가장 빠릅니다. 원하시는 느낌을 말로 주셔도 됩니다.",
      },
      {
        step: "03",
        term: "수량",
        description: "예상하고 계신 발주 규모를 알려주시면 제안 범위를 좁힐 수 있습니다.",
      },
      {
        step: "04",
        term: "일정",
        description: "원하시는 납기를 함께 주시면 가능한 방법을 같이 찾아보겠습니다.",
      },
    ],
    closingLabel: "NEW FABRIC, NEW POSSIBILITY",
    closingTitle: ["먼저 연락 주세요.", "나머지는 함께 좁혀가겠습니다."],
  },
};

/* Literals stay widened (no `as const`) so other locales can supply their own
   strings against the same shape. */
export type Dictionary = typeof ko;
