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
  try {
    items = await listInquiries();
  } catch (err) {
    console.error("[admin] inquiries", err);
    failed = true;
  }

  return (
    <AdminShell active="inquiries">
      <h1 className={styles.pageTitle}>문의함</h1>
      <p className={styles.pageLead}>
        홈페이지 문의 폼으로 들어온 문의입니다. 접수일로부터 1년이 지나면 자동으로 지워집니다.
      </p>

      {failed ? <p className={styles.error}>문의를 불러오지 못했습니다. 잠시 후 다시 열어 주세요.</p> : null}
      {!failed && items.length === 0 ? <p className={styles.saved}>아직 문의가 없습니다.</p> : null}

      <ul className={styles.list}>
        {items.map((i) => (
          <li key={i.id}>
            <Link className={i.readAt ? styles.row : `${styles.row} ${styles.rowUnread}`} href={`/admin/inquiries/${i.id}`}>
              <span className={styles.dot} role="img" aria-label={i.readAt ? "읽음" : "안 읽음"} />
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
