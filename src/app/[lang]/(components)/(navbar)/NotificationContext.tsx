"use client"
import { ReactNode, createContext, useState } from 'react';

interface ChatContextType {
  chatNotification: boolean,
  toggleChatNotification: (val: boolean) => void
  chatNewMessages: any
  toggleChatNewMessages: (val: any) => void
  assocNot: any
  toggleAssocNot: (val: any) => void
}

export const NotificationContext = createContext({} as ChatContextType);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [chatNewMessages, setChatNewMessages] = useState([])
  const [assocNot, setAssocNot] = useState([])
  const toggleChatNotification = (val:boolean) => {
    setChatNotification(val)
  }

  const toggleChatNewMessages = (val:any) => {
    setChatNewMessages(val)
  }

  const toggleAssocNot = (val:any) => {
    setAssocNot(val)
  }

  return (
    <NotificationContext.Provider value={{ chatNotification, toggleChatNotification, chatNewMessages, toggleChatNewMessages, assocNot, toggleAssocNot }}>
      {children}
    </NotificationContext.Provider>
  );
}