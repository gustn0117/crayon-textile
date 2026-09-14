import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | 크레용",
  robots: { index: false, follow: false },
};

/* Routing-level 404: no layout runs here, so this file owns <html> and its
   styling. Two root layouts (ko/en) mean there is no single layout to lean on,
   and no locale to know — so both languages, Korean first. */
const sans = '"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';
const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

const links = [
  ["/", "홈 · Home"],
  ["/guide", "이용 안내 · Guide"],
  ["/contact", "문의 · Contact"],
];

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: sans, background: "#ffffff", color: "#0b0b0b" }}>
        <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "24px 16px" }}>
          <div style={{ width: "100%", maxWidth: 560 }}>
            <p style={{ margin: 0, fontFamily: mono, fontSize: 14, letterSpacing: "0.24em", color: "#6a6a63" }}>
              404 · NOT FOUND
            </p>
            <h1
              style={{
                margin: "16px 0 0",
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.2,
              }}
            >
              페이지를 찾을 수 없습니다.
            </h1>
            <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.7, color: "#4f4f4b" }}>
              주소가 바뀌었거나 없는 페이지입니다. 아래에서 이동해 주세요.
            </p>
            <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#6a6a63" }}>
              This page does not exist. Use the links below.
            </p>
            <nav style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    display: "inline-block",
                    padding: "14px 22px",
                    border: "1px solid #0b0b0b",
                    color: "#0b0b0b",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
