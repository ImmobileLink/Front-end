"use client"
import { ReactNode, createContext, useState } from 'react';

interface NotificationContextType {
  chatNotification: boolean,
  toggleChatNotification: (val: boolean) => void
  chatNewMessages: any
  toggleChatNewMessages: (val: any) => void
  notificationList: any
  toggleNotificationList: (val: any) => void
}

export const NotificationContext = createContext({} as NotificationContextType);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [chatNotification, setChatNotification] = useState<boolean>(false);
  const [chatNewMessages, setChatNewMessages] = useState([])
  const [notificationList, setnotificationList] = useState([])
  const toggleChatNotification = (val:boolean) => {
    setChatNotification(val)
  }

  const toggleChatNewMessages = (val:any) => {
    setChatNewMessages(val)
  }

  const toggleNotificationList = (val:any) => {
    setnotificationList(val)
  }

  return (
    <NotificationContext.Provider value={{ chatNotification, toggleChatNotification, chatNewMessages, toggleChatNewMessages, notificationList, toggleNotificationList }}>
      {children}
    </NotificationContext.Provider>
  );
}