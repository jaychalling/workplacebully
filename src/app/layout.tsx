import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://workplacebully.vercel.app"),
  title: {
    default: "직장내 괴롭힘 판단기 - 내 상황, 괴롭힘일까?",
    template: "%s | 직장내 괴롭힘 판단기",
  },
  description:
    "근로기준법 제76조의2 기반 직장내 괴롭힘 자가 판단 서비스. 상황을 입력하면 3요건 분석, 신뢰도 점수, 대응 가이드를 제공합니다.",
  keywords: [
    "직장내 괴롭힘",
    "직장 괴롭힘",
    "직장 갑질",
    "근로기준법",
    "직장내 괴롭힘 판단",
    "직장 괴롭힘 신고",
    "직장 스트레스",
  ],
  openGraph: {
    title: "직장내 괴롭힘 판단기 - 내 상황, 괴롭힘일까?",
    description:
      "상황을 입력하면 근로기준법 제76조의2 3요건을 분석하고 대응 방법을 안내합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "직장내 괴롭힘 판단기",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} font-sans`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
