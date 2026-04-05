"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./PerformanceSection.module.css";

function useCountUp(end, duration = 1500, suffix = "%") {
  const [value, setValue] = useState("0" + suffix);
  const hasAnimated = useRef(false);

  const trigger = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * end) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, suffix]);

  return { value, trigger };
}

export default function PerformanceSection() {
  const sectionRef = useRef(null);
  const npu = useCountUp(39, 1800, "%");
  const gpu = useCountUp(24, 1800, "%");
  const fast = useCountUp(60, 1200, "W");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            npu.trigger();
            gpu.trigger();
            fast.trigger();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="performance"
      className={styles.performanceSection}
      ref={sectionRef}
    >
      <div className={styles.perfGlow} />
      <div className="container">
        <div className={`${styles.performanceInner} glass-panel reveal`}>
          {/* Chip visual */}
          <div className={styles.chipVisual}>
            <span className={styles.chipLabel}>
              Snapdragon
              <br />8 Elite
              <br />Gen 5
            </span>
          </div>

          <h2 className="neon-text-blue">한계를 뛰어넘는 에이전틱 AI</h2>
          <p className={styles.subtitle}>
            스냅드래곤 8 엘리트 Gen 5 칩셋으로 실시간 AI 연산을 끊김 없이
            처리합니다.
          </p>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🧠</div>
              <div className={styles.statValue} id="npu-stat">
                {npu.value}
              </div>
              <div className={styles.statLabel}>NPU 성능 향상</div>
              <div className={styles.statDesc}>
                온디바이스 AI 모델 추론 속도 극대화
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎮</div>
              <div className={styles.statValue} id="gpu-stat">
                {gpu.value}
              </div>
              <div className={styles.statLabel}>GPU 성능 향상</div>
              <div className={styles.statDesc}>
                레이트레이싱 지원 모바일 게이밍
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statValue} id="charging-stat">
                {fast.value}
              </div>
              <div className={styles.statLabel}>Super Fast Charging</div>
              <div className={styles.statDesc}>
                30분 완충 — 역대 가장 빠른 충전
              </div>
            </div>
          </div>

          {/* AI Features */}
          <div className={styles.aiFeatures}>
            <div className={styles.aiCard}>
              <h4>🗣️ 실시간 통역 3.0</h4>
              <p>전화 통화 중 16개 언어 실시간 양방향 통역</p>
            </div>
            <div className={styles.aiCard}>
              <h4>✍️ AI 요약 & 필기</h4>
              <p>회의록, 강의 노트를 AI가 자동 요약 및 정리</p>
            </div>
            <div className={styles.aiCard}>
              <h4>🔍 써클 투 서치 2.0</h4>
              <p>화면의 어떤 것이든 동그라미를 그려 즉시 검색</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
