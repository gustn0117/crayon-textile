"use client";

import { useEffect, useState } from "react";

const navigation = [
  { label: "회사 소개", href: "#about" },
  { label: "디자인", href: "#studio" },
  { label: "컬렉션", href: "#collection" },
  { label: "글로벌", href: "#global" },
];

function Logo() {
  return (
    <span className="brand-mark" aria-label="크레용 홈">
      <span className="brand-mark__ko">크레용</span>
      <span className="brand-mark__en">NOW CRAYON · SEOUL</span>
    </span>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__logo" href="#top" onClick={() => setIsOpen(false)}>
          <Logo />
        </a>

        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          원단 상담하기
          <span aria-hidden="true">↗</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu${isOpen ? " is-open" : ""}`} id="mobile-navigation">
        <nav aria-label="모바일 메뉴">
          {navigation.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
              <b aria-hidden="true">↗</b>
            </a>
          ))}
          <a className="mobile-menu__contact" href="#contact" onClick={() => setIsOpen(false)}>
            <span>05</span>
            문의하기
            <b aria-hidden="true">↗</b>
          </a>
        </nav>

        <div className="mobile-menu__meta">
          <a href="tel:+821077710786">010-7771-0786</a>
          <p>동대문종합시장 D동 2층 2621호</p>
        </div>
      </div>
    </header>
  );
}
