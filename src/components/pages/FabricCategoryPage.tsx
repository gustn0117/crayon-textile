import type { ReactNode } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { pick, type FabricCategory } from "@/lib/fabrics";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./fabrics.module.css";

/** Hero image per category — reuses what the site already has. */
const heroes: Record<string, { src: string; position: string }> = {
  new: { src: "/images/crayon-printing-table.jpg", position: "center 55%" },
  cotton: { src: "/images/crayon-textile-hero.jpg", position: "center 60%" },
  polyester: { src: "/images/crayon-collection-hero.jpg", position: "center 52%" },
  use: { src: "/images/crayon-store.jpg", position: "center 42%" },
  design: { src: "/images/crayon-design-desk.jpg", position: "center 55%" },
};

export function FabricCategoryPage({
  lang,
  d,
  category,
  extra,
}: {
  lang: Locale;
  d: Dictionary;
  category: FabricCategory;
  extra?: ReactNode;
}) {
  const hero = heroes[category.slug] ?? heroes.cotton;
  const t = d.fabrics;

  return (
    <>
      <PageIntro
        en={pick(category.label, lang)}
        imageSrc={hero.src}
        imagePosition={hero.position}
        title={pick(category.title, lang)}
        lead={pick(category.lead, lang)}
      />

      {/* Jump links double as the second-level menu for this branch. */}
      <nav className={styles.subnav} aria-label={pick(category.nav, lang)}>
        <div className={`container ${styles.subnavInner}`}>
          <span className={styles.subnavLabel}>{t.jumpTo}</span>
          <ul>
            {category.groups.map((group) => (
              <li key={group.slug}>
                <a href={`#${group.slug}`}>{pick(group.name, lang)}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {extra}

      <section className="section">
        <div className="container">
          {category.groups.map((group, i) => (
            <div className={styles.group} id={group.slug} key={group.slug}>
              {/* The group name carries the search term, so it has to be an
                  h2 — the mono label above it is not a heading. */}
              <SectionHead
                index={String(i + 1).padStart(2, "0")}
                en={group.name.en.toUpperCase()}
                title={`${pick(group.name, lang)}${pick(category.headingSuffix, lang)}`}
                note={i === 0 ? pick(category.nav, lang) : undefined}
              />

              <ul className={styles.items}>
                {group.items.map((item, j) => (
                  <li key={pick(item.name, "ko")}>
                    <Reveal className={styles.item} delay={j * 25}>
                      <h3 className={styles.itemName}>{pick(item.name, lang)}</h3>
                      <p className={styles.itemNote}>{pick(item.note, lang)}</p>
                      <Link className={styles.itemLink} href={localePath(lang, "/contact")}>
                        {t.askAbout}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {category.note ? (
            <Reveal>
              <p className={styles.note}>{pick(category.note, lang)}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`container ${styles.closingInner}`}>
          <Reveal>
            <p className={styles.closingLabel}>{t.closingLabel}</p>
            <p className={styles.closingTitle}>{t.closingTitle}</p>
          </Reveal>

          <Reveal className={styles.closingSide} delay={40}>
            <p className={styles.closingNote}>{t.closingNote}</p>
            <div className={styles.closingActions}>
              <Link className="btn btn-invert" href={localePath(lang, "/contact")}>
                {t.closingCta}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="arrow-link arrow-link-light" href={localePath(lang, "/studio")}>
                {t.studioLink}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
