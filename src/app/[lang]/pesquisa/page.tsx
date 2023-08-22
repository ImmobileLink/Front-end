import { getDictionary } from "../dictionaries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import PesquisaCard from "../(components)/(pesquisa)/PesquisaCard"
import NavProfile from "../(components)/(cards)/CardProfile";
import NavAmizade from "../(components)/(cards)/CardLink";
import NavSettings from "../(components)/(cards)/CardNavigation";
import { getTipoUsuario, getLinks, getAssoc } from "../../../../lib/utils/userData";
import { userData } from "../../../../lib/modelos";
import { Page } from "../(components)/(compositions)/(page)";

interface pageProps {
  params: {
    lang: string;
  };
}

const supabase = createServerComponentClient<Database>({cookies})

let user: userData = {
  links: [],
  assoc: []
};

async function getUserData() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    user = await getTipoUsuario(user, session.user.id);

    [user, user] = await Promise.all([
      getLinks(user),
      getAssoc(user)
    ]);
  }
  
  return user;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  //Coleta dados das regiões do banco de dados
    //Mudar pra pegar da api do ibge (adicionar mais 2 campos, um para estado e outro para cidade)
      /*
      const regioes = await supabase.from('regiao').select('*');
      if(regioes.error){
        console.log("Erro ao consultar regiões")
      }
      */
  const especialidades = await supabase.from('tipoImovel').select('*')
  if(especialidades.error){
    console.log("Erro ao consultar especialidades")
  }
  
  return (
    <Page.Root>
      <Page.Left>
      <NavProfile
          userData={userData}
          cards={dict.feed.cards}  
        />
        {userData.id ? (
          <>
            <NavSettings
              userData={userData}
              cards={dict.feed.cards}
            />
            {/* <NavCalendar userData={userData} /> */}
          </>
        ) : (
          ""
        )}
      </Page.Left>
      <Page.Main>
      <>
        {/* <PesquisaCard textos={dict.pesquisa} regioes={regioes.data} especialidades={especialidades.data}/>            */}
        </>
      </Page.Main>
      <Page.Right>
      
      </Page.Right>
    </Page.Root>
    
  )
}

