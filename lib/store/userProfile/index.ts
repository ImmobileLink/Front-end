import {create} from 'zustand';

import type { Corretor, Corporacao } from '../../modelos'

type UserProps = {
    user: Corporacao | Corretor | null;
    fetchUserProfile: (id: string) => void;
}

const useUserProfileStore = create<UserProps>((set) => ({
  user: null,

  fetchUserProfile: async (userId) => {
    try {
      const response = await fetch(`SUA_API_AQUI/${userId}`);
      const userData = await response.json();

      // Adaptar os campos de acordo com a estrutura da resposta da API
      const { name, id, isRealtor } = userData;

      set({  });
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
    }
  },
}));

export default useUserProfileStore;
