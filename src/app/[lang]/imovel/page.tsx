import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDictionary } from "../dictionaries";
import { Database } from "../../../../lib/database.types";
import Imoveis from "../(components)/(imovel)/Imoveis";
import { CorretorAssociado, TipoImovel, userData } from "../../../../lib/modelos";
import { getAssoc, getLinks, getTipoUsuario } from "../../../../lib/utils/userData";
import { cache } from "react";

interface pageProps {
  params: {
    lang: string;
  };
}

const createServerSupabaseClient = cache(() => {
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

async function filterAndMapTipos(tiposImovel: TipoImovel[], classificacao: string) {
  return tiposImovel
    .filter((obj: TipoImovel) => obj.classificacao === classificacao)
    .map((obj: TipoImovel) => ({ id: obj.id, descricao: obj.descricao, classificacao: obj.classificacao }));
}

async function getBrokers(user: userData) {
  const supabase = createServerSupabaseClient();

  let array: CorretorAssociado[] = [];

  if (user.type == "corporacao") {
    const { data: assoc, error } = await supabase
      .from("associacoes")
      .select("idcorretor")
      .eq("idcorporacao", user.id);

    if (!error) {
      for (let i = 0; i < assoc?.length; i++) {
        const { data, error } = await supabase
          .from("corretor")
          .select(`id,nome,estado,cidade,tipoImovel(id,descricao)`)
          .eq("id", assoc[i].idcorretor);
        if (error) {
          console.log(error);
        } else {
          array = [...array, ...data];
        }
      }
      return array;
    } else {
      console.log(error);
    }
  }
  return array;
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
  const userData = await getUserData(user);
  const dict = await getDictionary(lang); // pt
  const textos = dict.imovel;

  let {data: tiposImovel} = await supabase.from('tipoImovel').select('*');
  const tipos = await filterAndMapTipos(tiposImovel!, 'Tipo');
  const outros = await filterAndMapTipos(tiposImovel!, 'Outros');
  const mobilias = await filterAndMapTipos(tiposImovel!, 'Mobília');
  const condicoes = await filterAndMapTipos(tiposImovel!, 'Condição');

  const { count } = await supabase.from('imovel').select('*', { count: 'estimated', head: true }).eq("idcorporacao", userData.id);
  const corretor = await getBrokers(userData);

  return (
    <>
      <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200 flex justify-center">
        {userData.type == "corporacao" && (
        <div className="flex justify-center w-11/12 max-w-6xl pt-5">
          <Imoveis props={{ userData, textos, count, tipos, outros, mobilias, condicoes, corretor }} />
        </div>
        )}
      </div>
    </>
  );
}
