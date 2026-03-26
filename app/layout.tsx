import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-serif-kr",
});

export const metadata: Metadata = {
  title: "부고장 만들기",
  description: "부고장을 쉽게 만들어 PNG로 저장하고 카카오톡으로 공유하세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSerifKR.variable}>
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          async
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${notoSerifKR.className} min-h-screen bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
