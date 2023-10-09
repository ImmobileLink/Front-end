"use client";

interface StoreInitializerProps {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
  isOwn: boolean;
}

import { useProfileStore } from "@/../../lib/store/profileStore"
import { useRef } from "react";
import { Corporacao, Corretor, userData } from "../../../../../../../lib/modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";

export default function StoreInitializer({isOwn, profileData, sessionData, profileFullData, dict}: StoreInitializerProps) {
  const initialized = useRef(false);
  if(!initialized.current){
    useProfileStore.setState({profileData, sessionData, profileFullData, dict, isOwn})
    initialized.current = true;
  }
  return null
}
