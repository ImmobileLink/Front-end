import React, { cache } from 'react';
import CardConfig from "./components/CardConfig";
import { getProfileFullData } from "../perfil/[id]/perfilUtils/userProfile";
import { getSessionAPI, getUserTypeAPI } from "./configUtils";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getDictionary } from '../dictionaries';
import { Dictionaries } from '@/app/i18n/dictionaries/types';


interface pageProps {
  params: {
    lang: string;
  };
}


export default async function page({ params: { lang } }: pageProps) {
  // const dict = await getDictionary(lang); // pt
  const supabase = await serverSupabase()
  const session = await getSessionAPI(supabase)
  const data = await getUserTypeAPI(session, supabase)
  const dict = await getDictionary(lang) as Dictionaries

  const email = session?.user.email
  const profileFullData = session?.user.id && await getProfileFullData(data![0].role, session?.user.id!, supabase)


  return (
    <>
      {session?.user.id ? (
        <div className=" flex select-none items-center justify-center w-auto min-w-full h-[calc(100vh-72px)] bg-branco dark:bg-dark-200">
          <div className="w-full max-w-md p-4 m-5 bg-white dark:bg-gray-700 shadow-md rounded-md">
            <h2 className="text-2xl text-center mb-4">{dict.configurations.changeData}</h2>
            <div className="flex flex-col max-w gap-2">
              <CardConfig title="1" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id} dict={dict}/>
              <CardConfig title="2" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id} dict={dict}/>
              <CardConfig title="3" email={email!} type={data![0].role} telefones={profileFullData} id={session.user.id} dict={dict}/>
            </div>
          </div>
        </div>
      ) : (
        <p>Faça login</p>
      )}
    </>
  );
}