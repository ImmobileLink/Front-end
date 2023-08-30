"use client";

import { useEffect, useState } from "react";
import Avatar from "../Avatar";

interface ChatHeaderProps {
    idparticipante: string | null,
    nomeparticipante: string | null
}

export default function ChatHeader({ idparticipante, nomeparticipante }: ChatHeaderProps) {
    return (
        <div className="flex flex-row items-center justify-center lg:justify-start px-2 py-0.5 lg:px-3 lg:py-2 lg:rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
            <div className="flex lg:hidden">
                <Avatar key={idparticipante} userId={idparticipante} size={10}/>
            </div>
            <div className="hidden lg:flex ml-2">
                <Avatar key={idparticipante} userId={idparticipante} />
            </div>
            <div className="ml-2 font-sans font-semibold text-lg" >
                {nomeparticipante}
            </div>
        </div>
    );
}
