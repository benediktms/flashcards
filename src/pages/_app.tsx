import { Inter } from '@next/font/google';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/app';

import '@/styles/globals.css';

import { NotificationProvider } from '@/components/Notification/NotificationContext';
import { api } from '@/utils/api';
import { cn } from '@/utils/cn';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            inter.variable,
            'min-h-screen font-sans dark:bg-slate-900 ',
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider session={session}>
              <NotificationProvider>
                <Component {...pageProps} />
              </NotificationProvider>
            </SessionProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
};

export default api.withTRPC(MyApp);
