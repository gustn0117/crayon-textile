import { isAdmin } from "@/lib/server/adminAuth";
import { getStoredSiteInfo } from "@/lib/server/siteInfoStore";
import { AdminShell } from "./AdminShell";
import { InfoForm } from "./InfoForm";
import { LoginScreen } from "./LoginScreen";
import { PasswordForm } from "./PasswordForm";
import styles from "./admin.module.css";

export default async function AdminPage() {
  if (!(await isAdmin())) return <LoginScreen />;

  const { info, updatedAt } = await getStoredSiteInfo();
  // Formatted here, not in the browser, so server and client agree on the text.
  const savedAt = updatedAt
    ? new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Seoul",
      }).format(new Date(updatedAt))
    : null;

  return (
    <AdminShell active="info">
      <h1 className={styles.pageTitle}>기본 정보</h1>
      <p className={styles.pageLead}>
        전화번호·이메일·주소를 바꾸면 한국어·영문 사이트 전체에 바로 반영됩니다.
      </p>
      <p className={styles.saved}>
        {savedAt ? `마지막 저장 · ${savedAt}` : "아직 저장한 적이 없습니다. 지금 보이는 값이 현재 사이트에 나오는 값입니다."}
      </p>

      <InfoForm info={info} />

      <section className={styles.card} aria-labelledby="password-title">
        <h2 className={styles.cardTitle} id="password-title">
          비밀번호 변경
        </h2>
        <PasswordForm />
      </section>
    </AdminShell>
  );
}
