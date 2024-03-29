import NavBar from "../../(components)/(navbar)/NavBar";
import { Page } from "./(perfil)/composition/page";

export const metadata = {
  title: "ImmobileLink - Perfil",
  description: "Rede social para o mercado imobiliário",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({ children, params: { lang } }: RootLayout) {

  return (
    <>
      <NavBar params={{ lang: lang }} />
      <Page.Root>
        {children}
      </Page.Root>
    </>
  );
}
