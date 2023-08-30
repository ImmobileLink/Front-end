"use client"
import { ReactNode } from "react";
import NavBar from "../../(components)/NavBar";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


export const metadata = {
  title: "ImmobileLink - Planos",
  description: "Rede social para o mercado imobiliário",
};

interface RootLayout {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayout) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        {children}
      </QueryClientProvider>
    </>
  );
}
