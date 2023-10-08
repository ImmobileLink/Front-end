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
import { ChatProvider } from "./ChatContext";

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
      console.log(error)
    }
    else {
      return data
    }
  }

  const getUserRooms = async (idusuario: string) => {
    const { data, error } = await supabase
      .from('usuarioporsala')
      .select('idsala')
      .eq('idusuario', idusuario)
    if (error) {
      console.log(error)
    }
    else {
      const array = data.map(item => item.idsala)
      const string = array.toString()
      return string
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
  let userRooms: string | undefined = ''
  if(userData.id){
    userRooms = await getUserRooms(userData.id)
  }
  return (
    <ChatProvider>
      <div className="flex h-[calc(100vh-72px)] justify-center lg:items-center lg:w-auto gap-5">
        <ChatHub dict={dict} idsala={salaid} userType={userData.type} userId={userData.id} userLinks={userData.links} userAssocs={userData.assoc} mensagens={messages} userRooms={userRooms}/>
        <ChatSpaceClient dict={dict.chat} idsala={salaid} userId={userData.id}>
          <ChatSpace dict={dict.chat} idsala={salaid} userId={userData.id} />
        </ChatSpaceClient>
      </div>
    </ChatProvider>
  );
} 