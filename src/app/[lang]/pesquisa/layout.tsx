import NavBar from "../(components)/NavBar";

export const metadata = {
  title: "ImmobileLink - Pesquisa",
  description: "Rede social para o mercado imobiliário",
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
    <>
      <NavBar />
      {children}
    </>
  );
}
