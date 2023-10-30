"use client";

import { useRouter } from "next/navigation";
import Avatar from "../../(components)/Avatar";
import { AiOutlineSend } from "react-icons/ai";
import { useContext } from "react";
import { ChatContext } from "../[[...idsala]]/chatContext";
import { createOrGetRoom } from "../[[...idsala]]/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";


interface FriendListCardProps {
    idsala: string;
    idremetente: string;
    iddestinatario: string;
    avatardestinatario: string;
    key: string;
    nome: string;
}

export default function FriendListCard({ idsala, idremetente, iddestinatario, nome, avatardestinatario }: FriendListCardProps) {
    const { toggleChatView } = useContext(ChatContext)
    const router = useRouter()


    const supabase = createClientComponentClient<Database>()

    const handleEnviarMensagem = async (idsala: string) => {
        const data = await createOrGetRoom(idremetente, iddestinatario, supabase)
        if(idsala == data) {
            toggleChatView(true)
        }
        router.push(`/chat/${data}`)
    }

    return (
        <>
            <div onClick={e=>handleEnviarMensagem(idsala)} className="flex flex-row rounded-md mx-1 p-2 bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500">
                <div className="flex w-3/4 rounded-full">
                    <Avatar route={avatardestinatario} />
                    <div className="w-2/3 self-center capitalize text-black dark:text-white truncate ml-2">{nome}</div>
                </div>
                <div className="flex w-1/4 justify-end mr-5">
                    <AiOutlineSend className="text-lg text-white self-center" />
                </div>
            </div>
        </>
    );
}
