"use client";
import Image from "next/image";
import Avatar from "../(components)/Avatar"
import Cabecalho from "../(components)/(perfil)/Cabecalho"
import ImovelCard from "../(components)/(imovel)/ImovelCard"

interface pageProps {
  userId: any;
}

export default function page({ userId }: pageProps) {
  return (
    <>
      <div className="bg-escuro2 overflow-x-hidden box-border text-black">
          <div className="flex relative max-w-6xl mx-auto px-4 my-4">

            <div className=" bg-branco rounded-md overflow-hidden h-screen w-screen p-3">

            Teste - Tela de Imóveis

            <ImovelCard />

            </div>
          </div>
      </div>
    </>
  );
}
