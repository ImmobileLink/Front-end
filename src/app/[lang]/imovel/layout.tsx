import NavBar from "../(components)/(navbar)/NavBar";

export const metadata = {
  title: "ImmobileLink - Meus Imóveis",
  description: "Rede social para o mercado imobiliário",
};

interface RootLayout {
  children: any;
  params: { lang: string };
}

export default async function RootLayout({ children, params: { lang }, }: RootLayout) {

  return (
    <>
        <NavBar params={{ lang: lang }} />
        {children}
    </>
  );
}
