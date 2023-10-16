"use client";

import { useProfileStore } from "@/../../lib/store/profileStore"
import { useRef } from "react";
import { AreaAtuacao, Corporacao, Corretor, Especialidades, userData } from "../../../../../../../lib/modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { useProfileContext } from "../Provider/ProviderProfile";

interface StoreInitializerProps {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
  isOwn: boolean;
  areasAtuacao: AreaAtuacao | null;
  especialidades: Especialidades | null;
}


export default function StoreInitializer({isOwn, profileData, sessionData, profileFullData, dict, areasAtuacao, especialidades}: StoreInitializerProps) {
  const initialized = useRef(false);

  const { setEspecialidades, setAreasAtuacao } = useProfileContext();


  if(!initialized.current){
    useProfileStore.setState({profileData, sessionData, profileFullData, dict, isOwn})
    setEspecialidades(especialidades)
    setAreasAtuacao(areasAtuacao)

    initialized.current = true;
  }
  return null
}
