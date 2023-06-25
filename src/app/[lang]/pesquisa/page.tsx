import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import NavCard from "@/app/[lang]/(components)/NavCard";
import PesquisaCard from "../(components)/(pesquisa)/PesquisaCard"

import { getDictionary } from "../dictionaries";


interface pageProps {
  params: {
    lang: string;
  };
}
const supabase = createServerComponentClient<Database>({cookies})

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  //Coleta dados das regiões do banco de dados
  const regioes = await supabase.from('regiao').select('*');
  if(regioes.error){
    console.log("Erro ao consultar regiões")
  }
  else {
    console.log(regioes)
  }
  const especialidades = await supabase.from('tipoImovel').select('*')
  if(especialidades.error){
    console.log("Erro ao consultar especialidades")
  }
  console.log(especialidades)
  return (
    <div className="w-screen h-fit bg-branco dark:bg-dark-200 flex justify-center grow">
      <div className="w-2/12 h-screen p-3 m-3">
        <NavCard navbarbuttons={dict.navbarbuttons}/>
      </div>
      <div className="w-6/12 p-3 m-3">
        <PesquisaCard textos={dict.pesquisa} regioes={regioes.data} especialidades={especialidades.data}/>      
      </div>
      <div className="w-2/12 h-screen p-3 m-3">
        <NavCard navbarbuttons={dict.navbarbuttons}/>
      </div>     
    </div>
  )
}

