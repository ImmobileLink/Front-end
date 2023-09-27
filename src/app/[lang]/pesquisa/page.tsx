import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { Card } from "../(components)/(compositions)/(card)";
import { Page } from "../(components)/(compositions)/(page)";
import type { Database } from "../../../../lib/database.types";
import { userData } from '../../../../lib/modelos';
import { getAssoc, getLinks, getTipoUsuario } from "../../../../lib/utils/userData";
import { getDictionary } from "../dictionaries";
import PesquisaCard from "./components/PesquisaCard";
import { SearchProvider } from "./components/SearchContext";
import ResultContainer from "./components/ResultContainer";
import NearbyUsers from "./components/NearbyUsers";

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

async function getCorretores(estado: string) {
  const supabase = createServerSupabaseClient();

  let { data, error } = await supabase
    .rpc('obter_corretores_por_estado', {
      estadoinputado: estado
    })

  return data;
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = createServerSupabaseClient();

  let user: userData = {
    id: undefined,
    avatar: undefined,
    isPremium: undefined,
    nome: undefined,
    type: undefined,
    links: [],
    assoc: []
  }

  const dict = await getDictionary(lang); // pt
  const userData = await getUserData(user);
  const tipoImovel = await supabase.from('tipoImovel').select('*');

  let estadoUsuario: string | null;

  if (userData.id) {
    let { data: estado, error } = await supabase.rpc('get_user_estado', { id_usuario: userData.id })
    estadoUsuario = estado![0].estado;
  } else {
    estadoUsuario = "SP";
  }

  const carouselUsers = await getCorretores(estadoUsuario);

  return (
    <SearchProvider>
      <div className="flex justify-center gap-5 mt-4">
        <Page.Left>
          <div className="hidden md:block">
            <PesquisaCard textos={dict.pesquisa} tipoImovel={tipoImovel.data} />
          </div>
        </Page.Left>
        <Page.Main>
          <div className="block md:hidden mb-4">
            <PesquisaCard textos={dict.pesquisa} tipoImovel={tipoImovel.data} />
          </div>
          <Card.Root>
            <Card.Content>
              <NearbyUsers dict={dict.pesquisa.labels} estado={estadoUsuario} carouselUsers={carouselUsers} />
            </Card.Content>
          </Card.Root>
          <ResultContainer dict={dict.pesquisa} />
        </Page.Main>
        <Page.Right>
        </Page.Right>
      </div>
    </SearchProvider>
  )
}