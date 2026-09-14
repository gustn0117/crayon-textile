"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "./actions";
import styles from "./admin.module.css";

const initialState: FormState = { status: "idle", message: "" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const failed = state.status === "error";

  return (
    <form className={styles.loginForm} action={formAction}>
      <label className={styles.label} htmlFor="password">
        비밀번호
      </label>
      <input
        className={styles.input}
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        autoFocus
        required
        aria-invalid={failed || undefined}
        aria-describedby={failed ? "login-error" : undefined}
      />
      {failed ? (
        <p className={styles.error} id="login-error" role="alert">
          {state.message}
        </p>
      ) : null}
      <button className={styles.primary} type="submit" disabled={pending}>
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
