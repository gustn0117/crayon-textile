"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./SiteHeader.module.css";

/** The current path with any /en prefix removed, so the switcher can rebuild it. */
function basePath(pathname: string) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

export function SiteHeader({ lang, d }: { lang: Locale; d: Dictionary }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const home = localePath(lang, "/");
  const otherLang: Locale = lang === "ko" ? "en" : "ko";
  const otherHref = localePath(otherLang, basePath(pathname));

  // Only the home page has a full-bleed hero for the header to float over.
  const overHero = pathname === home && !isScrolled && !isOpen;

  useEffect(() => {
    if (pathname !== home) return;
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, home]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={overHero ? `${styles.header} ${styles.overHero}` : styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href={home}>
          <Image
            className={styles.logo}
            src="/images/logo-crayon.png"
            alt={d.brand.ko}
            width={760}
            height={341}
            priority
          />
          <span className={styles.brandEn}>{d.brand.en}</span>
        </Link>

        <nav className={styles.nav} aria-label={d.header.navAria}>
          {d.nav.map((item) => {
            const href = localePath(lang, item.href);
            const isActive = pathname === href;
            return (
              <Link
                key={item.href}
                href={href}
                className={isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
                aria-current={isActive ? "page" : undefined}
              >
                {item.en}
              </Link>
            );
          })}
        </nav>

        <a className={styles.tel} href={contact.telHref}>
          T. {d.phone.tel}
        </a>

        {/* Switching language crosses root layouts, so this is a plain anchor —
            a client transition cannot swap <html lang>. */}
        <a
          className={styles.lang}
          href={otherHref}
          hrefLang={otherLang}
          aria-label={d.header.langAria}
          title={d.header.langOtherTitle}
        >
          {d.header.langOther}
        </a>

        <button
          className={isOpen ? `${styles.toggle} ${styles.isOpen}` : styles.toggle}
          type="button"
          aria-label={isOpen ? d.header.close : d.header.open}
          aria-expanded={isOpen}
          aria-controls="site-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={isOpen ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        id="site-menu"
        hidden={!isOpen}
      >
        <nav className={styles.panelNav} aria-label={d.header.fullNavAria}>
          <Link className={styles.panelLink} href={home}>
            <span className={styles.panelEn}>INDEX</span>
            <span className={styles.panelKo}>{d.header.indexLabel}</span>
          </Link>
          {d.nav.map((item) => (
            <Link
              key={item.href}
              className={styles.panelLink}
              href={localePath(lang, item.href)}
            >
              <span className={styles.panelEn}>{item.en}</span>
              <span className={styles.panelKo}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.panelMeta}>
          <a className={styles.panelLang} href={otherHref} hrefLang={otherLang}>
            {d.header.langOtherTitle}
          </a>
          <a href={contact.mobileHref}>{d.phone.mobile}</a>
          <p>{d.phone.addressShort}</p>
        </div>
      </div>
    </header>
  );
}
