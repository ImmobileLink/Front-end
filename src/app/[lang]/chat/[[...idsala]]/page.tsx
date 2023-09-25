import { cookies } from "next/headers";
import { cache } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { getDictionary } from "../../dictionaries";
import ChatSpace from "../components/ChatSpace";
import ChatHub from "../components/ChatHub";
import ChatSpaceClient from "../components/ChatSpaceClient";
import { UltimaMensagemPorSalaPorUsuario, userData } from "../../../../../lib/modelos";
import { getAssoc, getLinks, getTipoUsuario } from "../../../../../lib/utils/userData";
import { ChatProvider } from "./chatContext";

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

export default async function Page({ params: { lang, idsala } }: pageProps) {
  const supabase = createServerSupabaseClient()
  const dict = await getDictionary(lang); // pt

  let salaid = idsala
  if (Array.isArray(idsala)) {
    salaid = idsala[0]
  }

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

  const getLastMessages = async () => {
    const userData = await getUserData()
    let userId = ''
    if (userData.id) {
      userId = userData.id
    }
    const { data, error } = await supabase
      .rpc('obter_ultimas_mensagens_por_usuario', {
        idusuario: userId
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




  const resultado: UltimaMensagemPorSalaPorUsuario[] | null | undefined = await getLastMessages()
  let messages: UltimaMensagemPorSalaPorUsuario[] = []

  if (resultado) {
    messages = resultado
  }
  const userData = await getUserData();

  return (
    <ChatProvider>
      <div className="fixed flex top-0 bottom-0 pt-[72px] left-0 right-0 justify-center lg:items-center lg:w-auto gap-5">
        <ChatHub dict={dict} idsala={salaid} userType={userData.type} userId={userData.id} userLinks={userData.links} userAssocs={userData.assoc} mensagens={messages} />
        <ChatSpaceClient dict={dict.chat} idsala={salaid} userId={userData.id}>
          <ChatSpace dict={dict.chat} idsala={salaid} userId={userData.id} />
        </ChatSpaceClient>
      </div>
    </ChatProvider>
  );
} 