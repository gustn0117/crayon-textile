import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { destinations } from "@/lib/site";
import { categoryPath, fabricCategories, pick } from "@/lib/fabrics";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./home.module.css";

const chipSwatch = [
  "swatch-women",
  "swatch-kids",
  "swatch-casual",
  "swatch-home",
  "swatch-women",
];

/** Every second-level fabric term, run twice so the ticker loops seamlessly. */
function tickerTerms(lang: Locale) {
  return fabricCategories.flatMap((c) => c.groups.map((g) => pick(g.name, lang)));
}

export function HomePage({ lang, d }: { lang: Locale; d: Dictionary }) {
  const t = d.home;
  const to = (path: string) => localePath(lang, path);

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

      {/* The figures ride up over the photograph rather than sitting under it,
          so the page opens on an overlap instead of a stack. */}
      <section className={styles.figuresWrap} aria-label={t.figuresAria}>
        <div className={styles.figures}>
          {t.figures.map((item) => (
            <div className={styles.figure} key={item.unit}>
              <p className={styles.figureValue}>{item.value}</p>
              <p className={styles.figureUnit}>{item.unit}</p>
              <p className={styles.figureNote}>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>{tickerTerms(lang).join(" ")}</span>
          <span>{tickerTerms(lang).join(" ")}</span>
        </div>
      </div>

      {/* 01 — a narrow column of type against a large image dropped below it. */}
      <section className={styles.storyOne}>
        <div className={styles.oneCopy}>
          <p className={styles.index}>{t.stories[0].index}</p>
          <Reveal mask>
            <h2>
              {t.stories[0].title[0]}
              <br />
              {t.stories[0].title[1]}
            </h2>
          </Reveal>
          <p className={styles.body}>{t.aboutBody}</p>
          <Link className={styles.textLink} href={to("/about")}>
            {t.stories[0].link} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className={styles.oneMedia}>
          <Image
            src="/images/crayon-design-desk.jpg"
            alt={t.aboutVisualAlt}
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 66vw"
          />
          <figcaption>{t.stories[0].caption}</figcaption>
        </figure>
      </section>

      {/* 02 — the photograph runs off the right edge and the type sits on it. */}
      <section className={styles.storyTwo}>
        <figure className={styles.twoMedia}>
          <Image
            src="/images/crayon-store.jpg"
            alt={t.gallery[2].alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 84vw"
          />
        </figure>

        <div className={styles.twoCard}>
          <p className={styles.index}>{t.stories[1].index}</p>
          <Reveal mask>
            <h2>
              {t.stories[1].title[0]}
              <br />
              {t.stories[1].title[1]}
            </h2>
          </Reveal>
          <p className={styles.body}>{t.businessHead.lead}</p>
          <Link className={styles.textLink} href={to("/fabrics/cotton")}>
            {t.stories[1].link} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <p className={styles.twoCaption}>{t.stories[1].caption}</p>
      </section>

      {/* 03 — the type pins while the photograph travels past it. */}
      <section className={styles.storyThree}>
        <div className={styles.threeCopy}>
          <p className={styles.index}>{t.stories[2].index}</p>
          <Reveal mask>
            <h2>
              {t.stories[2].title[0]}
              <br />
              {t.stories[2].title[1]}
            </h2>
          </Reveal>
          <p className={styles.body}>{t.stories[2].body}</p>
          <Link className={styles.textLink} href={to("/studio")}>
            {t.stories[2].link} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className={styles.threeMedia}>
          <Image
            src="/images/crayon-designroom-team.jpg"
            alt={t.gallery[0].alt}
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <figcaption>{t.stories[2].caption}</figcaption>
        </figure>
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
                <span
                  className={`${styles.fabricPanel} ${chipSwatch[i % chipSwatch.length]}`}
                  aria-hidden="true"
                />
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
