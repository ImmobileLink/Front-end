import { dir } from 'i18next';
import NavBar from "../NavBar";

export const metadata = {
  title: "ImmobileLink - Feed",
  description: "Generated by create next app",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({ children, params: { lang }}: RootLayout) {

  return (
    <html
    lang={lang}
    dir={dir(lang)}
    >
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}