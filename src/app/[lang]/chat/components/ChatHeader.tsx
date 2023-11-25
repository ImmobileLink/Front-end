"use client";

import { useContext } from "react";
import Avatar from "../../(components)/Avatar";
import { BiArrowBack } from "react-icons/bi";
import { ChatContext } from "../[[...idsala]]/chatContext";

interface ChatHeaderProps {
    idparticipante: string | null,
    nomeparticipante: string | null
    avatarparticipante: string | null
}

export default function ChatHeader({ idparticipante, nomeparticipante, avatarparticipante }: ChatHeaderProps) {
    const {toggleChatView} = useContext(ChatContext)
    return (
        <div className="flex flex-row items-center lg:justify-start lg:px-3 lg:py-1 lg:rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
            <button onClick={e => toggleChatView(false)} className="flex lg:hidden justify-center items-center h-full mr-2 px-4 cursor-pointer text-gray-900 dark:text-white font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <BiArrowBack size={20}/>
            </button>
            <div className="flex flex-row items-center">
                <div className="flex lg:hidden my-0,5">
                    <Avatar key={idparticipante} route={avatarparticipante!} size={10} id={idparticipante!}/>
                </div>
                <div className="hidden lg:flex ml-2">
                    <Avatar key={idparticipante} route={avatarparticipante!} id={idparticipante!}/>
                </div>
                <div className="ml-2 font-sans font-semibold text-lg" >
                    {nomeparticipante}
                </div>
            </div>
        </div>
    );
}
