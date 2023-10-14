"use client";

import { Notificationlabels } from "@/app/i18n/dictionaries/types";
import { Tooltip } from "flowbite-react";
import { HiCheck, HiXMark } from "react-icons/hi2";

interface NotificationActionsProps {
    texto: Notificationlabels
    type: string;
    action1: (e: any) => void;
    action2?: (e: any) => void;
}

export default function NotificationActions({ texto, type, action1, action2 }: NotificationActionsProps) {
    return (
        <>
            <div className="flex mx-2 items-center">
                {
                    type == "yesno" ?
                        <div className="flex flex-row">
                            <Tooltip content={texto.accept}>
                                <button className="p-3 bg-green-400 hover:bg-blue-500" onClick={action1}>
                                    <HiCheck size={20} />
                                </button>
                            </Tooltip>
                            <Tooltip content={texto.refuse}>
                                <button className="p-3 bg-red-400 hover:bg-blue-500" onClick={action2}>
                                    <HiXMark size={20} />
                                </button>
                            </Tooltip>
                        </div>
                        :
                        type == "check" &&
                        <span onClick={e => action1} className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{texto.check}</span>
                }
            </div>
        </>
    );
}
