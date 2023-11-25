"use client"
import { Suspense, useEffect, useState } from "react";
import { Mensagem } from "../../../../../lib/modelos";
import { Chat } from "@/app/i18n/dictionaries/types";
import MessageCard from "./MessageCard";
import { clientSupabase } from "lib/utils/clientSupabase";
import { Spinner } from "flowbite-react";

interface MessageSpaceProps {
  dict: Chat,
  idsala: string,
  mensagens: Mensagem[]
}

export default function MessageSpace({ mensagens, idsala }: MessageSpaceProps) {
  const supabase = clientSupabase()

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex flex-col-reverse h-full lg:ml-2 p-2 overflow-y-auto snap-end space-y-5">
      <Suspense fallback={<Spinner/>}>
        <div className="flex flex-col">
          {
            messages ?
              messages.map((message: Mensagem) =>
                <MessageCard key={message.id} message={message} />
              )
              :
              ''
          }
        </div>
      </Suspense>
    </div>
  );
}
