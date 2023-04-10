import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen bg-white font-sans dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
