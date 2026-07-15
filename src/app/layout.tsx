import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '경산 로컬 플레이스 추천',
  description: '내 주변 먹거리와 놀거리를 실시간으로 추천해 드립니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-gray-100`}>
        <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
