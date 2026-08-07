"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contact, navigation } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Only the home page has a full-bleed hero for the header to float over.
  const overHero = pathname === "/" && !isScrolled && !isOpen;

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

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
        <Link className={styles.brand} href="/">
          <span className={styles.brandKo}>크레용</span>
          <span className={styles.brandEn}>CRAYON TEXTILE</span>
        </Link>

        <nav className={styles.nav} aria-label="주요 메뉴">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? `${styles.navLink} ${styles.isActive}` : styles.navLink}
                aria-current={isActive ? "page" : undefined}
              >
                {item.en}
              </Link>
            );
          })}
        </nav>

        <a className={styles.tel} href={contact.telHref}>
          T. {contact.tel}
        </a>

        <button
          className={isOpen ? `${styles.toggle} ${styles.isOpen}` : styles.toggle}
          type="button"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
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
        <nav className={styles.panelNav} aria-label="전체 메뉴">
          <Link className={styles.panelLink} href="/">
            <span className={styles.panelEn}>INDEX</span>
            <span className={styles.panelKo}>홈</span>
          </Link>
          {navigation.map((item) => (
            <Link key={item.href} className={styles.panelLink} href={item.href}>
              <span className={styles.panelEn}>{item.en}</span>
              <span className={styles.panelKo}>{item.ko}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.panelMeta}>
          <a href={contact.mobileHref}>{contact.mobile}</a>
          <p>{contact.addressLines[1]}</p>
        </div>
      </div>
    </header>
  );
}
