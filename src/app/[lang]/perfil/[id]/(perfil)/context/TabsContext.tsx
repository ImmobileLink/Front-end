"use client"
import { TabsRef } from 'flowbite-react';
import React, { ReactNode, createContext, useContext, useRef, useState } from 'react';

interface ButtonContextType {
  activeTab: number;
  setTab: (tab: number) => void;
  tabsRef: React.RefObject<TabsRef>;
}

// Criando o contexto
const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

// Hook para acessar o contexto
export const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error("useButtonContext must be used within a ButtonContextProvider");
  }
  return context;
}

// Provedor de contexto
export function ButtonContextProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabsRef = useRef<TabsRef>(null);

  const setTab = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <ButtonContext.Provider value={{ activeTab, setTab, tabsRef }}>
      {children}
    </ButtonContext.Provider>
  );
}
