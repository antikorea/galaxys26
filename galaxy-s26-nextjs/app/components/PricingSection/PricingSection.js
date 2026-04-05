"use client";

import { useState, useEffect } from "react";
import styles from "./PricingSection.module.css";

export default function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    let total = 2 * 3600 + 34 * 60 + 12;

    const tick = () => {
      if (total <= 0) total = 24 * 3600;
      total--;
      setTimeLeft({
        h: String(Math.floor(total / 3600)).padStart(2, "0"),
        m: String(Math.floor((total % 3600) / 60)).padStart(2, "0"),
        s: String(total % 60).padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const rows = [
    {
      label: "공식 출고가 (256GB)",
      s26: "1,254,000원",
      s26p: "1,452,000원",
      s26u: "1,797,400원",
    },
    {
      label: "최대 공시지원금",
      s26: "- 500,000원",
      s26p: "- 500,000원",
      s26u: "- 500,000원",
      isDiscount: true,
    },
    {
      label: "인터넷/TV 결합 할인",
      s26: "- 754,000원",
      s26p: "- 800,000원",
      s26u: "- 1,000,000원",
      isDiscount: true,
    },
  ];

  const finalPrices = {
    label: "최종 체감가",
    s26: "0원",
    s26p: "152,000원",
    s26u: "297,400원",
  };

  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.pricingGlow} />
      <div className="container">
        <div className={`${styles.pricingInner} glass-panel reveal`}>
          <div className={styles.sectionHeader}>
            <h2 className="neon-text">
              오직 이번 달에만 적용되는 최대 지원금
            </h2>
            <div className={styles.countdown} id="countdown">
              <span className={styles.icon}>⏰</span>
              마감 임박:{" "}
              <span className={styles.countdownValue}>
                {timeLeft.h}:{timeLeft.m}:{timeLeft.s}
              </span>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.pricingTable}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>갤럭시 S26</th>
                  <th>갤럭시 S26+</th>
                  <th className={styles.ultraCol}>갤럭시 S26 울트라</th>
                </tr>
              </thead>
              <tbody>
                <tr className={styles.imageRow}>
                  <td>제품 외관</td>
                  <td>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src="https://images.samsung.com/is/image/samsung/p6pim/sec/galaxy-s26/cloud-navy/sec-galaxy-s26-sm-s941-zk-front.png?wid=400&hei=400&fmt=png-alpha" 
                        alt="갤럭시 S26" 
                        className={styles.productImage}
                      />
                    </div>
                  </td>
                  <td>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src="https://images.samsung.com/is/image/samsung/p6pim/sec/galaxy-s26-plus/cloud-silver/sec-galaxy-s26-plus-sm-s946-zs-front.png?wid=400&hei=400&fmt=png-alpha" 
                        alt="갤럭시 S26+" 
                        className={styles.productImage}
                      />
                    </div>
                  </td>
                  <td className={styles.ultraCol}>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src="https://images.samsung.com/is/image/samsung/p6pim/sec/galaxy-s26-ultra/titanium-violet/sec-galaxy-s26-ultra-sm-s948-zv-front.png?wid=400&hei=400&fmt=png-alpha" 
                        alt="갤럭시 S26 울트라 (코발트 바이올렛)" 
                        className={styles.productImage}
                      />
                    </div>
                  </td>
                </tr>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.label}</td>
                    <td className={row.isDiscount ? styles.discount : ""}>
                      {row.s26}
                    </td>
                    <td className={row.isDiscount ? styles.discount : ""}>
                      {row.s26p}
                    </td>
                    <td
                      className={`${styles.ultraCol} ${
                        row.isDiscount ? styles.discount : ""
                      }`}
                    >
                      {row.s26u}
                    </td>
                  </tr>
                ))}
                <tr className={styles.finalRow}>
                  <td>{finalPrices.label}</td>
                  <td className={styles.finalPrice}>{finalPrices.s26}</td>
                  <td className={styles.finalPrice}>{finalPrices.s26p}</td>
                  <td className={`${styles.ultraCol} ${styles.finalPrice}`}>
                    {finalPrices.s26u}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className={styles.tableNote}>
            * 민팃 보상 반납 시 추가 최대 10만원 혜택 제공
          </p>
        </div>
      </div>
    </section>
  );
}
