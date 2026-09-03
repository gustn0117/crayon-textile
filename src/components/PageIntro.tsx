import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  en: string;
  title: ReactNode;
  lead?: ReactNode;
  imageSrc: string;
  imagePosition?: string;
};

export function PageIntro({
  en,
  title,
  lead,
  imageSrc,
  imagePosition = "center",
}: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div className={styles.media} aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          preload
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
        />
        <div className={styles.scrim} />
      </div>

      <div className={`container split ${styles.grid}`}>
        <Reveal className={styles.meta}>
          <p className={styles.en}>{en}</p>
        </Reveal>

        <Reveal className={styles.content} delay={60} mask>
          <h1 className="display">{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
