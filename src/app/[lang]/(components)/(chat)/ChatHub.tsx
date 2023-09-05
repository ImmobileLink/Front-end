"use client"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos";

import { Database } from "../../../../../lib/database.types";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import ChatHubCard from "./ChatHubCard";
import { Chat } from "@/app/i18n/dictionaries/types";


interface ChatHubProps {
  dict: Chat;
  idsala: string;
  userSession: Session | null | undefined;
  mensagens: UltimaMensagemPorSalaPorUsuario[] | null | undefined
}

const supabase = createClientComponentClient<Database>()

export default function ChatHub({ dict, idsala, userSession, mensagens }: ChatHubProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<UltimaMensagemPorSalaPorUsuario[]>(mensagens!)
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const atualizaHub = () => {
    setIsFetching(true);
    getLastMessages()
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }
  const getLastMessages = async () => {
    const { data, error } = await supabase
      .rpc('obter_ultimas_mensagens_por_usuario', {
        idusuario: userSession?.user.id!
      })
      .order('atualizadoem', {ascending: false})
    if (error) {
      console.log("error")
    }
    else {
      setMessages(data)
    }
  }

  useEffect(() => {
    const subscription = supabase.channel("chathub_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mensagem",
          filter: `idsala=eq.${idsala}`
        },
        async (payload) => {
          atualizaHub()
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    }
  }, [])


  return (
    <div className="flex flex-col justify-start h-5/6 rounded-md bg-white dark:bg-dark-100 drop-shadow-md p-4 mb-3 overflow-auto">
      <div className="ml-2 px-2 rounded-md w-fit bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700 font-sans font-semibold">
        {dict.conversations}
      </div>
      <div className="max-h-fit overflow-y-auto snap-start flex flex-col m-1 p-1 gap-2">
        {
          messages ?
            messages.map((mensagem) =>
              <ChatHubCard key={mensagem.idmensagem} dict={dict} mensagem={mensagem} userSession={userSession} />
            )
            :
            <div></div>
        }
      </div>
    </div>
  );
}