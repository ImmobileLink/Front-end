"use client";

import { formataData } from "../../../../../lib/utils/formataData";
import Image from "next/image";
import Avatar from "../../(components)/Avatar";
import { Mensagem } from "../../../../../lib/modelos";

interface MessageCardProps {
    message: Mensagem;
}

export default function MessageCard({ message }: MessageCardProps) {
    return (
        <div className="flex flex-col items-bottom mb-5">
            <div className="flex flex-row items-start space-x-3">
                <div className="min-w-fit">
                    <Avatar key={message.idautor} route={message.avatarautor!} size={10} />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-2">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 text-opacity-80 dark:text-opacity-70">{message.nomeautor}</p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 text-opacity-80 dark:text-opacity-70">{formataData(message.enviadoem!)}</p>
                    </div>
                    <p className="flex break-all list-none align-bottom items-bottom text-lg font-sans font-semibold text-slate-900 dark:text-gray-300">
                        {message.mensagem}
                    </p>
                    {
                        message.imagem &&
                        <Image src={`mensagens/imagens/${message.imagem}`} alt={message.id} width={1} height={1} className="w-11/12 h-fit my-3 ml-1" />
                    }
                </div>
            </div>
        </div>
    );
}
