export const metadata = {
  title: "ImmobileLink - Auth",
  description: "Rede social para o mercado imobiliário",
};


interface RootLayout {
  children: any;
  params: { lang: string };
}

export default function AuthLayout({ children, params: { lang } }: RootLayout) {
  return (
    <>
      {children}
    </>
  );
}
