import { isAdmin } from "@/lib/server/adminAuth";
import { getStoredSiteInfo } from "@/lib/server/siteInfoStore";
import { logoutAction } from "./actions";
import { InfoForm } from "./InfoForm";
import { LoginForm } from "./LoginForm";
import { PasswordForm } from "./PasswordForm";
import styles from "./admin.module.css";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <div className={styles.shell}>
        <main className={styles.loginWrap}>
          <div className={styles.loginCard}>
            <p className={styles.brandDark}>CRAYON</p>
            <h1 className={styles.loginTitle}>관리자 로그인</h1>
            <LoginForm />
          </div>
        </main>
      </div>
    );
  }

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
    <div className={styles.shell}>
      <header className={styles.bar}>
        <p className={styles.brand}>
          CRAYON <span>관리자</span>
        </p>
        <div className={styles.barActions}>
          <a className={styles.barButton} href="/" target="_blank" rel="noreferrer">
            사이트 보기 ↗
          </a>
          <form action={logoutAction}>
            <button className={styles.barButton} type="submit">
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <main className={styles.main}>
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
      </main>
    </div>
  );
}
