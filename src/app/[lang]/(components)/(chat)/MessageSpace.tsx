"use client"
import { useEffect, useState } from "react";
import { Mensagem } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Chat } from "@/app/i18n/dictionaries/types";
import MessageCard from "./MessageCard";

interface MessageSpaceProps {
  dict: Chat,
  idsala: string,
  mensagens: Mensagem[]
}
const supabase = createClientComponentClient<Database>()

export default function MessageSpace({ dict, mensagens, idsala }: MessageSpaceProps) {

  const [messages, setMessages] = useState<Mensagem[]>(mensagens)

  useEffect(() => {
    const subscription = supabase.channel("message_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mensagem",
          filter: `idsala=eq.${idsala}`
        }, 
        (payload: { new: Mensagem }) => {
          setMessages((messages: Mensagem[]) => [...messages, payload.new]);
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    }
  },[])

  return (
    <div className="flex flex-col-reverse lg:ml-2 p-2 overflow-y-auto snap-end  space-y-5">
      <div className="flex flex-col">
        {
          messages ?
            messages.map((message: Mensagem) =>
              <MessageCard key={message.id} message={message}/>
            )
            :
            ''
        }
      </div>
    </div>
  );
}
