"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { usePathname } from "next/navigation";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";

interface ChatIconProps {
    textos: Navbarbuttons
    userId: string | undefined;
    newMessages: any
}

export default function ChatIcon({ textos, userId, newMessages }: ChatIconProps) {
    const { chatNewMessages, toggleChatNewMessages } = useContext(NotificationContext)
    const { chatNotification, toggleChatNotification } = useContext(NotificationContext)
    const supabase = createClientComponentClient<Database>()

    const getMessageNotifications = async (idusuario: string) => {
        const { data, error } = await supabase
            .from('notificacao')
            .select('*')
            .eq('iddestinatario', idusuario)
            .eq('tipo', 'mensagem')
            .eq('visualizada', 'false')
        if (error) {
            console.log(error)
        }
        else {
            const array = data.map(item => item.artefato)
            toggleChatNewMessages(array)
        }
    }

    useEffect(() => {
        toggleChatNewMessages(newMessages)
        const subscription = supabase.channel("messagenotification_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "notificacao",
                    filter: `iddestinatario=eq.${userId}`
                },
                () => {
                    getMessageNotifications(userId!)
                }
            )
            .subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, [])

    useEffect(() => {
        if (chatNewMessages.length > 0) {
            toggleChatNotification(true)
        }
    }, [chatNewMessages])

    return (
        <>
            <Link href="/chat" className="relative block text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:bg-transparent">
                <div className="flex flex-col justify-center items-center">
                    <HiChatBubbleLeft size={30} />
                    <p className="hidden md:block md:text-sm">{textos.messages}</p>
                </div>
                {
                    chatNotification && ( // Verifica se há notificações antes de exibir a bolinha
                        <span className="absolute top-0 right-0 h-3 w-3 bg-orange-600 rounded-full"></span>
                    )
                }
            </Link>
        </>
    );
}
