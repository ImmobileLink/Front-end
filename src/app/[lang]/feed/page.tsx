import NavCard from "@/app/[lang]/(components)/NavCard";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";
import FeedPrincipal from "../(components)/(feed)/FeedPrincipal";
import { getDictionary } from "../dictionaries";
import NavProfile from "../(components)/(feed)/NavProfile";
import { supabase } from "../../../../lib/supabaseClient";
import NavSettings from "../(components)/(feed)/NavSettings";
import Calendario from './../(components)/Calendario';
import NavCalendar from "../(components)/(feed)/NavCalendar";

interface pageProps {
  params: {
    lang: string;
  };
}

async function getUserData() {
  const supabaseServerClient = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();

  if(session?.user.id) {
    let { data } = await supabase.rpc("consultar_tipo_usuario", {
      id_usuario: session?.user.id,
    });
  
    const id = session?.user.id;
    const identificador = data![0].identificador;
    const premium = data![0].premium;
    const role = data![0].role;
  
    return {
      id: id,
      identificador: identificador,
      premium: premium,
      role: role
    };
  } else {
    return {
      id: undefined,
      identificador: undefined,
      premium: undefined,
      role: undefined
    };
  }
}

export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();

  //requisição
  return (
    <div className="w-screen h-fit bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
      <div className="hidden md:block md:w-3/12 lg:block lg:w-2/12">
        <NavProfile
          userData={userData}
          cards={dict.feed.cards}
        />
        <NavSettings
          userData={userData}
          cards={dict.feed.cards}
        />
      </div>
      <div className="w-11/12 md:w-8/12 lg:w-6/12">
        <>
          <FeedPrincipal userData={userData} pub={dict.feed.pub}/>
        </>
      </div>
      <div className="hidden md:hidden lg:block w-2/12">
        {/* <NavCalendar 
          userData={userData}
        /> */}
      </div>
    </div>
  );
}
