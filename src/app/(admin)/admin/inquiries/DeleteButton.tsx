"use client";

import styles from "../admin.module.css";

/* A confirm() before the form posts — deleting is the one action here that
   cannot be undone. */
export function DeleteButton() {
  return (
    <button
      className={styles.danger}
      type="submit"
      onClick={(e) => {
        if (!confirm("이 문의를 삭제할까요? 되돌릴 수 없습니다.")) e.preventDefault();
      }}
    >
      삭제
    </button>
  );
}
