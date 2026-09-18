import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { guidePages } from "@/content/guide";
import { categoryPath, fabricCategories, pick } from "@/lib/fabrics";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import type { SiteInfo } from "@/lib/siteInfo";
import styles from "./home.module.css";

function Eyebrow({ children, light }: { children: string; light?: boolean }) {
  return <p className={light ? `${styles.eyebrow} ${styles.eyebrowLight}` : styles.eyebrow}>{children}</p>;
}

export function HomePage({ lang, d, info }: { lang: Locale; d: Dictionary; info: SiteInfo }) {
  const t = d.home;
  const c = t.corp;
  const to = (path: string) => localePath(lang, path);

  return (
    <>
      <section className={styles.hero}>
        {/* The name cut from one piece of their own printed cloth, held still
            and centred. Splitting it into letters was only ever needed to make
            them wave; with the wave gone the fabric runs unbroken again. */}
        <div className={styles.heroMark}>
          <div className={styles.heroWord} role="img" aria-label={t.heroWordmark}>
            {t.heroWordmark}
          </div>
          <p className={styles.heroWordKo}>{t.heroWordmarkKo}</p>
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
            <Link className={styles.heroSecondary} href={to("/guide/order#retail")}>
              {t.heroSecondary} <span aria-hidden="true">→</span>
            </Link>
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

      {/* Two doors: B2B and B2C. The first choice a visitor makes. */}
      <section className={styles.split} aria-label="B2B · B2C">
        {(["b2b", "b2c"] as const).map((key, i) => {
          const door = c.split[key];
          return (
            <Link className={styles.door} href={to(door.href)} key={key}>
              <Image src={key === "b2b" ? "/images/crayon-warehouse.jpg" : "/images/crayon-store.jpg"} alt="" fill sizes="50vw" />
              <span className={styles.doorScrim} />
              <Reveal className={styles.doorCopy} delay={i * 40}>
                <span className={styles.doorTag}>{door.tag}</span>
                <span className={styles.eyebrow + " " + styles.eyebrowLight}>{door.en}</span>
                <span className={styles.doorTitle}>{door.title}</span>
                <span className={styles.doorBody}>{door.body}</span>
                <span className={styles.doorCta}>
                  {door.cta} <span aria-hidden="true">→</span>
                </span>
              </Reveal>
            </Link>
          );
        })}
      </section>

      {/* Key visual — one wide photograph, one sentence about the company. */}
      <section className={styles.keyVisual}>
        <Image src="/images/crayon-store-wide.jpg" alt={t.gallery[2].alt} fill preload sizes="100vw" />
        <div className={styles.keyScrim} />
        <Reveal className={styles.keyCopy}>
          <Eyebrow light>{c.keyVisual.en}</Eyebrow>
          <p className={styles.keyTitle}>
            {c.keyVisual.title[0]}
            <br />
            {c.keyVisual.title[1]}
          </p>
        </Reveal>
      </section>

      {/* Business — the three lines, as photo cards. */}
      <section className={styles.block}>
        <div className="container">
          <Reveal>
            <Eyebrow>{c.business.en}</Eyebrow>
            <h2 className={styles.h2}>{c.business.title}</h2>
            <p className={styles.lead}>{c.business.lead}</p>
          </Reveal>
          <div className={styles.cards}>
            {c.business.items.map((item, i) => (
              <Reveal delay={i * 40} key={item.en}>
                <Link className={styles.card} href={to(item.href)}>
                  <span className={styles.cardMedia}>
                    <Image src={`/images/${item.image}.jpg`} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                  </span>
                  <span className={styles.cardBody}>
                    <Eyebrow>{item.en}</Eyebrow>
                    <span className={styles.cardTitle}>{item.title}</span>
                    <span className={styles.cardText}>{item.body}</span>
                    <span className={styles.cardMore}>
                      {c.business.more} <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers — dark band. */}
      <section className={styles.numbers}>
        <div className={`container ${styles.numbersInner}`}>
          <Reveal>
            <Eyebrow light>{c.numbers.en}</Eyebrow>
            <h2 className={styles.h2Light}>{c.numbers.title}</h2>
          </Reveal>
          <div className={styles.stats}>
            {c.numbers.items.map((s, i) => (
              <Reveal className={styles.stat} delay={i * 40} key={s.label}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fabrics — the five branches. */}
      <section className={styles.block}>
        <div className="container">
          <Reveal className={styles.rowHead}>
            <div>
              <Eyebrow>{c.fabrics.en}</Eyebrow>
              <h2 className={styles.h2}>{c.fabrics.title}</h2>
            </div>
            <Link className="btn btn-ghost" href={to("/fabrics/cotton")}>
              {c.fabrics.cta} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className={styles.products}>
            {fabricCategories.map((cat, i) => (
              <Reveal delay={i * 30} key={cat.slug}>
                <Link className={styles.product} href={to(categoryPath(cat))}>
                  {/* Photograph slot: set `image` on the category in lib/fabrics.ts. */}
                  {cat.image ? (
                    <span className={styles.productMedia}>
                      <Image src={cat.image} alt="" fill sizes="(max-width: 900px) 50vw, 20vw" />
                    </span>
                  ) : (
                    <span className={`${styles.productMedia} hatch`} />
                  )}
                  <span className={styles.productName}>{pick(cat.nav, lang)}</span>
                  <span className={styles.productLabel}>{cat.label.en}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vision — a full-width photograph with the studio's promise. */}
      <section className={styles.vision}>
        <Image src="/images/crayon-designroom-desks.jpg" alt="" fill sizes="100vw" />
        <div className={styles.visionScrim} />
        <Reveal className={styles.visionCopy}>
          <Eyebrow light>{c.vision.en}</Eyebrow>
          <p className={styles.visionTitle}>
            {c.vision.title[0]}
            <br />
            {c.vision.title[1]}
          </p>
          <p className={styles.visionBody}>{c.vision.body}</p>
          <Link className="btn btn-invert" href={to("/studio")}>
            {c.vision.cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* Guide — four quiet rows. */}
      <section className={styles.block}>
        <div className={`container ${styles.twoCol}`}>
          <Reveal>
            <Eyebrow>{c.guide.en}</Eyebrow>
            <h2 className={styles.h2}>{c.guide.title}</h2>
            <p className={styles.lead}>{c.guide.lead}</p>
          </Reveal>
          <Reveal className={styles.links} delay={40}>
            {guidePages.map((g) => (
              <Link className={styles.linkRow} href={to(g.href)} key={g.slug}>
                <span>
                  {pick(g.title, lang)}
                  <span className={styles.linkNote}>{pick(g.summary, lang)}</span>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Contact band. */}
      <section className={styles.contactBand}>
        <div className={`container ${styles.contactInner}`}>
          <Reveal>
            <Eyebrow>{c.contact.en}</Eyebrow>
            <p className={styles.contactTitle}>{c.contact.title}</p>
          </Reveal>
          <Reveal className={styles.contactActions} delay={40}>
            <Link className="btn btn-solid" href={to("/contact")}>
              {c.contact.cta} <span aria-hidden="true">→</span>
            </Link>
            <a className="btn btn-ghost" href={d.links.tel}>
              {d.phone.tel}
            </a>
            {info.kakaoUrl ? (
              <a className="btn btn-ghost" href={info.kakaoUrl} target="_blank" rel="noreferrer">
                {d.guide.kakao}
              </a>
            ) : null}
          </Reveal>
        </div>
      </section>
    </>
  );
}
