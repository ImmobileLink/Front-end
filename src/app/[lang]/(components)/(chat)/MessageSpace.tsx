"use client";
import { useEffect, useState } from "react";
import { MensagemComUsuario } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import Avatar from "../Avatar";
import { formataData } from "../../../../../lib/utils/formataData";

interface MessageSpaceProps {
  idsala: string,
  userSession: Session | null | undefined,
  mensagens: MensagemComUsuario[]
}
const supabase = createClientComponentClient<Database>()


const getNomeUsuario = async (idautor: string) => {
  const { data, error } = await supabase.from('simple_user_data').select('nome').eq('id', idautor)
  if(error) {
    console.log(error)
  }
  else {
    return data[0].nome
  }
}

export default function MessageSpace({idsala, userSession, mensagens}: MessageSpaceProps) {
  const [messages, setMessages] = useState<MensagemComUsuario[]>(mensagens)

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
      async (payload: { new: MensagemComUsuario}) => {
        const nomeusuario = await getNomeUsuario(payload.new.idautor!)
        payload.new.nomeautor = nomeusuario!
        setMessages((messages:MensagemComUsuario[]) => [...messages, payload.new]);
      }
    )
    .subscribe();
    return () => {
      subscription.unsubscribe();
    }
  }, [])

  return (
    <div className="max-h-fit overflow-y-auto snap-start flex flex-col-reverse m-3 p-3">
      <div className="flex flex-col">
        {
          messages ?
          messages.map((message: MensagemComUsuario) => 
            <div key={message.id} className="flex flex-col items-bottom space-x-12 space-y-1">

              <div className="flex flex-row items-center space-x-3">
                <Avatar userId={message.idautor} size={10}/>
                <p className="text-sm">{message.nomeautor}</p>
                <p>{formataData(message.enviadoem!)}</p>
              </div>
              
              <li className="flex break-all list-none align-bottom items-bottom text-xl font-sans font-semibold text-slate-900 dark:text-gray-300">          
              {message.mensagem} 
              </li>
            </div>     
          )
          :
          ''
        }
      </div>
      
    </div>
  );
}
