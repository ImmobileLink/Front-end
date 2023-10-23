import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../lib/database.types";
import React, { cache } from 'react';
import CardConfig from "./components/CardConfig";
import { cookies } from "next/headers";
import { getDictionary } from "../dictionaries";
import { getProfileFullData } from "../../../../lib/Utils/userProfile";


interface pageProps {
  params: {
    lang: string;
  };
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


export default async function page({ params: { lang } }: pageProps) {
  const dict = await getDictionary(lang); // pt
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();


  const { data, error } = await supabase
    .rpc('consultar_tipo_usuario', {
      id_usuario: session?.user.id!
    })

  const email = session?.user.email
  const profileFullData = session?.user.id && await getProfileFullData(data![0].role, session?.user.id!)


  return (
    <>

      {session?.user.id ? (
        <div className=" flex items-center justify-center w-auto min-w-full h-[calc(100vh-72px)] bg-branco dark:bg-dark-200">
          <div className="w-full max-w-md p-4 m-5 bg-white dark:bg-gray-700 shadow-md rounded-md">
            <h2 className="text-2xl text-center mb-4">Alterar Dados</h2>
            <div className="flex flex-col max-w gap-2">
              <CardConfig title="Email" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id}/>
              <CardConfig title="Senha" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id}/>
              <CardConfig title="Telefones" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id}/>
            </div>
          </div>
        </div>
      ) : (
        <p>Faça login</p>
      )}

    </>
  );
}