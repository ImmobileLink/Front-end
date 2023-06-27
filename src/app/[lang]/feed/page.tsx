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

interface pageProps {
  params: {
    lang: string;
  };
}
const supabase = createServerComponentClient<Database>({ cookies });

type userDataType = {
  id: string | undefined;
  identificador: string | undefined;
  premium: boolean | undefined;
  role: number | undefined;
  conexoes:
    | {
        id: string;
        nome: string;
      }[]
    | null;
};

async function getUserData() {
  let userData: userDataType = {
    id: undefined,
    identificador: undefined,
    premium: undefined,
    role: undefined,
    conexoes: null,
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
      let { data, error } = await supabase.rpc("get_amigos", {
        id_corretor: session?.user.id,
      });

      userData.conexoes = data;
    }
  }
  return userData;
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  //requisição
  return (
    <div className="w-auto h-fit bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
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
            pub={dict.feed.pub}
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
            <NavFindBrokers cards={dict.feed.cards} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
