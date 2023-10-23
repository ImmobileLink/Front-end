import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { Database } from "../../../../lib/database.types";
import { userData } from "../../../../lib/modelos";
import { getTipoUsuario } from "../../../../lib/utils/userData";
import { getDictionary } from "../dictionaries";
import Calendario from "./components/Calendario";
import { redirect } from "next/navigation";

interface pageProps {
  params: {
    lang: string;
  };
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserData(user: userData) {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user.id) {
    user = await getTipoUsuario(user, session.user.id);
  }
  return user;
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = createServerSupabaseClient();

  let user: userData = {
    id: undefined,
    avatar: undefined,
    isPremium: undefined,
    nome: undefined,
    type: undefined,
    links: [],
    assoc: []
  }

  const dict = await getDictionary(lang); // pt

  const userData = await getUserData(user);

  if (!userData.id) {
    redirect('/auth');
  }

  let { data } = await supabase.rpc('obter_visitas_aceitas_pelo_corretor', {
    corretor_id: userData.id!
  })


  return (
    <div className="h-[calc(100vh-72px)] p-4">
      <Calendario userId={userData.id} visitas={data} locale={lang} dict={dict.agenda} />
    </div>
  );
}
