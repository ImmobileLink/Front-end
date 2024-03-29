"use client"
import { Chat } from "@/app/i18n/dictionaries/types";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos"
import Avatar from "../../(components)/Avatar";
import Link from "next/link";
import { ChatContext } from "../[[...idsala]]/chatContext";
import { useContext } from "react";
import { useRouter } from 'next/navigation';
import { clientSupabase } from "lib/utils/clientSupabase";

interface ChatHubCardProps {
    dict: Chat,
    idsala: string,
    mensagem: UltimaMensagemPorSalaPorUsuario | null | undefined,
    userId: string | undefined;
    highlight: boolean;
    selected: boolean;
    userType: string | undefined;
}

export default function ChatHubCard({ dict, idsala, mensagem, userId, highlight, selected,userType }: ChatHubCardProps) {
    const { toggleChatView } = useContext(ChatContext)
    const router = useRouter()


    const updateNotification = async () => {
        if (userId) {
            const supabase = clientSupabase()
            const { data, error } = await supabase
                .from('notificacao')
                .update({ visualizada: true })
                .eq('iddestinatario', userId)
                .eq('artefato', idsala)
                .select()
            if (error) {
                console.log(error)
            }
        }
    }

    const handleClick = (e: any, idsala: string, idsaladestino: string) => {
        if (idsala == idsaladestino) {
            toggleChatView(true)
        }
        highlight = false
        updateNotification()
        router.refresh();
    }

    let idparticipante = mensagem!.idautor == userId ? mensagem!.idparticipante : mensagem!.idautor

    return (
        <>
            <Link
                onClick={(e) => handleClick(e, idsala, mensagem!.idsala)}
                href={`/chat/${mensagem!.idsala}`}
                className={`flex flex-row rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 p-2 ${selected ? 'bg-gray-200 dark:bg-gray-500' : highlight && 'bg-blue-100 dark:bg-blue-600'
                    }`}
            >
                <div className="mr-2 min-w-fit">
                    <Avatar key={idsala} size={14} route={mensagem!.avatarparticipante} id={idparticipante}/>
                </div>
                <div
                    className={`flex flex-col truncate`}
                >
                    <div
                        className={`text-lg md:text-xl ${highlight ? 'font-bold' : ''
                            }`}
                    >
                        {mensagem!.nomeparticipante}
                    </div>
                    <div
                        className={`flex flex-row text-sm font-sans text-center items-center ${highlight ? 'font-bold' : ''
                            }`}
                    >
                        <div>
                            {mensagem!.idautor === userId ? (
                                <div>{dict.you}: {mensagem!.mensagem}</div>
                            ) : (
                                <div>{mensagem!.nomeautor}: {mensagem!.mensagem}</div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}