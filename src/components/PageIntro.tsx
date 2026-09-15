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

/* Corporate banner: the page's photograph as a wide band, the title set on
   it bottom-left, the lead beneath the band on paper so it stays legible. */
export function PageIntro({ en, title, lead, imageSrc, imagePosition = "center" }: PageIntroProps) {
  return (
    <section className={styles.intro}>
      <div className={styles.banner}>
        <Image src={imageSrc} alt="" fill preload sizes="100vw" style={{ objectPosition: imagePosition }} />
        <div className={styles.scrim} />
        <Reveal className={styles.bannerCopy}>
          <p className={styles.en}>{en}</p>
          <h1 className={styles.title}>{title}</h1>
        </Reveal>
      </div>
      {lead ? (
        <div className={`container ${styles.leadWrap}`}>
          <Reveal>
            <p className={styles.lead}>{lead}</p>
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
