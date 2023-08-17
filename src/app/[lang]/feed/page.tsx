import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import { userDataType } from "../../../../lib/modelos";
import { Page } from "../(components)/(page)";
import NavCalendar from "../(components)/(feed)/NavCalendar";
import NavProfile from "../(components)/(feed)/NavProfile";
import NavSettings from "../(components)/(feed)/NavSettings";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import NavAmizade from "../(components)/(feed)/NavAmizade";
import NavAssociados from "../(components)/(feed)/NavAssociados";
import NavEmpresaAssociada from "../(components)/(feed)/NavEmpresaAssociada";
import NavFindBrokers from "../(components)/(feed)/NavFindBrokers";

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
            <NavCalendar userData={userData} />
          </>
        ) : (
          ""
        )}
      </Page.Left>
      <Page.Main>
        <FeedPrincipal
          userData={userData}
          textos={dict.feed}
        />
      </Page.Main>
      <Page.Right>
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
      </Page.Right>
    </Page.Root>
  );
}
