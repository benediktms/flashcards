import { Inter } from '@next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';

import { NotificationProvider } from '@/components/Notification/NotificationContext';
import '@/styles/globals.css';
import { api } from '@/utils/api';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </SessionProvider>
      </ThemeProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
