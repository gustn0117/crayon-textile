# 크레용 사이트 완성형 확장 — B2C 안내 · 이용 안내 페이지 · 문의함

날짜: 2026-09-14
상태: 사용자 승인 (채팅에서 설계 승인 후 작성). 커밋하지 않음 — 사용자 지시.

## 1. 목표

지금 사이트는 도매 거래처를 향한 소개 사이트다. 개인 고객이 "어떻게 사면 되는지", 거래처가 "어떻게 주문하고 의뢰하는지"를 사이트가 스스로 설명하지 못하고, 문의는 전화·이메일 링크뿐이다. 이 작업으로:

1. 개인·소규모 제작자(B2C)도 대상 고객으로 명시하고 안내한다. 판매 방식은 **매장 방문 소량 구매**이며 세부 조건은 미정 → 조건은 관리자에서 채우게 한다.
2. 이용 안내 페이지 5종(허브·FAQ·주문/배송·원단 가이드·커스텀 나염 의뢰)과 개인정보처리방침, 404 페이지를 국문·영문으로 추가한다.
3. 문의 폼을 만들고 서버에 저장해 관리자 페이지에서 확인·처리한다.

### 비범위

- 온라인 결제·장바구니·회원 (판매 방식 미정)
- 이메일 알림 (메일 서버 없음). 문의는 관리자 페이지에서만 확인
- 지도 iframe 임베드 (기존 지도 링크 유지)
- 사실 확인이 안 된 정보 지어내기: 최소 수량, 단가, 배송비, 영업시간, 리드타임, 고객 후기, 납품처. 이런 값은 관리자 입력 또는 "상담 시 안내"로 처리
- 커밋·푸시·배포

## 2. 정보 구조

### 경로

| 경로 | 페이지 | 영문 |
|---|---|---|
| `/guide` | 이용 안내 허브 | `/en/guide` |
| `/guide/faq` | 자주 묻는 질문 | `/en/guide/faq` |
| `/guide/order` | 주문·배송 안내 | `/en/guide/order` |
| `/guide/fabric` | 원단 가이드 | `/en/guide/fabric` |
| `/guide/custom` | 커스텀 나염 의뢰 | `/en/guide/custom` |
| `/privacy` | 개인정보처리방침 | `/en/privacy` |
| (없는 주소) | 404 — `global-not-found` | 공용, 국문+영문 병기 |
| `/admin` | 기본 정보 + 운영 안내 (기존 확장) | — |
| `/admin/inquiries` | 문의함 목록 | — |
| `/admin/inquiries/[id]` | 문의 상세 | — |

### 상단 메뉴

사용자가 지정한 8개 유지 + **이용 안내(GUIDE)** 를 문의 앞에 추가 → 9개.
`NEW · COTTON · POLYESTER · BY USE · BY DESIGN · STUDIO · ABOUT · GUIDE · CONTACT`

헤더는 현재 900px 이하에서 햄버거로 전환, 1280px 이하에서 전화번호 숨김. 9개가 되면 실측해서 (a) 전화번호 숨김 기준을 1440px로 올리거나 (b) 햄버거 전환 기준을 1024px로 올린다. 기준: 1024·1180·1280·1440·1920에서 헤더 내부 가로 넘침 0, 항목 간 겹침 없음.

### 이용 안내 하위 내비게이션

원단 카테고리 페이지의 `subnav`(sticky, `--surface` 배경)와 같은 형태의 `GuideNav` 컴포넌트. 허브 + 4개 하위 페이지 상단에 붙고, 현재 페이지를 표시한다.

### 푸터

SITEMAP 칼럼에 9개 메뉴 아래 "이용 안내" 소제목으로 하위 4개 링크 추가. 칼럼 수(4)는 유지. 개인정보처리방침 링크는 하단 baseline 줄에 추가.

### 사이트맵

`sitemap.ts`에 새 경로 6개(허브·하위 4·privacy)를 양 언어로 추가. `/admin`은 계속 제외(robots Disallow 유지).

## 3. 콘텐츠 모듈

사전(`ko.ts`/`en.ts`)은 UI 문구 전용으로 두고, 페이지 본문은 `src/content/`에 페이지별 모듈로 둔다. `fabrics.ts` 방식대로 **한 항목에 국문·영문을 같이** 둔다.

```
src/lib/bi.ts            Bi = { ko: string; en: string }, pick(v, lang)   ← fabrics.ts에서 이동, fabrics.ts는 재수출
src/content/guide.ts     허브 카드 4개, 두 갈래(브랜드 / 개인) 안내
src/content/faq.ts       faq(info): FaqGroup[]   — 그룹별 Q&A, 일부 답변은 info 참조
src/content/order.ts     order(info): 도매 절차 · 소량 절차 · 결제 · 교환 기준 · 기본 안내문(fallback)
src/content/fabricGuide.ts  소재별 특징 · 용어 · 환산/수량 계산 · 세탁/관리 · 나염 기법 5종
src/content/custom.ts    6단계 절차 · 준비물 · 기법 선택표 · 유의사항
src/content/privacy.ts   privacy(info): 조항 목록 (연락처는 info.email)
```

타입 예:

```ts
type FaqItem = { id: string; q: Bi; a: Bi };
type FaqGroup = { id: string; title: Bi; items: FaqItem[] };
type Step = { n: string; title: Bi; body: Bi };
type Section = { id: string; title: Bi; lead?: Bi; paragraphs?: Bi[]; bullets?: Bi[] };
```

메타데이터(title/description)도 각 모듈이 `meta: { title: Bi; description: Bi }`로 가진다.

### 사실 관계 원칙

- 원단 용어·환산(1마 = 1야드 = 91.44cm, 폭 44"/58" 등)·일반적 세탁 요령·나염 기법 설명은 일반 지식으로 서술한다.
- 필요 수량은 "대략", "원단 폭과 사이즈에 따라" 같은 조건부 표현으로만 안내한다.
- 최소 수량·단가·배송비·기간은 어디서도 숫자를 쓰지 않는다. 관리자 입력값이 있으면 그것을, 없으면 "상담 시 안내" 기본 안내문을 보여준다.
- 교환·반품은 "재단(컷팅) 후에는 원단 특성상 교환·반품이 어렵다"는 업계 일반 기준으로만 쓰고, 나머지는 상담 안내로 돌린다.
- 지하철 안내는 "1·4호선 동대문역에서 도보"까지만. 출구 번호는 쓰지 않는다.

## 4. SiteInfo 확장 — 관리자 "운영 안내"

`SiteInfo`에 추가:

```ts
hours: Bi;      // 영업시간 · 휴무
retail: Bi;     // 소량 구매 안내 (단위·최소 수량 등)
shipping: Bi;   // 배송 안내
sample: Bi;     // 샘플·스와치 안내
kakaoUrl: string;  // 카카오톡 채널
storeUrl: string;  // 온라인 스토어
```

- 기본값은 전부 `""`. 운영 중인 `site-info.json`에 이 키가 없으므로 `parseSiteInfo`/`toInput`은 **없는 키를 빈 문자열로** 읽는다(하위 호환).
- 검증: 텍스트 각 300자 이하, URL은 http(s)만.
- 관리자 폼에 "운영 안내" 카드(국문·영문 8칸)와 "링크" 카드(2칸) 추가. 각 칸 힌트에 "비워두면 기본 안내문이 나옵니다"를 표시한다.

### 표시 규칙

| 값 | 비어 있을 때 | 채웠을 때 |
|---|---|---|
| hours | 문의 페이지·푸터에 "영업시간은 전화로 확인해 주세요" | 입력 문구 표시 |
| retail / shipping / sample | 주문·배송 페이지와 FAQ에 `content/order.ts`의 기본 안내문 + "자세한 조건은 상담 시 안내" | 입력 문구가 기본 안내문을 **대체** |
| kakaoUrl / storeUrl | 버튼 자체를 렌더링하지 않음 | 문의 페이지 빠른 연결, 허브, 홈 개인 고객 칼럼에 버튼 노출 |

사전 함수 `ko(info)`/`en(info)`가 이미 `info`를 받으므로 이 값들도 같은 경로로 흐른다.

## 5. 문의 하위 시스템

### 데이터

```ts
type InquiryType = "wholesale" | "retail" | "custom" | "other";
type Inquiry = {
  id: string;            // `${yyMMdd}-${4 hex}` 예: 260914-3f2a — 파일명이자 접수번호
  createdAt: string;     // ISO
  lang: "ko" | "en";
  type: InquiryType;
  name: string;          // 1–40
  phone: string;         // 숫자·+·-·괄호·공백, 숫자 7자 이상, 20자 이하
  email: string;         // 선택, 100자 이하, 형식 검사
  company: string;       // 선택, 60자 이하
  use: string;           // 선택, 80자 이하 (용도)
  quantity: string;      // 선택, 40자 이하
  message: string;       // 10–2000
  readAt: string | null;
};
```

- 저장: `data/inquiries/<id>.json`, 기존 `writeJson`(임시 파일 → rename) 재사용. 파일 1건 = 문의 1건이므로 동시 제출에 잠금이 필요 없다.
- 목록: 폴더 읽기 → 파싱 → `createdAt` 내림차순. 파싱 실패 파일은 건너뛰고 로그.
- 보관: **접수일로부터 365일**이 지난 파일은 목록 조회·신규 저장 시 삭제한다. 개인정보처리방침의 "1년 보관" 조항과 동작을 일치시킨다.
- IP는 저장하지 않는다(속도 제한에만 메모리로 사용).

### 폼 (`/contact`, `/en/contact`)

- 항목: 문의 유형(라디오 4개), 이름, 연락처, 이메일(선택), 회사·브랜드(선택), 용도(선택), 수량(선택), 내용, 개인정보 수집·이용 동의(필수, `/privacy` 링크), 숨은 함정 칸 `website`(CSS로 숨김, 값이 있으면 조용히 성공으로 응답하되 저장하지 않음).
- `?type=custom|retail|wholesale` 쿼리로 유형을 미리 선택한다(커스텀 의뢰·개인 고객 링크에서 진입).
- 클라이언트 컴포넌트 + `useActionState`. 검증 실패 시 칸별 오류와 입력값 유지. 성공 시 폼 자리에 접수번호와 "확인 후 연락드리겠습니다" + 전화 링크 표시. 응답 기한은 약속하지 않는다.
- 서버 액션 `submitInquiryAction`: 검증 → 속도 제한 → 저장 → `{ status: "success", id }`.

### 속도 제한

`src/lib/server/rateLimit.ts`로 분리해 관리자 로그인과 공유: `take(scope, key, max, windowMs)`. 문의는 IP당 10분 3건, 전체 10분 40건. 초과 시 "잠시 후 다시 시도하거나 전화로 문의해 주세요".

### 관리자 문의함

- `/admin/inquiries`: 안 읽음 점, 유형 칩, 이름, 내용 첫 줄, 접수 시각. 비어 있으면 안내 문구.
- `/admin/inquiries/[id]`: 전 항목, `tel:`·`mailto:`(제목에 접수번호) 링크, 읽음/안읽음 토글, 삭제(브라우저 confirm 후 서버 액션). 없는 id는 목록으로 redirect.
- 상세를 열면 자동으로 읽음 처리한다.
- 관리자 상단 바: "문의함" 탭에 안 읽은 개수 뱃지. 관리자 공용 셸(`AdminShell`)로 바·탭을 묶고 세 페이지가 공유한다. 각 페이지는 `isAdmin()`을 스스로 확인하고 미인증이면 로그인 폼을 렌더링한다(현재 방식 유지).
- 모든 서버 액션은 세션을 재확인한다.

## 6. 페이지별 설계

### 이용 안내 허브 `/guide`
PageIntro(사진: 매장) → "처음 오셨나요?" 두 갈래 카드(브랜드·제조사 / 개인·소규모 제작자, 각 3줄 + 링크) → 하위 4개 카드(제목·한 줄 요약·화살표) → 빠른 연결(전화·이메일·카카오톡/스토어는 값 있을 때만) → 클로징.

### FAQ `/guide/faq`
그룹 5개(구매·수량 / 샘플·색상 / 배송·결제·교환 / 커스텀 나염·디자인 / 방문·기타), 총 18–22문항. `<details>` 없이 전부 펼쳐서 보여준다(검색 노출·연령대 배려). 그룹 앵커로 이동하는 짧은 목차.

### 주문·배송 안내 `/guide/order`
두 칼럼 절차: **도매(롤·대량)** 상담 → 샘플·확인 → 수량·납기 확정 → 결제 → 출고 / **소량(개인·매장 방문)** 방문 → 원단 고르기 → 필요 수량 계산(원단 가이드 링크) → 결제 → 재단. 이어서 결제·배송·샘플·교환/반품 블록(§4 표시 규칙 적용). `#wholesale`, `#retail` 앵커.

### 원단 가이드 `/guide/fabric`
소재별 특징(면·레이온·텐셀·린넨·폴리에스터·기모·본딩 — `fabrics.ts`의 분류와 용어 일치) → 용어(수·밀도·폭·마/야드/미터, 환산표) → 필요 수량 계산법(조건부 예시) → 세탁·관리 → 나염 기법 5종(DTP·로터리·분사·반응성·안료) 설명. 각 소재 항목은 해당 카테고리 페이지로 링크.

### 커스텀 나염 의뢰 `/guide/custom`
6단계(상담 → 디자인 준비·의뢰 → 도수분리·리피트 → 시직·샘플 → 본생산 → 납품) → 준비물(도안 파일 형식, 참고 이미지, 원단·수량·용도) → 기법 선택표(기법 × 적합 원단·특징) → 유의사항(저작권 보유·확인 책임, 모니터와 실물 색 차이, 수량·기간·단가는 상담) → CTA `문의하기` → `/contact?type=custom`.

### 개인정보처리방침 `/privacy`
문의 폼에서 수집하는 항목·목적·보관 기간(1년, 자동 파기)·제3자 제공 없음·처리 위탁 없음·정보주체 권리·보호책임자(크레용, 이메일 = `info.email`)·시행일. 문의 폼 동의 문구와 항목이 일치해야 한다.

### 404
`src/app/global-not-found.tsx` + `next.config.ts`에 `experimental.globalNotFound: true`(다중 루트 레이아웃이라 이 방식이 공식 경로). 레이아웃을 거치지 않으므로 자체 `<html><body>`, 인라인 스타일, 시스템 고딕. 국문 위·영문 아래, 홈·이용 안내·문의 링크.

### 기존 페이지 보강
- **홈**: WHY CRAYON 다음에 "FOR EVERYONE — 브랜드부터 개인 제작자까지" 두 칼럼(각 3줄 + 링크). FABRIC INDEX 앞에 이용 안내 4줄 링크 스트립. 히어로 CTA 옆에 "소량 구매 안내 →" 보조 링크.
- **문의**: 01 문의 폼 → 02 오시는 길(기존 + 영업시간 + 지하철 안내 + 카카오톡/스토어 버튼(값 있을 때)) → 03 체크리스트(유지).
- **디자인 개발**: 하단에 "커스텀 나염 의뢰 안내 →" CTA.
- **푸터**: §2.

## 7. 파일 구조 (신규·변경)

```
src/lib/bi.ts                          신규
src/lib/siteInfo.ts                    확장 (§4)
src/lib/server/rateLimit.ts            신규 (adminAuth에서 분리)
src/lib/server/adminAuth.ts            rateLimit 사용으로 변경
src/lib/server/inquiryStore.ts         신규: list/get/save/markRead/remove/purge
src/lib/inquiry.ts                     신규: 타입 · parseInquiry (서버·클라 공용)
src/content/*.ts                       신규 6개
src/components/GuideNav.tsx (+css)     신규
src/components/InquiryForm.tsx         신규 (client)
src/components/pages/GuidePage.tsx, FaqPage.tsx, OrderPage.tsx, FabricGuidePage.tsx, CustomPage.tsx, PrivacyPage.tsx (+ guide.module.css 공용)
src/app/(ko)/guide/{page,faq,order,fabric,custom}/page.tsx, (ko)/privacy/page.tsx, (en)/en/… 동일
src/app/global-not-found.tsx           신규
src/app/(admin)/admin/AdminShell.tsx   신규 (바·탭·뱃지)
src/app/(admin)/admin/inquiries/page.tsx, [id]/page.tsx, actions.ts
src/app/(admin)/admin/actions.ts       submitInquiry는 여기 두지 않고 src/app/actions/inquiry.ts (공개 폼용)
src/app/actions/inquiry.ts             신규 "use server"
src/lib/dictionaries/ko.ts, en.ts      nav 9번째, footer.guide, inquiry(폼 문구·오류), guide(공용 UI 문구)
src/components/SiteHeader.tsx (+css), SiteFooter.tsx (+css), HomePage.tsx (+css), ContactPage.tsx (+css), StudioPage.tsx
src/app/sitemap.ts                     경로 추가
next.config.ts                         globalNotFound
```

## 8. 오류 처리

| 상황 | 동작 |
|---|---|
| 문의 저장 실패(디스크) | 로그 + 폼에 "저장에 실패했습니다. 전화로 문의해 주세요" + 전화 링크. 입력값 유지 |
| 속도 제한 초과 | 안내 문구, 저장 안 함 |
| 함정 칸 채워짐 | 저장하지 않고 성공 화면(봇에게 신호를 주지 않음), 로그 없음 |
| 관리자 목록 읽기 실패 | 로그 + "문의를 불러오지 못했습니다" 안내 |
| 문의 파일 1건 손상 | 그 파일만 건너뛰고 나머지 표시 |
| 없는 문의 id | `/admin/inquiries`로 redirect |
| site-info.json에 새 키 없음 | 빈 문자열로 읽어 기본 안내문 표시(하위 호환) |
| 세션 만료 중 액션 | 기존 EXPIRED 메시지 |

## 9. 검증 (Playwright, 스크래치패드 스크립트 — 저장소에 넣지 않음)

1. 문의: 제출 → 파일 생성 → 관리자 목록에 안 읽음으로 표시 → 상세 열면 읽음 → 토글 → 삭제 → 파일 없음. 뱃지 개수 변화.
2. 거부: 필수 누락·짧은 내용·잘못된 이메일 → 칸별 오류, 파일 없음, 입력 유지. 함정 칸 → 성공 화면이지만 파일 없음. IP당 4번째 제출 → 제한 문구.
3. 운영 안내: 관리자에서 영업시간·소량 안내·카카오 링크 입력 → 문의·주문 페이지·홈에 반영, 비우면 기본 안내문/버튼 숨김.
4. 페이지: 새 경로 12개(국문 6 + 영문 6) 200, 390/900/1440 오버플로 0, 이미지 깨짐 0, 콘솔 오류 0. 404는 없는 주소에서 브랜드 페이지 + HTTP 404.
5. 헤더: 9개 항목이 1024·1180·1280·1440·1920에서 헤더 내부 넘침 0, 항목 경계 겹침 0.
6. 가독성: 기존 `audit.mjs`를 새 페이지에 실행 → 14px 미만 본문 없음, AA 미달 0.
7. 기존 `admin-e2e.mjs` 36항목과 공개 라우트 회귀 전부 통과.
8. `npm run build` 경고 0, `tsc --noEmit` 오류 0.

## 10. 구현 순서

1. 토대: `bi.ts`, SiteInfo 확장 + 관리자 운영 안내, `rateLimit.ts` 분리, 헤더 9개 + 실측, 푸터, `GuideNav`, 사전 문구.
2. 콘텐츠: 모듈 6개 작성 → 페이지 6종(국문·영문) + 404 + 사이트맵.
3. 문의: 타입·검증 → 저장소 → 서버 액션 → 폼 → 관리자 셸·목록·상세·액션·뱃지.
4. 보강: 홈·문의·디자인 개발·푸터.
5. 검증 §9, 화면 캡처로 눈 확인.

각 단계 끝에 빌드·타입체크를 통과시킨다. 커밋하지 않는다.
