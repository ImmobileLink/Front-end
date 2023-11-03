import { getDictionary } from "../dictionaries";
import Imoveis from "./components/Imoveis";
import { getUserData } from "../../../../lib/utils/userData";
import { serverSupabase } from "lib/utils/serverSupabase";
import { filterAndMapTipos, getBrokers, getCountImovel, getTiposImovel } from "./imovelUtils";

interface pageProps {
  params: {
    lang: string;
  };
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = await serverSupabase();
  const userData = await getUserData(supabase);
  const dict = await getDictionary(lang); // pt
  const textos = dict.imovel;

  const tiposImovel = await getTiposImovel(supabase)
  const tipos = await filterAndMapTipos(tiposImovel!, 'Tipo');
  const outros = await filterAndMapTipos(tiposImovel!, 'Outros');
  const mobilias = await filterAndMapTipos(tiposImovel!, 'Mobília');
  const condicoes = await filterAndMapTipos(tiposImovel!, 'Condição');

  let count: number | null = 0
  if(userData.id) {
    count = await getCountImovel(userData.id, supabase)
  }
  
  const corretor = await getBrokers(userData, supabase);

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
