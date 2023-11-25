/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "./NotificationContext";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { Navbarbuttons } from "@/app/i18n/dictionaries/types";
import { getMessageNotificationsAPI } from "./navbarUtils";
import { clientSupabase } from "../../../../../lib/utils/clientSupabase";
import { usePathname } from "next/navigation";

interface ChatIconProps {
    textos: Navbarbuttons
    userId: string | undefined;
}

export default function ChatIcon({ textos, userId }: ChatIconProps) {
    const { chatNewMessages, toggleChatNewMessages } = useContext(NotificationContext)
    const { chatNotification, toggleChatNotification } = useContext(NotificationContext)
    const supabase = clientSupabase()

    const [isCurrentRoom, setIsCurrentRoom] = useState(false);

    // Obtém o parâmetro da rota
    const path = usePathname();

    const getMessageNotifications = async (idusuario: string) => {
        const result = await getMessageNotificationsAPI(idusuario, supabase)
        if (result) {
            toggleChatNewMessages(result)
        }
    }

    useEffect(() => {
        const checkCurrentRoom = () => {
            const currentRoomExist = chatNewMessages.some((message: any) => path.includes(message));
            // Atualiza o estado com base na condição
            setIsCurrentRoom(currentRoomExist);
        }
        getMessageNotifications(userId!)
        if (chatNewMessages.length > 0) {
            toggleChatNotification(true)
        }
        checkCurrentRoom()
    }, [])

    useEffect(() => {
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

    return (
        <>
            <Link href="/chat" className="relative block text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:bg-transparent">
                <div className="flex flex-col justify-center items-center">
                    <HiChatBubbleLeft size={30} />
                    <p className="hidden md:block md:text-sm">{textos.messages}</p>
                </div>
                {
                    chatNotification && chatNewMessages.length > 0 && !isCurrentRoom && ( // Verifica se há notificações antes de exibir a bolinha
                        <span className="absolute top-0 right-0 md:top-0 md:right-5 h-3 w-3 bg-orange-600 rounded-full"></span>
                    )
                }
            </Link>
        </>
    );
}
