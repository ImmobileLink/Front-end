"use client";

import { dir } from "i18next";

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default function AuthLayout({ children, params: { lang } }: RootLayout) {
  return (
    <html
      lang={lang}
      dir={dir(lang)}
    >
      <body>
        <section>{children}</section>
      </body>
    </html>
  );
}
