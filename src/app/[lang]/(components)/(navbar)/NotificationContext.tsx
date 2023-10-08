"use client"
import { ReactNode, createContext, useState } from 'react';

interface ChatContextType {
  chatNotification: boolean,
  toggleChatNotification: (val: boolean) => void
  chatNewMessages: any
  toggleChatNewMessages: (val: any) => void
}

export const NotificationContext = createContext({} as ChatContextType);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [chatNewMessages, setChatNewMessages] = useState([])

  const toggleChatNotification = (val:boolean) => {
    setChatNotification(val)
  }

  const toggleChatNewMessages = (val:any) => {
    setChatNewMessages(val)
  }

  return (
    <NotificationContext.Provider value={{ chatNotification, toggleChatNotification, chatNewMessages, toggleChatNewMessages }}>
      {children}
    </NotificationContext.Provider>
  );
}