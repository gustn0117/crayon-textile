import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/adminAuth";
import { getInquiry, setInquiryRead } from "@/lib/server/inquiryStore";
import { AdminShell } from "../../AdminShell";
import { LoginScreen } from "../../LoginScreen";
import { DeleteButton } from "../DeleteButton";
import { deleteInquiryAction, toggleReadAction } from "../actions";
import styles from "../../admin.module.css";

const TYPE: Record<string, string> = {
  wholesale: "도매 · 대량",
  retail: "소량 · 개인",
  custom: "커스텀 나염",
  other: "기타",
};
const fmt = new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Seoul" });

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return <LoginScreen />;

  const { id } = await params;
  let item = await getInquiry(id);
  if (!item) redirect("/admin/inquiries");
  // Opening it is reading it. Idempotent, so a double render is harmless.
  if (!item.readAt) item = (await setInquiryRead(id, true)) ?? item;

  const rows: [string, string][] = [
    ["문의 유형", TYPE[item.type] ?? item.type],
    ["이름", item.name],
    ["연락처", item.phone],
    ["이메일", item.email || "—"],
    ["회사 · 브랜드", item.company || "—"],
    ["용도", item.use || "—"],
    ["수량", item.quantity || "—"],
    ["언어", item.lang === "en" ? "영문 페이지" : "한국어 페이지"],
    ["접수", fmt.format(new Date(item.createdAt))],
  ];

  return (
    <AdminShell active="inquiries">
      <p className={styles.saved}>
        <a className={styles.back} href="/admin/inquiries">
          ← 문의함
        </a>
      </p>
      <h1 className={styles.pageTitle}>
        {item.name} <span className={styles.chip}>{item.id}</span>
      </h1>

      <section className={styles.card}>
        <dl className={styles.detail}>
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className={`${styles.cardTitle} ${styles.cardTitleGap}`}>문의 내용</h2>
        <p className={styles.messageBody}>{item.message}</p>

        <div className={styles.inlineActions}>
          <div className={styles.detailLinks}>
            <a className={styles.secondary} href={`tel:${item.phone.replace(/[^\d+]/g, "")}`}>
              전화 걸기
            </a>
            {item.email ? (
              <a
                className={styles.secondary}
                href={`mailto:${item.email}?subject=${encodeURIComponent(`[크레용] 문의 답변 (${item.id})`)}`}
              >
                이메일 답장
              </a>
            ) : null}
          </div>
          <div className={styles.detailLinks}>
            <form action={toggleReadAction}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="read" value={item.readAt ? "false" : "true"} />
              <button className={styles.secondary} type="submit">
                {item.readAt ? "안 읽음으로 표시" : "읽음으로 표시"}
              </button>
            </form>
            <form action={deleteInquiryAction}>
              <input type="hidden" name="id" value={item.id} />
              <DeleteButton />
            </form>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
