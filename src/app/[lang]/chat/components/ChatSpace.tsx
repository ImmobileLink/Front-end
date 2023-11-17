
import MessageSpace from "./MessageSpace";
import TypingBox from "./TypingBox";
import ChatHeader from "./ChatHeader";
import { Chat } from "@/app/i18n/dictionaries/types";
import Image from "next/image";
import { getRoomData } from "../[[...idsala]]/chatUtils";
import { RoomData } from "../../../../../lib/modelos";
import { serverSupabase } from "lib/utils/serverSupabase";

interface ChatSpaceProps {
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}

export default async function ChatSpace({ dict, idsala, userId }: ChatSpaceProps) {

  const supabase = await serverSupabase()
  let roomData: RoomData = {
    iddestinatario: '',
    nomedestinatario: '',
    avatardestinatario: '',
    mensagens: [],
  };
  const data = await getRoomData(idsala, supabase)
  if (data) {
    roomData = data
  }
  return (
    <>
      {
        idsala != null ?
          <div className="flex flex-col h-full lg:w-full w-screen rounded-md bg-white dark:bg-dark-100 drop-shadow-md">
            {
              idsala != null &&
              <ChatHeader key={roomData.iddestinatario} idparticipante={roomData.iddestinatario} nomeparticipante={roomData.nomedestinatario} avatarparticipante={roomData.avatardestinatario} />
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