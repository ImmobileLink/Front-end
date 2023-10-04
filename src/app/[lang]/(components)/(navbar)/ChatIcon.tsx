"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getUserRooms } from "../../../../../lib/utils/userRooms";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { NotificationContext } from "./NotificationContext";
import { usePathname } from "next/navigation";

interface ChatIconProps {
    userId: string | undefined;
}

const supabase = createClientComponentClient<Database>()

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
        const subscription = supabase.channel("userRoom_changes")
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
        const subscription = supabase.channel("chathub_changes")
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
            <Link href="/chat" className="relative block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Image
                    className="mx-auto h-6 w-auto"
                    src="assets/icons/chat.svg"
                    alt="Ícone"
                    width={1}
                    height={1}
                />
                {
                    chatNotification && ( // Verifica se há notificações antes de exibir a bolinha
                        <span className="absolute top-0 right-0 h-3 w-3 bg-orange-600 rounded-full"></span>
                    )}
            </Link>
        </>
    );
}
