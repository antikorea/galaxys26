"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./LeadFormSection.module.css";

export default function LeadFormSection() {
  const [showModal, setShowModal] = useState(false);
  const [userCount, setUserCount] = useState(1245);
  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    deviceModel: "",
    currentCarrier: "",
    inquiry: "",
    privacyAgree: false,
  });
  const [errors, setErrors] = useState({});
  const countRef = useRef(null);

  // Live ticker count-up
  useEffect(() => {
    const id = setInterval(() => {
      if (Math.random() > 0.4) {
        setUserCount((prev) => {
          const next = prev + Math.floor(Math.random() * 3) + 1;
          // Pop animation
          if (countRef.current) {
            countRef.current.style.transform = "scale(1.25)";
            countRef.current.style.color = "#fff";
            setTimeout(() => {
              if (countRef.current) {
                countRef.current.style.transform = "scale(1)";
                countRef.current.style.color = "";
              }
            }, 250);
          }
          return next;
        });
      }
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const validatePhone = (phone) => {
    return /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(phone.replace(/-/g, ""));
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/[^0-9]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    if (name === "userPhone") {
      setFormData((prev) => ({ ...prev, [name]: formatPhone(value) }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.userName.trim()) newErrors.userName = "성함을 입력해주세요.";
    if (!validatePhone(formData.userPhone))
      newErrors.userPhone = "올바른 연락처를 입력해주세요. (예: 010-1234-5678)";
    if (!formData.deviceModel)
      newErrors.deviceModel = "희망 기종을 선택해주세요.";
    if (!formData.currentCarrier)
      newErrors.currentCarrier = "현재 통신사를 선택해주세요.";
    if (!formData.privacyAgree)
      newErrors.privacyAgree = "개인정보 수집 동의가 필요합니다.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock submit
    setShowModal(true);
    setFormData({
      userName: "",
      userPhone: "",
      deviceModel: "",
      currentCarrier: "",
      inquiry: "",
      privacyAgree: false,
    });
    setErrors({});
  };

  return (
    <section id="lead-form" className={styles.formSection}>
      <div className={styles.formGlow} />
      <div className="container">
        <div className={`${styles.formCard} glass-panel reveal`}>
          <div className={styles.formHeader}>
            <h2 className="neon-text">내 맞춤 할인액 실시간 조회</h2>
            <div className={styles.liveTicker}>
              <span className={styles.blinkingDot} />
              현재{" "}
              <strong className={styles.userCount} ref={countRef}>
                {userCount.toLocaleString()}
              </strong>
              명이 상담을 신청했습니다
            </div>
          </div>

          <form className={styles.dbForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="userName">
                  성함 <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="홍길동"
                  value={formData.userName}
                  onChange={handleChange}
                />
                <span className={styles.errorMessage}>
                  {errors.userName || ""}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userPhone">
                  연락처 <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  id="userPhone"
                  name="userPhone"
                  placeholder="010-1234-5678"
                  value={formData.userPhone}
                  onChange={handleChange}
                  maxLength={13}
                />
                <span className={styles.errorMessage}>
                  {errors.userPhone || ""}
                </span>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="deviceModel">
                  희망 기종 <span className={styles.required}>*</span>
                </label>
                <select
                  id="deviceModel"
                  name="deviceModel"
                  value={formData.deviceModel}
                  onChange={handleChange}
                >
                  <option value="">기종을 선택해주세요</option>
                  <option value="S26">갤럭시 S26</option>
                  <option value="S26+">갤럭시 S26+</option>
                  <option value="S26U">갤럭시 S26 울트라</option>
                </select>
                <span className={styles.errorMessage}>
                  {errors.deviceModel || ""}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="currentCarrier">
                  현재 통신사 <span className={styles.required}>*</span>
                </label>
                <select
                  id="currentCarrier"
                  name="currentCarrier"
                  value={formData.currentCarrier}
                  onChange={handleChange}
                >
                  <option value="">통신사 선택</option>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LGU+">LG U+</option>
                  <option value="MVNO">알뜰폰</option>
                </select>
                <span className={styles.errorMessage}>
                  {errors.currentCarrier || ""}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="inquiry">문의 사항 (선택)</label>
              <textarea
                id="inquiry"
                name="inquiry"
                placeholder="결합 할인이나 궁금한 점을 적어주세요."
                value={formData.inquiry}
                onChange={handleChange}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.customCheckbox}>
                <input
                  type="checkbox"
                  name="privacyAgree"
                  checked={formData.privacyAgree}
                  onChange={handleChange}
                />
                (필수) 개인정보 수집 및 이용, 제3자 제공 동의
              </label>
              <a href="#" className={styles.termsLink}>
                상세보기
              </a>
            </div>
            {errors.privacyAgree && (
              <span className={styles.errorMessage}>
                {errors.privacyAgree}
              </span>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              id="submit-lead-form"
            >
              지금 바로 무료 견적받기
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={styles.modal}>
          <div className={`${styles.modalContent} glass-panel`}>
            <div className={styles.modalIcon}>🎉</div>
            <h2 className="neon-text-blue">신청이 완료되었습니다!</h2>
            <p>
              5분 이내에 전문 상담원이 카카오 알림톡 및 연락을 드릴
              예정입니다.
            </p>
            <button
              className={styles.modalBtn}
              onClick={() => setShowModal(false)}
              id="close-modal"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
