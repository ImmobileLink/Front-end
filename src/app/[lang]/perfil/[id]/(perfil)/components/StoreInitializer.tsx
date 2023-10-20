"use client";

import { useProfileStore } from "@/../../lib/store/profileStore"
import { useEffect, useRef } from "react";
import { AreaAtuacao, Corporacao, Corretor, Especialidades, Historico, userData } from "../../../../../../../lib/modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";

interface StoreInitializerProps {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
  isOwn: boolean;
  isAssociado: boolean;
}


export default function StoreInitializer({ isOwn, profileData, sessionData, profileFullData, dict, isAssociado}: StoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useProfileStore.setState({ profileData, sessionData, profileFullData, dict, isOwn })
    initialized.current = true;
  }
  return null
}
