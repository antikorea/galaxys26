"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { label: "가격표", target: "pricing" },
  { label: "프라이버시", target: "privacy" },
  { label: "카메라", target: "camera" },
  { label: "성능", target: "performance" },
  { label: "혜택", target: "benefits" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
    >
      <div className={`container ${styles.navInner}`}>
        <div
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className={styles.logoIcon}>S26</div>
          <span>Galaxy S26</span>
        </div>

        <ul
          className={`${styles.navLinks} ${
            mobileOpen ? styles.navLinksOpen : ""
          }`}
        >
          {navItems.map((item) => (
            <li
              key={item.target}
              className={styles.navLink}
              onClick={() => scrollTo(item.target)}
            >
              {item.label}
            </li>
          ))}
          <li>
            <button
              className={styles.navCta}
              onClick={() => scrollTo("lead-form")}
            >
              견적 받기
            </button>
          </li>
        </ul>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
