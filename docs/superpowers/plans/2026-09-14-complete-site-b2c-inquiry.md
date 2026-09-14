# 크레용 완성형 확장 (B2C 안내 · 이용 안내 · 문의함) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이용 안내 페이지 5종 + 개인정보처리방침 + 404를 국문·영문으로 추가하고, 문의 폼을 서버에 저장해 관리자 문의함에서 처리하며, 미정인 운영 조건은 관리자에서 채우게 한다.

**Architecture:** 페이지 본문은 `src/content/*.ts`에 국문·영문을 한 노드에 두는 콘텐츠 모듈로, UI 문구는 기존 사전(`ko.ts`/`en.ts`)에 둔다. 관리자가 고치는 값은 `SiteInfo`를 확장해 기존 저장·검증 경로로 흐른다. 문의는 `data/inquiries/<id>.json` 파일 1건 = 문의 1건으로 저장하고, 관리자 페이지에 목록·상세 라우트를 추가한다.

**Tech Stack:** Next.js 16.3.0 App Router (Server Actions, `cookies`, `revalidatePath`, `global-not-found`), React 19 (`useActionState`), TypeScript 7, CSS Modules, Node 20 파일 저장, Playwright(스크래치패드) 검증.

**Spec:** `docs/superpowers/specs/2026-09-14-complete-site-b2c-inquiry-design.md`

## Global Constraints

- **커밋·푸시·배포 금지.** 모든 태스크의 마지막 단계는 `npx tsc --noEmit && npm run build`(경고 0)로 끝난다. `git commit`/`git push`/`ssh deploy`를 실행하지 않는다.
- Next API를 쓰기 전에 `node_modules/next/dist/docs/01-app/`의 해당 문서를 읽는다(AGENTS.md). 이 버전에서 `params`/`searchParams`는 **Promise**이고 `cookies()`는 async다.
- **사실 지어내지 않기:** 최소 수량·단가·배송비·영업시간·리드타임·결제 수단은 숫자·단정문을 쓰지 않는다. 관리자 값이 있으면 그것을, 없으면 "상담 시 안내" 기본 안내문을 쓴다. 고객 후기·납품처·지하철 출구 번호를 쓰지 않는다.
- **국문·영문 동시:** 콘텐츠 노드는 전부 `Bi = { ko, en }`. 사전 키는 `ko()`에 추가하면 `en()`이 `Dictionary` 타입으로 강제된다. `en`은 `ko`의 충실한 번역이며 항목 수가 같아야 한다.
- 글꼴 토큰(`--font-sans`, `--font-mono`)만 쓴다. `font-size`는 `0.75rem` 미만 금지, 한글 본문은 `0.875rem` 이상, 옅은 글씨는 `var(--muted)`만.
- 데이터 경로는 `src/lib/server/data.ts`의 `dataDir`(`DATA_DIR` 또는 `./data`)만. 파일 쓰기는 `writeJson`(임시 파일 → rename)만.
- 검증 스크립트는 저장소에 넣지 않고 `$S`에 둔다: `S=/private/tmp/claude-501/-Users-hyunsu-Documents-WEB-2026-08----/e078d048-1376-4e5a-854e-158c4d0d963a/scratchpad` (`$S/node_modules`에 playwright 심볼릭 링크가 이미 있다).
- 로컬 운영 서버 기동 패턴: `pkill -f next-server; npm run build && (DATA_DIR=$S/<dir> ADMIN_PASSWORD=1234 PORT=<port> npm run start > $S/<log> 2>&1 &)` 후 `until curl -s -o /dev/null http://localhost:<port>/; do sleep 1; done`.
- 순수 함수 테스트는 `npx tsc <files> --outDir $S/tsout --module commonjs --target es2022 --skipLibCheck --esModuleInterop`로 컴파일한 뒤 `node --test $S/*.test.mjs`로 돌린다(타입 전용 import는 컴파일 시 제거되므로 런타임 의존이 없다).

---

## File Structure

| 파일 | 책임 |
|---|---|
| `src/lib/bi.ts` (신규) | `Bi` 타입과 `pick()`. `fabrics.ts`는 여기서 가져와 재수출 |
| `src/lib/siteInfo.ts` (수정) | `SiteInfo`에 운영 안내 6개 필드, 검증, `siteInfoFields` 목록 |
| `src/lib/server/rateLimit.ts` (신규) | 메모리 속도 제한 `take()/reset()`. 로그인·문의 공용 |
| `src/lib/server/adminAuth.ts` (수정) | 자체 버킷 코드를 `rateLimit`으로 교체 |
| `src/lib/server/data.ts` (수정) | `writeJson`이 하위 폴더도 만들도록, `listJsonDir()` 추가 |
| `src/lib/inquiry.ts` (신규) | 문의 타입·`parseInquiry` (서버·클라 공용, 런타임 의존 없음) |
| `src/lib/server/inquiryStore.ts` (신규) | 문의 파일 저장·목록·읽음·삭제·1년 정리 |
| `src/app/actions/inquiry.ts` (신규) | 공개 폼 서버 액션 `submitInquiryAction` |
| `src/content/guide.ts, faq.ts, order.ts, fabricGuide.ts, custom.ts, privacy.ts` (신규) | 페이지 본문 콘텐츠 |
| `src/components/GuideNav.tsx` + `.module.css` (신규) | 이용 안내 하위 내비게이션(sticky) |
| `src/components/InquiryForm.tsx` (신규, client) | 문의 폼 |
| `src/components/pages/guide.module.css` (신규) | 이용 안내 6개 페이지 공용 스타일 |
| `src/components/pages/GuidePage.tsx, FaqPage.tsx, OrderPage.tsx, FabricGuidePage.tsx, CustomPage.tsx, PrivacyPage.tsx` (신규) | 페이지 컴포넌트 |
| `src/app/(ko)/guide/**`, `(ko)/privacy`, `(en)/en/guide/**`, `(en)/en/privacy` (신규) | 라우트 |
| `src/app/global-not-found.tsx` (신규), `next.config.ts` (수정) | 404 |
| `src/app/(admin)/admin/AdminShell.tsx, LoginScreen.tsx` (신규) | 관리자 공용 바·탭·뱃지, 로그인 화면 |
| `src/app/(admin)/admin/inquiries/page.tsx, [id]/page.tsx, actions.ts, DeleteButton.tsx` (신규) | 문의함 |
| `src/app/(admin)/admin/page.tsx, InfoForm.tsx, actions.ts, admin.module.css` (수정) | 운영 안내 카드, 셸 적용 |
| `src/lib/dictionaries/ko.ts, en.ts` (수정) | nav 9번째, footer, hours, guide, inquiry, home.audience/guideStrip/heroSecondary, studio.customCta, contact.transit/formHead |
| `src/components/SiteHeader.module.css, SiteFooter.tsx, SiteFooter.module.css` (수정) | 9개 메뉴 폭, 푸터 이용 안내·영업시간·개인정보 링크 |
| `src/components/pages/HomePage.tsx, home.module.css, ContactPage.tsx, contact.module.css, StudioPage.tsx` (수정) | B2C 보강 |
| `src/app/sitemap.ts` (수정) | 새 경로 |

---

### Task 1: 토대 — `bi.ts`, `rateLimit.ts`, `SiteInfo` 확장

**Files:**
- Create: `src/lib/bi.ts`, `src/lib/server/rateLimit.ts`
- Modify: `src/lib/fabrics.ts:1-30`, `src/lib/server/adminAuth.ts`, `src/lib/siteInfo.ts`, `src/lib/server/data.ts`
- Test: `$S/siteInfo.test.mjs`, `$S/rateLimit.test.mjs`

**Interfaces:**
- Produces: `Bi`, `pick(v: Bi, lang: Locale): string` from `@/lib/bi`
- Produces: `take(scope: string, key: string, max: number, windowMs: number): boolean`, `reset(scope: string, key: string): void` from `@/lib/server/rateLimit`
- Produces: `SiteInfo` with `hours/retail/shipping/sample: Bi`, `kakaoUrl/storeUrl: string`; `SiteInfoField` extended; `siteInfoFields: readonly SiteInfoField[]`; `parseSiteInfo`, `toInput` handle missing keys as `""`
- Produces: `writeJson(name, value, mode?)` creates parent dirs; `listJsonDir<T>(dir: string): Promise<{ name: string; value: T }[]>`

- [ ] **Step 1: `src/lib/bi.ts` 작성, `fabrics.ts`에서 재수출**

```ts
// src/lib/bi.ts
import type { Locale } from "./i18n";

/* Content nodes carry both languages, so a Korean string can never ship
   without its English twin. */
export type Bi = { ko: string; en: string };

export function pick(v: Bi, lang: Locale) {
  return v[lang];
}
```

`src/lib/fabrics.ts` 상단의 `export type Bi = …`와 `export function pick(…) {…}`를 지우고 다음으로 바꾼다:

```ts
import type { Locale } from "./i18n";
import { pick, type Bi } from "./bi";

export type { Bi };
export { pick };
```
(`Locale` import는 `pick` 제거 후 쓰이지 않으면 함께 지운다.)

- [ ] **Step 2: `rateLimit.ts` 테스트 작성 (실패 확인)**

`$S/rateLimit.test.mjs`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { take, reset } = require("./tsout/server/rateLimit.js");

test("allows up to max, then blocks", () => {
  for (let i = 0; i < 3; i++) assert.equal(take("t", "ip1", 3, 60_000), true);
  assert.equal(take("t", "ip1", 3, 60_000), false);
});
test("keys and scopes are independent", () => {
  assert.equal(take("t", "ip2", 1, 60_000), true);
  assert.equal(take("u", "ip2", 1, 60_000), true);
  assert.equal(take("t", "ip2", 1, 60_000), false);
});
test("reset clears a key", () => {
  take("r", "ip", 1, 60_000);
  reset("r", "ip");
  assert.equal(take("r", "ip", 1, 60_000), true);
});
test("window expiry", () => {
  assert.equal(take("w", "ip", 1, 1), true);
  const until = Date.now() + 5; while (Date.now() < until) {}
  assert.equal(take("w", "ip", 1, 1), true);
});
```
Run: `cd $S && node --test rateLimit.test.mjs` → Expected: FAIL (module not found).

- [ ] **Step 3: `src/lib/server/rateLimit.ts` 구현**

```ts
/* In-memory attempt counter shared by the admin login and the inquiry form.
   One container serves the site, so a Map is enough; it resets on restart,
   which only ever loosens the limit. */

type Bucket = { count: number; since: number };
const buckets = new Map<string, Bucket>();

/** Records one attempt for `key` inside `scope`. Returns false — without
    counting — once `max` attempts have landed within `windowMs`. */
export function take(scope: string, key: string, max: number, windowMs: number) {
  const now = Date.now();
  if (buckets.size > 5000) {
    for (const [id, b] of buckets) if (now - b.since > windowMs) buckets.delete(id);
  }
  const id = `${scope}:${key}`;
  let bucket = buckets.get(id);
  if (!bucket || now - bucket.since > windowMs) {
    bucket = { count: 0, since: now };
    buckets.set(id, bucket);
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}

export function reset(scope: string, key: string) {
  buckets.delete(`${scope}:${key}`);
}
```

Compile + run:
```bash
cd "/Users/hyunsu/Documents/WEB/2026 08/크레용" && rm -rf $S/tsout && npx tsc src/lib/server/rateLimit.ts src/lib/siteInfo.ts --outDir $S/tsout --rootDir src/lib --module commonjs --target es2022 --skipLibCheck --esModuleInterop && cd $S && node --test rateLimit.test.mjs
```
Expected: 4 pass.

- [ ] **Step 4: `adminAuth.ts`를 `rateLimit`으로 교체**

`adminAuth.ts`에서 `WINDOW_MS`부터 `clientIp` 직전까지의 버킷 코드(`type Bucket`, `buckets`, `total`, `fresh`)를 지우고 상단에 `import { reset, take } from "./rateLimit";`를 추가한다. `login()`을 다음으로 바꾼다:

```ts
const WINDOW_MS = 15 * 60_000;
const MAX_PER_IP = 5;
const MAX_TOTAL = 30;

export async function login(password: string): Promise<AuthResult> {
  const ip = await clientIp();

  if (!take("login", ip, MAX_PER_IP, WINDOW_MS) || !take("login", "all", MAX_TOTAL, WINDOW_MS)) {
    return { ok: false, error: "로그인 시도가 너무 많습니다. 15분 뒤에 다시 시도해 주세요." };
  }

  const record = await getPasswordRecord();
  if (!record) {
    return { ok: false, error: "관리자 비밀번호가 설정되지 않았습니다. 서버의 ADMIN_PASSWORD를 확인해 주세요." };
  }

  if (!(await passwordMatches(password, record))) {
    return { ok: false, error: "비밀번호가 올바르지 않습니다." };
  }

  reset("login", ip);
  await startSession(record);
  return { ok: true };
}
```
주석 "A four-digit password falls to 10,000 guesses…"는 `WINDOW_MS` 위에 남긴다.

- [ ] **Step 5: `siteInfo.ts` 확장 테스트 작성 (실패 확인)**

`$S/siteInfo.test.mjs`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { parseSiteInfo, toInput, defaultSiteInfo, intlPhone, telHref, siteInfoFields } = require("./tsout/siteInfo.js");

const base = toInput(defaultSiteInfo);

test("missing operating keys parse as empty strings (old site-info.json)", () => {
  const { hoursKo, hoursEn, retailKo, retailEn, shippingKo, shippingEn, sampleKo, sampleEn, kakaoUrl, storeUrl, ...legacy } = base;
  const r = parseSiteInfo(legacy);
  assert.equal(r.ok, true);
  assert.deepEqual(r.info.hours, { ko: "", en: "" });
  assert.equal(r.info.kakaoUrl, "");
});
test("operating notes are capped at 300 chars", () => {
  const r = parseSiteInfo({ ...base, hoursKo: "가".repeat(301) });
  assert.equal(r.ok, false);
  assert.match(r.errors.hoursKo, /300/);
});
test("links must be http(s)", () => {
  assert.equal(parseSiteInfo({ ...base, kakaoUrl: "javascript:alert(1)" }).ok, false);
  assert.equal(parseSiteInfo({ ...base, kakaoUrl: "https://pf.kakao.com/_abc" }).ok, true);
  assert.equal(parseSiteInfo({ ...base, storeUrl: "" }).ok, true);
});
test("round trip keeps operating values", () => {
  const r = parseSiteInfo({ ...base, hoursKo: "평일 10–18시", hoursEn: "Weekdays 10–18", storeUrl: "https://smartstore.naver.com/x" });
  assert.equal(r.ok, true);
  assert.deepEqual(toInput(r.info).hoursKo, "평일 10–18시");
  assert.equal(r.info.storeUrl, "https://smartstore.naver.com/x");
});
test("siteInfoFields lists every form field once", () => {
  assert.equal(new Set(siteInfoFields).size, siteInfoFields.length);
  assert.deepEqual([...siteInfoFields].sort(), Object.keys(base).sort());
});
test("phones", () => {
  assert.equal(intlPhone("02-2266-0786"), "+82-2-2266-0786");
  assert.equal(telHref("010-7771-0786"), "tel:+821077710786");
});
```
Run: `cd $S && node --test siteInfo.test.mjs` → Expected: FAIL (`siteInfoFields` undefined, hours missing).

- [ ] **Step 6: `siteInfo.ts` 구현**

`SiteInfo`·`defaultSiteInfo`·`SiteInfoField`·`parseSiteInfo`·`toInput`를 다음으로 바꾼다 (`intlPhone`/`telHref`는 그대로):

```ts
import type { Bi } from "./bi";

export type SiteInfo = {
  tel: string;
  mobile: string;
  fax: string;
  email: string;
  addressKo: [string, string];
  addressEn: [string, string];
  mapUrl: string;
  /* Operating notes the owner fills in over time. Empty means "not decided
     yet" and the site shows its generic wording instead. */
  hours: Bi;
  retail: Bi;
  shipping: Bi;
  sample: Bi;
  kakaoUrl: string;
  storeUrl: string;
};

const none: Bi = { ko: "", en: "" };

export const defaultSiteInfo: SiteInfo = {
  tel: "02-2266-0786",
  mobile: "010-7771-0786",
  fax: "02-2266-0787",
  email: "idhhhh@naver.com",
  addressKo: ["서울특별시 종로구 종로 266", "동대문종합시장 D동 2층 2621호"],
  addressEn: [
    "Room 2621, 2F, Building D, Dongdaemun Comprehensive Market",
    "266 Jong-ro, Jongno-gu, Seoul, Korea",
  ],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%A2%85%EB%A1%9C%EA%B5%AC+%EC%A2%85%EB%A1%9C+266+%EB%8F%99%EB%8C%80%EB%AC%B8%EC%A2%85%ED%95%A9%EC%8B%9C%EC%9E%A5",
  hours: none,
  retail: none,
  shipping: none,
  sample: none,
  kakaoUrl: "",
  storeUrl: "",
};

export const siteInfoFields = [
  "tel", "mobile", "fax", "email",
  "addressKo0", "addressKo1", "addressEn0", "addressEn1", "mapUrl",
  "hoursKo", "hoursEn", "retailKo", "retailEn", "shippingKo", "shippingEn", "sampleKo", "sampleEn",
  "kakaoUrl", "storeUrl",
] as const;
export type SiteInfoField = (typeof siteInfoFields)[number];
```

`parseSiteInfo` 안에서 `mapUrl` 처리 뒤에 추가:

```ts
  const note = (field: SiteInfoField) => text(field, 300, false);
  const hours: Bi = { ko: note("hoursKo"), en: note("hoursEn") };
  const retail: Bi = { ko: note("retailKo"), en: note("retailEn") };
  const shipping: Bi = { ko: note("shippingKo"), en: note("shippingEn") };
  const sample: Bi = { ko: note("sampleKo"), en: note("sampleEn") };

  const link = (field: SiteInfoField) => {
    const value = text(field, 2000, false);
    if (value && !errors[field]) {
      let url: URL | null = null;
      try { url = new URL(value); } catch {}
      if (!url || (url.protocol !== "https:" && url.protocol !== "http:")) {
        errors[field] = "https:// 로 시작하는 주소를 넣어 주세요.";
      }
    }
    return value;
  };
  const kakaoUrl = link("kakaoUrl");
  const storeUrl = link("storeUrl");
```
기존 `mapUrl` 검증 블록도 `const mapUrl = link("mapUrl");`로 교체하고, 반환문을 `{ tel, mobile, fax, email, addressKo, addressEn, mapUrl, hours, retail, shipping, sample, kakaoUrl, storeUrl }`로 바꾼다.

`toInput`:
```ts
export function toInput(info: SiteInfo): SiteInfoInput {
  return {
    tel: info.tel, mobile: info.mobile, fax: info.fax, email: info.email,
    addressKo0: info.addressKo?.[0], addressKo1: info.addressKo?.[1],
    addressEn0: info.addressEn?.[0], addressEn1: info.addressEn?.[1],
    mapUrl: info.mapUrl,
    hoursKo: info.hours?.ko, hoursEn: info.hours?.en,
    retailKo: info.retail?.ko, retailEn: info.retail?.en,
    shippingKo: info.shipping?.ko, shippingEn: info.shipping?.en,
    sampleKo: info.sample?.ko, sampleEn: info.sample?.en,
    kakaoUrl: info.kakaoUrl, storeUrl: info.storeUrl,
  };
}
```

Run Step 3의 컴파일·테스트 명령 (두 테스트 파일 모두): Expected: 전부 pass.

- [ ] **Step 7: `data.ts`에 하위 폴더 지원과 폴더 읽기 추가**

`writeJson`의 `await fs.mkdir(dataDir, { recursive: true });`를 `await fs.mkdir(path.dirname(target), { recursive: true });`로 바꾸고(`target` 선언을 그 위로 올린다) 다음을 추가:

```ts
/** Every *.json directly inside `dir` (relative to dataDir). A file that does
    not parse is skipped and logged, never fatal — one bad inquiry must not
    hide the rest. Missing directory → empty list. */
export async function listJsonDir<T>(dir: string): Promise<{ name: string; value: T }[]> {
  const full = filePath(dir);
  let names: string[];
  try {
    names = await fs.readdir(full);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  const out: { name: string; value: T }[] = [];
  for (const name of names) {
    if (!name.endsWith(".json")) continue;
    try {
      out.push({ name, value: JSON.parse(await fs.readFile(path.join(full, name), "utf8")) as T });
    } catch (err) {
      console.error(`[data] skipping unreadable ${dir}/${name}`, err);
    }
  }
  return out;
}

export async function removeJson(name: string) {
  await fs.rm(filePath(name), { force: true });
}
```

- [ ] **Step 8: `actions.ts`의 필드 목록을 `siteInfoFields`로 교체**

`src/app/(admin)/admin/actions.ts`의 `const fields: SiteInfoField[] = [ … ]`를 지우고 `import { parseSiteInfo, siteInfoFields, type SiteInfoInput } from "@/lib/siteInfo";` 후 `Object.fromEntries(siteInfoFields.map((f) => [f, text(formData.get(f))]))`로 쓴다.

- [ ] **Step 9: 타입체크·빌드**

Run: `npx tsc --noEmit && npm run build 2>&1 | grep -E "Compiled|rror|warn"` → Expected: `✓ Compiled`, 오류·경고 없음.

---

### Task 2: 관리자 "운영 안내" · "링크" 카드

**Files:**
- Modify: `src/app/(admin)/admin/InfoForm.tsx`, `src/app/(admin)/admin/admin.module.css`

**Interfaces:**
- Consumes: `siteInfoFields`, `SiteInfo.hours/retail/shipping/sample/kakaoUrl/storeUrl` (Task 1)
- Produces: form inputs named exactly `hoursKo … storeUrl` (server action reads them by `siteInfoFields`)

- [ ] **Step 1: `Field` 타입에 `multiline` 추가, `toValues` 확장**

`InfoForm.tsx`의 `Field` 타입에 `multiline?: boolean;`를 추가하고, `toValues`에 다음 줄을 추가:
```ts
    hoursKo: info.hours.ko, hoursEn: info.hours.en,
    retailKo: info.retail.ko, retailEn: info.retail.en,
    shippingKo: info.shipping.ko, shippingEn: info.shipping.en,
    sampleKo: info.sample.ko, sampleEn: info.sample.en,
    kakaoUrl: info.kakaoUrl, storeUrl: info.storeUrl,
```

- [ ] **Step 2: 그룹 2개 추가**

`groups` 배열의 `map` 그룹 뒤에:
```ts
  {
    id: "operating",
    title: "운영 안내",
    note: "비워두면 사이트에 기본 안내문(‘자세한 조건은 상담 시 안내’)이 나오고, 채우면 그 문구가 대신 나옵니다. 국문·영문을 각각 적어 주세요.",
    fields: [
      { name: "hoursKo", label: "영업시간 · 국문", multiline: true, placeholder: "예) 평일 09:00–18:00 · 토요일 09:00–15:00 · 일요일·공휴일 휴무" },
      { name: "hoursEn", label: "영업시간 · 영문", multiline: true, placeholder: "e.g. Mon–Fri 9am–6pm · Sat 9am–3pm · Closed Sun & holidays" },
      { name: "retailKo", label: "소량 구매 안내 · 국문", multiline: true, placeholder: "예) 1마 단위로 끊어 드립니다. 원단에 따라 최소 수량이 다를 수 있습니다." },
      { name: "retailEn", label: "소량 구매 안내 · 영문", multiline: true, placeholder: "e.g. Sold by the yard in store; minimums vary by fabric." },
      { name: "shippingKo", label: "배송 안내 · 국문", multiline: true, placeholder: "예) 택배 발송 가능, 배송비는 수량에 따라 안내" },
      { name: "shippingEn", label: "배송 안내 · 영문", multiline: true, placeholder: "e.g. Courier delivery available; shipping quoted by quantity." },
      { name: "sampleKo", label: "샘플·스와치 안내 · 국문", multiline: true, placeholder: "예) 매장에서 스와치 확인 가능, 우편 샘플은 상담" },
      { name: "sampleEn", label: "샘플·스와치 안내 · 영문", multiline: true, placeholder: "e.g. Swatches available in store; mailed samples on request." },
    ],
  },
  {
    id: "links",
    title: "링크",
    note: "주소를 넣으면 문의·이용 안내·홈에 버튼이 생기고, 비우면 버튼이 사라집니다.",
    fields: [
      { name: "kakaoUrl", label: "카카오톡 채널", type: "url", placeholder: "예) https://pf.kakao.com/_xxxxx", wide: true },
      { name: "storeUrl", label: "온라인 스토어", type: "url", placeholder: "예) https://smartstore.naver.com/xxxxx", wide: true },
    ],
  },
```

- [ ] **Step 3: 렌더링에서 `multiline`이면 `<textarea>`**

`<input …/>` 자리에:
```tsx
{field.multiline ? (
  <textarea
    className={`${styles.input} ${styles.textarea}`}
    id={field.name}
    name={field.name}
    rows={2}
    value={values[field.name]}
    placeholder={field.placeholder}
    aria-invalid={error ? true : undefined}
    aria-describedby={describedBy}
    onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
  />
) : (
  <input … 기존 그대로 … />
)}
```
`admin.module.css`에 추가:
```css
.textarea {
  min-height: 84px;
  resize: vertical;
  line-height: 1.5;
}
```

- [ ] **Step 4: 빌드 후 브라우저 확인**

Run: `npx tsc --noEmit && npm run build` → 서버 기동(`DATA_DIR=$S/t2 ADMIN_PASSWORD=1234 PORT=4500`) → Playwright로 `/admin` 로그인 후 `#hoursKo`에 "평일 10–18시", `#kakaoUrl`에 `https://pf.kakao.com/_test` 입력 → 저장 → `cat $S/t2/site-info.json`에 `"hours": { "ko": "평일 10–18시" …}`, `kakaoUrl` 저장 확인. `#kakaoUrl`에 `ftp://x` 입력 저장 → `#kakaoUrl-error` 표시 확인.

---

### Task 3: 사전 문구 · 헤더 9개 · 푸터 · GuideNav

**Files:**
- Modify: `src/lib/dictionaries/ko.ts`, `src/lib/dictionaries/en.ts`, `src/components/SiteHeader.module.css`, `src/components/SiteFooter.tsx`, `src/components/SiteFooter.module.css`
- Create: `src/components/GuideNav.tsx`, `src/components/GuideNav.module.css`
- Test: `$S/header-fit.mjs`

**Interfaces:**
- Produces dictionary keys (both locales): `nav` 9th item `{ href: "/guide", en: "GUIDE", label }`; `footer.guide`, `footer.privacy`, `footer.hours`; `hours: { label, fallback }`; `guide: { navAria, hub, faq, order, fabric, custom, contactCta, callCta, kakao, store, consultNote, tocLabel }`; `phone.hours: string` (표시용 = `info.hours[lang]`)
- Produces: `GuideNav({ lang, d, current }: { lang: Locale; d: Dictionary; current: "hub" | "faq" | "order" | "fabric" | "custom" })`

- [ ] **Step 1: `ko.ts` 추가**

`nav` 배열의 contact 항목 앞에 `{ href: "/guide", en: "GUIDE", label: "이용 안내" },`.
`phone` 블록에 `hours: info.hours.ko,`.
`footer`에 `guide: "이용 안내", privacy: "개인정보처리방침", hours: "HOURS",`.
최상위(`footer` 다음)에:
```ts
    hours: { label: "영업시간", fallback: "영업시간은 전화로 확인해 주세요." },

    guide: {
      navAria: "이용 안내 메뉴",
      hub: "이용 안내",
      faq: "자주 묻는 질문",
      order: "주문·배송 안내",
      fabric: "원단 가이드",
      custom: "커스텀 나염 의뢰",
      contactCta: "문의하기",
      callCta: "전화 문의",
      kakao: "카카오톡 상담",
      store: "온라인 스토어",
      consultNote: "자세한 조건은 상담 시 안내해 드립니다.",
      tocLabel: "바로가기",
    },
```

- [ ] **Step 2: `en.ts` 동일 키 추가**

`{ href: "/guide", en: "GUIDE", label: "Guide" }`, `hours: info.hours.en`, `footer: … guide: "Guide", privacy: "Privacy policy", hours: "HOURS"`, `hours: { label: "Opening hours", fallback: "Please call to confirm opening hours." }`, `guide: { navAria: "Guide menu", hub: "Guide", faq: "FAQ", order: "Ordering & delivery", fabric: "Fabric guide", custom: "Custom printing", contactCta: "Send an enquiry", callCta: "Call us", kakao: "KakaoTalk", store: "Online store", consultNote: "Full terms are confirmed during consultation.", tocLabel: "Jump to" }`.

Run: `npx tsc --noEmit` → Expected: 통과 (한쪽만 넣으면 `en` 타입 오류로 잡힌다).

- [ ] **Step 3: GuideNav 컴포넌트**

`src/components/GuideNav.tsx`:
```tsx
import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./GuideNav.module.css";

export type GuideSlug = "hub" | "faq" | "order" | "fabric" | "custom";

const items: { slug: GuideSlug; href: string }[] = [
  { slug: "hub", href: "/guide" },
  { slug: "faq", href: "/guide/faq" },
  { slug: "order", href: "/guide/order" },
  { slug: "fabric", href: "/guide/fabric" },
  { slug: "custom", href: "/guide/custom" },
];

/* The second-level menu for the guide branch — same sticky bar the fabric
   pages use, so the two branches feel like one site. */
export function GuideNav({ lang, d, current }: { lang: Locale; d: Dictionary; current: GuideSlug }) {
  return (
    <nav className={styles.nav} aria-label={d.guide.navAria}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.label}>{d.guide.hub}</span>
        <ul>
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={localePath(lang, item.href)}
                aria-current={item.slug === current ? "page" : undefined}
                className={item.slug === current ? styles.active : undefined}
              >
                {d.guide[item.slug]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```
`GuideNav.module.css`는 `fabrics.module.css`의 `.subnav/.subnavInner/.subnavLabel/ul/a` 규칙을 `.nav/.inner/.label/ul/a`로 이름만 바꿔 복사하고, `.active { color: var(--ink); border-bottom-color: var(--ink); }`와 700px 이하 규칙(세로 정렬, sticky 해제)을 포함한다.

- [ ] **Step 4: 푸터**

`SiteFooter.tsx` SITEMAP 칼럼의 `{d.nav.map(...)}` 뒤에:
```tsx
          <p className={`${styles.columnLabel} ${styles.subLabel}`}>{d.footer.guide}</p>
          {(["faq", "order", "fabric", "custom"] as const).map((slug) => (
            <Link key={slug} href={localePath(lang, `/guide/${slug}`)}>
              {d.guide[slug]}
            </Link>
          ))}
```
CONTACT 칼럼 이메일 뒤에:
```tsx
          <p className={styles.columnLabel} style={undefined}>{d.footer.hours}</p>
          <span className={styles.hours}>{d.phone.hours || d.hours.fallback}</span>
```
(두 번째 라벨은 `className={`${styles.columnLabel} ${styles.subLabel}`}`로 — `style={undefined}` 쓰지 않는다.)
baseline 줄의 rights 앞에 `<Link href={localePath(lang, "/privacy")}>{d.footer.privacy}</Link>` 추가.
`SiteFooter.module.css`: `.subLabel { margin-top: 18px; }`, `.hours { color: rgba(255,255,255,0.72); font-size: 0.9375rem; line-height: 1.6; }`, baseline에 링크가 들어가므로 `.baseline a { color: inherit; text-decoration: none; } .baseline a:hover { text-decoration: underline; }`.

- [ ] **Step 5: 헤더 9개 실측 스크립트**

`$S/header-fit.mjs`:
```js
import { chromium } from "playwright";
const B = process.env.BASE ?? "http://localhost:4500";
const br = await chromium.launch();
let bad = 0;
for (const w of [900, 1024, 1180, 1280, 1440, 1920]) {
  const p = await (await br.newContext({ viewport: { width: w, height: 600 } })).newPage();
  await p.goto(`${B}/studio`, { waitUntil: "load" });
  const r = await p.evaluate(() => {
    const h = document.querySelector("header");
    const links = [...h.querySelectorAll("nav a")].filter((a) => a.getBoundingClientRect().width > 0);
    const rects = [...h.querySelectorAll("a, button")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => e.getBoundingClientRect());
    let overlap = 0;
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i], b = rects[j];
      if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) overlap++;
    }
    return { visibleNav: links.length, over: h.scrollWidth - h.clientWidth, overlap, hamburger: !!h.querySelector("button[aria-controls]") && getComputedStyle(h.querySelector("button[aria-controls]")).display !== "none" };
  });
  const ok = r.over <= 0 && r.overlap === 0 && (r.hamburger || r.visibleNav === 9);
  if (!ok) bad++;
  console.log(`${String(w).padStart(5)}px  nav:${r.visibleNav} hamburger:${r.hamburger} overflow:${r.over} overlap:${r.overlap}  ${ok ? "ok" : "FAIL"}`);
}
await br.close();
process.exit(bad ? 1 : 0);
```

- [ ] **Step 6: 빌드·기동·실측, CSS 조정**

Run: `npx tsc --noEmit && npm run build` → 서버(4500) → `node $S/header-fit.mjs`.
FAIL이 나오면 `SiteHeader.module.css`에서 순서대로 적용하고 재실측:
1. `@media (max-width: 1280px) { .tel { display: none; } }` → `max-width: 1440px`.
2. 그래도 1024에서 넘치면 `@media (max-width: 900px)` 블록의 조건을 `max-width: 1024px`로 올린다 (햄버거 조기 전환).
3. `.nav { gap: clamp(11px, 1.5vw, 22px) }` → `clamp(10px, 1.2vw, 20px)`.
Expected: 6개 폭 전부 `ok`.

---

### Task 4: 콘텐츠 모듈 — `guide.ts`, `faq.ts`, `order.ts`

**Files:**
- Create: `src/content/guide.ts`, `src/content/faq.ts`, `src/content/order.ts`

**Interfaces:**
- Consumes: `Bi` (Task 1), `SiteInfo`
- Produces:
  - `guideMeta: { title: Bi; description: Bi }`, `audiences: Audience[]`, `guidePages: GuideCard[]`
  - `faqMeta`, `faq(info: SiteInfo): FaqGroup[]`
  - `orderMeta`, `order(info: SiteInfo): { wholesale: Step[]; retail: Step[]; policies: Policy[] }`

공용 타입은 `src/content/types.ts`에 둔다:
```ts
import type { Bi } from "@/lib/bi";
export type Meta = { title: Bi; description: Bi };
export type Step = { n: string; title: Bi; body: Bi };
export type LinkItem = { label: Bi; href: string };
export type Section = { id: string; title: Bi; lead?: Bi; paragraphs?: Bi[]; bullets?: Bi[] };
```

- [ ] **Step 1: `guide.ts`**

```ts
import type { Bi } from "@/lib/bi";
import type { LinkItem, Meta } from "./types";

export const guideMeta: Meta = {
  title: { ko: "이용 안내", en: "Guide" },
  description: {
    ko: "크레용 원단을 처음 찾으시는 분을 위한 안내. 브랜드·제조사와 개인·소규모 제작자 각각의 구매 방법, 자주 묻는 질문, 주문·배송, 원단 가이드, 커스텀 나염 의뢰.",
    en: "Where to start with CRAYON fabric — for brands and makers alike: how to buy, FAQ, ordering and delivery, a fabric guide, and custom printing.",
  },
};

export type Audience = { id: "brand" | "personal"; en: string; title: Bi; lead: Bi; points: Bi[]; links: LinkItem[] };

export const audiences: Audience[] = [
  {
    id: "brand",
    en: "FOR BRANDS & MAKERS",
    title: { ko: "브랜드 · 제조사", en: "Brands & manufacturers" },
    lead: { ko: "롤 단위 공급과 시즌 신상, 독자 개발 패턴까지 한 곳에서.", en: "Roll supply, seasonal new arrivals and original patterns from one source." },
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
    lead: { ko: "동대문 매장에 오시면 소량으로 끊어 드립니다. 처음이라도 괜찮습니다.", en: "Visit the Dongdaemun shop and we cut small quantities. First time is fine." },
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

export type GuideCard = { slug: "faq" | "order" | "fabric" | "custom"; href: string; en: string; title: Bi; summary: Bi };

export const guidePages: GuideCard[] = [
  { slug: "faq", href: "/guide/faq", en: "FAQ", title: { ko: "자주 묻는 질문", en: "FAQ" }, summary: { ko: "구매·수량, 샘플·색상, 배송·결제, 커스텀, 방문까지 21문항.", en: "21 answers on buying, samples, delivery, custom work and visiting." } },
  { slug: "order", href: "/guide/order", en: "ORDER & DELIVERY", title: { ko: "주문·배송 안내", en: "Ordering & delivery" }, summary: { ko: "도매와 소량, 두 가지 절차와 결제·배송·교환 기준.", en: "Wholesale and retail flows, plus payment, delivery and returns." } },
  { slug: "fabric", href: "/guide/fabric", en: "FABRIC GUIDE", title: { ko: "원단 가이드", en: "Fabric guide" }, summary: { ko: "소재별 특징, 용어, 필요 수량 계산, 세탁·관리, 나염 기법.", en: "Materials, terms, how much to buy, care, and printing methods." } },
  { slug: "custom", href: "/guide/custom", en: "CUSTOM PRINTING", title: { ko: "커스텀 나염 의뢰", en: "Custom printing" }, summary: { ko: "내 디자인으로 나염하기 — 절차, 준비물, 기법 선택.", en: "Print your own design — process, what to prepare, choosing a method." } },
];
```

- [ ] **Step 2: `faq.ts` — 그룹 5개 · 21문항**

구조:
```ts
import type { SiteInfo } from "@/lib/siteInfo";
import type { Bi } from "@/lib/bi";
import type { Meta } from "./types";

export type FaqItem = { id: string; q: Bi; a: Bi; links?: { label: Bi; href: string }[] };
export type FaqGroup = { id: string; en: string; title: Bi; items: FaqItem[] };

export const faqMeta: Meta = {
  title: { ko: "자주 묻는 질문", en: "FAQ" },
  description: { ko: "크레용 나염 원단 구매·수량·샘플·배송·세탁·커스텀 나염·방문에 대한 답변.", en: "Answers about buying CRAYON printed fabric — quantities, samples, delivery, care, custom printing and visiting." },
};

/** `or(info.retail, fallback)` — the owner's wording when set, generic otherwise. */
const or = (v: Bi, fallback: Bi): Bi => ({ ko: v.ko || fallback.ko, en: v.en || fallback.en });

export function faq(info: SiteInfo): FaqGroup[] { return [ /* 아래 */ ]; }
```
그룹과 문항(각 `a`는 국문 2~4문장, 영문은 충실한 번역; `info`를 쓰는 곳은 `or()`로):

**A `buying` · BUYING · 구매·수량**
1. `personal` 개인도 구매할 수 있나요? — 네. 동대문종합시장 매장에 오시면 소량으로 끊어 드립니다. `or(info.retail, {ko:"단위와 최소 수량은 원단에 따라 달라 상담 시 안내해 드립니다.", en:…})`. `info.storeUrl`이 있으면 links에 `{ label: {ko:"온라인 스토어", en:"Online store"}, href: info.storeUrl }`.
2. `minimum` 최소 구매 수량이 있나요? — 도매는 롤 단위가 기본, 소량은 매장에서 상담. `or(info.retail, …)`.
3. `price` 가격은 어디서 볼 수 있나요? — 원단 종류·수량·기법에 따라 달라 사이트에 표시하지 않음. 전화·문의 폼으로 원단명과 수량을 알려주시면 안내.
4. `stock` 재고 확인은 어떻게 하나요? — 전화로 품명·색상 말씀. 시즌 신상은 신상품 페이지. links → `/new`.
5. `howmuch` 필요한 양은 어떻게 계산하나요? — 원단 폭·사이즈·무늬 맞춤에 따라 다름, 여유 10–15% 권장, 원단 가이드 링크 → `/guide/fabric#quantity`.

**B `sample` · SAMPLES & COLOUR · 샘플·색상**
6. `swatch` 샘플(스와치)을 받아볼 수 있나요? — `or(info.sample, {ko:"매장에서 직접 확인하실 수 있고, 우편 샘플은 상담 시 안내해 드립니다.", …})`.
7. `colour` 화면 색과 실물이 다를 수 있나요? — 모니터·조명·로트 차이. 중요한 색은 실물 확인 권장.
8. `colourway` 같은 디자인을 다른 색으로도 받을 수 있나요? — 컬러웨이 전개 가능, 수량·기법에 따라 상담.

**C `delivery` · DELIVERY & PAYMENT · 배송·결제·교환**
9. `shipping` 배송이 되나요? — `or(info.shipping, {ko:"택배 발송 가능 여부와 비용은 수량·지역에 따라 상담 시 안내해 드립니다.", …})`.
10. `payment` 결제는 어떻게 하나요? — 매장 결제 및 도매 거래 조건은 상담 시 안내. (수단 단정 금지)
11. `returns` 교환·반품이 되나요? — 재단 후에는 원단 특성상 어렵습니다. 수령 직후 이상이 있으면 바로 연락.
12. `invoice` 세금계산서가 필요합니다. — 사업자 거래 시 말씀해 주시면 안내해 드립니다.

**D `custom` · CUSTOM & DESIGN · 커스텀 나염·디자인**
13. `own-design` 제 디자인으로 나염할 수 있나요? — 네. 절차는 커스텀 나염 의뢰 페이지 → `/guide/custom`.
14. `no-design` 도안이 없어도 의뢰할 수 있나요? — 자체 디자인실에서 의뢰 디자인 진행. → `/studio`.
15. `methods` 어떤 나염 기법이 있나요? — DTP·로터리·분사·반응성·안료, 원단과 수량에 맞게 제안. → `/guide/fabric#methods`.
16. `rights` 크레용 디자인은 독점인가요? 저작권은요? — 자체 개발 패턴. 사용 범위·독점 여부는 디자인별로 상담 시 안내(기존 studio.note와 같은 취지). 의뢰 도안의 권리 확인은 의뢰인 책임.
17. `custom-min` 커스텀 나염 최소 수량과 기간은요? — 원단·기법에 따라 달라 상담 시 안내.

**E `visit` · VISITING · 방문·기타**
18. `where` 매장은 어디에 있고 언제 여나요? — `info.addressKo/En` 문자열 + `or(info.hours, {ko:"영업시간은 전화로 확인해 주세요.", en:…})` + 방문 전 전화 권장. → `/contact`.
19. `parking` 주차는 되나요? — 시장 주변 주차 사정이 복잡해 대중교통 권장(1·4호선 동대문역 도보). 차량 방문은 사전 문의.
20. `english` 영어로 문의할 수 있나요? — 영문 페이지 제공, 이메일로 문의 주시면 답변. → `/contact`.
21. `export` 해외 수출도 하나요? — 일본·대만·유럽·중동 공급 경험, 수출·대량 조건은 상담. → `/contact?type=wholesale`.

- [ ] **Step 3: `order.ts`**

```ts
import type { SiteInfo } from "@/lib/siteInfo";
import type { Bi } from "@/lib/bi";
import type { Meta, Step } from "./types";

export const orderMeta: Meta = {
  title: { ko: "주문·배송 안내", en: "Ordering & delivery" },
  description: { ko: "크레용 나염 원단 도매 주문 절차와 개인 소량 구매 방법, 결제·배송·샘플·교환 기준.", en: "How wholesale ordering and small-quantity buying work at CRAYON, with payment, delivery, sample and return terms." },
};

export type Policy = { id: "retail" | "payment" | "shipping" | "sample" | "returns"; en: string; title: Bi; body: Bi; fromAdmin: boolean };

const or = (v: Bi, fallback: Bi) => ({ body: { ko: v.ko || fallback.ko, en: v.en || fallback.en }, fromAdmin: Boolean(v.ko || v.en) });

export function order(info: SiteInfo): { wholesale: Step[]; retail: Step[]; policies: Policy[] } {
  return {
    wholesale: [
      { n: "01", title: { ko: "상담", en: "Consultation" }, body: { ko: "용도·소재·수량·납기를 전화나 문의 폼으로 알려주세요. 원단과 기법을 제안해 드립니다.", en: "Tell us the use, material, quantity and timing by phone or the form. We propose fabric and method." } },
      { n: "02", title: { ko: "샘플·확인", en: "Sample & check" }, body: { ko: "스와치나 시직으로 색과 촉감을 확인합니다.", en: "Confirm colour and hand on a swatch or strike-off." } },
      { n: "03", title: { ko: "수량·납기 확정", en: "Quantity & schedule" }, body: { ko: "롤 단위 수량과 납기를 확정합니다.", en: "Fix roll quantities and the delivery date." } },
      { n: "04", title: { ko: "결제", en: "Payment" }, body: { ko: "거래 조건에 따라 결제합니다.", en: "Payment on the agreed terms." } },
      { n: "05", title: { ko: "출고", en: "Dispatch" }, body: { ko: "검수 후 출고합니다. 수출 물량은 별도로 안내합니다.", en: "Inspected and dispatched; export orders are handled separately." } },
    ],
    retail: [
      { n: "01", title: { ko: "방문", en: "Visit" }, body: { ko: "동대문종합시장 D동 크레용 매장에 오세요. 방문 전에 전화 주시면 원하시는 방향의 원단을 준비해 둡니다.", en: "Come to the CRAYON shop, Building D, Dongdaemun Comprehensive Market. Call ahead and we will have the right fabrics out." } },
      { n: "02", title: { ko: "원단 고르기", en: "Choose" }, body: { ko: "용도를 말씀하시면 소재와 무늬를 함께 골라 드립니다.", en: "Tell us what you are making; we pick material and print with you." } },
      { n: "03", title: { ko: "수량 계산", en: "Work out the amount" }, body: { ko: "원단 폭과 만들 것의 크기로 필요한 길이를 계산합니다. 여유분을 조금 더 두세요.", en: "Length follows the cloth width and what you are making. Leave a margin." } },
      { n: "04", title: { ko: "결제·재단", en: "Pay & cut" }, body: { ko: "매장에서 결제하고 바로 끊어 드립니다.", en: "Pay in store and we cut it there and then." } },
    ],
    policies: [
      { id: "retail", en: "SMALL QUANTITIES", title: { ko: "소량 구매", en: "Small quantities" }, ...or(info.retail, { ko: "매장에서 소량으로 끊어 드립니다. 단위와 최소 수량은 원단에 따라 달라 상담 시 안내해 드립니다.", en: "We cut small quantities in store. Units and minimums vary by fabric and are confirmed during consultation." }) },
      { id: "payment", en: "PAYMENT", title: { ko: "결제", en: "Payment" }, body: { ko: "매장 결제와 도매 거래 조건은 상담 시 안내해 드립니다. 사업자 거래는 세금계산서 발행을 도와드립니다.", en: "In-store payment and wholesale terms are confirmed during consultation. Tax invoices are available for business customers." }, fromAdmin: false },
      { id: "shipping", en: "DELIVERY", title: { ko: "배송", en: "Delivery" }, ...or(info.shipping, { ko: "택배 발송 가능 여부와 비용은 수량·지역에 따라 상담 시 안내해 드립니다.", en: "Whether we can ship, and the cost, depends on quantity and destination — confirmed during consultation." }) },
      { id: "sample", en: "SAMPLES", title: { ko: "샘플", en: "Samples" }, ...or(info.sample, { ko: "매장에서 스와치를 직접 확인하실 수 있습니다. 우편 샘플은 상담 시 안내해 드립니다.", en: "Swatches can be seen in store; mailed samples are arranged during consultation." }) },
      { id: "returns", en: "RETURNS", title: { ko: "교환·반품", en: "Returns" }, body: { ko: "재단 후에는 원단 특성상 교환·반품이 어렵습니다. 수령 직후 이상이 있으면 바로 연락 주세요.", en: "Once cut, fabric cannot normally be exchanged or returned. If something is wrong on arrival, contact us straight away." }, fromAdmin: false },
    ],
  };
}
```

- [ ] **Step 4: 타입체크**

Run: `npx tsc --noEmit` → Expected: 통과. (아직 페이지에서 쓰지 않으므로 빌드 영향 없음.)

---

### Task 5: 콘텐츠 모듈 — `fabricGuide.ts`, `custom.ts`, `privacy.ts`

**Files:**
- Create: `src/content/fabricGuide.ts`, `src/content/custom.ts`, `src/content/privacy.ts`

**Interfaces:**
- Produces: `fabricGuideMeta`, `materials: Material[]`, `terms: Term[]`, `conversions: Bi[]`, `quantityGuide: { lead: Bi; rules: Bi[]; examples: Bi[] }`, `care: Section[]`, `methods: Method[]`
- Produces: `customMeta`, `customSteps: Step[]`, `prepItems: Bi[]`, `methodTable: MethodRow[]`, `cautions: Bi[]`
- Produces: `privacyMeta`, `privacy(info: SiteInfo): { effective: string; sections: Section[] }`

- [ ] **Step 1: `fabricGuide.ts`**

```ts
export type Material = { id: string; name: Bi; traits: Bi; care: Bi; href: string };
export const materials: Material[] = [
  { id: "cotton", name: { ko: "면 (코튼)", en: "Cotton" }, traits: { ko: "통기성과 흡습성이 좋고 나염 발색이 안정적입니다. 수(s)가 높을수록 얇고 부드럽습니다 — 80수는 블라우스, 40수·10수는 두께감 있는 옷과 홈패브릭에.", en: "Breathable and absorbent with stable print colour. Higher counts are finer — 80s for blouses, 40s and 10s for heavier garments and home textiles." }, care: { ko: "첫 세탁에서 약간 줄 수 있어 여유분을 두세요.", en: "May shrink a little on first wash; allow a margin." }, href: "/fabrics/cotton#cotton-100" },
  { id: "rayon", name: { ko: "레이온", en: "Rayon" }, traits: { ko: "드레이프와 은은한 광택. 원피스·블라우스에 많이 씁니다.", en: "Drape and a soft sheen — dresses and blouses." }, care: { ko: "물세탁 시 수축·구김이 크니 손세탁 또는 드라이를 권합니다.", en: "Shrinks and creases in the wash; hand wash or dry clean." }, href: "/fabrics/cotton#rayon" },
  { id: "tencel", name: { ko: "텐셀 (리오셀)", en: "Tencel (lyocell)" }, traits: { ko: "부드럽고 흡습성이 좋으며 색이 깊게 올라옵니다.", en: "Soft, absorbent, takes colour deeply." }, care: { ko: "중성세제로 부드럽게 세탁하세요.", en: "Wash gently with a neutral detergent." }, href: "/fabrics/cotton" },
  { id: "linen", name: { ko: "린넨", en: "Linen" }, traits: { ko: "시원하고 통기성이 좋습니다. 구김은 린넨의 특징입니다.", en: "Cool and breathable; creasing is part of its character." }, care: { ko: "세탁 후 형태를 잡아 그늘에 말리세요.", en: "Reshape after washing and dry in shade." }, href: "/fabrics/cotton" },
  { id: "polyester", name: { ko: "폴리에스터", en: "Polyester" }, traits: { ko: "형태 안정성이 좋고 빨리 마르며 구김이 적습니다. 새틴·쉬폰·아문젠·올피치 등 조직이 다양합니다.", en: "Stable, quick-drying, crease-resistant; satin, chiffon, amunzen, all-peach and more." }, care: { ko: "고온 다림질을 피하세요.", en: "Avoid a hot iron." }, href: "/fabrics/polyester" },
  { id: "knit", name: { ko: "다이마루 (니트)", en: "Interlock knit" }, traits: { ko: "신축성이 있어 티셔츠·아동복·이너에 적합합니다.", en: "Stretchy — tees, childrenswear, inner layers." }, care: { ko: "늘어나지 않게 뉘어서 말리세요.", en: "Dry flat to keep the shape." }, href: "/fabrics/cotton#knit" },
  { id: "brushed", name: { ko: "기모 · 본딩", en: "Brushed & bonded" }, traits: { ko: "기모는 안쪽을 긁어 보온성을 높인 겨울 원단, 본딩은 두 겹을 붙여 두께와 보온을 더한 원단입니다.", en: "Brushed cloth is raised on the back for winter warmth; bonded cloth laminates two layers for body and warmth." }, care: { ko: "뒤집어서 세탁하고 건조기는 피하세요.", en: "Wash inside out; avoid tumble drying." }, href: "/fabrics/cotton#brushed" },
];
```
`href`의 앵커는 `fabrics.ts`의 실제 `group.slug`와 맞춘다 (구현 시 `grep "slug:" src/lib/fabrics.ts`로 확인해 없는 앵커는 카테고리 경로만 쓴다).

`terms` (Term = `{ term: Bi; body: Bi }`): 수(s)·밀도·폭(inch)·마/야드/미터·롤(절)·나염과 무지·리피트·도수 — 8개. `conversions`: `1마 = 1야드 = 91.44cm`, `1m ≈ 1.09야드`, `폭 44"(약 112cm) / 58"(약 147cm)`.

`quantityGuide`: lead(원단 폭과 만드는 것의 크기·무늬 맞춤이 좌우) / rules(① 패턴 길이 × 벌 수 ② 여유 10–15% ③ 폭이 넓으면 덜 든다 ④ 큰 무늬를 맞추면 리피트만큼 더) / examples(상의 1벌 약 1.5–2마 안팎, 원피스 약 2.5–3마 안팎, 침구는 사이즈로 계산 — 모두 "안팎", "참고치" 표현, 마지막에 "정확한 양은 매장에서 함께 계산해 드립니다").

`care`: Section 4개 — 첫 세탁(단독·찬물·뒤집어서), 세제·표백(중성세제, 표백제 금지), 건조(그늘, 건조기 지양), 다림질(원단별 온도, 뒷면).

`methods` (Method = `{ id: string; name: Bi; body: Bi; fit: Bi }`, `id`는 `#methods` 섹션 안 앵커): DTP(디지털) — 판 없이 소량·다색·정밀, 샘플과 소량에 유리 / 로터리 — 원통 스크린으로 대량·연속, 도수(색 수)별 스크린, 대량 단가 유리 / 분사 — 노즐로 염료를 뿌려 그라데이션·번짐 표현 / 반응성 — 반응성 염료가 면·레이온 같은 셀룰로오스 섬유와 결합, 발색·견뢰도·촉감 우수 / 안료 — 안료를 바인더로 표면에 고착, 원단을 가리지 않고 진한 색·불투명, 폴리·혼방에도 적용, 촉감은 약간 단단해질 수 있음.

- [ ] **Step 2: `custom.ts`**

`customSteps` 6개(상담 → 디자인 준비·의뢰 → 도수분리·리피트 → 시직·샘플 → 본생산 → 납품), `prepItems` 7개(도안 파일 AI·PDF·PSD 또는 고해상도 JPG·PNG / 리피트 여부·크기 / 색 수와 참고색(팬톤·실물) / 원단 종류·폭 / 예상 수량 / 용도 / 희망 납기), `methodTable` (MethodRow = `{ method: Bi; fabric: Bi; good: Bi; volume: Bi }`, 5행 — 기법별 적합 원단·장점·수량 성향, 숫자 없이 "소량에 유리/대량에 유리"), `cautions` 4개(의뢰 도안의 저작권·초상권 확인은 의뢰인 책임 / 모니터와 실물 색 차이, 시직 확인 권장 / 수량·기간·단가는 원단·기법에 따라 상담 시 안내 / 리피트·도수분리 작업이 필요한 도안은 기간이 더 걸릴 수 있음). `customMeta` 포함.

- [ ] **Step 3: `privacy.ts`**

```ts
export const privacyMeta: Meta = { title: { ko: "개인정보처리방침", en: "Privacy policy" }, description: { ko: "크레용 홈페이지 문의 폼으로 수집하는 개인정보의 항목·목적·보관 기간과 정보주체의 권리.", en: "What the CRAYON enquiry form collects, why, for how long, and your rights." } };

export function privacy(info: SiteInfo): { effective: string; sections: Section[] } {
  return { effective: "2026-09-14", sections: [
    { id: "items", title: { ko: "1. 수집하는 항목", en: "1. What we collect" }, bullets: [
      { ko: "필수: 이름, 연락처, 문의 유형, 문의 내용", en: "Required: name, phone, enquiry type, message" },
      { ko: "선택: 이메일, 회사·브랜드명, 용도, 수량", en: "Optional: email, company or brand, intended use, quantity" },
      { ko: "자동 수집 항목은 없습니다. 접속 기록·쿠키로 개인을 식별하지 않습니다.", en: "Nothing is collected automatically; no cookies identify you." } ] },
    { id: "purpose", title: { ko: "2. 이용 목적", en: "2. Why" }, paragraphs: [{ ko: "문의에 답변하고 상담 이력을 확인하기 위해서만 이용합니다.", en: "Only to answer your enquiry and keep track of the conversation." }] },
    { id: "retention", title: { ko: "3. 보관 기간", en: "3. Retention" }, paragraphs: [{ ko: "접수일로부터 1년간 보관한 뒤 자동으로 파기합니다. 삭제를 요청하시면 즉시 파기합니다.", en: "Kept for one year from receipt, then deleted automatically. Deleted immediately on request." }] },
    { id: "sharing", title: { ko: "4. 제3자 제공·위탁", en: "4. Sharing" }, paragraphs: [{ ko: "제3자에게 제공하거나 외부에 처리를 위탁하지 않습니다.", en: "Not shared with third parties or outsourced." }] },
    { id: "rights", title: { ko: "5. 정보주체의 권리", en: "5. Your rights" }, paragraphs: [{ ko: `열람·정정·삭제를 원하시면 ${info.email}로 요청해 주세요. 지체 없이 처리합니다.`, en: `Ask for access, correction or deletion at ${info.email}; we act without delay.` }] },
    { id: "security", title: { ko: "6. 안전성 확보 조치", en: "6. Security" }, paragraphs: [{ ko: "문의 내용은 접근이 통제된 자체 서버에 저장하며, 비밀번호 인증을 거친 관리자만 열람합니다.", en: "Enquiries are stored on our own access-controlled server and read only by a password-authenticated administrator." }] },
    { id: "officer", title: { ko: "7. 개인정보 보호책임자", en: "7. Contact" }, bullets: [{ ko: `크레용 · ${info.email} · ${info.tel}`, en: `CRAYON · ${info.email} · ${info.tel}` }] },
    { id: "effective", title: { ko: "8. 시행일", en: "8. Effective date" }, paragraphs: [{ ko: "이 방침은 2026년 9월 14일부터 적용됩니다.", en: "In force from 14 September 2026." }] },
  ] };
}
```

- [ ] **Step 4: 타입체크**

Run: `npx tsc --noEmit` → Expected: 통과.

---

### Task 6: 이용 안내 페이지 3종 — 허브 · FAQ · 주문/배송 (+ 공용 CSS, 라우트)

**Files:**
- Create: `src/components/pages/guide.module.css`, `src/components/pages/GuidePage.tsx`, `FaqPage.tsx`, `OrderPage.tsx`
- Create: `src/app/(ko)/guide/page.tsx`, `(ko)/guide/faq/page.tsx`, `(ko)/guide/order/page.tsx`, `src/app/(en)/en/guide/page.tsx`, `(en)/en/guide/faq/page.tsx`, `(en)/en/guide/order/page.tsx`

**Interfaces:**
- Consumes: `GuideNav` (Task 3), `guide.ts`/`faq.ts`/`order.ts` (Task 4), `PageIntro`, `SectionHead`, `Reveal`, `getDictionary`, `getSiteInfo`
- Produces: `GuidePage({ lang, d, info })`, `FaqPage({ lang, d, info })`, `OrderPage({ lang, d, info })` — 모두 `{ lang: Locale; d: Dictionary; info: SiteInfo }`

- [ ] **Step 1: 라우트 파일 패턴 (6개 모두 동일 골격)**

`src/app/(ko)/guide/faq/page.tsx`:
```tsx
import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { faqMeta } from "@/content/faq";
import { getDictionary } from "@/lib/dictionaries";
import { getSiteInfo } from "@/lib/server/siteInfoStore";

const lang = "ko" as const;

export function generateMetadata(): Metadata {
  return { title: faqMeta.title[lang], description: faqMeta.description[lang] };
}

export default async function Page() {
  return <FaqPage lang={lang} d={await getDictionary(lang)} info={await getSiteInfo()} />;
}
```
허브는 `GuidePage`/`guideMeta`, 주문은 `OrderPage`/`orderMeta`. 영문 라우트는 `lang = "en"`만 다르다.

- [ ] **Step 2: `guide.module.css` — 공용 스타일**

```css
/* Shared by the guide branch. Reading pages, so wider measure and calmer
   rhythm than the home page; same tokens. */
.cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.card { display: flex; flex-direction: column; gap: 10px; padding: clamp(24px, 3vw, 40px); border: 1px solid var(--line-strong); color: inherit; text-decoration: none; transition: border-color 0.3s var(--ease), background 0.3s var(--ease); }
.card:hover { border-color: var(--ink); background: var(--surface); }
.cardEn { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.24em; color: var(--muted); }
.cardTitle { font-size: 1.375rem; font-weight: 700; letter-spacing: -0.03em; line-height: 1.3; }
.cardSummary { color: var(--body); }
.cardArrow { margin-top: auto; font-family: var(--font-mono); font-size: 0.9375rem; }

.audience { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.audienceCol { padding: clamp(24px, 3vw, 40px); background: var(--surface); }
.audienceEn { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.24em; color: var(--muted); }
.audienceTitle { margin-top: 10px; font-size: clamp(1.375rem, 2vw, 1.75rem); font-weight: 700; letter-spacing: -0.035em; line-height: 1.25; }
.audienceLead { margin-top: 10px; color: var(--body); }
.audienceList { margin-top: 18px; display: grid; gap: 8px; }
.audienceList li { padding-left: 18px; position: relative; }
.audienceList li::before { content: ""; position: absolute; left: 0; top: 0.75em; width: 8px; height: 1px; background: var(--ink); }
.audienceLinks { margin-top: 22px; display: flex; flex-wrap: wrap; gap: 8px 20px; }

.toc { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-bottom: clamp(28px, 4vw, 48px); }
.toc a { font-family: var(--font-mono); font-size: 0.9375rem; letter-spacing: 0.08em; color: var(--body); border-bottom: 1px solid var(--line-strong); }
.toc a:hover { color: var(--ink); border-color: var(--ink); }

.faqGroup { padding-top: clamp(28px, 4vw, 48px); }
.faqGroup + .faqGroup { margin-top: clamp(28px, 4vw, 48px); border-top: 1px solid var(--line); }
.faqList { display: grid; gap: 0; margin-top: 8px; }
.faqItem { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: 12px clamp(24px, 4vw, 72px); padding: clamp(20px, 2.4vw, 30px) 0; border-top: 1px solid var(--line); }
.faqQ { font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.45; }
.faqA { color: var(--body); }
.faqLinks { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px 18px; }

.flows { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(24px, 4vw, 56px); }
.flowHead { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.24em; color: var(--muted); }
.flowTitle { margin-top: 8px; font-size: clamp(1.375rem, 2vw, 1.75rem); font-weight: 700; letter-spacing: -0.035em; }
.steps { margin-top: 20px; display: grid; gap: 0; }
.step { display: grid; grid-template-columns: 44px 1fr; gap: 12px; padding: 18px 0; border-top: 1px solid var(--line); }
.stepN { font-family: var(--font-mono); font-size: 0.9375rem; color: var(--numeral); }
.stepTitle { font-weight: 700; }
.stepBody { margin-top: 4px; color: var(--body); }

.policies { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.policy { padding: clamp(22px, 3vw, 32px); border: 1px solid var(--line-strong); }
.policyEn { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.24em; color: var(--muted); }
.policyTitle { margin-top: 8px; font-size: 1.25rem; font-weight: 700; }
.policyBody { margin-top: 10px; color: var(--body); white-space: pre-line; }
.policyNote { margin-top: 10px; font-size: 0.9375rem; color: var(--muted); }

.quick { display: flex; flex-wrap: wrap; gap: 12px; }

.prose { max-width: 70ch; }
.prose p + p { margin-top: 1em; }
.bullets { display: grid; gap: 8px; }
.bullets li { padding-left: 18px; position: relative; }
.bullets li::before { content: ""; position: absolute; left: 0; top: 0.75em; width: 8px; height: 1px; background: var(--ink); }

.table { width: 100%; border-collapse: collapse; }
.table th, .table td { padding: 12px 14px; text-align: left; vertical-align: top; border-top: 1px solid var(--line); }
.table th { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.12em; color: var(--muted); font-weight: 500; }
.table td:first-child { font-weight: 700; white-space: nowrap; }
.tableWrap { overflow-x: auto; }

.legal h2 { margin-top: clamp(28px, 4vw, 44px); font-size: 1.25rem; font-weight: 700; }
.legal h2:first-child { margin-top: 0; }
.legal p, .legal li { color: var(--body); }
.legalMeta { font-family: var(--font-mono); font-size: 0.875rem; letter-spacing: 0.08em; color: var(--muted); }

@media (max-width: 900px) {
  .cards, .audience, .flows, .policies { grid-template-columns: 1fr; }
  .faqItem { grid-template-columns: 1fr; gap: 8px; }
}
```

- [ ] **Step 3: `GuidePage.tsx`**

```tsx
import Link from "next/link";
import { GuideNav } from "@/components/GuideNav";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { audiences, guidePages } from "@/content/guide";
import { pick } from "@/lib/bi";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./guide.module.css";

type Props = { lang: Locale; d: Dictionary; info: SiteInfo };

export function GuidePage({ lang, d, info }: Props) {
  const to = (path: string) => localePath(lang, path);
  return (
    <>
      <PageIntro en="GUIDE" imageSrc="/images/crayon-store-wide.jpg" imagePosition="center 46%"
        title={<>{lang === "ko" ? <>처음 오셨나요?<br />이렇게 시작하세요.</> : <>New here?<br />Start with this.</>}</>}
        lead={lang === "ko" ? "브랜드도, 개인 제작자도 같은 원단을 씁니다. 필요한 만큼, 맞는 방법으로 안내해 드립니다." : "Brands and individual makers use the same cloth. We guide you to the right amount, the right way."} />
      <GuideNav lang={lang} d={d} current="hub" />

      <section className="section">
        <div className="container">
          <SectionHead index="01" en="WHO ARE YOU BUYING FOR" title={lang === "ko" ? "두 가지 길이 있습니다." : "Two ways in."} />
          <div className={styles.audience}>
            {audiences.map((a, i) => (
              <Reveal className={styles.audienceCol} delay={i * 40} key={a.id}>
                <p className={styles.audienceEn}>{a.en}</p>
                <h3 className={styles.audienceTitle}>{pick(a.title, lang)}</h3>
                <p className={styles.audienceLead}>{pick(a.lead, lang)}</p>
                <ul className={styles.audienceList}>{a.points.map((p) => <li key={p.en}>{pick(p, lang)}</li>)}</ul>
                <div className={styles.audienceLinks}>
                  {a.links.map((l) => (
                    <Link className="arrow-link" href={to(l.href)} key={l.href}>{pick(l.label, lang)}<span aria-hidden="true">→</span></Link>
                  ))}
                  {a.id === "personal" && info.storeUrl ? <a className="arrow-link" href={info.storeUrl} target="_blank" rel="noreferrer">{d.guide.store}<span aria-hidden="true">↗</span></a> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead index="02" en="GUIDES" title={lang === "ko" ? "궁금한 것부터 보세요." : "Pick what you need."} />
          <div className={styles.cards}>
            {guidePages.map((g, i) => (
              <Reveal delay={i * 30} key={g.slug}>
                <Link className={styles.card} href={to(g.href)}>
                  <span className={styles.cardEn}>{g.en}</span>
                  <span className={styles.cardTitle}>{pick(g.title, lang)}</span>
                  <span className={styles.cardSummary}>{pick(g.summary, lang)}</span>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="container statement-inner">
          <Reveal><blockquote className="statement">{lang === "ko" ? <>고르기 어려우면 용도만 말씀해 주세요.<br />나머지는 함께 좁혀 드립니다.</> : <>If choosing is hard, just tell us the use.<br />We narrow the rest down together.</>}</blockquote></Reveal>
          <Reveal className={styles.quick} delay={40}>
            <Link className="btn btn-invert" href={to("/contact")}>{d.guide.contactCta}<span aria-hidden="true">→</span></Link>
            <a className="arrow-link arrow-link-light" href={d.links.tel}>{d.guide.callCta} · {d.phone.tel}</a>
            {info.kakaoUrl ? <a className="arrow-link arrow-link-light" href={info.kakaoUrl} target="_blank" rel="noreferrer">{d.guide.kakao}<span aria-hidden="true">↗</span></a> : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
```
(`style={{ paddingTop: 0 }}` 대신 `globals.css`에 이미 있는 `.section-tight`가 맞으면 그것을 쓴다.)

- [ ] **Step 4: `FaqPage.tsx`**

PageIntro(`en="FAQ"`, 이미지 `/images/crayon-store.jpg`, 제목 `faqMeta.title`, lead `faqMeta.description`) → `GuideNav current="faq"` → `section.container`: 목차(`.toc`, 각 그룹 `#`+id) → 그룹마다 `<div className={styles.faqGroup} id={g.id}>` 안에 `SectionHead index en={g.en} title={pick(g.title)}` + `<dl className={styles.faqList}>` 항목 `<div className={styles.faqItem} id={item.id}><dt className={styles.faqQ}>{pick(item.q)}</dt><dd className={styles.faqA}>{pick(item.a)}{links → .faqLinks arrow-link (외부 http는 `<a target=_blank>`, 아니면 `Link to()`)}</dd></div>`. 각 항목은 `Reveal`로 감싼다(delay i*20). 마지막에 statement-band(“여기 없는 질문은 바로 물어보세요” / 문의하기 · 전화).

- [ ] **Step 5: `OrderPage.tsx`**

PageIntro(`en="ORDER & DELIVERY"`, `/images/crayon-warehouse-aisle.jpg`) → `GuideNav current="order"` → 섹션 01 `.flows`: 왼쪽 `id="wholesale"` (flowHead `WHOLESALE`, title 도매·롤 단위, steps), 오른쪽 `id="retail"` (RETAIL, 소량·매장 방문, steps) → 섹션 02 `.policies`: `order(info).policies` 카드; `fromAdmin`이 false면 `.policyNote`에 `d.guide.consultNote`; `id==="retail"`이고 `info.storeUrl`이면 카드 안에 온라인 스토어 arrow-link → 하단 statement-band(문의하기 · 전화 · 카카오(있을 때)).

- [ ] **Step 6: 빌드 후 확인**

Run: `npx tsc --noEmit && npm run build` → 서버(4500) → `for r in /guide /guide/faq /guide/order /en/guide /en/guide/faq /en/guide/order; do curl -s -o /dev/null -w "$r %{http_code}\n" localhost:4500$r; done` → 전부 200. 390/1440에서 스크린샷으로 두 칼럼이 900px 이하에서 한 칼럼으로 접히는지 확인.

---

### Task 7: 원단 가이드 · 커스텀 · 개인정보 페이지, 404, 사이트맵

**Files:**
- Create: `src/components/pages/FabricGuidePage.tsx`, `CustomPage.tsx`, `PrivacyPage.tsx`, `src/app/global-not-found.tsx`
- Create: `src/app/(ko)/guide/fabric/page.tsx`, `(ko)/guide/custom/page.tsx`, `(ko)/privacy/page.tsx`, `(en)/en/guide/fabric/page.tsx`, `(en)/en/guide/custom/page.tsx`, `(en)/en/privacy/page.tsx`
- Modify: `next.config.ts`, `src/app/sitemap.ts`

**Interfaces:**
- Consumes: Task 5 모듈, `guide.module.css` (Task 6)
- Produces: `FabricGuidePage({ lang, d, info })`, `CustomPage({ lang, d, info })`, `PrivacyPage({ lang, d, info })`

- [ ] **Step 1: 라우트 6개** — Task 6 Step 1 골격. 개인정보 라우트는 `privacyMeta` + `PrivacyPage`. 커스텀은 `customMeta`.

- [ ] **Step 2: `FabricGuidePage.tsx`**

PageIntro(`en="FABRIC GUIDE"`, `/images/crayon-print-color.jpg`) → `GuideNav current="fabric"` → 목차(`#materials #terms #quantity #care #methods`) → 01 `materials`: `.table`(열: 소재 / 특징 / 관리 / 링크 arrow-link) — 900px 이하에서는 `.tableWrap`로 가로 스크롤 → 02 `terms`: 용어 `dl`(faqItem 스타일 재사용) + 환산 `.bullets` → 03 `quantity`: lead + rules(번호 목록) + examples(`.bullets`) + 마지막 줄 "정확한 양은 매장에서 함께 계산" → 04 `care`: Section 4개(`.prose` + `.bullets`) → 05 `methods`: 기법 5개 `.policies` 카드(policyEn=기법 영문, title, body, note=fit) → statement-band(커스텀 나염 의뢰 → `/guide/custom`, 문의하기).

- [ ] **Step 3: `CustomPage.tsx`**

PageIntro(`en="CUSTOM PRINTING"`, `/images/crayon-print-bed.jpg`) → `GuideNav current="custom"` → 01 절차 `.steps`(customSteps, 한 칼럼 `max-width: 70ch`) → 02 준비물 `.bullets` → 03 기법 선택 `.table`(기법 / 적합 원단 / 장점 / 수량 성향) → 04 유의사항 `.bullets` → statement-band: `btn btn-invert` → `to("/contact?type=custom")` 라벨 `d.guide.contactCta`, arrow-link 전화, `/studio` 링크(“디자인 개발 과정 보기” = `d.studio` 기존 문구가 있으면 그것).

- [ ] **Step 4: `PrivacyPage.tsx`** (PageIntro 없이)

```tsx
export function PrivacyPage({ lang, info }: Props) {
  const { effective, sections } = privacy(info);
  return (
    <section className="section">
      <div className={`container ${styles.legal}`}>
        <p className={styles.legalMeta}>PRIVACY POLICY · {effective}</p>
        <h1 className="heading" style={{ marginTop: 12 }}>{pick(privacyMeta.title, lang)}</h1>
        <div className={styles.prose} style={{ marginTop: 32 }}>
          {sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2>{pick(s.title, lang)}</h2>
              {s.paragraphs?.map((p) => <p key={p.en}>{pick(p, lang)}</p>)}
              {s.bullets ? <ul className={styles.bullets}>{s.bullets.map((b) => <li key={b.en}>{pick(b, lang)}</li>)}</ul> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
(인라인 style 두 곳은 `guide.module.css`에 `.legalTitle { margin-top: 12px }`, `.legalBody { margin-top: 32px }`로 옮긴다.)

- [ ] **Step 5: 404 — `next.config.ts` + `global-not-found.tsx`**

`next.config.ts`에 `experimental: { globalNotFound: true },` 추가. 읽을 문서: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md` §`global-not-found.js`.

`src/app/global-not-found.tsx`:
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다 | 크레용", robots: { index: false } };

/* Routing-level 404: no layout runs here, so this file owns <html> and its
   styling. Two root layouts (ko/en) mean there is no single layout to lean on. */
export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: '"Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",sans-serif', background: "#fff", color: "#0b0b0b" }}>
        <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "24px 16px" }}>
          <div style={{ maxWidth: 560, width: "100%" }}>
            <p style={{ fontFamily: "ui-monospace,Menlo,monospace", fontSize: 14, letterSpacing: "0.24em", color: "#6a6a63", margin: 0 }}>404 · NOT FOUND</p>
            <h1 style={{ fontSize: "clamp(1.75rem,5vw,2.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.2, margin: "16px 0 0" }}>페이지를 찾을 수 없습니다.</h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4f4f4b", margin: "12px 0 0" }}>주소가 바뀌었거나 없는 페이지입니다. 아래에서 이동해 주세요.</p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#6a6a63", margin: "8px 0 0" }}>This page does not exist. Use the links below.</p>
            <nav style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              {[["/", "홈 · Home"], ["/guide", "이용 안내 · Guide"], ["/contact", "문의 · Contact"]].map(([href, label]) => (
                <a key={href} href={href} style={{ display: "inline-block", padding: "14px 22px", border: "1px solid #0b0b0b", color: "#0b0b0b", textDecoration: "none", fontSize: 15, fontWeight: 700 }}>{label}</a>
              ))}
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: `sitemap.ts`**

```ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nav = (await getDictionary("ko")).nav.map((item) => item.href);
  const extra = ["/guide/faq", "/guide/order", "/guide/fabric", "/guide/custom", "/privacy"];
  const paths = [...new Set(["/", ...nav, ...extra])];
  // …기존 flatMap 그대로
}
```

- [ ] **Step 7: 빌드·확인**

Run: `npx tsc --noEmit && npm run build 2>&1 | grep -E "Compiled|rror|warn|not-found"` → 경고 0. 서버 → 새 라우트 6개 200, `curl -s -o /dev/null -w "%{http_code}" localhost:4500/no-such-page` → **404**이고 본문에 "페이지를 찾을 수 없습니다" 포함, `curl -s localhost:4500/sitemap.xml | grep -c "<url>"` → 30 (15 경로 × 2 언어).

---

### Task 8: 문의 타입 · `parseInquiry` (TDD)

**Files:**
- Create: `src/lib/inquiry.ts`
- Test: `$S/inquiry.test.mjs`

**Interfaces:**
- Produces:
  ```ts
  export const inquiryTypes = ["wholesale", "retail", "custom", "other"] as const;
  export type InquiryType = (typeof inquiryTypes)[number];
  export type InquiryField = "type" | "name" | "phone" | "email" | "company" | "use" | "quantity" | "message" | "consent";
  export type InquiryData = { lang: Locale; type: InquiryType; name: string; phone: string; email: string; company: string; use: string; quantity: string; message: string };
  export type Inquiry = InquiryData & { id: string; createdAt: string; readAt: string | null };
  export type InquiryErrors = Partial<Record<InquiryField, string>>;
  export function parseInquiry(input: Record<string, unknown>, lang: Locale): { ok: true; data: InquiryData } | { ok: false; errors: InquiryErrors };
  export function isInquiryType(v: unknown): v is InquiryType;
  ```

- [ ] **Step 1: 테스트 작성 (실패 확인)**

`$S/inquiry.test.mjs`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { parseInquiry, isInquiryType } = require("./tsout/inquiry.js");

const good = { type: "retail", name: "홍길동", phone: "010-1234-5678", email: "", company: "", use: "아동복", quantity: "5마", message: "면 80수 꽃무늬 원단 소량 구매 문의드립니다.", consent: "on" };

test("valid input passes and is trimmed", () => {
  const r = parseInquiry({ ...good, name: "  홍길동 " }, "ko");
  assert.equal(r.ok, true);
  assert.equal(r.data.name, "홍길동");
  assert.equal(r.data.lang, "ko");
  assert.equal(r.data.email, "");
});
test("required fields", () => {
  const r = parseInquiry({ ...good, name: "", phone: "", message: "", consent: "" }, "ko");
  assert.equal(r.ok, false);
  assert.deepEqual(Object.keys(r.errors).sort(), ["consent", "message", "name", "phone"]);
});
test("message length 10–2000", () => {
  assert.equal(parseInquiry({ ...good, message: "짧아요" }, "ko").ok, false);
  assert.equal(parseInquiry({ ...good, message: "가".repeat(2001) }, "ko").ok, false);
  assert.equal(parseInquiry({ ...good, message: "가".repeat(2000) }, "ko").ok, true);
});
test("phone shape", () => {
  assert.equal(parseInquiry({ ...good, phone: "abc" }, "ko").ok, false);
  assert.equal(parseInquiry({ ...good, phone: "+82 10 1234 5678" }, "ko").ok, true);
  assert.equal(parseInquiry({ ...good, phone: "12345" }, "ko").ok, false);
});
test("optional email must be valid when present", () => {
  assert.equal(parseInquiry({ ...good, email: "nope" }, "ko").ok, false);
  assert.equal(parseInquiry({ ...good, email: "a@b.co" }, "ko").ok, true);
});
test("unknown type rejected, messages localised", () => {
  const ko = parseInquiry({ ...good, type: "hack" }, "ko");
  const en = parseInquiry({ ...good, type: "hack" }, "en");
  assert.equal(ko.ok, false); assert.equal(en.ok, false);
  assert.notEqual(ko.errors.type, en.errors.type);
});
test("isInquiryType", () => {
  assert.equal(isInquiryType("custom"), true);
  assert.equal(isInquiryType("x"), false);
});
```
Run: `cd $S && node --test inquiry.test.mjs` → Expected: FAIL (module not found).

- [ ] **Step 2: `src/lib/inquiry.ts` 구현**

```ts
import type { Locale } from "./i18n";

export const inquiryTypes = ["wholesale", "retail", "custom", "other"] as const;
export type InquiryType = (typeof inquiryTypes)[number];

export function isInquiryType(v: unknown): v is InquiryType {
  return typeof v === "string" && (inquiryTypes as readonly string[]).includes(v);
}

export type InquiryField = "type" | "name" | "phone" | "email" | "company" | "use" | "quantity" | "message" | "consent";
export type InquiryData = { lang: Locale; type: InquiryType; name: string; phone: string; email: string; company: string; use: string; quantity: string; message: string };
export type Inquiry = InquiryData & { id: string; createdAt: string; readAt: string | null };
export type InquiryErrors = Partial<Record<InquiryField, string>>;

const MSG = {
  required: { ko: "필수 항목입니다.", en: "Required." },
  tooLong: { ko: "너무 깁니다.", en: "Too long." },
  phone: { ko: "숫자와 - 로 입력해 주세요. 예) 010-1234-5678", en: "Digits and dashes only, e.g. +82-10-1234-5678" },
  email: { ko: "이메일 형식이 아닙니다.", en: "That is not an email address." },
  message: { ko: "내용을 10자 이상 적어 주세요.", en: "Please write at least 10 characters." },
  type: { ko: "문의 유형을 선택해 주세요.", en: "Please choose an enquiry type." },
  consent: { ko: "개인정보 수집·이용에 동의해 주세요.", en: "Please agree to the privacy terms." },
} as const;

const PHONE = /^[0-9+\-\s()]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Server-side validation for the enquiry form. The browser's `required`
    attributes are a convenience; this is the check that counts. */
export function parseInquiry(input: Record<string, unknown>, lang: Locale): { ok: true; data: InquiryData } | { ok: false; errors: InquiryErrors } {
  const errors: InquiryErrors = {};
  const t = (k: keyof typeof MSG) => MSG[k][lang];
  const str = (field: InquiryField) => (typeof input[field] === "string" ? (input[field] as string).trim() : "");
  const text = (field: InquiryField, max: number, required: boolean) => {
    const v = str(field);
    if (required && !v) errors[field] = t("required");
    else if (v.length > max) errors[field] = t("tooLong");
    return v;
  };

  const typeRaw = str("type");
  const type: InquiryType = isInquiryType(typeRaw) ? typeRaw : "other";
  if (!isInquiryType(typeRaw)) errors.type = t("type");

  const name = text("name", 40, true);
  const phone = text("phone", 20, true);
  if (phone && !errors.phone && (!PHONE.test(phone) || phone.replace(/\D/g, "").length < 7)) errors.phone = t("phone");
  const email = text("email", 100, false);
  if (email && !errors.email && !EMAIL.test(email)) errors.email = t("email");
  const company = text("company", 60, false);
  const use = text("use", 80, false);
  const quantity = text("quantity", 40, false);
  const message = text("message", 2000, true);
  if (message && !errors.message && message.length < 10) errors.message = t("message");
  if (input.consent !== "on" && input.consent !== "true") errors.consent = t("consent");

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { lang, type, name, phone, email, company, use, quantity, message } };
}
```

- [ ] **Step 3: 컴파일·테스트**

Run: `cd "/Users/hyunsu/Documents/WEB/2026 08/크레용" && npx tsc src/lib/inquiry.ts src/lib/server/rateLimit.ts src/lib/siteInfo.ts --outDir $S/tsout --rootDir src/lib --module commonjs --target es2022 --skipLibCheck --esModuleInterop && cd $S && node --test inquiry.test.mjs` → Expected: 7 pass.

---

### Task 9: `inquiryStore` — 저장·목록·읽음·삭제·1년 정리 (TDD)

**Files:**
- Create: `src/lib/server/inquiryStore.ts`
- Test: `$S/inquiryStore.test.mjs`

**Interfaces:**
- Consumes: `readJson/writeJson/listJsonDir/removeJson` (Task 1), `Inquiry/InquiryData` (Task 8)
- Produces:
  ```ts
  export async function saveInquiry(data: InquiryData): Promise<Inquiry>;
  export async function listInquiries(): Promise<Inquiry[]>;       // createdAt desc, purged
  export async function getInquiry(id: string): Promise<Inquiry | null>;
  export async function setInquiryRead(id: string, read: boolean): Promise<Inquiry | null>;
  export async function removeInquiry(id: string): Promise<void>;
  export async function unreadCount(): Promise<number>;
  export function newInquiryId(now?: Date): string;                // "yymmdd-xxxx"
  export const RETENTION_MS: number;                                // 365일
  ```

- [ ] **Step 1: 테스트 작성 (실패 확인)**

`$S/inquiryStore.test.mjs`:
```js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const dir = path.join(process.cwd(), "store-test-data");
fs.rmSync(dir, { recursive: true, force: true });
process.env.DATA_DIR = dir;                 // read by data.ts at import time
const store = require("./tsout/server/inquiryStore.js");

const data = { lang: "ko", type: "retail", name: "홍길동", phone: "010-1234-5678", email: "", company: "", use: "", quantity: "", message: "소량 구매 문의드립니다 열자 이상" };

test("save → list → get, newest first, unread", async () => {
  const a = await store.saveInquiry(data);
  await new Promise((r) => setTimeout(r, 5));
  const b = await store.saveInquiry({ ...data, name: "둘째" });
  assert.match(a.id, /^\d{6}-[0-9a-f]{4}$/);
  assert.equal(a.readAt, null);
  const list = await store.listInquiries();
  assert.deepEqual(list.map((i) => i.id), [b.id, a.id]);
  assert.equal((await store.getInquiry(a.id)).name, "홍길동");
  assert.equal(await store.unreadCount(), 2);
  assert.ok(fs.existsSync(path.join(dir, "inquiries", `${a.id}.json`)));
});
test("read toggle and remove", async () => {
  const [first] = await store.listInquiries();
  const read = await store.setInquiryRead(first.id, true);
  assert.ok(read.readAt);
  assert.equal(await store.unreadCount(), 1);
  assert.equal((await store.setInquiryRead(first.id, false)).readAt, null);
  await store.removeInquiry(first.id);
  assert.equal(await store.getInquiry(first.id), null);
  assert.equal((await store.listInquiries()).length, 1);
});
test("purges files older than the retention window", async () => {
  const old = await store.saveInquiry({ ...data, name: "옛날" });
  const p = path.join(dir, "inquiries", `${old.id}.json`);
  const j = JSON.parse(fs.readFileSync(p, "utf8"));
  j.createdAt = new Date(Date.now() - store.RETENTION_MS - 1000).toISOString();
  fs.writeFileSync(p, JSON.stringify(j));
  const list = await store.listInquiries();
  assert.equal(list.some((i) => i.id === old.id), false);
  assert.equal(fs.existsSync(p), false);
});
test("a corrupt file is skipped, not fatal", async () => {
  fs.writeFileSync(path.join(dir, "inquiries", "999999-zzzz.json"), "{not json");
  const list = await store.listInquiries();
  assert.ok(Array.isArray(list));
  assert.equal(await store.getInquiry("../../etc/passwd"), null);
});
```
Run: `cd $S && node --test inquiryStore.test.mjs` → Expected: FAIL (module not found).

- [ ] **Step 2: `src/lib/server/inquiryStore.ts` 구현**

```ts
import { randomBytes } from "node:crypto";
import { listJsonDir, readJson, removeJson, writeJson } from "./data";
import type { Inquiry, InquiryData } from "@/lib/inquiry";

const DIR = "inquiries";
const ID = /^\d{6}-[0-9a-f]{4}$/;
/** The privacy policy promises one year; the store enforces it. */
export const RETENTION_MS = 365 * 24 * 3_600_000;

/** "260914-3f2a": the date people can read, plus four hex digits. */
export function newInquiryId(now = new Date()) {
  const d = now.toISOString().slice(2, 10).replace(/-/g, "");
  return `${d}-${randomBytes(2).toString("hex")}`;
}

function file(id: string) {
  if (!ID.test(id)) throw new Error(`bad inquiry id: ${id}`);
  return `${DIR}/${id}.json`;
}

async function purge(items: { name: string; value: Inquiry }[]) {
  const cutoff = Date.now() - RETENTION_MS;
  const kept: Inquiry[] = [];
  for (const { name, value } of items) {
    const at = Date.parse(value?.createdAt ?? "");
    if (!value?.id || Number.isNaN(at)) { console.error(`[inquiry] skipping malformed ${name}`); continue; }
    if (at < cutoff) { await removeJson(`${DIR}/${name}`); continue; }
    kept.push(value);
  }
  return kept.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function listInquiries() {
  return purge(await listJsonDir<Inquiry>(DIR));
}

export async function saveInquiry(data: InquiryData): Promise<Inquiry> {
  let id = newInquiryId();
  for (let i = 0; i < 5 && (await readJson(file(id))); i++) id = newInquiryId();
  const inquiry: Inquiry = { ...data, id, createdAt: new Date().toISOString(), readAt: null };
  await writeJson(file(id), inquiry, 0o600);
  void listInquiries().catch(() => {});   // opportunistic purge; never blocks the form
  return inquiry;
}

export async function getInquiry(id: string) {
  if (!ID.test(id)) return null;
  return readJson<Inquiry>(file(id));
}

export async function setInquiryRead(id: string, read: boolean) {
  const current = await getInquiry(id);
  if (!current) return null;
  const updated = { ...current, readAt: read ? new Date().toISOString() : null };
  await writeJson(file(id), updated, 0o600);
  return updated;
}

export async function removeInquiry(id: string) {
  if (!ID.test(id)) return;
  await removeJson(file(id));
}

export async function unreadCount() {
  return (await listInquiries()).filter((i) => !i.readAt).length;
}
```
`@/lib/inquiry` 경로 별칭은 commonjs 컴파일에서 못 푼다 → 테스트 컴파일 명령에 `--baseUrl . --paths` 대신, import를 상대 경로 `"../inquiry"`로 쓴다(타입 전용이라 런타임 영향 없음).

- [ ] **Step 3: 컴파일·테스트**

Run: `cd "/Users/hyunsu/Documents/WEB/2026 08/크레용" && rm -rf $S/tsout && npx tsc src/lib/server/inquiryStore.ts src/lib/server/data.ts src/lib/inquiry.ts --outDir $S/tsout --rootDir src/lib --module commonjs --target es2022 --skipLibCheck --esModuleInterop && cd $S && node --test inquiryStore.test.mjs` → Expected: 4 pass. (`data.ts`의 `/* turbopackIgnore */` 주석은 무해.)

- [ ] **Step 4: 프로젝트 타입체크**

Run: `npx tsc --noEmit` → 통과.

---

### Task 10: 문의 폼 — 사전 문구 · 서버 액션 · `InquiryForm` · 문의 페이지 연결

**Files:**
- Modify: `src/lib/dictionaries/ko.ts`, `en.ts` (`inquiry` 블록, `contact.formHead`, `contact.transit`)
- Create: `src/app/actions/inquiry.ts`, `src/components/InquiryForm.tsx`, `src/components/InquiryForm.module.css`
- Modify: `src/components/pages/ContactPage.tsx`, `src/app/(ko)/contact/page.tsx`, `src/app/(en)/en/contact/page.tsx`

**Interfaces:**
- Consumes: `parseInquiry`, `InquiryType`, `isInquiryType` (Task 8), `saveInquiry` (Task 9), `take` (Task 1), `getDictionary`
- Produces: `submitInquiryAction(prev: InquiryFormState, formData: FormData): Promise<InquiryFormState>`; `InquiryForm({ lang, t, telHref, telLabel, privacyHref, initialType })`; `ContactPage({ lang, d, info, initialType })`

- [ ] **Step 1: 사전 `inquiry` 블록 (ko)**

```ts
    inquiry: {
      en: "INQUIRY",
      title: "문의하기",
      lead: "원단명, 용도, 수량을 아는 만큼만 적어 주세요. 나머지는 통화로 좁혀 드립니다.",
      types: { wholesale: "도매 · 대량", retail: "소량 · 개인", custom: "커스텀 나염", other: "기타" },
      fields: { type: "문의 유형", name: "이름", phone: "연락처", email: "이메일 (선택)", company: "회사 · 브랜드 (선택)", use: "용도 (선택)", quantity: "수량 (선택)", message: "문의 내용", consent: "개인정보 수집·이용에 동의합니다." },
      placeholders: { name: "예) 홍길동", phone: "예) 010-1234-5678", email: "예) name@example.com", company: "예) 브랜드명", use: "예) 아동복, 침구, 블라우스", quantity: "예) 5마, 2롤", message: "예) 면 80수 꽃무늬 원단을 소량으로 구매하고 싶습니다. 참고 이미지가 있습니다." },
      consentLink: "개인정보처리방침 보기",
      submit: "문의 보내기",
      sending: "보내는 중…",
      successTitle: "문의가 접수되었습니다.",
      successBody: "확인 후 연락드리겠습니다. 급하시면 전화 주세요.",
      successRef: "접수번호",
      successAgain: "다른 문의 보내기",
      errorSummary: "입력한 내용을 확인해 주세요.",
      rateLimited: "잠시 후 다시 시도하거나 전화로 문의해 주세요.",
      saveFailed: "저장에 실패했습니다. 전화로 문의해 주세요.",
    },
```
`contact` 블록에 추가: `formHead: { en: "INQUIRY", note: "폼으로 문의", title: "문의를 남겨 주세요." }`, `transit: { label: "오시는 길", lines: ["지하철 1·4호선 동대문역에서 도보", "동대문종합시장 D동 2층 2621호"] }`, `hoursLabel: "영업시간"`. 기존 `visitHead.index`는 01 → 02, `checklistHead` 02 → 03(페이지에서 index 문자열만 바꾼다).

- [ ] **Step 2: 사전 `inquiry` 블록 (en)** — 같은 키. `types: { wholesale: "Wholesale · bulk", retail: "Small quantity · personal", custom: "Custom printing", other: "Other" }`, `fields`/`placeholders` 영문, `consent: "I agree to the collection and use of my details."`, `submit: "Send enquiry"`, `sending: "Sending…"`, `successTitle: "Your enquiry has been received."`, `successBody: "We will get back to you. If it is urgent, please call."`, `successRef: "Reference"`, `successAgain: "Send another"`, `errorSummary: "Please check the highlighted fields."`, `rateLimited: "Please try again shortly, or call us."`, `saveFailed: "We could not save your enquiry. Please call us."`. `contact.formHead/transit/hoursLabel` 영문(`transit.lines: ["A short walk from Dongdaemun Station (Lines 1 & 4)", "Room 2621, 2F, Building D, Dongdaemun Comprehensive Market"]`).

Run: `npx tsc --noEmit` → 통과.

- [ ] **Step 3: 서버 액션 `src/app/actions/inquiry.ts`**

```ts
"use server";

import { headers } from "next/headers";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { parseInquiry, type InquiryErrors } from "@/lib/inquiry";
import { take } from "@/lib/server/rateLimit";
import { newInquiryId, saveInquiry } from "@/lib/server/inquiryStore";

export type InquiryFormState = { status: "idle" | "error" | "success"; message: string; id?: string; errors?: InquiryErrors };

const WINDOW_MS = 10 * 60_000;

function text(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v : "";
}

async function clientIp() {
  const h = await headers();
  return h.get("cf-connecting-ip") ?? h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function submitInquiryAction(_prev: InquiryFormState, formData: FormData): Promise<InquiryFormState> {
  const lang: Locale = text(formData.get("lang")) === "en" ? "en" : "ko";
  const t = (await getDictionary(lang)).inquiry;

  // Honeypot: real people never see this field. Bots get a convincing "thanks".
  if (text(formData.get("website"))) return { status: "success", message: t.successBody, id: newInquiryId() };

  const input = Object.fromEntries(["type", "name", "phone", "email", "company", "use", "quantity", "message", "consent"].map((k) => [k, text(formData.get(k))]));
  const parsed = parseInquiry(input, lang);
  if (!parsed.ok) return { status: "error", message: t.errorSummary, errors: parsed.errors };

  const ip = await clientIp();
  if (!take("inquiry", ip, 3, WINDOW_MS) || !take("inquiry", "all", 40, WINDOW_MS)) {
    return { status: "error", message: t.rateLimited };
  }

  try {
    const saved = await saveInquiry(parsed.data);
    return { status: "success", message: t.successBody, id: saved.id };
  } catch (err) {
    console.error("[inquiry] save failed", err);
    return { status: "error", message: t.saveFailed };
  }
}
```

- [ ] **Step 4: `InquiryForm.tsx` (client)**

```tsx
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitInquiryAction, type InquiryFormState } from "@/app/actions/inquiry";
import { inquiryTypes, type InquiryField, type InquiryType } from "@/lib/inquiry";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./InquiryForm.module.css";

type Props = { lang: Locale; t: Dictionary["inquiry"]; telHref: string; telLabel: string; privacyHref: string; initialType?: InquiryType };
type Values = Record<Exclude<InquiryField, "type" | "consent">, string>;

const initialState: InquiryFormState = { status: "idle", message: "" };
const empty: Values = { name: "", phone: "", email: "", company: "", use: "", quantity: "", message: "" };
const textFields: { name: keyof Values; type?: string; wide?: boolean }[] = [
  { name: "name" }, { name: "phone", type: "tel" }, { name: "email", type: "email" }, { name: "company" }, { name: "use" }, { name: "quantity" },
];

export function InquiryForm({ lang, t, telHref, telLabel, privacyHref, initialType = "retail" }: Props) {
  const [state, formAction, pending] = useActionState(submitInquiryAction, initialState);
  const [values, setValues] = useState<Values>(empty);
  const [type, setType] = useState<InquiryType>(initialType);
  const [consent, setConsent] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  if (state.status === "success" && resetKey === 0) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successEn}>{t.successRef} · {state.id}</p>
        <h3 className={styles.successTitle}>{t.successTitle}</h3>
        <p className={styles.successBody}>{state.message}</p>
        <div className={styles.successActions}>
          <a className="btn btn-ghost" href={telHref}>{telLabel}</a>
          <button className="arrow-link" type="button" onClick={() => { setValues(empty); setConsent(false); setResetKey((k) => k + 1); }}>{t.successAgain}<span aria-hidden="true">→</span></button>
        </div>
      </div>
    );
  }

  const err = (f: InquiryField) => state.status === "error" ? state.errors?.[f] : undefined;

  return (
    <form className={styles.form} action={formAction} noValidate key={resetKey}>
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot — hidden from people, filled by bots. */}
      <div className={styles.trap} aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <fieldset className={styles.types}>
        <legend className={styles.label}>{t.fields.type}</legend>
        <div className={styles.typeRow}>
          {inquiryTypes.map((v) => (
            <label className={type === v ? `${styles.type} ${styles.typeOn}` : styles.type} key={v}>
              <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} />
              <span>{t.types[v]}</span>
            </label>
          ))}
        </div>
        {err("type") ? <p className={styles.error}>{err("type")}</p> : null}
      </fieldset>

      <div className={styles.grid}>
        {textFields.map((f) => (
          <div className={styles.field} key={f.name}>
            <label className={styles.label} htmlFor={`inq-${f.name}`}>{t.fields[f.name]}</label>
            <input className={styles.input} id={`inq-${f.name}`} name={f.name} type={f.type ?? "text"} value={values[f.name]} placeholder={t.placeholders[f.name]}
              aria-invalid={err(f.name) ? true : undefined} aria-describedby={err(f.name) ? `inq-${f.name}-error` : undefined}
              onChange={(e) => setValues((c) => ({ ...c, [f.name]: e.target.value }))} />
            {err(f.name) ? <p className={styles.error} id={`inq-${f.name}-error`}>{err(f.name)}</p> : null}
          </div>
        ))}
        <div className={`${styles.field} ${styles.wide}`}>
          <label className={styles.label} htmlFor="inq-message">{t.fields.message}</label>
          <textarea className={`${styles.input} ${styles.textarea}`} id="inq-message" name="message" rows={6} value={values.message} placeholder={t.placeholders.message}
            aria-invalid={err("message") ? true : undefined} aria-describedby={err("message") ? "inq-message-error" : undefined}
            onChange={(e) => setValues((c) => ({ ...c, message: e.target.value }))} />
          {err("message") ? <p className={styles.error} id="inq-message-error">{err("message")}</p> : null}
        </div>
      </div>

      <div className={styles.consent}>
        <label className={styles.check}>
          <input type="checkbox" name="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={err("consent") ? true : undefined} />
          <span>{t.fields.consent}</span>
        </label>
        <Link className={styles.consentLink} href={privacyHref} target="_blank">{t.consentLink}</Link>
        {err("consent") ? <p className={styles.error}>{err("consent")}</p> : null}
      </div>

      <div className={styles.actions}>
        <p className={`${styles.status} ${state.status === "error" ? styles.statusError : ""}`} role="alert">{state.status === "error" ? state.message : ""}</p>
        <button className="btn btn-invert" type="submit" disabled={pending}>{pending ? t.sending : t.submit}<span aria-hidden="true">→</span></button>
      </div>
    </form>
  );
}
```
`InquiryForm.module.css`: `.form { display: grid; gap: 28px; }`, `.trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }`, `.types legend/.label { font-size: 0.9375rem; font-weight: 700; }`, `.typeRow { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }`, `.type { display: inline-flex; align-items: center; min-height: 48px; padding: 0 18px; border: 1px solid var(--line-strong); cursor: pointer; } .type input { position: absolute; opacity: 0; } .typeOn { border-color: var(--ink); background: var(--ink); color: var(--paper); }`, `.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px 16px; }`, `.wide { grid-column: 1 / -1; }`, `.field { display: flex; flex-direction: column; gap: 6px; }`, `.input { min-height: 54px; padding: 12px 14px; border: 1px solid var(--line-strong); border-radius: 0; background: var(--paper); font: inherit; font-size: 1.0625rem; } .input:focus { outline: 2px solid var(--ink); border-color: var(--ink); } .input[aria-invalid="true"] { border-color: #b3261e; }`, `.textarea { min-height: 160px; resize: vertical; }`, `.error { font-size: 0.9375rem; font-weight: 600; color: #b3261e; }`, `.consent { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; } .check { display: flex; gap: 10px; align-items: center; } .check input { width: 22px; height: 22px; accent-color: #0b0b0b; }`, `.consentLink { font-size: 0.9375rem; color: var(--body); text-decoration: underline; }`, `.actions { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; }`, `.status { margin: 0; color: var(--body); } .statusError { font-weight: 600; color: #b3261e; }`, `.success { padding: clamp(28px, 4vw, 48px); border: 1px solid var(--ink); } .successEn { font-family: var(--font-mono); font-size: 0.875rem; letter-spacing: 0.16em; color: var(--muted); } .successTitle { margin-top: 10px; font-size: 1.5rem; font-weight: 700; } .successBody { margin-top: 8px; color: var(--body); } .successActions { display: flex; flex-wrap: wrap; gap: 12px 24px; align-items: center; margin-top: 24px; } .successActions button { background: none; border: 0; padding: 0; font: inherit; cursor: pointer; }`, `@media (max-width: 700px) { .grid { grid-template-columns: 1fr; } }`.

- [ ] **Step 5: `ContactPage` 연결**

`ContactPage({ lang, d, info, initialType })` 시그니처로 바꾸고, 기존 `section-tight`(전화·이메일 액션) 다음에:
```tsx
      <section className="section" id="inquiry">
        <div className="container">
          <SectionHead index="01" en={d.contact.formHead.en} note={d.contact.formHead.note} title={d.contact.formHead.title} lead={d.inquiry.lead} />
          <Reveal>
            <InquiryForm lang={lang} t={d.inquiry} telHref={d.links.mobile} telLabel={`${d.guide.callCta} · ${d.phone.mobile}`} privacyHref={localePath(lang, "/privacy")} initialType={initialType} />
          </Reveal>
        </div>
      </section>
```
오시는 길 섹션(`index="02"`) `facts` 앞에 영업시간·교통 행 추가: `<div><dt>{d.contact.hoursLabel}</dt><dd><span>{d.phone.hours || d.hours.fallback}</span></dd></div>` 와 `<div><dt>{d.contact.transit.label}</dt><dd>{d.contact.transit.lines.map(...)}</dd></div>`; 지도 링크 옆에 `info.kakaoUrl`/`info.storeUrl` 버튼(값 있을 때). 체크리스트는 `index="03"`.

라우트 `src/app/(ko)/contact/page.tsx`:
```tsx
export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const d = await getDictionary("ko");
  const { type } = await searchParams;
  return <ContactPage lang="ko" d={d} info={await getSiteInfo()} initialType={isInquiryType(type) ? type : undefined} />;
}
```
영문 동일. (`searchParams`는 Promise — `01-app/03-api-reference/03-file-conventions/page.md` 참조.)

- [ ] **Step 6: 빌드·수동 확인**

Run: `npx tsc --noEmit && npm run build` → 서버(`DATA_DIR=$S/t10`, 4500) → Playwright: `/contact?type=custom` 열면 커스텀 라디오가 선택됨; 빈 채로 제출 → `#inq-name-error` 등 표시, `$S/t10/inquiries` 없음; 정상 제출 → 접수번호 표시, 파일 1개 생성; `website` 칸 채워 제출(`page.fill('input[name=website]', 'x')`) → 성공 화면이지만 파일 수 그대로.

---

### Task 11: 관리자 — 셸·탭·뱃지, 문의함 목록·상세·액션

**Files:**
- Create: `src/app/(admin)/admin/AdminShell.tsx`, `LoginScreen.tsx`, `inquiries/page.tsx`, `inquiries/[id]/page.tsx`, `inquiries/actions.ts`, `inquiries/DeleteButton.tsx`
- Modify: `src/app/(admin)/admin/page.tsx`, `admin.module.css`

**Interfaces:**
- Consumes: `listInquiries/getInquiry/setInquiryRead/removeInquiry/unreadCount` (Task 9), `isAdmin`, `logoutAction`
- Produces: `AdminShell({ active: "info" | "inquiries"; children })` (async server component, 뱃지 자체 계산), `LoginScreen()`, `toggleReadAction(formData)`, `deleteInquiryAction(formData)`

- [ ] **Step 1: `LoginScreen.tsx` — 기존 로그인 마크업 이동**

`page.tsx`의 미인증 분기 JSX를 그대로 옮긴 서버 컴포넌트 `export function LoginScreen()`.

- [ ] **Step 2: `AdminShell.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";
import { unreadCount } from "@/lib/server/inquiryStore";
import { logoutAction } from "./actions";
import styles from "./admin.module.css";

export async function AdminShell({ active, children }: { active: "info" | "inquiries"; children: ReactNode }) {
  const unread = await unreadCount().catch(() => 0);
  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <p className={styles.brand}>CRAYON <span>관리자</span></p>
        <nav className={styles.tabs} aria-label="관리자 메뉴">
          <Link className={active === "info" ? `${styles.tab} ${styles.tabOn}` : styles.tab} href="/admin">기본 정보</Link>
          <Link className={active === "inquiries" ? `${styles.tab} ${styles.tabOn}` : styles.tab} href="/admin/inquiries">
            문의함{unread ? <span className={styles.badge}>{unread}</span> : null}
          </Link>
        </nav>
        <div className={styles.barActions}>
          <a className={styles.barButton} href="/" target="_blank" rel="noreferrer">사이트 보기 ↗</a>
          <form action={logoutAction}><button className={styles.barButton} type="submit">로그아웃</button></form>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
```
`page.tsx`는 `if (!(await isAdmin())) return <LoginScreen />;` 후 `<AdminShell active="info">…기존 main 내용…</AdminShell>`.

CSS 추가: `.tabs { display: flex; gap: 4px; } .tab { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; color: rgba(255,255,255,0.72); text-decoration: none; font-size: 15px; border-bottom: 2px solid transparent; } .tabOn { color: #fff; border-bottom-color: #fff; } .badge { min-width: 22px; height: 22px; padding: 0 7px; border-radius: 11px; background: #fff; color: #0b0b0b; font-size: 13px; font-weight: 800; display: inline-grid; place-items: center; }`.

- [ ] **Step 3: `inquiries/actions.ts`**

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/adminAuth";
import { removeInquiry, setInquiryRead } from "@/lib/server/inquiryStore";

function id(formData: FormData) {
  const v = formData.get("id");
  return typeof v === "string" ? v : "";
}

export async function toggleReadAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await setInquiryRead(id(formData), formData.get("read") === "true");
  revalidatePath("/admin", "layout");
}

export async function deleteInquiryAction(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  await removeInquiry(id(formData));
  revalidatePath("/admin", "layout");
  redirect("/admin/inquiries");
}
```

- [ ] **Step 4: 목록 `inquiries/page.tsx`**

```tsx
import Link from "next/link";
import { isAdmin } from "@/lib/server/adminAuth";
import { listInquiries } from "@/lib/server/inquiryStore";
import { AdminShell } from "../AdminShell";
import { LoginScreen } from "../LoginScreen";
import styles from "../admin.module.css";

const TYPE: Record<string, string> = { wholesale: "도매", retail: "소량", custom: "커스텀", other: "기타" };
const fmt = new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Seoul" });

export default async function InquiriesPage() {
  if (!(await isAdmin())) return <LoginScreen />;
  let items: Awaited<ReturnType<typeof listInquiries>> = [];
  let failed = false;
  try { items = await listInquiries(); } catch (err) { console.error("[admin] inquiries", err); failed = true; }
  return (
    <AdminShell active="inquiries">
      <h1 className={styles.pageTitle}>문의함</h1>
      <p className={styles.pageLead}>홈페이지 문의 폼으로 들어온 문의입니다. 접수일로부터 1년이 지나면 자동으로 지워집니다.</p>
      {failed ? <p className={styles.error}>문의를 불러오지 못했습니다. 잠시 후 다시 열어 주세요.</p> : null}
      {!failed && items.length === 0 ? <p className={styles.saved}>아직 문의가 없습니다.</p> : null}
      <ul className={styles.list}>
        {items.map((i) => (
          <li key={i.id}>
            <Link className={i.readAt ? styles.row : `${styles.row} ${styles.rowUnread}`} href={`/admin/inquiries/${i.id}`}>
              <span className={styles.dot} aria-label={i.readAt ? "읽음" : "안 읽음"} />
              <span className={styles.chip}>{TYPE[i.type] ?? i.type}</span>
              <span className={styles.rowName}>{i.name}</span>
              <span className={styles.rowText}>{i.message.split("\n")[0]}</span>
              <span className={styles.rowDate}>{fmt.format(new Date(i.createdAt))}</span>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
```
CSS: `.list { margin-top: 20px; display: grid; gap: 8px; } .row { display: grid; grid-template-columns: 14px auto minmax(0, 140px) 1fr auto; gap: 14px; align-items: center; padding: 16px 18px; background: #fff; border: 1px solid #e3e3df; color: inherit; text-decoration: none; } .row:hover { border-color: #0b0b0b; } .dot { width: 10px; height: 10px; border-radius: 50%; background: #d5d5d0; } .rowUnread .dot { background: #0b0b0b; } .rowUnread .rowName { font-weight: 800; } .chip { font-family: ui-monospace, Menlo, monospace; font-size: 13px; padding: 4px 8px; border: 1px solid #0b0b0b; white-space: nowrap; } .rowName { font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .rowText { color: #4f4f4b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .rowDate { font-size: 14px; color: #6a6a63; white-space: nowrap; } @media (max-width: 600px) { .row { grid-template-columns: 14px auto 1fr; } .rowText, .rowDate { grid-column: 2 / -1; } }`.

- [ ] **Step 5: 상세 `inquiries/[id]/page.tsx` + `DeleteButton.tsx`**

```tsx
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/adminAuth";
import { getInquiry, setInquiryRead } from "@/lib/server/inquiryStore";
import { AdminShell } from "../../AdminShell";
import { LoginScreen } from "../../LoginScreen";
import { DeleteButton } from "../DeleteButton";
import { deleteInquiryAction, toggleReadAction } from "../actions";
import styles from "../../admin.module.css";

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return <LoginScreen />;
  const { id } = await params;
  let item = await getInquiry(id);
  if (!item) redirect("/admin/inquiries");
  // Opening it is reading it. Idempotent, so a double render is harmless.
  if (!item.readAt) item = (await setInquiryRead(id, true)) ?? item;

  const rows: [string, string][] = [
    ["문의 유형", { wholesale: "도매 · 대량", retail: "소량 · 개인", custom: "커스텀 나염", other: "기타" }[item.type]],
    ["이름", item.name], ["연락처", item.phone], ["이메일", item.email || "—"], ["회사 · 브랜드", item.company || "—"],
    ["용도", item.use || "—"], ["수량", item.quantity || "—"], ["언어", item.lang === "en" ? "영문 페이지" : "한국어 페이지"],
    ["접수", new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(item.createdAt))],
  ];

  return (
    <AdminShell active="inquiries">
      <p className={styles.saved}><a href="/admin/inquiries">← 문의함</a></p>
      <h1 className={styles.pageTitle}>{item.name} <span className={styles.chip}>{item.id}</span></h1>
      <section className={styles.card}>
        <dl className={styles.detail}>{rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        <h2 className={styles.cardTitle} style={undefined}>문의 내용</h2>
        <p className={styles.messageBody}>{item.message}</p>
        <div className={styles.inlineActions}>
          <div className={styles.detailLinks}>
            <a className={styles.secondary} href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}>전화 걸기</a>
            {item.email ? <a className={styles.secondary} href={`mailto:${item.email}?subject=${encodeURIComponent(`[크레용] 문의 답변 (${item.id})`)}`}>이메일 답장</a> : null}
          </div>
          <div className={styles.detailLinks}>
            <form action={toggleReadAction}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="read" value={item.readAt ? "false" : "true"} /><button className={styles.secondary} type="submit">{item.readAt ? "안 읽음으로 표시" : "읽음으로 표시"}</button></form>
            <form action={deleteInquiryAction}><input type="hidden" name="id" value={item.id} /><DeleteButton /></form>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
```
(`style={undefined}`는 쓰지 않는다 — `.cardTitle`에 `margin-top: 24px` 변형 클래스 `.cardTitleGap`을 추가해 쓴다.)

`DeleteButton.tsx`:
```tsx
"use client";
import styles from "../admin.module.css";
export function DeleteButton() {
  return (
    <button className={styles.danger} type="submit" onClick={(e) => { if (!confirm("이 문의를 삭제할까요? 되돌릴 수 없습니다.")) e.preventDefault(); }}>삭제</button>
  );
}
```
CSS: `.detail { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 24px; margin-top: 16px; } .detail dt { font-size: 14px; color: #6a6a63; } .detail dd { margin: 2px 0 0; font-weight: 600; } .messageBody { margin-top: 10px; white-space: pre-wrap; line-height: 1.7; } .detailLinks { display: flex; flex-wrap: wrap; gap: 8px; } .danger { min-height: 54px; padding: 0 22px; border: 1px solid #b3261e; background: #fff; color: #b3261e; font: inherit; font-size: 16px; font-weight: 700; cursor: pointer; } .secondary 는 <a>에도 쓰이므로 { display: inline-flex; align-items: center; text-decoration: none; } 추가. @media (max-width: 600px) { .detail { grid-template-columns: 1fr; } }`.

- [ ] **Step 6: 빌드·확인**

Run: `npx tsc --noEmit && npm run build` → 서버 → Task 10에서 만든 문의가 `/admin/inquiries`에 안 읽음 점과 함께 보이고 탭 뱃지 `1`; 상세를 열면 뱃지 사라짐; "안 읽음으로 표시" → 뱃지 `1`; 삭제 → 목록 비고 파일 삭제. `/admin/inquiries/zzz` → `/admin/inquiries`로 이동.

---

### Task 12: 기존 페이지 보강 — 홈 · 디자인 개발

**Files:**
- Modify: `src/lib/dictionaries/ko.ts`, `en.ts` (`home.audience`, `home.guideStrip`, `home.heroSecondary`, `studio.customCta`)
- Modify: `src/components/pages/HomePage.tsx`, `home.module.css`, `StudioPage.tsx`

**Interfaces:**
- Consumes: `audiences`, `guidePages` (Task 4), `pick`, `SiteInfo`(홈은 `getSiteInfo()`를 라우트에서 받아 `info` prop 추가)
- Produces: `HomePage({ lang, d, info })`

- [ ] **Step 1: 사전 추가 (ko / en 동일 키)**

`home`에: `heroSecondary: "소량 구매 안내"` / `"Buying small quantities"`; `sectionTitles.audience: ["FOR", "EVERYONE"]`, `sectionTitles.guide: ["HOW TO", "START"]`; `audienceLead: "브랜드 원단도, 개인 소잉 원단도 같은 매장에서 나갑니다. 필요한 만큼, 맞는 방법으로."` / `"The cloth for a brand and the cloth for a home sewer leave the same shop. As much as you need, the right way."`; `guideStripLabel: "이용 안내"` / `"Guide"`. `studio`에 `customCta: "커스텀 나염 의뢰 안내"` / `"Custom printing — how it works"`.

- [ ] **Step 2: 홈 히어로 보조 링크**

`HomePage.tsx`의 `<Link className={styles.heroCta} …>` 다음에:
```tsx
          <Link className={styles.heroSecondary} href={to("/guide/order#retail")}>
            {t.heroSecondary} <span aria-hidden="true">→</span>
          </Link>
```
`home.module.css`: `.heroSecondary { display: inline-flex; gap: 8px; margin-top: 14px; font-family: var(--font-mono); font-size: 0.9375rem; letter-spacing: 0.08em; color: var(--body); border-bottom: 1px solid var(--line-strong); animation: riseIn 0.5s var(--ease) 0.4s both; } .heroSecondary:hover { color: var(--ink); border-color: var(--ink); }` (히어로 CTA가 grid/flex 안에 있으면 그 컨테이너 규칙에 맞춰 줄바꿈되게 `flex-wrap`/`align-self` 확인).

- [ ] **Step 3: FOR EVERYONE 섹션 (WHY 다음)**

```tsx
      <section className={styles.audience}>
        <SectionTitle lines={t.sectionTitles.audience} />
        <p className={styles.audienceLead}>{t.audienceLead}</p>
        <div className={styles.audienceGrid}>
          {audiences.map((a, i) => (
            <Reveal className={styles.audienceCol} delay={i * 40} key={a.id}>
              <span className={styles.audienceEn}>{a.en}</span>
              <h3 className={styles.audienceTitle}>{pick(a.title, lang)}</h3>
              <ul className={styles.audienceList}>{a.points.map((p) => <li key={p.en}>{pick(p, lang)}</li>)}</ul>
              <div className={styles.audienceLinks}>
                {a.links.map((l) => <Link className={styles.textLink} href={to(l.href)} key={l.href}>{pick(l.label, lang)} <span aria-hidden="true">→</span></Link>)}
                {a.id === "personal" && info.storeUrl ? <a className={styles.textLink} href={info.storeUrl} target="_blank" rel="noreferrer">{d.guide.store} <span aria-hidden="true">↗</span></a> : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
```
CSS: `.audience { padding: clamp(84px, 11vw, 170px) var(--gutter) 0; } .audienceLead { max-width: 44ch; margin-top: 18px; color: var(--body); font-size: 1.0625rem; } .audienceGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: clamp(28px, 4vw, 56px); } .audienceCol { padding: clamp(28px, 3.4vw, 52px); border: 1px solid var(--line-strong); } .audienceCol:first-child { background: var(--ink); color: var(--paper); border-color: var(--ink); } .audienceEn { font-family: var(--font-mono); font-size: 0.8125rem; letter-spacing: 0.24em; opacity: 0.7; } .audienceTitle { margin-top: 12px; font-size: clamp(1.5rem, 2.2vw, 2rem); font-weight: 700; letter-spacing: -0.04em; line-height: 1.2; } .audienceList { margin-top: 20px; display: grid; gap: 10px; } .audienceList li { padding-left: 18px; position: relative; } .audienceList li::before { content: ""; position: absolute; left: 0; top: 0.8em; width: 8px; height: 1px; background: currentColor; } .audienceLinks { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 10px 24px; } .audienceCol:first-child .textLink { color: inherit; border-color: rgba(255,255,255,0.4); } @media (max-width: 900px) { .audienceGrid { grid-template-columns: 1fr; } }` — `.textLink`는 이미 있는 스토리 링크 클래스를 재사용.

- [ ] **Step 4: HOW TO START 스트립 (FABRIC INDEX 앞)**

```tsx
      <section className={styles.guideStrip}>
        <SectionTitle lines={t.sectionTitles.guide} />
        <ul className={styles.guideList}>
          {guidePages.map((g, i) => (
            <li key={g.slug}>
              <Link className={styles.guideRow} href={to(g.href)}>
                <span className={styles.fabricNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.guideName}>{pick(g.title, lang)}</span>
                <span className={styles.guideSummary}>{pick(g.summary, lang)}</span>
                <span className={styles.fabricArrow} aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
```
CSS는 `.fabricIndex/.fabricList/.fabricRow/.fabricName/.fabricGroups`의 규칙을 `.guideStrip/.guideList/.guideRow/.guideName/.guideSummary`로 복제하되 `.fabricPanel` 호버 패널은 넣지 않는다.

- [ ] **Step 5: 홈 라우트에 `info` 전달**

`src/app/(ko)/page.tsx`: `return <HomePage lang="ko" d={await getDictionary("ko")} info={await getSiteInfo()} />;` 영문 동일. `HomePage` props 타입에 `info: SiteInfo` 추가.

- [ ] **Step 6: 디자인 개발 페이지 CTA**

`StudioPage.tsx`의 `globalFoot` Reveal 안, 기존 `globalCta` 링크 뒤에:
```tsx
            <Link className={`arrow-link arrow-link-light ${styles.globalLink}`} href={localePath(lang, "/guide/custom")}>
              {t.customCta}
              <span aria-hidden="true">→</span>
            </Link>
```
(`globalFoot`가 두 링크를 나란히 두도록 `.globalFoot { display: flex; flex-wrap: wrap; gap: 12px 28px; align-items: center; }` 확인·조정.)

- [ ] **Step 7: 빌드·확인**

Run: `npx tsc --noEmit && npm run build` → 서버 → 홈 390/1440 스크린샷: FOR EVERYONE 두 칼럼(왼쪽 먹색), HOW TO START 4행, 히어로 보조 링크. 기존 홈 `reveals n/n` 검사 통과.

---

### Task 13: 검증 — e2e 스위트 · 회귀 · 가독성 · 실측

**Files:**
- Create: `$S/inquiry-e2e.mjs`, `$S/guide-pages.mjs`
- Reuse: `$S/admin-e2e.mjs`, `$S/public-regress.mjs`(라우트 목록 확장), `$S/audit.mjs`(라우트 목록 확장), `$S/header-fit.mjs`

- [ ] **Step 1: `$S/inquiry-e2e.mjs`**

```js
import { chromium } from "playwright";
import fs from "node:fs";
const B = process.env.BASE ?? "http://localhost:4510";
const DATA = process.env.DATA_DIR;
let failures = 0;
const check = (n, ok, d = "") => { if (!ok) failures++; console.log(`${ok ? "PASS" : "FAIL"}  ${n}${d ? `  — ${d}` : ""}`); };
const files = () => fs.existsSync(`${DATA}/inquiries`) ? fs.readdirSync(`${DATA}/inquiries`).filter((f) => f.endsWith(".json")) : [];
const post = (page, btn) => Promise.all([page.waitForResponse((r) => r.request().method() === "POST"), btn.click()]).then(() => page.waitForTimeout(400));

const br = await chromium.launch();
const ctx = await br.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message));

await p.goto(`${B}/contact?type=custom`);
check("?type=custom 으로 유형 선택", await p.isChecked('input[name=type][value=custom]'));

await post(p, p.getByRole("button", { name: "문의 보내기" }));
check("빈 제출 → 칸별 오류", (await p.locator("#inq-name-error").count()) === 1 && (await p.locator("#inq-message-error").count()) === 1);
check("빈 제출은 저장 안 됨", files().length === 0);

await p.fill("#inq-name", "테스트 고객"); await p.fill("#inq-phone", "010-1234-5678"); await p.fill("#inq-email", "nope");
await p.fill("#inq-message", "면 80수 꽃무늬 원단 소량 구매 문의드립니다.");
await p.check('input[name=consent]');
await post(p, p.getByRole("button", { name: "문의 보내기" }));
check("잘못된 이메일 거부·입력 유지", (await p.locator("#inq-email-error").count()) === 1 && (await p.inputValue("#inq-name")) === "테스트 고객");

await p.fill("#inq-email", "");
await post(p, p.getByRole("button", { name: "문의 보내기" }));
await p.getByText("문의가 접수되었습니다").waitFor({ timeout: 10000 });
const ref = (await p.textContent("[role=status]")).match(/\d{6}-[0-9a-f]{4}/)?.[0];
check("접수번호 표시", !!ref, ref);
check("파일 1개 저장", files().length === 1 && fs.readFileSync(`${DATA}/inquiries/${ref}.json`, "utf8").includes("테스트 고객"));

await p.goto(`${B}/en/contact`);
await p.fill("#inq-name", "Bot"); await p.fill("#inq-phone", "010-0000-0000"); await p.fill("#inq-message", "spam spam spam spam spam");
await p.check('input[name=consent]'); await p.fill('input[name=website]', "http://spam");
await post(p, p.getByRole("button", { name: "Send enquiry" }));
check("함정 칸 → 성공 화면이지만 저장 안 됨", (await p.getByText("Your enquiry has been received").count()) === 1 && files().length === 1);

// admin inbox
await p.goto(`${B}/admin`); await p.fill("#password", "1234"); await post(p, p.getByRole("button", { name: "로그인" }));
await p.getByRole("heading", { name: "기본 정보" }).waitFor();
check("탭 뱃지 1", (await p.locator("nav a", { hasText: "문의함" }).textContent()).includes("1"));
await p.click("nav a:has-text('문의함')");
await p.getByRole("heading", { name: "문의함" }).waitFor();
check("목록에 안 읽음 행", (await p.locator('[aria-label="안 읽음"]').count()) === 1);
await p.click(`a[href="/admin/inquiries/${ref}"]`);
await p.getByRole("heading", { name: /테스트 고객/ }).waitFor();
check("상세 열면 읽음 처리 → 뱃지 없음", (await p.locator("nav a", { hasText: "문의함" }).textContent()).trim() === "문의함");
await post(p, p.getByRole("button", { name: "안 읽음으로 표시" }));
check("안 읽음 토글", (await p.locator("nav a", { hasText: "문의함" }).textContent()).includes("1"));
p.once("dialog", (d) => d.accept());
await Promise.all([p.waitForURL(`${B}/admin/inquiries`), p.getByRole("button", { name: "삭제" }).click()]);
check("삭제 → 목록 비고 파일 없음", (await p.getByText("아직 문의가 없습니다").count()) === 1 && files().length === 0);
await p.goto(`${B}/admin/inquiries/260101-zzzz`);
check("없는 id → 목록으로", p.url().endsWith("/admin/inquiries"));

// rate limit: 3 per 10 min per IP (1 real submit already counted)
for (let i = 0; i < 3; i++) {
  await p.goto(`${B}/contact`);
  await p.fill("#inq-name", `반복${i}`); await p.fill("#inq-phone", "010-1234-5678"); await p.fill("#inq-message", "반복 제출 테스트입니다 열자 이상");
  await p.check('input[name=consent]'); await post(p, p.getByRole("button", { name: "문의 보내기" }));
}
check("IP당 4번째 제출은 제한", (await p.getByText("잠시 후 다시 시도").count()) === 1, `files=${files().length}`);

check("콘솔 오류 없음", errs.length === 0, errs[0] ?? "");
await br.close();
console.log(failures ? `\n${failures}건 실패` : "\n전부 통과");
process.exit(failures ? 1 : 0);
```

- [ ] **Step 2: `$S/guide-pages.mjs`** — 새 라우트 12개 + `/privacy` 양 언어를 390/900/1440에서 열어 HTTP 200, `scrollWidth ≤ width`, 깨진 이미지 0, `header`/`footer` 존재, `GuideNav`의 `aria-current="page"`가 정확히 1개, 콘솔 오류 0을 검사. 404: `/no-such`, `/en/no-such` → status 404 + 본문에 "페이지를 찾을 수 없습니다". 사이트맵 `<url>` 30개, `/admin` 없음.

- [ ] **Step 3: 운영 안내 반영 검사 (admin-e2e 확장)**

`$S/admin-e2e.mjs` 끝(잠금 테스트 앞)에 추가: 로그인 상태에서 `#hoursKo`="평일 10–18시", `#hoursEn`="Weekdays 10–18", `#retailKo`="1마 단위로 끊어 드립니다", `#kakaoUrl`="https://pf.kakao.com/_test" 저장 → `/contact`에 "평일 10–18시"와 `a[href="https://pf.kakao.com/_test"]` 존재, `/guide/order`에 "1마 단위로 끊어 드립니다"와 기본 안내문 미표시, `/en/contact`에 "Weekdays 10–18"; 다시 전부 비우고 저장 → `/contact`에 "영업시간은 전화로 확인해 주세요", 카카오 버튼 0개, `/guide/order`에 "상담 시 안내" 포함.

- [ ] **Step 4: 전체 실행**

```bash
cd "/Users/hyunsu/Documents/WEB/2026 08/크레용" && pkill -f next-server; npx tsc --noEmit && npm run build 2>&1 | grep -E "Compiled|rror|warn"
rm -rf $S/v-data && mkdir -p $S/v-data && (DATA_DIR=$S/v-data ADMIN_PASSWORD=1234 PORT=4510 npm run start > $S/v.log 2>&1 &)
until curl -s -o /dev/null http://localhost:4510/; do sleep 1; done
cd $S && BASE=http://localhost:4510 DATA_DIR=$S/v-data node inquiry-e2e.mjs && BASE=http://localhost:4510 node guide-pages.mjs && BASE=http://localhost:4510 node header-fit.mjs
# 로그인 잠금 테스트가 IP를 15분 막으므로 admin-e2e는 서버를 새로 띄워 마지막에 실행
pkill -f next-server; rm -rf $S/a-data && mkdir -p $S/a-data && (DATA_DIR=$S/a-data ADMIN_PASSWORD=1234 PORT=4511 npm run start > $S/a.log 2>&1 &)
until curl -s -o /dev/null http://localhost:4511/; do sleep 1; done
BASE=http://localhost:4511 DATA_DIR=$S/a-data SHOTS=$S/shots node admin-e2e.mjs
```
그리고 `public-regress.mjs`·`audit.mjs`의 라우트 목록에 새 경로를 넣어 실행 → 오버플로 0, 14px 미만 한글 본문 0, AA 미달 0. 스크린샷(홈·허브·FAQ·주문·원단·커스텀·문의 폼·관리자 문의함, 390/1440)을 눈으로 확인.

- [ ] **Step 5: 마무리 상태**

`git status`로 변경 파일 목록을 확인하고 **커밋하지 않는다.** 사용자에게 결과·검증 수치·스크린샷·남은 결정(운영 안내 입력, 알림 이메일)을 보고한다.

---

## Self-review

- **Spec coverage:** §2 경로·메뉴·GuideNav·푸터·사이트맵 → T3, T6, T7. §3 콘텐츠 모듈·사실 원칙 → T4, T5. §4 SiteInfo 확장·표시 규칙 → T1, T2, T6(order 정책 카드), T10(문의 페이지 영업시간·버튼), T12(홈 스토어 링크), T3(푸터 영업시간). §5 문의 모델·저장·폼·속도 제한·관리자 → T8–T11. §6 페이지별 → T6, T7, T10, T12. §8 오류 처리 → T9(손상 파일·정리), T10(저장 실패·제한·함정), T11(목록 실패·없는 id). §9 검증 → T13, 각 태스크 마지막 단계.
- **Placeholder scan:** 콘텐츠 태스크(T4 Step 2, T5)는 항목 목록과 답변 요지를 명시했고 영문은 "충실한 번역" 규칙으로 정의. 코드 스텝은 전부 코드 블록 포함.
- **Type consistency:** `Bi`/`pick` (`@/lib/bi`), `SiteInfo.hours/retail/shipping/sample/kakaoUrl/storeUrl`, `siteInfoFields`, `take/reset`, `InquiryData/Inquiry/InquiryErrors/InquiryField/inquiryTypes/isInquiryType/parseInquiry`, `saveInquiry/listInquiries/getInquiry/setInquiryRead/removeInquiry/unreadCount/newInquiryId/RETENTION_MS`, `InquiryFormState/submitInquiryAction`, `AdminShell/LoginScreen/toggleReadAction/deleteInquiryAction`, `GuideNav(current: GuideSlug)`, 페이지 props `{ lang, d, info }` — 태스크 간 동일 이름으로 사용.
