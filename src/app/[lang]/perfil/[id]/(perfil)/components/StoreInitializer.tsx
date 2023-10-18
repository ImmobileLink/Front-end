"use client";

import { useProfileStore } from "@/../../lib/store/profileStore"
import { useEffect, useRef } from "react";
import { AreaAtuacao, Corporacao, Corretor, Especialidades, Historico, userData } from "../../../../../../../lib/modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { useProfileContext } from "../Provider/ProviderContext";

interface StoreInitializerProps {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
  isOwn: boolean;
}


export default function StoreInitializer({ isOwn, profileData, sessionData, profileFullData, dict}: StoreInitializerProps) {
  const initialized = useRef(false);

/*   const { setEspecialidades, setAreasAtuacao, setHistorico } = useProfileContext();

  useEffect(() => {
    setEspecialidades(especialidades)
    setAreasAtuacao(areasAtuacao)
    setHistorico(historico)
  }, []) */


  if (!initialized.current) {
    useProfileStore.setState({ profileData, sessionData, profileFullData, dict, isOwn })
    initialized.current = true;
  }
  return null
}
