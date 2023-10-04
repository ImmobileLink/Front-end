"use client"
import { ReactNode, createContext, useState } from 'react';

interface ChatContextType {
  chatNotification: boolean,
  toggleChatNotification: (val: boolean) => void
}

export const NotificationContext = createContext({} as ChatContextType);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [chatNotification, setChatNotification] = useState<boolean>(false);

  const toggleChatNotification = (val:boolean) => {
    setChatNotification(val)
  }

  return (
    <NotificationContext.Provider value={{ chatNotification, toggleChatNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}