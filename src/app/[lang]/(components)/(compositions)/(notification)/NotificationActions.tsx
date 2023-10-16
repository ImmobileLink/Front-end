"use client";

import { Notificationlabels } from "@/app/i18n/dictionaries/types";
import { Tooltip } from "flowbite-react";
import { HiCheck, HiXMark } from "react-icons/hi2";

interface NotificationActionsProps {
    texto: Notificationlabels
    type: string;
    visualizada: boolean;
    action1: (e: any) => void;
    action2?: (e: any) => void;
    action3?: (e: any) => void;
}

export default function NotificationActions({ texto, type, visualizada, action1, action2, action3 }: NotificationActionsProps) {
    return (
        <>
            <div className="flex mx-2 items-center">
                {
                    type == "yesno" ?
                        visualizada === true ?
                            <div className="flex flex-col justify-center items-center text-center">
                                <div className="flex flex-row">
                                    <div className="p-3 bg-gray-500 text-gray-200">
                                        <HiCheck size={20} />
                                    </div>
                                    <div className="p-3 bg-gray-400 text-gray-200">
                                        <HiXMark size={20} />
                                    </div>
                                </div>
                            </div>
                            :
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
                        type == "check" ?
                            <div className="flex flex-col justify-center items-center text-center">
                                <button onClick={action1} className="mt-1 self-center w-full text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center">{texto.check}</button>
                            </div>
                            :
                            type == "both" &&
                            <div className="flex flex-col justify-center items-center text-center">
                                {
                                    visualizada === true ?
                                        <div>
                                            <div className="flex flex-row">
                                                <div className="p-3 bg-gray-500 text-gray-200">
                                                    <HiCheck size={20} />
                                                </div>

                                                <div className="p-3 bg-gray-400 text-gray-200">
                                                    <HiXMark size={20} />
                                                </div>
                                            </div>
                                        </div>
                                        :
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
                                }
                                <button onClick={action3} className="mt-1 self-center w-full text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1 text-center">{texto.check}</button>
                            </div>
                }
            </div>
        </>
    );
}
