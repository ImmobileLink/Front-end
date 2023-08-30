"use client"
import { ReactNode, createContext, useContext, useState } from 'react';

interface ChatContextType {
  chatView: boolean,
  toggleChatView: (val: boolean) => void
}

export const ChatContext = createContext({} as ChatContextType);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chatView, setChatView] = useState<boolean>(true);

  const toggleChatView = (val:boolean) => {
    setChatView(val)
    console.log(val)
  }

  return (
    <ChatContext.Provider value={{ chatView, toggleChatView }}>
      {children}
    </ChatContext.Provider>
  );
}
