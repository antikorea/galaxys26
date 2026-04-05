"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <button
          className={styles.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로"
        >
          ↑
        </button>

        <p className={styles.companyInfo}>
          (주)모바일플러스 | 대표: 이준 | 사업자번호: 123-45-67890
          <br />
          통신판매업: 제2026-서울강남-0001호 | 서울특별시 강남구 테헤란로 123
        </p>

        <div className={styles.legalLinks}>
          <a href="#">이용약관</a>
          <a href="#" className={styles.privacyPolicy}>
            개인정보처리방침
          </a>
          <a href="#">사업자정보확인</a>
        </div>

        <p className={styles.disclaimer}>
          * 공시지원금은 통신사 정책에 따라 예고 없이 변동될 수 있습니다.
          * 할부원금 및 월 요금은 가입하시는 요금제에 따라 상이합니다.
          * 상기 이미지는 실제와 다소 차이가 있을 수 있습니다.
          * 본 페이지의 모든 할인 혜택은 조건 충족 시 적용됩니다.
        </p>
      </div>
    </footer>
  );
}
