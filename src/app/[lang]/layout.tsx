import "@/app/globals.css";

import { dir } from "i18next";

export const metadata = {
  title: "ImmobileLink",
  description: "Generated by create next app",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({
  children,
  params: { lang },
}: RootLayout) {

  return (
    <html
      lang={lang}
      dir={dir(lang)}
    >
      <body>
          {children}
      </body>
    </html>
  );
}