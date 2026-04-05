---
name: galaxy_s26_project
description: "Documentation of Galaxy S26 Landing Page optimizations, bug fixes, and Firebase integration."
---

# Galaxy S26 Landing & Admin Dashboard Project
**최종 업데이트:** 2026. 04. 06.

이 문서는 모바일 및 데스크탑에 맞춰 최적화된 Galaxy S26 랜딩페이지와 실시간 어드민 페이지(Admin Dashboard)를 구축하면서 진행한 디자인/구조적 최적화, 기능 개선, 서버 인프라 이관(Firebase) 작업 내역을 종합적으로 기록합니다.

---

## 1. 디자인 및 UI/UX 최적화 작업 내역 (Design & Layout)

### 히어로(Hero) 섹션 개선
- **데스크탑 버전:** 기기 이미지를 우측 1fr 영역에 배치하고, 90도 시계방향 회전(`rotate(90deg)`) 및 `scale(2.4)`을 적용하여 대형 스크린에 어울리는 프리미엄 레이아웃 구현.
- **모바일 버전:** 회전 없이 `width: 95%`와 `scale(1.1)` 사이즈를 적용하여 작은 화면에서도 잘리지 않도록 최적화.
- **공통 블렌딩 효과:** 배경 경계면의 이질감을 없애기 위해 기기 이미지에 `mix-blend-mode: multiply`를 적용, 다크 테마 배경에 이질감 없이 스며들게 자연스럽게 처리.

### 텍스트 및 가독성(Typography) 개선
- **가격 폰트 리사이징:** "40,000원 부터" 텍스트 중 단위를 나타내는 `'원 부터'` 글자 폰트 사이즈를 상대적 85% 크기로 축소하여 시각적 구분을 주었음.
- **줄바꿈(Line-break) 컨트롤:** 
  - 서브 카피 텍스트인 "지금 보신 가격 그대로 숨김 없는 정찰제 혜택" 문구는 데스크탑에서는 한 줄로 보여주고, 모바일에서는 명확히 두 줄로 나뉘어 보이도록 환경 분기 최적화.
  - "단통법 폐지 + 역대급 추가할인" 텍스트 역시 모바일 환경에서만 십자(+) 기호 뒤에서 줄바꿈이 이뤄지도록 `<span class="break-mobile">` 클래스 추가 및 CSS 적용.

### 레이아웃 및 폼(Form) 미세조정
- **연락처 입력 칸 조정:** "010-0000-0000" 형태의 세 가지 번호 입력칸 비율을 `flex: 3`, `flex: 4`, `flex: 4` 구조로 강제 할당하여 앞자리(010)의 협소한 영역 문제를 해결.
- **버튼 최적화:** 유저가 화면 아래로 스크롤할 때 계속 따라다니던 모바일 하단 플로팅 "상담 신청하기" 버튼 제거.

---

## 2. 어드민 페이지 및 폼 에러(Bug Fixes) 해결

### 브라우저 저장소 파싱 충돌 방어
- 기존 시스템은 방문자 브라우저의 로컬 스토리지(`LocalStorage`)를 기반으로 운영되었습니다. 그러나 강제 종료되거나 잘못된 데이터 타입이 섞여 들어오면 `JSON.parse`가 고장 나면서 어드민 페이지가 완전히 빈 화면(White Screen)이 되거나 신청 내역 스크립트가 중단되는 버그가 있었습니다. 
- 이를 개선하기 위해 **`try-catch` 안전 장치**와 `Array.isArray()` 검수 코드를 `admin_logic.js`와 `script.js` 전반에 적용하여 캐시가 망가져도 시스템이 복구되도록 강력한 구조를 짰습니다.
- HTML5의 `required` 검증 이외에, Javascript 단에서의 누락 파라미터로 인한 `Undefined` 충돌에 대비한 안정적인 제출 분기 코딩.

---

## 3. 핵심 아키텍처: Firebase 서버(DB) 인프라 구축

가장 치명적이었던 문제점인 **"모바일에서 접수한 이력이 사장님의 데스크탑(컴퓨터) 어드민에서 확인되지 고립되는 현상(Cross-Device Isolation)"** 은 백엔드(DB) 서버의 부재로 인해 생긴 필연적 원인이었습니다. 이를 해결하기 위해 아키텍처를 전면 개편했습니다.

### Firebase Firestore 실시간 연동 완료
- **스크립트 CDN 추가:** `index.html`, `admin_dashboard.html` 안에 V8 기반의 빠르고 직관적인 Firebase CDN 모듈 장착.
- **`firebase_config.js` 이관:** 사장님의 Production Key를 모듈화하여 관리하기 쉽게 별도 파일로 분리 관리.
- **제출 구조 변경(`script.js`):** 기존 `localStorage.setItem`을 완전히 삭제하고, Firestore API인 `db.collection("leads").doc().set(newLead)`를 이용해 클라우드 서버에 직접 Write 되도록 비동기 처리(Promise) 작성. 
- **실시간 구독 채널(`admin_logic.js`):** `db.collection("leads").orderBy("id", "desc").onSnapshot`을 통해 모바일 제출 내역이 사장님 컴퓨터 어드민 페이지에서 **"새로고침 없이 실시간으로 리스트 최상단에 렌더링"**되도록 실시간(Realtime) 소켓 구현 완료.
- **삭제/초기화 기능:** Firebase 클라우드의 노드를 즉시 지울 수 있도록 `auth` 없는 `delete()` 쿼리 구현.

---

## 4. 모던 배포 최적화 (Hosting Settings)

실제로 운영할 깃허브 페이지(GitHub Pages), 클라우드플레어(Cloudflare Pages), 혹은 네틀리파이(Netlify) 등에서의 자연스러운 라우팅을 위해 아래 파일들을 추가/수정했습니다.
- **Netlify/Cloudflare `_redirects` 추가:** `/admin` 도메인 주소로 우회 접속 시 `/admin_dashboard.html`으로 200 응답 리다이렉팅.
- **`netlify.toml` 추가:** CI/CD 파이프라인에서 빌드 및 리다이렉트 정책을 동일하게 따르도록 세팅 명시.
- 중복되고 오래된 `admin/index.html` 폴더 아키텍처를 과감하게 삭제(Clean up).
- 스크립트 절대경로(`src="/firebase_config.js"`) 매핑으로 HTML5 History 기반 하위 주소 버그 완벽 차단.
