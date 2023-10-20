import { create } from "zustand";
import { AreaAtuacao, Corporacao, Corretor, Especialidades, userData, } from "../modelos";
import { Dictionaries } from "@/app/i18n/dictionaries/types";



interface ProfileStoreState {
  profileData: userData | null;
  sessionData: userData | null;
  profileFullData: Corretor | Corporacao | null;
  dict: Dictionaries | null;
  isOwn: boolean;
  areasAtuacao: AreaAtuacao | null;
  especialidades: Especialidades | null;
  isAssociado: boolean | null | undefined;
}

// Função para criar a store
export const useProfileStore = create<ProfileStoreState>((set) => ({
  profileData: null,
  sessionData: null,
  profileFullData: null,
  dict: null,
  isOwn: false,
  areasAtuacao: null,
  especialidades: null,
  isAssociado: false
}));
