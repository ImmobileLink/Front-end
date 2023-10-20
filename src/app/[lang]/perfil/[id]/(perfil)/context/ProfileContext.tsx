"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AreaAtuacao, Especialidades, Historico } from '../../../../../../../lib/modelos';

type ProfileContextType = {
  areasAtuacao: AreaAtuacao;
  especialidades: Especialidades;
  historico: Historico;
  activeTab: number;
  setEspecialidades: (newEspecialidades: Especialidades) => void;
  setAreasAtuacao: (newAreasAtuacao: AreaAtuacao) => void;
  setHistorico: (newHistorico: Historico) => void;
  setActiveTab: (newTab: number) => void

};




const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
}

type ProfileProviderProps = {
  children: ReactNode;
  areas: AreaAtuacao | null;
  esp: Especialidades | null;
  hist: Historico | null;
};

export function ProfileProvider({ children, areas, esp, hist }: ProfileProviderProps) {

  const [areasAtuacao, setAreasAtuacao] = useState<AreaAtuacao>(areas);
  const [especialidades, setEspecialidades] = useState<Especialidades>(esp);
  const [historico, setHistorico] = useState<Historico>(hist);
  const [activeTab, setActiveTab] = useState<number>(0);


  return (
    <ProfileContext.Provider
      value={{
        areasAtuacao,
        especialidades,
        historico,
        activeTab,
        setEspecialidades: (newEspecialidades: Especialidades) =>
          setEspecialidades(newEspecialidades),
        setAreasAtuacao: (newAreasAtuacao: AreaAtuacao) =>
          setAreasAtuacao(newAreasAtuacao),
        setHistorico: (newHistorico: Historico) =>
          setHistorico(newHistorico),
        setActiveTab: (newTab: number) =>
            setActiveTab(newTab)
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
