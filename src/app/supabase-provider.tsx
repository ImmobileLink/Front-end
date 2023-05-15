"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "../../lib/database.types";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  //efeito para quando mudar o estado de auth, quando o usuário se loga por exemplo muda de public para auth
  useEffect(() => {
    //recebe uma notificação sempre que ocorre uma mudança de estado de auth
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      //atualiza a página, para aplicar as mudanças da mudança de estado de auth
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
    //quando da o refresh "muda" a rota atual da página, "mudando" o estado do router e rodando o useEffect novamente
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

//cria o hook
export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
