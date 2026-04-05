"use client";

import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Video Background — replace placeholder with <video> when ready */}
      <div className={styles.heroVideoWrapper}>
        <div className={styles.heroVideoPlaceholder} />
        {/* 
          동영상 삽입 시 아래 주석 해제:
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video> 
        */}
      </div>

      {/* Dark gradient overlay */}
      <div className={styles.heroOverlay} />

      {/* Floating particles */}
      <div className={styles.heroParticles}>
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
        <div className={styles.particle} />
      </div>

      {/* Main Content */}
      <div className={styles.heroContentWrapper}>
        <div className={styles.heroBadge}>
          <span className={styles.dot} />
          사전예약 진행 중
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.lineThin}>Samsung Galaxy</span>
          <span className={styles.lineMain}>
            상상 그 이상의
            <br />
            특가 찬스
          </span>
          <span className={styles.lineModel}>Galaxy S26 Ultra</span>
        </h1>

        <p className={styles.heroSubtitle}>
          출고가 인상? 역대급 공시지원금과 제휴 혜택으로{" "}
          <span className={styles.priceHighlight}>체감가 0원</span>에
          도전하세요.
        </p>

        <div className={styles.heroActions}>
          <button
            className="cta-btn primary-glow"
            onClick={scrollToForm}
            id="hero-cta-primary"
          >
            실시간 할인 견적 받기
          </button>
          <button
            className="cta-btn secondary-glow"
            onClick={() =>
              document
                .getElementById("pricing")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            id="hero-cta-secondary"
          >
            가격표 확인하기
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
