"use client";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillChatFill } from "react-icons/bs";
import { ChatContext } from "../../chat/[[...idsala]]/chatContext";
import { useContext } from "react";

interface BottomNavProps { }

export default function BottomNav({ }: BottomNavProps) {
    const {chatView, toggleChatView} = useContext(ChatContext)
    let style = ''
    let style2 = ''
    if (chatView) {
        style = 'bg-gray-50 dark:bg-gray-800'
        style2 = ''
    }
    else {
        style = ''
        style2 = 'bg-gray-50 dark:bg-gray-800'
    }
    return (
        <div className="lg:hidden">
            <div className="bottom-0 left-0 z-0 w-full h-12 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                    <button onClick={e => toggleChatView(false)} type="button" className={`${style2} inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}>
                        <AiOutlineUnorderedList className="text-2xl" />
                    </button>
                    <button onClick={e => toggleChatView(true)} type="button" className={`${style} inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group`}>
                        <BsFillChatFill />
                    </button>
                </div>
            </div>
        </div>
    );
}
