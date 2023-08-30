"use client";

import { ReactNode, useContext } from "react";
import { ChatContext } from "../../chat/[[...idsala]]/chatContext";
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
  if (chatView == true) {
    style = 'block'
  }
  else { 
    style = 'hidden lg:block'
  }
  return (
    <div className={`${style} h-full lg:h-5/6 lg:w-7/12`}>
      {children}
    </div>
  );
}
