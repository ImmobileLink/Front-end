"use client";

import { ReactNode, useContext, useEffect } from "react";
import { ChatContext } from "../[[...idsala]]/ChatContext";
import BottomNav from "./BottomNav";
import { Chat } from "@/app/i18n/dictionaries/types";
import { NotificationContext } from "../../(components)/(navbar)/NotificationContext";

interface ChatSpaceClientProps {
  children: ReactNode,
  dict: Chat;
  idsala: string,
  userId: string | undefined;
}

export default function ChatSpaceClient({ children, dict, idsala, userId }: ChatSpaceClientProps) {
  const { chatView, toggleChatView } = useContext(ChatContext)
  const {toggleChatNotification} = useContext(NotificationContext)

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

  useEffect(() => {
    toggleChatNotification(false)
  })
  
  return (
    <div className={`${style} h-full lg:h-5/6 lg:w-7/12`}>
      {children}
    </div>
  );
}
