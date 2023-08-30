"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Database } from "../../../../../lib/database.types";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Avatar from "../Avatar";
import { AiOutlineSend } from "react-icons/ai";

const supabase = createClientComponentClient<Database>()

interface FriendListCardProps {
    idremetente: string;
    iddestinatario: string;
    key: string;
    nome: string;
}

export default function FriendListCard({ idremetente, iddestinatario, nome }: FriendListCardProps) {
    const router = useRouter()

    const handleEnviarMensagem = async () => {
        let { data, error } = await supabase
            .rpc('criar_ou_retornar_sala', {
                id_destinatario: iddestinatario,
                id_usuario: idremetente!
            })
        if (error) {
            console.log(error)
        }
        else {
            router.push(`/chat/${data}`)
        }
    }
    return (
        <>
            <div onClick={handleEnviarMensagem} className="flex flex-row rounded-md bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 p-2">
                <div className="flex w-3/4 rounded-full">
                    <Avatar userId={iddestinatario} />
                    <div className="w-2/3 self-center capitalize text-black dark:text-white truncate ml-2">{nome}</div>
                </div>
                <div className="flex w-1/4 justify-end mr-5">
                    <AiOutlineSend className="text-lg text-white self-center" />
                </div>
            </div>
        </>
    );
}
