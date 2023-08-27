import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import { getDictionary } from "../dictionaries";
import NavProfile from "../(components)/(feed)/NavProfile";
import NavSettings from "../(components)/(feed)/NavSettings";
import NavCalendar from "../(components)/(feed)/NavCalendar";
import NavAmizade from "../(components)/(feed)/NavAmizade";
import NavFindBrokers from "../(components)/(feed)/NavFindBrokers";
import NavAssociados from "../(components)/(feed)/NavAssociados";
import NavEmpresaAssociada from "../(components)/(feed)/NavEmpresaAssociada";
import { userDataType } from "../../../../lib/modelos";

interface pageProps {
  params: {
    lang: string;
  };
}
const supabase = createServerComponentClient<Database>({ cookies });

async function getUserData() {
  let userData: userDataType = {
    id: undefined,
    identificador: undefined,
    premium: undefined,
    role: undefined,
    conexoes: null,
    associados: null,
    associados2: null
  };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    {
      let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
        id_usuario: session?.user.id,
      });

      userData.id = session?.user.id;
      userData.identificador = data![0].identificador;
      userData.premium = data![0].premium;
      userData.role = data![0].role;
    }
    {
      let { data, error } = await supabase.rpc("get_connected_users", {
        id_usuario: session?.user.id,
      });

      userData.conexoes = data;
    }
    if (userData.role == 2) {
      let { data, error } = await supabase.rpc(
        "obter_corretores_por_corporacao",
        {
          id_corporacao: session?.user.id,
        }
      );

      userData.associados = data;
    }
    if (userData.role == 1) {
      let { data, error } = await supabase.rpc(
        "obter_corporacoes_por_corretor",
        {
          id_corretor: session?.user.id,
        }
      );

      userData.associados2 = data;
    }
  }
  return userData;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  //requisição
  return (
    <div className="w-auto h-fit min-h-screen bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
      <div className="hidden md:flex md:w-3/12 lg:flex flex-col lg:w-2/12 gap-4">
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
            <NavCalendar userData={userData} />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="w-11/12 md:w-8/12 lg:w-6/12">
        <>
          <FeedPrincipal
            userData={userData}
            textos={dict.feed}
          />
        </>
      </div>
      <div className="hidden lg:flex flex-col lg:w-2/12 gap-4">
        {userData.id ? (
          <>
            <NavAmizade
              userData={userData}
              cards={dict.feed.cards}
            />
            {userData.role == 1 ? (
              <NavEmpresaAssociada
                userData={userData}
                cards={dict.feed.cards}
              />
            ) : (
              <p></p>
            )}
            {userData.role == 2 ? (
              <NavAssociados
                userData={userData}
                cards={dict.feed.cards}
              />
            ) : (
              <p></p>
            )}
            <NavFindBrokers cards={dict.feed.cards} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
