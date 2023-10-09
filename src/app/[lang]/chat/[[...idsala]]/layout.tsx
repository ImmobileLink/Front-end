import { Page } from '../../(components)/(compositions)/(page)';
import NavBar from '../../(components)/(navbar)/NavBar';

export const metadata = {
  title: "ImmobileLink - Chat",
  description: "Rede social para o mercado imobiliário",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({ children, params: { lang } }: RootLayout) {

  return (
    <Page.Root>
      <NavBar params={{ lang: lang }} />
      {children}
    </Page.Root>
  );
}
