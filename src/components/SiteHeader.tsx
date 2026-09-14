"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import styles from "./SiteHeader.module.css";

/** The current path with any /en prefix removed, so the switcher can rebuild it. */
function basePath(pathname: string) {
  if (pathname === "/en") return "/";
  return pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
}

/** The five fabric pages fold into one "원단" menu; everything else stays top-level. */
function isFabricHref(href: string) {
  return href === "/new" || href.startsWith("/fabrics");
}

export function SiteHeader({ lang, d }: { lang: Locale; d: Dictionary }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [fabricsOpen, setFabricsOpen] = useState(false);
  // Whether the dropdown was opened by hover. A tap on a touch screen fires
  // mouseenter and then click; without this the click would close what the
  // hover had just opened.
  const hoverOpened = useRef(false);
  const closeTimer = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const home = localePath(lang, "/");
  const otherLang: Locale = lang === "ko" ? "en" : "ko";
  const otherHref = localePath(otherLang, basePath(pathname));

  const fabricItems = d.nav.filter((item) => isFabricHref(item.href));
  const topItems = d.nav.filter((item) => !isFabricHref(item.href));
  const fabricsActive = fabricItems.some((item) => pathname === localePath(lang, item.href));

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
    setFabricsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      setFabricsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!fabricsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setFabricsOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [fabricsOpen]);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openByHover = () => {
    clearCloseTimer();
    hoverOpened.current = true;
    setFabricsOpen(true);
  };
  const closeAfterHover = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setFabricsOpen(false), 160);
  };
  const toggleByClick = () => {
    clearCloseTimer();
    if (fabricsOpen && !hoverOpened.current) {
      setFabricsOpen(false);
      return;
    }
    hoverOpened.current = false;
    setFabricsOpen(true);
  };

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
        </Link>

        <nav className={styles.nav} aria-label={d.header.navAria}>
          <div
            className={styles.menu}
            ref={menuRef}
            onMouseEnter={openByHover}
            onMouseLeave={closeAfterHover}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFabricsOpen(false);
            }}
          >
            <button
              className={[
                styles.navLink,
                styles.menuButton,
                fabricsActive ? styles.isActive : "",
                fabricsOpen ? styles.menuOpen : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              aria-haspopup="true"
              aria-expanded={fabricsOpen}
              aria-controls="fabrics-menu"
              onClick={toggleByClick}
            >
              {d.header.fabrics}
              <span className={fabricsOpen ? `${styles.caret} ${styles.caretUp}` : styles.caret} aria-hidden="true" />
            </button>

            <div className={styles.dropdown} id="fabrics-menu" hidden={!fabricsOpen}>
              {fabricItems.map((item) => {
                const href = localePath(lang, item.href);
                const isActive = pathname === href;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={isActive ? `${styles.dropLink} ${styles.dropActive}` : styles.dropLink}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={styles.dropKo}>{item.label}</span>
                    <span className={styles.dropEn}>{item.en}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {topItems.map((item) => {
            const href = localePath(lang, item.href);
            const isActive = pathname === href;
            return (
              <Link
                key={item.href}
                href={href}
                className={isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

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
          <a href={d.links.mobile}>{d.phone.mobile}</a>
          <p>{d.phone.addressShort}</p>
        </div>
      </div>
    </header>
  );
}
