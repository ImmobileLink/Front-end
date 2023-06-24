"use client";

import { useState } from "react";
import { MensagemAInserir } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";

interface TypingBoxProps {
  idsala: string,
  userSession: Session | null | undefined
}
const supabase = createClientComponentClient<Database>()

export default function TypingBox({idsala, userSession}: TypingBoxProps) {
  const [texto, setTexto] = useState<string>('')

  const handleSubmit = async () => {
    console.log(userSession?.user.id!)
    const mensagem: MensagemAInserir = {
      idautor: userSession?.user.id!,
      idsala: idsala,
      mensagem: texto,
    };
    const { error } = await supabase
    .from('mensagem')
    .insert(mensagem)
    if(error) {
      console.log(error)
    }
    else {
      setTexto('')
    }
  }

  return (
    <>
      <div className="flex">
        <textarea 
            className="text-lg font-mono font-semibold bg-gray-400 dark:bg-gray-300 grow p-3 rounded-md text-slate-900"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
        />
        <button className="p-3 ml-3 mr-2 my-3 bg-slate-900 hover:bg-slate-800 focus:ring-slate-300 rounded-full" 
        onClick={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
      </button>
      </div>  
    </>
  );
}
