import { cookies } from "next/headers";
import { cache } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { getDictionary } from "../../dictionaries";
import ChatSpace from "../components/ChatSpace";
import ChatHub from "../components/ChatHub";
import ChatSpaceClient from "../components/ChatSpaceClient";
import { UltimaMensagemPorSalaPorUsuario, userData } from "../../../../../lib/modelos";
import { getAssoc, getLinks, getTipoUsuario } from "../../../../../lib/utils/userData"
import { ChatProvider } from "./chatContext";

interface pageProps {
  params: {
    lang: string,
    idsala: string
  };
}

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function Page({ params: { lang, idsala } }: pageProps) {
  const supabase = createServerSupabaseClient()
  const dict = await getDictionary(lang); // pt

  let salaid = ''
  if (Array.isArray(idsala)) {
    salaid = idsala[0]
  }
  else {
    salaid=idsala
  }

  async function getUserData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user.id) {
      user = await getTipoUsuario(user, session.user.id);

      [user, user] = await Promise.all([
        getLinks(user),
        getAssoc(user)
      ]);
    }
    return user;
  }

  let user: userData = {
    links: [],
    assoc: []
  };

  const userData = await getUserData();
  return (
    <ChatProvider>
      <div className="flex fixed top-0 bottom-0 right-0 left-0 pt-[72px] justify-center lg:items-center lg:w-auto gap-5">
        <ChatHub dict={dict} idsala={salaid} userType={userData.type} userId={userData.id} userLinks={userData.links} userAssocs={userData.assoc} />
        <ChatSpaceClient dict={dict.chat} idsala={salaid} userId={userData.id}>
          <ChatSpace dict={dict.chat} idsala={salaid} userId={userData.id} />
        </ChatSpaceClient>
      </div>
    </ChatProvider>
  );
} 