import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDictionary } from "../dictionaries";
import { Database } from "../../../../lib/database.types";
import NavBar from "../(components)/(navbar)/NavBar";
import Imoveis from "../(components)/(imovel)/Imoveis";
import ImovelCard from "../(components)/(imovel)/ImovelCard";
import { TipoImovel, userData } from "../../../../lib/modelos";
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

async function filterAndMapTipos(tiposImovel: TipoImovel, classificacao: string) {
  return tiposImovel
    .filter((obj: TipoImovel) => obj.classificacao === classificacao)
    .map((obj: TipoImovel) => ({ id: obj.id, descricao: obj.descricao }));
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
  const tipos = await filterAndMapTipos(tiposImovel, 'Tipo');
  const outros = await filterAndMapTipos(tiposImovel, 'Outros');
  const mobilias = await filterAndMapTipos(tiposImovel, 'Mobília');
  const condicoes = await filterAndMapTipos(tiposImovel, 'Condição');

  const { count } = await supabase.from('imovel').select('*', { count: 'estimated', head: true }).eq("idcorporacao", userData.id);

  return (
    <>
      <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200 text-black flex justify-center">
        <div className="flex justify-center w-11/12 max-w-6xl pt-5">
          <Imoveis userData={userData} textos={textos} count={count} tipos={tipos} outros={outros} mobilias={mobilias} condicoes={condicoes} />
          </div>
      </div>
    </>
  );
}
