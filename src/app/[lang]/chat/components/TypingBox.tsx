"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { AiOutlineFileImage, AiOutlineSend } from "react-icons/ai";
import { insertMessage } from "../../../../../lib/utils/Messages";
import ImageUpload from "../../(components)/ImageUpload";
import { MdInsertEmoticon } from "react-icons/md";
import { BiSolidImage } from "react-icons/bi";
import EmojiPicker, { EmojiClickData, Theme, EmojiStyle } from 'emoji-picker-react';
import { AiOutlineClose, AiFillFileImage } from "react-icons/ai"
import { Chat } from "@/app/i18n/dictionaries/types";

interface TypingBoxProps {
  dict: Chat,
  idsala: string,
  userId: string | undefined;
}
const supabase = createClientComponentClient<Database>()

export default function TypingBox({ dict, idsala, userId }: TypingBoxProps) {
  const [texto, setTexto] = useState<string>('')
  const [imagem, setImagem] = useState<File>()

  const [loading, setLoading] = useState<boolean>(false)

  const [emojiView, setEmojiView] = useState<boolean>(false)

  const handleUserKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if ((texto != '' || imagem) && userId) {
      const response = await insertMessage({ idautor: userId, idsala, mensagem: texto, imagem })
      if (response === false) {
        setTexto('')
        setImagem(undefined);
      }
    }
  }

  const handleImageUpload = async (file: File | false) => {
    if (file) {
      setImagem(file);
    } else {
      setImagem(undefined);
    }
    console.log(imagem)
  };

  const handleEmoji = (emojiObject: any) => {
    console.log(emojiObject)
    setTexto((prevMsg) => prevMsg + emojiObject.emoji)
  }

  return (
    <>
      <div className="flex flex-col px-2 py-1 lg:px-3 lg:py-2 lg:rounded-lg bg-gray-200 dark:bg-gray-600">
        {
          imagem != undefined &&
          <div className="flex flex-row items-center gap-x-3 text-sm lg:text-base">
            <AiOutlineFileImage size={18}/>
            {dict.uploadedfile}
            <div onClick={e=>setImagem(undefined)}>
              <AiOutlineClose/>
            </div>
          </div>
        }
        <div className="flex items-center w-full mt-1">
          <button className="p-2 inline-flex justify-center text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <ImageUpload onImageUpload={handleImageUpload} label={<BiSolidImage size={24} />} noText={true} />
          </button>

          <button className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
            <MdInsertEmoticon size={24} onClick={e => setEmojiView(!emojiView)} />
          </button>

          {
            emojiView &&
            <div className="fixed bottom-20">
              <EmojiPicker emojiVersion={'4.0'} theme={Theme.AUTO} emojiStyle={EmojiStyle.NATIVE} onEmojiClick={(emojiObject) => handleEmoji(emojiObject)} />
            </div>
          }

          <textarea value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={handleUserKeyPress} className="block resize-none mx-1 lg:mx-4 p-2.5 w-full text-xs sm:text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
          <button className="inline-flex justify-center p-2 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-full"
            onClick={handleSubmit}>
            <AiOutlineSend className="text-lg text-white self-center" />
          </button>
        </div>
      </div>
    </>
  );
}
