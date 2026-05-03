# Galaxy S26 Showcase & Admin Dashboard

갤럭시 S26 랜딩 페이지 및 관리자 대시보드 프로젝트입니다.

## 기능 (Features)
- **랜딩 페이지**: 기기 특장점 소개, 사전 예약/상담 신청 폼 (Firebase Firestore 연동)
- **관리자 대시보드**: 신청 내역 실시간 확인, 데이터 초기화 및 삭제 관리 기능
- **프리미엄 UI/UX**: 글래스모피즘, 다크 모드, 애니메이션이 적용된 모던 디자인

## 실행 방법 (How to Run)
이 프로젝트는 정적 HTML/CSS/JS 및 Firebase로 구성되어 있습니다.

```bash
# 디렉토리 이동
cd galaxy-s26-landing

# 의존성 설치 (필요시)
npm install

# 로컬 개발 서버 실행
npx serve
```
- 랜딩 홈페이지: `http://localhost:3000`
- 관리자 페이지: `http://localhost:3000/admin_dashboard.html`

## 배포 (Deployment)
Netlify 또는 Vercel을 통해 `galaxy-s26-landing` 폴더를 정적 배포할 수 있습니다. Firebase 설정(`firebase_config.js`)이 올바르게 구성되었는지 배포 전 확인하세요.
