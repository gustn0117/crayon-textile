"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitInquiryAction, type InquiryFormState } from "@/app/actions/inquiry";
import { inquiryTypes, type InquiryField, type InquiryType } from "@/lib/inquiry";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./InquiryForm.module.css";

type Props = {
  lang: Locale;
  t: Dictionary["inquiry"];
  telHref: string;
  telLabel: string;
  privacyHref: string;
  initialType?: InquiryType;
};

type TextField = Exclude<InquiryField, "type" | "consent" | "message">;
type Values = Record<TextField | "message", string>;

const initialState: InquiryFormState = { status: "idle", message: "" };
const empty: Values = { name: "", phone: "", email: "", company: "", use: "", quantity: "", message: "" };
const textFields: { name: TextField; type?: "text" | "tel" | "email" }[] = [
  { name: "name" },
  { name: "phone", type: "tel" },
  { name: "email", type: "email" },
  { name: "company" },
  { name: "use" },
  { name: "quantity" },
];

export function InquiryForm({ lang, t, telHref, telLabel, privacyHref, initialType = "retail" }: Props) {
  const [state, formAction, pending] = useActionState(submitInquiryAction, initialState);
  const [values, setValues] = useState<Values>(empty);
  const [type, setType] = useState<InquiryType>(initialType);
  const [consent, setConsent] = useState(false);
  // Bumped by "send another": remounts the form and hides the success card
  // until the next successful submit.
  const [round, setRound] = useState(0);
  const [shownRound, setShownRound] = useState(-1);

  if (state.status === "success" && shownRound !== round) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successEn}>
          {t.successRef} · {state.id}
        </p>
        <h3 className={styles.successTitle}>{t.successTitle}</h3>
        <p className={styles.successBody}>{state.message}</p>
        <div className={styles.successActions}>
          <a className="btn btn-ghost" href={telHref}>
            {telLabel}
          </a>
          <button
            className="arrow-link"
            type="button"
            onClick={() => {
              setValues(empty);
              setConsent(false);
              setShownRound(round);
              setRound((r) => r + 1);
            }}
          >
            {t.successAgain}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    );
  }

  const err = (f: InquiryField) => (state.status === "error" ? state.errors?.[f] : undefined);
  const set = (name: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((c) => ({ ...c, [name]: e.target.value }));

  return (
    <form className={styles.form} action={formAction} noValidate key={round}>
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot — off-screen for people, filled in by bots. */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className={styles.types}>
        <legend className={styles.label}>{t.fields.type}</legend>
        <div className={styles.typeRow}>
          {inquiryTypes.map((v) => (
            <label className={type === v ? `${styles.type} ${styles.typeOn}` : styles.type} key={v}>
              <input type="radio" name="type" value={v} checked={type === v} onChange={() => setType(v)} />
              <span>{t.types[v]}</span>
            </label>
          ))}
        </div>
        {err("type") ? <p className={styles.error}>{err("type")}</p> : null}
      </fieldset>

      <div className={styles.grid}>
        {textFields.map((f) => (
          <div className={styles.field} key={f.name}>
            <label className={styles.label} htmlFor={`inq-${f.name}`}>
              {t.fields[f.name]}
            </label>
            <input
              className={styles.input}
              id={`inq-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              value={values[f.name]}
              placeholder={t.placeholders[f.name]}
              autoComplete={f.name === "name" ? "name" : f.name === "phone" ? "tel" : f.name === "email" ? "email" : "off"}
              aria-invalid={err(f.name) ? true : undefined}
              aria-describedby={err(f.name) ? `inq-${f.name}-error` : undefined}
              onChange={set(f.name)}
            />
            {err(f.name) ? (
              <p className={styles.error} id={`inq-${f.name}-error`}>
                {err(f.name)}
              </p>
            ) : null}
          </div>
        ))}

        <div className={`${styles.field} ${styles.wide}`}>
          <label className={styles.label} htmlFor="inq-message">
            {t.fields.message}
          </label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            id="inq-message"
            name="message"
            rows={6}
            value={values.message}
            placeholder={t.placeholders.message}
            aria-invalid={err("message") ? true : undefined}
            aria-describedby={err("message") ? "inq-message-error" : undefined}
            onChange={set("message")}
          />
          {err("message") ? (
            <p className={styles.error} id="inq-message-error">
              {err("message")}
            </p>
          ) : null}
        </div>
      </div>

      <div className={styles.consent}>
        <label className={styles.check}>
          <input
            type="checkbox"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={err("consent") ? true : undefined}
          />
          <span>{t.fields.consent}</span>
        </label>
        <Link className={styles.consentLink} href={privacyHref} target="_blank">
          {t.consentLink}
        </Link>
        {err("consent") ? <p className={`${styles.error} ${styles.wide}`}>{err("consent")}</p> : null}
      </div>

      <div className={styles.actions}>
        <p className={`${styles.status} ${state.status === "error" ? styles.statusError : ""}`} role="alert">
          {state.status === "error" ? state.message : ""}
        </p>
        <button className="btn btn-invert" type="submit" disabled={pending}>
          {pending ? t.sending : t.submit}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
