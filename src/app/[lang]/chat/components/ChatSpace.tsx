import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MessageSpace from "./MessageSpace";
import TypingBox from "./TypingBox";
import { Mensagem } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import ChatHeader from "./ChatHeader";
import { Chat } from "@/app/i18n/dictionaries/types";
import { cache } from "react";
import Image from "next/image";
import { getRoomData } from "../[[...idsala]]/utils";

interface ChatSpaceProps {
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function ChatSpace({ dict, idsala, userId }: ChatSpaceProps) {

  const roomData = await getRoomData(idsala, createServerSupabaseClient)
  return (
    <>
      {
        idsala != null ?
          <div className="flex flex-col h-full lg:w-full w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md">
            {
              idsala != null &&
              <ChatHeader key={roomData!.iddestinatario} idparticipante={roomData!.iddestinatario} nomeparticipante={roomData!.nomedestinatario} avatarparticipante={roomData!.avatardestinatario} />
            }
            <MessageSpace dict={dict} mensagens={roomData!.mensagens} idsala={idsala} />
            {
              idsala != null &&
              <TypingBox dict={dict} idsala={idsala} userId={userId} />
            }
            {/* <BottomNav /> */}
          </div>
          :
          <div className="hidden lg:flex h-full lg:w-full flex-col w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md">

            <div className="flex flex-col justify-center items-center h-full w-full text-2xl p-10">
              <div className="flex items-center">
                <Image
                  className="w-10 h-10"
                  src="assets/favicon/favicon-32x32.png"
                  alt="logo"
                  width={10}
                  height={10}
                />
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
                  ImmobileLink
                </span>
              </div>
              {dict.chathome}
            </div>
          </div>

      }
    </>

  );
}