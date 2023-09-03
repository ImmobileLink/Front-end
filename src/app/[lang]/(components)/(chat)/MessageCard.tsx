"use client";

import { formataData } from "../../../../../lib/utils/formataData";
import Image from "next/image";
import Avatar from "../Avatar";

interface MessageCardProps { 
   message: any;
}

export default function MessageCard({message}: MessageCardProps) {
    return (
        <div className="flex flex-col items-bottom space-x-12">
            <div className="flex flex-row items-start space-x-3 mb-5">
                <div className="min-w-fit">
                    <Avatar userId={message.idautor} size={10} />
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-2">
                        <p  className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 text-opacity-80 dark:text-opacity-70">{message.nomeautor}</p>
                        <p  className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300 text-opacity-80 dark:text-opacity-70">{formataData(message.enviadoem!)}</p>
                    </div>
                    <p className="flex break-all list-none align-bottom items-bottom text-lg font-sans font-semibold text-slate-900 dark:text-gray-300">
                        {message.mensagem}
                    </p>
                    {
                        message.imagem &&
                        <Image src={`mensagens/imagens/${message.imagem}`} alt={message.id} width={1} height={1} className="w-full h-fit mt-2"/>
                    }
                </div>
            </div>
        </div>
    );
}
