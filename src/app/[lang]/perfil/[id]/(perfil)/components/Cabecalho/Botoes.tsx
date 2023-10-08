
import BotaoAdd from "./botaoAdd";
import BotaoChat from "./BotaoChat"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../../../lib/database.types";
import { cookies } from "next/headers";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { cache } from "react";

interface BotoesProps {
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export default async function Botoes({ }: BotoesProps) {
  const supabase = createServerSupabaseClient();

  const state = useProfileStore.getState()


  const profile = state.profileData
  const session = state.sessionData
  const dict = state.dict


  let { data, error } = await supabase
    .rpc('criar_ou_retornar_sala', {
      id_destinatario: profile?.id!,
      id_usuario: session?.id!
    })

  let sala = `/chat/${data}`

  return (
    <div className="mt-5 flex flex-wrap">
      {profile?.type != session?.type && (
        <BotaoAdd idProfile={profile?.id!} idSession={session?.id!} typeSession ={session?.type!} dict={dict} />
      )}
      <BotaoChat sala={sala} />
    </div>
  );
}