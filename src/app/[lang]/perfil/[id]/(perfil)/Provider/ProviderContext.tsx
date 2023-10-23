
"use client"
import React, { ReactNode } from 'react';
import { ProfileProvider } from '../context/ProfileContext'; 
import { ButtonContextProvider } from '../context/TabsContext'; 
import { AreaAtuacao, Especialidades, Historico } from '../../../../../../../lib/modelos';

interface CombinedContextProviderProps {
  children: ReactNode;
  areas: AreaAtuacao | null;
  esp: Especialidades | null;
  hist: Historico | null;
}

export function ProviderContext({ children, areas, esp, hist }: CombinedContextProviderProps) {
  return (
    <ProfileProvider areas={areas} esp={esp} hist={hist}>
      <ButtonContextProvider>
          {children}
      </ButtonContextProvider>
    </ProfileProvider>
  );
};

