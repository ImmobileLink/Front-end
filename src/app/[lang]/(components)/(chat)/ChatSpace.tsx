import { Session, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MessageSpace from "./MessageSpace";
import TypingBox from "./TypingBox";
import { Mensagem } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import ChatHeader from "./ChatHeader";
import { Chat } from "@/app/i18n/dictionaries/types";
import { cache } from "react";

interface ChatSpaceProps {
  dict: Chat;
  idsala: string,
  userSession: Session | null | undefined
}
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function ChatSpace({ dict, idsala, userSession }: ChatSpaceProps) {
  const supabase = createServerSupabaseClient()
  
  let iddestinatario = null;
  let nomedestinatario = null;
  let mensagens: Mensagem[] = []
  if (idsala != null) {
    const { data, error } = await supabase
      .rpc('get_dados_sala', {
        idsala_param: idsala
      })
    if (error) {
      console.log(error)
    }
    else {
      try {
        iddestinatario = data[0].iddestinatario
        nomedestinatario = data[0].nomedestinatario

          Object.assign(mensagens, data[0].mensagens)
          if(mensagens[0].idsala == null){
            mensagens = []
          }
      }
      catch(e) {
        console.log(e)
      }
    }
  }
  return (
    <>
      <div className="flex flex-col h-5/6 rounded-md bg-white dark:bg-dark-100 drop-shadow-md p-4 mb-3">
        {
          idsala != null ?
            <ChatHeader key={iddestinatario} idparticipante={iddestinatario} nomeparticipante={nomedestinatario} />
            :
            <div></div>
        }
        <MessageSpace dict={dict} mensagens={mensagens} userSession={userSession} idsala={idsala} />
        {
          idsala != null ?
            <TypingBox idsala={idsala} userSession={userSession} />
            :
            <div></div>
        }
      </div>
    </>

  );
}