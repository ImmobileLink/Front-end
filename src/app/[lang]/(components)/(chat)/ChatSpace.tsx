import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MessageSpace from "./MessageSpace";
import TypingBox from "./TypingBox";
import { Mensagem } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import ChatHeader from "./ChatHeader";
import { Chat } from "@/app/i18n/dictionaries/types";
import { cache } from "react";
import BottomNav from "./BottomNav";

interface ChatSpaceProps {
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}
export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function ChatSpace({ dict, idsala, userId }: ChatSpaceProps) {
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
        if (mensagens[0].idsala == null) {
          mensagens = []
        }
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <>
      <div className="h-full lg:h-full lg:w-full flex flex-col w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md">
        {
          idsala != null &&
            <ChatHeader key={iddestinatario} idparticipante={iddestinatario} nomeparticipante={nomedestinatario} />
        }
        <MessageSpace dict={dict} mensagens={mensagens} idsala={idsala} />
        {
          idsala != null &&
            <TypingBox idsala={idsala} userId={userId} />
        }
        <div className="">
          <BottomNav />
        </div>
      </div>
    </>

  );
}