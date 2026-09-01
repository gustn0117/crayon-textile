import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { destinations } from "@/lib/site";
import { categoryPath, fabricCategories, pick } from "@/lib/fabrics";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./home.module.css";

/** Every second-level fabric term, run twice so the ticker loops seamlessly. */
function tickerTerms(lang: Locale) {
  return fabricCategories.flatMap((c) => c.groups.map((g) => pick(g.name, lang)));
}

/** The three story rows, paired with the photography each one is about. */
const chipSwatch = [
  "swatch-women",
  "swatch-kids",
  "swatch-casual",
  "swatch-home",
  "swatch-women",
];

const storyMedia = [
  { src: "/images/crayon-design-desk.jpg", altKey: 1 as const },
  { src: "/images/crayon-store.jpg", altKey: 2 as const },
  { src: "/images/crayon-designroom-team.jpg", altKey: 0 as const },
];

export function HomePage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.home;
  const to = (path: string) => localePath(lang, path);

  const storyBody = [t.aboutBody, t.businessHead.lead, t.stories[2].body ?? ""];
  const storyHref = ["/about", "/fabrics/cotton", "/studio"];

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroWord} aria-label={t.heroWordmark}>
          {t.heroWordmark}
        </div>

        <p className={styles.heroMaterials}>
          {t.materials.map((m) => (
            <span key={m.en}>{m.en}</span>
          ))}
        </p>

        <div className={styles.heroRule} />

        <div className={styles.heroBottom}>
          <div className={styles.heroCopy}>
            <h1>
              {t.heroTagline[0]}
              <br />
              {t.heroTagline[1]}
            </h1>
            <p>{t.heroSub}</p>
          </div>

          <Link className={styles.heroCta} href={to("/contact")}>
            <span>{t.heroCta}</span>
            <span aria-hidden="true">→</span>
          </Link>

          <p className={styles.heroMeta}>
            {t.heroMeta.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
      </section>

      <figure className={styles.heroImage}>
        <Image
          src="/images/crayon-textile-hero.jpg"
          alt={t.aboutVisualAlt}
          fill
          preload
          sizes="100vw"
        />
      </figure>

      {/* Four numbers, one hairline row — the quickest read of the company. */}
      <section className={styles.figures} aria-label={t.figuresAria}>
        {t.figures.map((item) => (
          <div className={styles.figure} key={item.unit}>
            <p className={styles.figureValue}>{item.value}</p>
            <p className={styles.figureUnit}>{item.unit}</p>
            <p className={styles.figureNote}>{item.note}</p>
          </div>
        ))}
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>{tickerTerms(lang).join(" ")}</span>
          <span>{tickerTerms(lang).join(" ")}</span>
        </div>
      </div>

      <section className={styles.editorial}>
        {storyMedia.map((media, i) => (
          <div
            className={i % 2 ? `${styles.storyGrid} ${styles.storyReverse}` : styles.storyGrid}
            key={media.src}
          >
            {i % 2 ? (
              <figure className={styles.storyMedia}>
                <Image
                  src={media.src}
                  alt={i === 0 ? t.aboutVisualAlt : t.gallery[media.altKey].alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, 58vw"
                />
                <figcaption>{t.stories[i].caption}</figcaption>
              </figure>
            ) : null}

            <div className={styles.storyCopy}>
              <p className={styles.index}>{t.stories[i].index}</p>
              <Reveal mask>
                <h2>
                  {t.stories[i].title[0]}
                  <br />
                  {t.stories[i].title[1]}
                </h2>
              </Reveal>
              <p>{storyBody[i]}</p>
              <Link className={styles.textLink} href={to(storyHref[i])}>
                {t.stories[i].link} <span aria-hidden="true">→</span>
              </Link>
            </div>

            {i % 2 ? null : (
              <figure className={styles.storyMedia}>
                <Image
                  src={media.src}
                  alt={i === 0 ? t.aboutVisualAlt : t.gallery[media.altKey].alt}
                  fill
                  loading="eager"
                  sizes="(max-width: 760px) 100vw, 58vw"
                />
                <figcaption>{t.stories[i].caption}</figcaption>
              </figure>
            )}
          </div>
        ))}
      </section>

      {/* The fabric branches, as an index. These are the pages search traffic
          lands on, so the home page has to link every one of them. */}
      <section className={styles.fabricIndex}>
        <Reveal className={styles.fabricHead} mask>
          <p className={styles.indexLabel}>{t.indexLabel}</p>
          <h2>{t.indexTitle}</h2>
        </Reveal>

        <ul className={styles.fabricList}>
          {fabricCategories.map((c, i) => (
            <li key={c.slug}>
              <Link className={styles.fabricRow} href={to(categoryPath(c))}>
                <span className={styles.fabricNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`${styles.fabricChip} ${chipSwatch[i % chipSwatch.length]}`}
                  aria-hidden="true"
                />
                <span className={styles.fabricName}>{pick(c.nav, lang)}</span>
                <span className={styles.fabricGroups}>
                  {c.groups
                    .slice(0, 5)
                    .map((g) => pick(g.name, lang))
                    .join(" · ")}
                </span>
                <span className={styles.fabricArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.route}>
        <p className={styles.routeLabel}>{t.routeLabel}</p>
        <p className={styles.routeOrigin}>SEOUL</p>
        <ul className={styles.routeList}>
          {destinations.map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>
      </section>

      <section className={styles.closing}>
        <p>{t.closingEyebrow}</p>
        <h2>{t.closingHeadline}</h2>
        <Link href={to("/contact")}>
          {t.closingAction}
          <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
