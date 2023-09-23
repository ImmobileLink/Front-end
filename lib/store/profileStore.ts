import { create } from "zustand";
import { Corporacao, Corretor, userData } from "../modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";



interface ProfileStoreState {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
}

// Função para criar a store
export const useProfileStore = create<ProfileStoreState>((set) => ({
  profileData: null,
  sessionData: null,
  profileFullData: null,
  dict: null
}));
