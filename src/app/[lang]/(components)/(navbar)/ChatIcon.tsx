"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { NotificationContext } from "./NotificationContext";
import { usePathname } from "next/navigation";
import { HiChatBubbleLeft } from "react-icons/hi2";

interface ChatIconProps {
    userId: string | undefined;
}

const supabase = createClientComponentClient<Database>()

const getUserRooms = async (idusuario: string) => {
    const supabase = createClientComponentClient<Database>()
    const { data, error } = await supabase
        .from('usuarioporsala')
        .select('idsala')
        .eq('idusuario', idusuario)
    if (error) {
        console.log(error)
    }
    else {
        const array = data.map(item => item.idsala)
        const string = array.toString()
        return string
    }
}

export default function ChatIcon({ userId }: ChatIconProps) {
    const [pathname] = useState(usePathname().slice(4))
    const [userRooms, setUserRooms] = useState<string | undefined>('')
    const { chatNotification, toggleChatNotification } = useContext(NotificationContext)

    const updateRooms = () => {
        if (userId) {
            getUserRooms(userId)
                .then((response) => {
                    setUserRooms(response)
                })
        }
    }

    useEffect(() => {
        updateRooms()
        const subscription = supabase.channel("room_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "usuarioporsala",
                    filter: `idusuario=eq.${userId}`
                },
                () => {
                    updateRooms()
                }
            )
            .subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, [])

    useEffect(() => {
        const subscription = supabase.channel("newmessage_changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "mensagem",
                    filter: `idsala=in.(${userRooms})`
                },
                () => {
                    if (pathname.indexOf('chat') == -1) {
                        toggleChatNotification(true)
                    }
                }
            )
            .subscribe();
        return () => {
            subscription.unsubscribe();
        }
    }, [userRooms])


    return (
        <>
            <Link href="/chat" className="relative block text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:bg-transparent">
                <HiChatBubbleLeft size={32}/>
                {
                    chatNotification && ( // Verifica se há notificações antes de exibir a bolinha
                        <span className="absolute top-0 right-0 h-3 w-3 bg-orange-600 rounded-full"></span>
                    )
                }
            </Link>
        </>
    );
}
