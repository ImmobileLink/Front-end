import Link from "next/link";
import BotaoAdd from "./botaoAdd";
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
    <div className="mt-3">
      <BotaoAdd idProfile={profile?.id!} idSession={session?.id!} dict={dict} />
      <Link href={sala}>
        <button className="w-fit ml-3 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ">
          Chat
        </button>
      </Link>
    </div>
  );
}