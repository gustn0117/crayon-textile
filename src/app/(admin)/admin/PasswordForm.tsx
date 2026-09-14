"use client";

import { useActionState } from "react";
import { passwordAction, type FormState } from "./actions";
import styles from "./admin.module.css";

const initialState: FormState = { status: "idle", message: "" };

const fields = [
  { name: "current", label: "현재 비밀번호", autoComplete: "current-password", wide: true },
  { name: "next", label: "새 비밀번호", autoComplete: "new-password", wide: false },
  { name: "confirm", label: "새 비밀번호 확인", autoComplete: "new-password", wide: false },
];

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(passwordAction, initialState);
  const tone =
    state.status === "error" ? styles.statusError : state.status === "success" ? styles.statusSuccess : "";

  return (
    <form action={formAction}>
      <p className={styles.cardNote}>
        4자 이상. 숫자만 쓰기보다 글자와 숫자를 섞으면 훨씬 안전합니다.
      </p>

      <div className={styles.fields}>
        {fields.map((field) => (
          <div className={field.wide ? `${styles.field} ${styles.wide}` : styles.field} key={field.name}>
            <label className={styles.label} htmlFor={`pw-${field.name}`}>
              {field.label}
            </label>
            <input
              className={styles.input}
              id={`pw-${field.name}`}
              name={field.name}
              type="password"
              autoComplete={field.autoComplete}
              required
            />
          </div>
        ))}
      </div>

      <div className={styles.inlineActions}>
        <p className={`${styles.status} ${tone}`} role="status">
          {pending ? "변경 중입니다…" : state.message}
        </p>
        <button className={styles.secondary} type="submit" disabled={pending}>
          {pending ? "변경 중…" : "비밀번호 변경"}
        </button>
      </div>
    </form>
  );
}
