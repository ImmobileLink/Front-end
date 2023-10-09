"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UltimaMensagemPorSalaPorUsuario, salaUsuario, userGroup } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { useContext, useEffect, useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import ChatHubCard from "./ChatHubCard";
import BottomNav from "./BottomNav";
import { ChatContext } from "../[[...idsala]]/ChatContext";
import { BiArrowBack } from 'react-icons/bi'
import FriendList from "./FriendList";


interface ChatHubProps {
  dict: any;
  idsala: string;
  userId: string | undefined;
  userType: string | undefined;
  userLinks: userGroup | undefined;
  userAssocs: userGroup | undefined;
  mensagens: UltimaMensagemPorSalaPorUsuario[] | null | undefined;
  userRooms: string | undefined
}

const supabase = createClientComponentClient<Database>()

export default function ChatHub({ dict, idsala, userType, userId, userLinks, userAssocs, mensagens, userRooms }: ChatHubProps) {
  const { chatView, toggleChatView } = useContext(ChatContext)
  const [rooms, setRooms] = useState<string | undefined>(userRooms)

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
  const [messages, setMessages] = useState<UltimaMensagemPorSalaPorUsuario[]>(mensagens!)

  //Estados e useRouter para atualizar a lista de conversas quando uma nova msg é enviada (envia o item da conversa para o topo da lista).
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  // //Função para atualizar a lista de conversas
  // const atualizaHub = () => {
  //   setIsFetching(true);
  //   getLastMessages()
  //   setIsFetching(false);

  //   startTransition(() => {
  //     // Refresh the current route and fetch new data from the server without
  //     // losing client-side browser or React state.
  //     router.refresh();
  //   });
  // }

  //Função de fetch que é chamada pela função atualizaHub
  const getLastMessages = async () => {
    if (userId) {
      const { data, error } = await supabase
        .rpc('obter_ultimas_mensagens_por_usuario', {
          idusuario: userId
        })
        .order('atualizadoem', { ascending: false })
      if (error) {
        console.log(error)
      }
      else {
        setMessages(data)
      }
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

  //useEffect com o realtime do supabase para atualizar a lista de conversas quando uma nova mensagem é inserida na mesma sala da URL atual
  useEffect(() => {
    const subscription = supabase.channel("chathub_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mensagem",
          filter: `idsala=in.(${userRooms})`
        },
        () => {
          if (userId) {
            getUserRooms(userId)
              .then((response) => {
                setRooms(response)
              })
          }
          getLastMessages()
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
      <div className="fixed left-0 top-0 right-0 grid row grid-cols-12 py-2 lg:rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
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
      <div className={`flex flex-col h-full pt-[46px] overflow-y-auto snap-start gap-2`}>
        {
          friendListState ?
            <FriendList dict={dict} idsala={idsala} userType={userType} userLinks={userLinks} userAssocs={userAssocs} userId={userId} />
            :
            ''
        }
        <div className={`${convListStyle} max-h-fit overflow-y-auto snap-start flex flex-col gap-2`}>
          {
            messages &&
            messages.map((mensagem) =>
              <ChatHubCard key={mensagem.idmensagem} idsala={idsala} dict={dict.chat} mensagem={mensagem} userId={userId} userAvatar={mensagem.avatarparticipante} />
            )
          }
        </div>
      </div>
      {/* <BottomNav /> */}
    </div>
  );
}