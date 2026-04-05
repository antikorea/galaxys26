import "./globals.css";

export const metadata = {
  title: "갤럭시 S26 시리즈 특가 사전예약 | 역대급 공시지원금 혜택",
  description:
    "2026년형 갤럭시 S26 울트라·S26+·S26 특가! 역대급 공시지원금과 인터넷 결합 할인으로 체감가 0원에 도전하세요. 지금 무료 견적을 받아보세요.",
  keywords:
    "갤럭시 S26, Galaxy S26 Ultra, 갤럭시 S26 특가, 공시지원금, 사전예약, 삼성 스마트폰",
  openGraph: {
    title: "갤럭시 S26 시리즈 특가 사전예약",
    description: "역대급 공시지원금과 제휴 혜택으로 체감가 0원에 도전하세요.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
