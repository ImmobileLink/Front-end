import { Session } from "@supabase/auth-helpers-nextjs";
import MessageSpace from "./MessageSpace";
import TypingBox from "./TypingBox";
import { MensagemComUsuario } from "../../../../../lib/modelos";
import { supabase } from "../../../../../lib/supabaseClient";



interface ChatSpaceProps {
    idsala: string,
    userSession: Session | null | undefined
}

export default async function ChatSpace({idsala, userSession}: ChatSpaceProps ) {
  let mensagens: MensagemComUsuario[] = []
  const { data, error } = await supabase
  .from('mensagem_com_usuario')
  .select("*")
  .eq('idsala', idsala)
  if(error) {
    console.log(error);
  }  
  else{
    mensagens = data
  }
    

  return (
    <>
       <div className="flex flex-col justify-between h-5/6 ing-2 ring-gray-300 rounded-md bg-white dark:bg-dark-100 drop-shadow-md p-4 mb-3">

        <MessageSpace idsala={idsala} userSession={userSession} mensagens={mensagens}/>
        <TypingBox idsala={idsala} userSession={userSession}/>
       </div>
    </>
  );
}