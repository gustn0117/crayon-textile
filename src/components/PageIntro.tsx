import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
};

export function PageIntro({ en, title, lead }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div className={`container split ${styles.grid}`}>
        <Reveal className={styles.meta}>
          <p className={styles.en}>{en}</p>
        </Reveal>

        <Reveal className={styles.content} delay={60}>
          <h1 className="display">{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
