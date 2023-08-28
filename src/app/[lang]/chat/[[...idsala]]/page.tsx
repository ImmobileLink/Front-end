import { cookies } from "next/headers";
import { cache } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { getDictionary } from "../../dictionaries";
import ChatSpace from "../../(components)/(chat)/ChatSpace";
import ChatHub from "../../(components)/(chat)/ChatHub";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos";

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
      .order('atualizadoem', {ascending: false})
    if (error) {
      console.log("error")
    }
    else {
      return data
    }
  }


  const resultado: UltimaMensagemPorSalaPorUsuario[] | null | undefined = await getLastMessages()
  let messages: UltimaMensagemPorSalaPorUsuario[] = []

  if(resultado) {
    messages = resultado
  }

  return (
    <div className="w-full h-screen bg-branco dark:bg-dark-200 flex justify-center gap-5 pt-4">
      <div className="w-8/12  sm:w-96">
        <ChatHub dict={dict.chat} idsala={salaid} userSession={session} mensagens={messages} />
      </div>
      <div className="hidden xl:block xl:w-8/12">
        <ChatSpace dict={dict.chat} idsala={salaid} userSession={session} />
      </div>
    </div>
  );
}