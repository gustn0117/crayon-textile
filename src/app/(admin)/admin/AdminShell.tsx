import Link from "next/link";
import type { ReactNode } from "react";
import { unreadCount } from "@/lib/server/inquiryStore";
import { logoutAction } from "./actions";
import styles from "./admin.module.css";

/* The bar and tabs every admin page shares. The unread badge is computed
   here so a page never has to remember to pass it. */
export async function AdminShell({ active, children }: { active: "info" | "inquiries"; children: ReactNode }) {
  const unread = await unreadCount().catch(() => 0);

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <p className={styles.brand}>
          CRAYON <span>관리자</span>
        </p>
        <nav className={styles.tabs} aria-label="관리자 메뉴">
          <Link className={active === "info" ? `${styles.tab} ${styles.tabOn}` : styles.tab} href="/admin">
            기본 정보
          </Link>
          <Link
            className={active === "inquiries" ? `${styles.tab} ${styles.tabOn}` : styles.tab}
            href="/admin/inquiries"
          >
            문의함
            {unread ? <span className={styles.badge}>{unread}</span> : null}
          </Link>
        </nav>
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

      <main className={styles.main}>{children}</main>
    </div>
  );
}
