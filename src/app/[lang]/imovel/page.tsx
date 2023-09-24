import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getDictionary } from "../dictionaries";
import { Database } from "../../../../lib/database.types";
import NavBar from "../(components)/(navbar)/NavBar";
import Imoveis from "../(components)/(imovel)/Imoveis";
import ImovelCard from "../(components)/(imovel)/ImovelCard";
import { userData } from "../../../../lib/modelos";
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

async function filterAndMapTipos(tiposImovel, classificacao) {
  return tiposImovel
    .filter((obj) => obj.classificacao === classificacao)
    .map((obj) => ({ id: obj.id, descricao: obj.descricao }));
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

  let {data: properties} = await supabase.from("imovel").select("*").eq("idcorporacao", userData.id);

  return (
    <>
      <NavBar params={{ lang: lang }}/>
      <div className="w-auto h-fit min-h-screen  bg-branco dark:bg-dark-200 box-border text-black flex relative mx-auto px-4 mt-4">
          <Imoveis userData={userData} textos={textos} properties={properties} tipos={tipos} outros={outros} mobilias={mobilias} condicoes={condicoes} />
      </div>
    </>
  );
}
