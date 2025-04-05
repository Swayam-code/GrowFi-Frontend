import './globals.css';
import { Inter } from 'next/font/google';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { GeminiProvider } from '@/context/GeminiContext';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'GrowFi - Unify & Optimize Your Investments',
  description: 'Track, analyze, and optimize your investments across all platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PortfolioProvider>
          <GeminiProvider>
            {children}
            <ChatBot />
          </GeminiProvider>
        </PortfolioProvider>
      </body>
    </html>
  );
}
