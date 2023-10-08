"use client"
import { Chat } from "@/app/i18n/dictionaries/types";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos"
import Avatar from "../../(components)/Avatar";
import Link from "next/link";
import { ChatContext } from "../[[...idsala]]/ChatContext";
import { useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from 'next/navigation';

interface ChatHubCardProps {
    dict: Chat,
    idsala: string,
    mensagem: UltimaMensagemPorSalaPorUsuario | null | undefined,
    userId: string | undefined;
    userAvatar: string;
    highlight: boolean;
    selected: boolean;
}

export default function ChatHubCard({ dict, idsala, mensagem, userId, userAvatar, highlight, selected }: ChatHubCardProps) {
    const { toggleChatView } = useContext(ChatContext)
    const router = useRouter()


    const updateNotification = async () => {
        const supabase = createClientComponentClient<Database>()
        const { data, error } = await supabase
            .from('notificacao')
            .update({ visualizada: true })
            .eq('iddestinatario', userId)
            .eq('artefato', idsala)
            .select()
        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
        }
    }

    const handleClick = (e: any, idsala: string, idsaladestino: string) => {
        if (idsala == idsaladestino) {
            toggleChatView(true)
        }
        highlight=false
        updateNotification()
        router.refresh();
    }
    return (
        <>
            <Link
                onClick={(e) => handleClick(e, idsala, mensagem!.idsala)}
                href={`/chat/${mensagem!.idsala}`}
                className={`flex flex-row rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 p-2 ${selected ? 'bg-gray-200 dark:bg-gray-500' : highlight && 'bg-blue-100 dark:bg-blue-600'
                    }`}
            >
                <div className="mr-2 min-w-fit">
                    <Avatar key={userId} size={14} route={userAvatar} />
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