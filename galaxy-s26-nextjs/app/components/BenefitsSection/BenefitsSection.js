"use client";

import styles from "./BenefitsSection.module.css";

const benefits = [
  {
    icon: "🎧",
    title: "갤럭시 버즈4 프로",
    desc: "S26 울트라 구매 시 10% 할인 쿠폰 즉시 발급",
  },
  {
    icon: "⚡",
    title: "60W PD 충전기",
    desc: "울트라 한정 30% 할인 — 초고속 충전 경험",
  },
  {
    icon: "🛡️",
    title: "프리미엄 케이스",
    desc: "액세서리 30% 할인 쿠폰 5장 지급",
  },
  {
    icon: "📺",
    title: "인터넷/TV 결합 가입",
    desc: "최대 100만원 사은품 또는 55인치 TV 증정",
    highlight: true,
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className={styles.benefitsSection}>
      <div className={styles.benefitsGlow} />
      <div className="container">
        <h2 className="neon-text reveal">단독 사은품 & 추가 혜택 패키지</h2>
        <p className={`${styles.benefitsSubtitle} reveal`}>
          지금 사전예약하시면 받을 수 있는 단독 혜택을 확인하세요
        </p>

        <div className={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div
              key={i}
              className={`${styles.benefitCard} glass-panel reveal reveal-delay-${
                i + 1
              } ${b.highlight ? styles.highlightCard : ""}`}
            >
              {b.highlight && (
                <span className={styles.highlightBadge}>Best</span>
              )}
              <div className={styles.cardIcon}>{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
