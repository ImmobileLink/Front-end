"use client";

import { useState } from "react";
import { MensagemAInserir } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { AiOutlineSend } from "react-icons/ai";

interface TypingBoxProps {
  idsala: string,
  userId: string | undefined;
}
const supabase = createClientComponentClient<Database>()

export default function TypingBox({ idsala, userId }: TypingBoxProps) {
  const [texto, setTexto] = useState<string>('')

  const handleUserKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (texto != '' && userId) {
      const mensagem: MensagemAInserir = {
        idautor: userId,
        idsala: idsala,
        mensagem: texto
      };
      const { error } = await supabase
        .from('mensagem')
        .insert(mensagem)
      if (error) {
        console.log(error)
      }
      else {
        setTexto('')
      }
    }
  }

  return (
    <>
      <div className="flex items-center px-2 py-1 lg:px-3 lg:py-2 lg:rounded-lg bg-gray-200 dark:bg-gray-600">
        <button className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Upload</span>
        </button>

        <button className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
          <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Add emoji</span>
        </button>

        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={handleUserKeyPress} className="block resize-none mx-1 lg:mx-4 p-2.5 w-full text-xs sm:text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
        <button className="inline-flex justify-center p-2 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-full" 
        onClick={handleSubmit}>
          <AiOutlineSend className="text-lg text-white self-center" />
        </button>
      </div>
    </>
  );
}
