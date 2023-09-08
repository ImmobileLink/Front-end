"use client"
import { Chat } from "@/app/i18n/dictionaries/types";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos"
import Avatar from "../Avatar";
import Link from "next/link";
import { ChatContext } from "../../chat/[[...idsala]]/chatContext";
import { useContext } from "react";

interface ChatHubCardProps {
    dict: Chat,
    idsala: string,
    mensagem: UltimaMensagemPorSalaPorUsuario | null | undefined,
    userId: string | undefined;
}

export default function ChatHubCard({ dict, idsala, mensagem, userId }: ChatHubCardProps) {
    const { toggleChatView } = useContext(ChatContext)

    const handleClick = (e: any, idsala: string, idsaladestino: string) => {
        if(idsala == idsaladestino) {
            toggleChatView(true)
        }
    }
    return (
        <>
            <Link onClick={e=>handleClick(e,idsala, mensagem!.idsala)} href={`/chat/${mensagem!.idsala}`} className="flex flex-row rounded-md  hover:bg-gray-200 dark:hover:bg-gray-500 p-2">
                <div className="mr-2 min-w-fit">
                    <Avatar size={14} userId={mensagem!.idparticipante} />
                </div>
                <div className="flex flex-col truncate">
                    <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-gray-300">
                        {mensagem!.nomeparticipante}
                    </div>
                    <div className="flex flex-row text-sm font-sans text-slate-900 dark:text-gray-300 text-center items-center">
                        <div>
                            {
                                mensagem!.idautor === userId ?
                                    <div>{dict.you}: {mensagem!.mensagem}</div>
                                    :
                                    mensagem!.nomeautor
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}