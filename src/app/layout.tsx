'use client';

import { Saira_Condensed } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';

import './main.scss';

const saira = Saira_Condensed({
  weight: '500',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${saira.className}`}>
        <SessionProvider>
          <div className="page-layout">
            <Header />
            <div className="main">{children}</div>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
