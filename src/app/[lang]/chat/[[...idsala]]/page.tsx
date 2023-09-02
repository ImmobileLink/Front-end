import { cookies } from "next/headers";
import { cache } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { getDictionary } from "../../dictionaries";
import ChatSpace from "../../(components)/(chat)/ChatSpace";
import ChatHub from "../../(components)/(chat)/ChatHub";
import { UltimaMensagemPorSalaPorUsuario, userData } from "../../../../../lib/modelos";
import { getAssoc, getLinks, getTipoUsuario } from "../../../../../lib/utils/userData";
import { ChatProvider } from "./chatContext";
import ChatSpaceClient from "../../(components)/(chat)/ChatSpaceClient";

interface pageProps {
  params: {
    lang: string,
    idsala: string
  };
}

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserSession() {
  const supabase = createServerSupabaseClient()
  const {
    data: { session }, error
  } = await supabase.auth.getSession();
  if (error)
    console.log(error)
  else
    return session
}

export default async function Page({ params: { lang, idsala } }: pageProps) {
  const supabase = createServerSupabaseClient()
  const dict = await getDictionary(lang); // pt

  const session = await getUserSession();
  let salaid = idsala
  if (Array.isArray(idsala)) {
    salaid = idsala[0]
  }

  const getLastMessages = async () => {
    const { data, error } = await supabase
      .rpc('obter_ultimas_mensagens_por_usuario', {
        idusuario: session?.user.id!
      })
      .order('atualizadoem', { ascending: false })
    if (error) {
      console.log("error")
    }
    else {
      return data
    }
  }

  let user: userData = {
    links: [],
    assoc: []
  };

  async function getUserData() {
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


  const resultado: UltimaMensagemPorSalaPorUsuario[] | null | undefined = await getLastMessages()
  let messages: UltimaMensagemPorSalaPorUsuario[] = []

  if (resultado) {
    messages = resultado
  }
  const userData = await getUserData();

  return (
    <ChatProvider>
      <div className="flex justify-center lg:items-center h-full pt-[72px] lg:w-auto lg:h-4/6 lg:min-h-screen bg-branco dark:bg-dark-200 gap-5">
        <ChatHub dict={dict} idsala={salaid} userType={userData.type} userId={userData.id} userLinks={userData.links} userAssocs={userData.assoc} mensagens={messages} />
        <ChatSpaceClient dict={dict.chat} idsala={salaid} userId={userData.id}>
          <ChatSpace dict={dict.chat} idsala={salaid} userId={userData.id} />
        </ChatSpaceClient>
      </div>
    </ChatProvider>
  );
}