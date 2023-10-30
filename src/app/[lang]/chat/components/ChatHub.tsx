"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UltimaMensagemPorSalaPorUsuario, salaUsuario, userGroup } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Suspense, useContext, useEffect, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import ChatHubCard from "./ChatHubCard";
import { ChatContext } from "../[[...idsala]]/chatContext";
import { BiArrowBack } from 'react-icons/bi'
import FriendList from "./FriendList";
import { NotificationContext } from "../../(components)/(navbar)/NotificationContext";
import { getLastMessages, getUserRooms } from "../[[...idsala]]/utils";


interface ChatHubProps {
  dict: any;
  idsala: string;
  userId: string | undefined;
  userType: string | undefined;
  userLinks: userGroup | undefined;
  userAssocs: userGroup | undefined;
}

const supabase = createClientComponentClient<Database>()

export default function ChatHub({ dict, idsala, userType, userId, userLinks, userAssocs }: ChatHubProps) {
  const { chatView, toggleChatView } = useContext(ChatContext)
  const { toggleChatNotification } = useContext(NotificationContext)
  const { chatNewMessages, toggleChatNewMessages } = useContext(NotificationContext)
  const [rooms, setRooms] = useState<string | undefined>()

  let chatStyle = 'flex'

  if (chatView) {
    if (typeof idsala === 'undefined') {
      chatStyle = 'flex'
    }
    else {
      chatStyle = 'hidden lg:block'
    }
  }
  else {
    chatStyle = 'flex'
  }

  //Recebe as últimas mensagens enviadas pelo usuário, bem como o id e nome do "outro participante" da conversa
  const [messages, setMessages] = useState<UltimaMensagemPorSalaPorUsuario[]>()

  //Estados e useRouter para atualizar a lista de conversas quando uma nova msg é enviada (envia o item da conversa para o topo da lista).
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  //Função para atualizar a lista de conversas
  const atualizaHub = () => {
    setIsFetching(true);
    if (userId) {
      getLastMessages(userId, supabase)
        .then((response) => {
          setMessages(response)
        })
    }
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  useEffect(() => {
    if (userId) {
      getUserRooms(userId, supabase)
        .then((response) => {
          setRooms(response)
        })
      getLastMessages(userId, supabase)
        .then((response) => {
          setMessages(response)
        })
    }

    const subscription = supabase.channel("userRoom_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "usuarioporsala",
          filter: `idusuario=eq.${userId}`
        },
        () => {
          if (userId) {
            getUserRooms(userId, supabase)
              .then((response) => {
                setRooms(response)
              })
          }
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    }
  }, [])

  //useEffect com o realtime do supabase para atualizar a lista de conversas quando uma nova mensagem é inserida na mesma sala da URL atual
  useEffect(() => {
    toggleChatNotification(false)
    const subscription = supabase.channel("chathub_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mensagem",
          filter: `idsala=in.(${rooms})`
        },
        () => {
          atualizaHub()
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    }
  }, [messages])

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
    <div className={`${chatStyle} flex-col justify-start h-full lg:h-5/6 w-screen lg:w-3/12 rounded-md bg-white dark:bg-dark-100 drop-shadow-md`}>
      <div className="grid row grid-cols-12 py-2 lg:rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
        {
          friendListState ?
            <div onClick={handleFriendList} className="col-start-1 col-span-4 self-center ml-2 w-fit flex cursor-pointer text-gray-900 dark:text-white focus:ring-4 font-medium text-sm px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800">
              <BiArrowBack size={20} />
            </div>
            :
            <div className="col-start-1 col-span-4 self-center ml-2 px-2 rounded-md w-fit font-sans font-semibold">
              {dict.chat.conversations}
            </div>
        }

        <div className="flex justify-end mr-2 col-span-8 col-end-13 items-center">
          <button onClick={handleFriendList} className={`${friendListButtonStyle} flex cursor-pointer text-white focus:ring-4 font-medium text-sm px-5 py-1 focus:outline-none rounded-lg`}>
            {dict.chat.newconversation}
          </button>
        </div>
      </div>
      <div className={`flex flex-col h-[calc(100vh-72px)] overflow-y-auto snap-start gap-2`}>
        {
          friendListState ?
            <FriendList dict={dict} idsala={idsala} userType={userType} userLinks={userLinks} userAssocs={userAssocs} userId={userId} />
            :
            ''
        }
        <div className={`${convListStyle} max-h-fit overflow-y-auto snap-start flex flex-col gap-2`}>
          {
            messages &&
            messages.map((mensagem) => {
              const included = chatNewMessages.includes(mensagem.idsala)
              let selected = false
              if (idsala == mensagem.idsala) {
                selected = true;
              }
              return (
                <ChatHubCard key={mensagem.idmensagem} idsala={mensagem.idsala} dict={dict.chat} mensagem={mensagem} userId={userId} userAvatar={mensagem.avatarparticipante} highlight={included} selected={selected} />
              )
            }
            )
          }
        </div>
      </div>
      {/* <BottomNav /> */}
    </div>
  );
}