"use client";

import { useState, useCallback } from "react";
import styles from "./PrivacySection.module.css";

export default function PrivacySection() {
  const [angle, setAngle] = useState(50);

  const handleSlider = useCallback((e) => {
    const val = Number(e.target.value);
    setAngle(val);
  }, []);

  // 50 = 정면(0°차이) → 투명, 0 or 100 = 측면(50°차이) → 불투명
  const deviation = Math.abs(angle - 50);
  const overlayOpacity = (deviation / 50) * 0.95;
  const displayAngle = Math.round(Math.abs(angle - 50) * 1.8); // 0~90 degree

  return (
    <section id="privacy" className={styles.privacySection}>
      <div className={styles.privacyGlow} />
      <div className="container">
        <div className={`${styles.privacyGrid} reveal`}>
          {/* Text */}
          <div className={styles.textContent}>
            <h2 className="neon-text-blue">
              세계 최초
              <br />
              빌트인 프라이버시 디스플레이
            </h2>
            <p>
              필름을 붙일 필요가 없습니다. 측면 30도 이상에서는 화면이
              자동으로 가려져, 공공장소에서도 완벽한 보안을 유지합니다.
            </p>

            <ul className={styles.featureList}>
              <li>
                <span className={styles.icon}>🔒</span>
                하드웨어 레벨 시야각 제어 기술
              </li>
              <li>
                <span className={styles.icon}>⚡</span>
                원터치 ON/OFF 전환
              </li>
              <li>
                <span className={styles.icon}>🛡️</span>
                금융·의료 앱 자동 활성화 지원
              </li>
            </ul>

            <div className={styles.interactionHint}>
              👆 슬라이더를 좌우로 드래그 해보세요
            </div>
          </div>

          {/* Widget */}
          <div className={styles.widgetWrapper}>
            <div className={styles.phoneFrame}>
              <div
                className={styles.screenContent}
                style={{
                  filter: `blur(${deviation > 25 ? (deviation - 25) * 0.15 : 0}px)`,
                }}
              >
                <div className={styles.bankApp}>
                  <div className={styles.appHeader}>
                    <div className={styles.appIcon} />
                    KB국민은행
                  </div>
                  <div className={styles.balanceLabel}>총 자산</div>
                  <div className={styles.balanceValue}>₩ 12,500,000</div>

                  <div className={styles.accountRow}>
                    <span>입출금 계좌</span>
                    <span>₩ 3,200,000</span>
                  </div>
                  <div className={styles.accountRow}>
                    <span>정기예금</span>
                    <span>₩ 5,000,000</span>
                  </div>
                  <div className={styles.accountRow}>
                    <span>투자 계좌</span>
                    <span>₩ 4,300,000</span>
                  </div>

                  <div className={styles.confidentialBadge}>
                    CONFIDENTIAL
                  </div>
                </div>
              </div>
              <div
                className={styles.screenOverlay}
                style={{ opacity: overlayOpacity }}
              />
            </div>

            <div className={styles.sliderWrapper}>
              <input
                type="range"
                min="0"
                max="100"
                value={angle}
                onChange={handleSlider}
                className={styles.angleSlider}
                id="angle-slider"
              />
              <div className={styles.angleLabels}>
                <span>◀ 측면</span>
                <span>정면</span>
                <span>측면 ▶</span>
              </div>
              <div className={styles.angleDisplay}>
                {displayAngle === 0 ? "정면 (완전 가시)" : `측면 ${displayAngle}°`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
