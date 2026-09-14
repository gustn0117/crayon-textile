import { LoginForm } from "./LoginForm";
import styles from "./admin.module.css";

/* Rendered by every admin page in place of its content when there is no
   session — the URL stays put, so a login lands you where you were going. */
export function LoginScreen() {
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
