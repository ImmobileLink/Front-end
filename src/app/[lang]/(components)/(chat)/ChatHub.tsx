"use client"
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UltimaMensagemPorSalaPorUsuario, userGroup } from "../../../../../lib/modelos";

import { Database } from "../../../../../lib/database.types";
import { useContext, useEffect, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import ChatHubCard from "./ChatHubCard";
import { Chat } from "@/app/i18n/dictionaries/types";
import CardItem from "../(cards)/CardItem";
import FriendList from "./FriendList";
import BottomNav from "./BottomNav";
import { ChatContext } from "../../chat/[[...idsala]]/chatContext";


interface ChatHubProps {
  dict: any;
  idsala: string;
  userId: string | undefined;
  userLinks: userGroup;
  mensagens: UltimaMensagemPorSalaPorUsuario[] | null | undefined;
  children: any
}

const supabase = createClientComponentClient<Database>()

export default function ChatHub({ dict, idsala, userId, userLinks, mensagens, children }: ChatHubProps) {
  const { chatView, toggleChatView } = useContext(ChatContext)

  let chatStyle = 'flex'

  if (chatView) {
    chatStyle = 'hidden lg:block'
  }
  else {
    chatStyle = 'flex'
  }

  //Recebe as últimas mensagens enviadas pelo usuário, bem como o id e nome do "outro participante" da conversa
  const [messages, setMessages] = useState<UltimaMensagemPorSalaPorUsuario[]>(mensagens!)

  //Estados e useRouter para atualizar a lista de conversas quando uma nova msg é enviada (envia o item da conversa para o topo da lista).
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  //Função para atualizar a lista de conversas
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

  //Função de fetch que é chamada pela função atualizaHub
  const getLastMessages = async () => {
    if (userId) {
      const { data, error } = await supabase
        .rpc('obter_ultimas_mensagens_por_usuario', {
          idusuario: userId
        })
        .order('atualizadoem', { ascending: false })
      if (error) {
        console.log("error")
      }
      else {
        setMessages(data)
      }
    }
  }

  //useEffect com o realtime do supabase para atualizar a lista de conversas quando uma nova mensagem é inserida na mesma sala da URL atual
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

  const style = 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
  //Exibe a lista de amigos
  const [friendListState, setFriendListState] = useState<boolean>(false);
  const [friendListButtonStyle, setFriendListButtonStyle] = useState<string>(style)
  const [convListStyle, setConvListStyle] = useState<string>('')

  const handleFriendList = (e: any) => {
    setFriendListState(!friendListState)
    if (convListStyle != 'hidden') {
      setConvListStyle('hidden')
    }
    else {
      setConvListStyle('')
    }
    if (friendListButtonStyle == style) {
      setFriendListButtonStyle('bg-blue-500 hover:bg-blue-600 focus:ring-blue-100 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700')
    }
    else {
      setFriendListButtonStyle(style)
    }
  }

  return (
    <div className={`${chatStyle} flex-col justify-start h-full w-screen lg:h-5/6 lg:w-3/12 rounded-md bg-white dark:bg-dark-100 drop-shadow-md`}>
      <div className="fixed left-0 top-0 right-0 grid row grid-cols-12 py-2 lg:rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
        <div className="col-start-1 col-span-4 self-center ml-2 px-2 rounded-md w-fit font-sans font-semibold">
          {dict.chat.conversations}
        </div>
        <div className="flex justify-end mr-2 col-span-8 col-end-13 items-center">
          <button onClick={handleFriendList} className={`${friendListButtonStyle} flex cursor-pointer text-white focus:ring-4 font-medium text-sm px-5 py-1 focus:outline-none rounded-lg`}>
            {dict.chat.newconversation}
          </button>
        </div>
      </div>
      <div className={`flex flex-col h-full pt-[46px] overflow-y-auto snap-start gap-2`}>
        {
          friendListState ?
            children
            :
            ''
        }
        <div className={`${convListStyle} max-h-fit overflow-y-auto snap-start flex flex-col gap-2`}>
          {
            messages &&
            messages.map((mensagem) =>
              <ChatHubCard key={mensagem.idmensagem} dict={dict.chat} mensagem={mensagem} userId={userId} />
            )
          }
        </div>
      </div>
      <BottomNav />
    </div>
  );
}