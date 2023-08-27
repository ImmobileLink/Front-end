"use client";

import { useEffect, useState } from "react";
import Avatar from "../Avatar";

interface ChatHeaderProps {
    idparticipante: string | null,
    nomeparticipante: string | null
}

export default function ChatHeader({ idparticipante, nomeparticipante }: ChatHeaderProps) {
    return (
        <div className="flex flex-row items-center px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-700">
            <div>
                <Avatar key={idparticipante} userId={idparticipante} />
            </div>
            <div className="ml-2 font-sans font-semibold text-lg" >
                {nomeparticipante}
            </div>
        </div>
    );
}
