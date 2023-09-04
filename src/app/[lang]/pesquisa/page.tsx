import { getDictionary } from "../dictionaries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import { getTipoUsuario, getLinks, getAssoc } from "../../../../lib/utils/userData";
import { userData } from "../../../../lib/modelos";
import { Page } from "../(components)/(compositions)/(page)";
import { cache } from "react";
import { Card } from "../(components)/(compositions)/(card)";
import CardProfile from "../(components)/(cards)/CardProfile";
import CardNotLogged from "../(components)/(cards)/CardNotLogged";

interface pageProps {
  params: {
    lang: string;
  };
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


async function getUserData(user: userData) {
  const supabase = createServerSupabaseClient();
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
  const supabase = createServerSupabaseClient();

  let user: userData = {
    id: undefined,
    isPremium: undefined,
    nome: undefined,
    type: undefined,
    links: [],
    assoc: []
  }

  const dict = await getDictionary(lang); // pt
  const userData = await getUserData(user);

  //Coleta dados das regiões do banco de dados
  //Mudar pra pegar da api do ibge (adicionar mais 2 campos, um para estado e outro para cidade)
  /*
  const regioes = await supabase.from('regiao').select('*');
  if(regioes.error){
    console.log("Erro ao consultar regiões")
  }
  */
  const especialidades = await supabase.from('tipoImovel').select('*')
  if (especialidades.error) {
    console.log("Erro ao consultar especialidades")
  }

  return (
    <div className="flex justify-center gap-5 mt-4">
      <Page.Left>
      {
          userData.id ? (
            <>
              <Card.RootStatic>
                <Card.Content>
                  <CardProfile
                    userData={userData}
                    cards={dict.feed.cards}
                  />
                </Card.Content>
              </Card.RootStatic>
            </>
          ) : (
            <Card.Root>
              <Card.Content>
                <CardNotLogged cards={dict.feed.cards} />
              </Card.Content>
            </Card.Root>
          )
        }
      </Page.Left>
      <Page.Main>
        <>
          {/* <PesquisaCard textos={dict.pesquisa} regioes={regioes.data} especialidades={especialidades.data}/>            */}
        </>
      </Page.Main>
      <Page.Right>

      </Page.Right>
    </div>
  )
}

