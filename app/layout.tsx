import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import Header from './components/Header';

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Minimum Application',
  description: 'GitHubをリポジトリとイシューを表示する最低限度のWebアプリケーションです',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJp.className}>
        <Header />
        <main className='mx-auto w-[calc(100%-40px)] max-w-[640px]'>{children}</main>
      </body>
    </html>
  );
}
