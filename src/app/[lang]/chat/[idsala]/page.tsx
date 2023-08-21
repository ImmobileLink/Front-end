import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import NavProfile from "../../(components)/(cards)/CardProfile";
import NavSettings from "../../(components)/(cards)/CardNavigation";
import { getDictionary } from "../../dictionaries";
import ChatSpace from "../../(components)/(chat)/ChatSpace";

interface pageProps {
  params: {
    lang: string,
    idsala: string
  };
}
const supabase = createServerComponentClient<Database>({cookies})

async function getUserSession() {

  const {
    data: { session }, error
  } = await supabase.auth.getSession();
  if(error)
    console.log(error)
  else
    return session
}

async function getUserData() {
  const session = await getUserSession()

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

export default async function Page({params: { lang, idsala }}: pageProps) {
  const dict = await getDictionary(lang); // pt

  const userData = await getUserData();
  const session = await getUserSession();

  return (
    <div className="w-full h-screen bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
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
      <div className="w-10/12 md:w-8/12 lg:w-6/12">
        <>
          <ChatSpace idsala={idsala} userSession={session}/>
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