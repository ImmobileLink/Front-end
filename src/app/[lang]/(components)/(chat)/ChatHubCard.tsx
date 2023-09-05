"use client"
import { Chat } from "@/app/i18n/dictionaries/types";
import { UltimaMensagemPorSalaPorUsuario } from "../../../../../lib/modelos"
import Avatar from "../Avatar";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";

interface ChatHubCardProps {
    dict: Chat,
    mensagem: UltimaMensagemPorSalaPorUsuario | null | undefined,
    userSession: Session | null | undefined;
}

export default function ChatHubCard({ dict, mensagem, userSession }: ChatHubCardProps) {
    return (
        <>
            <Link href={`/chat/${mensagem!.idsala}`} className="flex flex-row rounded-md bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-700 p-2">
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
                                mensagem!.idautor === userSession?.user.id! ?
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