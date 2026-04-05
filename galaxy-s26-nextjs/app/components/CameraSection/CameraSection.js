"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import styles from "./CameraSection.module.css";

export default function CameraSection() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const handleRef = useRef(null);
  const lineRef = useRef(null);
  const draggingRef = useRef(false);

  const move = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const pct = (x / rect.width) * 100;
    if (wrapperRef.current) wrapperRef.current.style.width = `${pct}%`;
    if (handleRef.current) handleRef.current.style.left = `${pct}%`;
    if (lineRef.current) lineRef.current.style.left = `${pct}%`;
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (draggingRef.current) move(e.clientX);
    };
    const onTouchMove = (e) => {
      if (draggingRef.current) move(e.touches[0].clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [move]);

  // Use generated sample images or placeholders
  const sampleImage = "/images/night-concert.jpg";

  return (
    <section id="camera" className={styles.cameraSection}>
      <div className={styles.cameraGlow} />
      <div className="container">
        <div className={`${styles.headerCenter} reveal`}>
          <h2 className="neon-text">어둠 속에서도 빛나는 당신의 순간</h2>
          <p>
            f/1.4 조리개와 AI ISP의 결합. 노이즈 없는 압도적인 야간 촬영
            성능을 확인하세요.
          </p>
          <div className={styles.specBadges}>
            <span className={styles.specBadge}>
              📷 <span className={styles.value}>200MP</span> 메인 카메라
            </span>
            <span className={styles.specBadge}>
              🌙 <span className={styles.value}>f/1.4</span> 초광각
            </span>
            <span className={styles.specBadge}>
              🤖 <span className={styles.value}>AI ISP</span> 3세대
            </span>
          </div>
        </div>

        <div
          className={`${styles.beforeAfterContainer} reveal`}
          ref={containerRef}
          onMouseDown={() => {
            draggingRef.current = true;
          }}
          onTouchStart={() => {
            draggingRef.current = true;
          }}
        >
          {/* After (clean) image */}
          <div className={styles.placeholderImage} style={{
            background: 'linear-gradient(135deg, #0c0c1a 0%, #1a1035 30%, #251048 60%, #0c0c1a 100%)',
          }}>
            <div style={{
              textAlign: 'center',
              opacity: 0.6,
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎵</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                AI 나이토그래피 — 선명한 콘서트 사진
              </div>
            </div>
          </div>

          {/* Before (noisy/dark) wrapper */}
          <div className={styles.beforeWrapper} ref={wrapperRef}>
            <div className={styles.placeholderImage} style={{
              background: 'linear-gradient(135deg, #050508 0%, #0a0a12 50%, #050508 100%)',
            }}>
              <div style={{
                textAlign: 'center',
                opacity: 0.4,
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌑</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)' }}>
                  일반 촬영 — 어둡고 노이즈 가득
                </div>
              </div>
            </div>
            <div className={styles.noiseOverlay} />
          </div>

          {/* Labels */}
          <div className={styles.labelBefore}>Before</div>
          <div className={styles.labelAfter}>AI Nightography</div>

          {/* Slider */}
          <div className={styles.sliderLine} ref={lineRef} />
          <div
            className={styles.sliderHandle}
            ref={handleRef}
            onMouseDown={(e) => {
              e.stopPropagation();
              draggingRef.current = true;
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              draggingRef.current = true;
            }}
          />
        </div>
      </div>
    </section>
  );
}
