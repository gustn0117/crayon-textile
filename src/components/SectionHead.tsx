import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  /** Reading order within the page — the sections really are a sequence. */
  index: string;
  en: string;
  note?: string;
  title?: ReactNode;
  lead?: ReactNode;
  light?: boolean;
};

export function SectionHead({ index, en, note, title, lead, light }: SectionHeadProps) {
  return (
    <div className={light ? `${styles.head} ${styles.light}` : styles.head}>
      <Reveal className={styles.meta}>
        <span className={styles.index}>{index}</span>
        <span className={styles.en}>{en}</span>
        {note ? <span className={styles.note}>{note}</span> : null}
      </Reveal>

      <Reveal className={styles.body} delay={60} mask>
        {title ? <h2 className={`heading ${styles.title}`}>{title}</h2> : null}
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </Reveal>
    </div>
  );
}
