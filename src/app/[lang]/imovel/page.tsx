import { supabase } from "../../../../lib/supabaseClient";
import Image from "next/image";
import ImovelCard from "../(components)/(imovel)/ImovelCard"

import { getDictionary } from "../dictionaries";
import { Imovel } from "../../../../lib/modelos";

interface pageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const imoveis = await supabase.from('imovel').select('*');
  if(imoveis.error){
    console.log("Erro ao consultar imóveis")
  }
  else {
    console.log(imoveis)
  }

  return (
    <>
      <div className="bg-escuro2 overflow-x-hidden box-border text-black">
          <div className="flex relative max-w-6xl mx-auto px-4 my-4">

            <div className=" bg-branco rounded-md overflow-hidden h-screen w-screen p-3">

            <h2 className="text-4xl mb-2">Meus Imóveis</h2>

            <div>
              {imoveis.data.map(dados => (
                <ImovelCard imovel={dados}/>
              ))}
            </div>

            </div>
          </div>
      </div>
    </>
  );
}
