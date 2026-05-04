# Galaxy S26 Showcase & Admin Dashboard

갤럭시 S26 랜딩 페이지 및 관리자 대시보드 프로젝트입니다.

## 기능 (Features)
- **랜딩 페이지**: 기기 특장점 소개, 사전 예약/상담 신청 폼 (NeonDB 연동)
- **개인정보 수집 동의**: 광고 심사 기준 충족을 위한 필수 개인정보 수집 및 이용 동의 기능 적용
- **관리자 대시보드**: 신청 내역 실시간 확인, 데이터 초기화 및 삭제 관리 기능
- **프리미엄 UI/UX**: 글래스모피즘, 다크 모드, 애니메이션이 적용된 모던 디자인

## 기술 스택 (Tech Stack)
- Frontend: HTML/CSS/JS (Vanilla)
- Backend: Netlify Functions (Serverless API)
- Database: NeonDB (PostgreSQL) + Prisma ORM
- 알림: Telegram Bot API 연동

## 실행 방법 (How to Run)

```bash
# 디렉토리 이동
cd galaxy-s26-landing

# 의존성 설치 (Prisma 클라이언트 생성 포함)
npm install

# 로컬 개발 서버 및 Netlify Functions 실행 (Netlify CLI 필요)
netlify dev
```
- 랜딩 홈페이지: `http://localhost:8888`
- 관리자 페이지: `http://localhost:8888/admin_dashboard.html`

## 배포 (Deployment)
Netlify를 통해 루트 또는 `galaxy-s26-landing` 폴더를 배포합니다.
환경 변수(`NETLIFY_DATABASE_URL`)가 올바르게 구성되었는지 배포 전 확인하세요.
데이터베이스 푸시가 필요할 시 `npx prisma db push` 대신 `npx prisma migrate deploy` 등의 안전한 마이그레이션 방식을 사용하세요.
