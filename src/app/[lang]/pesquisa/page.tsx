import { Card } from "../(components)/(compositions)/(card)";
import { CorretorCarouselItem, userData } from '../../../../lib/modelos';
import { getUserData } from "../../../../lib/utils/userData";
import { getDictionary } from "../dictionaries";
import PesquisaCard from "./components/PesquisaCard";
import { SearchProvider } from "./searchContext";
import ResultContainer from "./components/ResultContainer";
import NearbyUsers from "./components/NearbyUsers";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getTiposImovel } from "../imovel/imovelUtils";
import { getCorretores, getUserEstadoAPI } from "./pesquisaUtils";

interface pageProps {
  params: {
    lang: string;
  };
}



export default async function page({ params: { lang } }: pageProps) {
  const supabase = await serverSupabase();
  const dict = await getDictionary(lang); // pt
  const userData = await getUserData(supabase);
  const tipoImovel = await getTiposImovel(supabase);
  let estadoUsuario;
  if (userData.id) {
    const estado = await getUserEstadoAPI(userData.id, supabase)
    if (estado) {
      estadoUsuario = estado![0].estado;
    }
    else {
      estadoUsuario = "SP";
    }
  } else {
    estadoUsuario = "SP";
  }

  let carouselUsers;
  if (estadoUsuario) {
    carouselUsers = await getCorretores(estadoUsuario, supabase);
  }

  return (
    <SearchProvider>
      <div className="flex justify-center gap-5 mt-4 select-none">
        <div className="hidden lg:flex flex-col lg:w-3/12 lg:max-w-xs lg:min-w-[320px]">
          <div className="hidden md:block">
            <PesquisaCard textos={dict.pesquisa} tipoImovel={tipoImovel} />
          </div>
        </div>
        <div className="w-11/12 lg:w-7/12 lg:min-w-[650px]">
          <div className="block lg:hidden mb-4">
            <PesquisaCard textos={dict.pesquisa} tipoImovel={tipoImovel} />
          </div>
          <div className="hidden lg:block">
            <Card.Root>
              <Card.Content>
                <NearbyUsers dict={dict.pesquisa.labels} estado={estadoUsuario} carouselUsers={carouselUsers} userId={userData.id!} />
              </Card.Content>
            </Card.Root>
          </div>
          <ResultContainer dict={dict.pesquisa} userId={userData.id!} />
        </div>
      </div>
    </SearchProvider>
  )
}