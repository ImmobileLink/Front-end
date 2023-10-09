"use client";

interface StoreInitializerProps {
    isOwn: boolean;
}

import { useProfileStore } from "@/../../lib/store/profileStore"
import { useRef } from "react";

export default function StoreInitializer({isOwn}: StoreInitializerProps) {
  const initialized = useRef(false);
  if(!initialized.current){
    useProfileStore.setState({isOwn})
    initialized.current = true;
  }
  return null
}
