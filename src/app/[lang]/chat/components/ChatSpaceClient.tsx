"use client";

import { ReactNode, useContext } from "react";
import { ChatContext } from "../[[...idsala]]/ChatContext";
import BottomNav from "./BottomNav";
import { Chat } from "@/app/i18n/dictionaries/types";

interface ChatSpaceClientProps {
  children: ReactNode,
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}

export default function ChatSpaceClient({ children, dict, idsala, userId }: ChatSpaceClientProps) {
  const { chatView, toggleChatView } = useContext(ChatContext)
  let style = 'hidden lg:block'

  if (chatView == true ) {
    if(typeof idsala === 'undefined') {
      style = 'hidden lg:block'
    }
    else {
      style = 'block'
    }

  }
  else {
    if(chatView == false) 
      style = 'hidden lg:block'
  }
  return (
    <div className={`${style} h-full lg:h-5/6 lg:w-7/12`}>
      {children}
    </div>
  );
}
