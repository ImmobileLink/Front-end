"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AreaAtuacao, Especialidades } from '../../../../../../../lib/modelos';

type ProfileContextType = {
  areasAtuacao: AreaAtuacao;
  especialidades: Especialidades;
  setEspecialidades: (newEspecialidades: Especialidades) => void;
  setAreasAtuacao: (newAreasAtuacao: AreaAtuacao) => void;
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
};

export function ProfileProvider({ children }: ProfileProviderProps) {

  const [areasAtuacao, setAreasAtuacao] = useState<AreaAtuacao | null>(null);
  const [especialidades, setEspecialidades] = useState<Especialidades | null>(null);


  return (
    <ProfileContext.Provider
      value={{
        areasAtuacao,
        especialidades,
        setEspecialidades: (newEspecialidades: Especialidades) =>
          setEspecialidades(newEspecialidades),
        setAreasAtuacao: (newAreasAtuacao: AreaAtuacao) =>
          setAreasAtuacao(newAreasAtuacao)
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
