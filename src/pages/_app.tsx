import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Inter } from '@next/font/google';
import { api } from '@/utils/api';
import { NotificationProvider } from '@/components/Notification/NotificationContext';
import '@/styles/globals.css';

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
      <SessionProvider session={session}>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
