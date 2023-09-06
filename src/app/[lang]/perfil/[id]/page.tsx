import { getAssoc, getLinks, getTipoUsuario } from '../../../../../lib/utils/userData';
import { userData } from '../../../../../lib/modelos'
import { Database } from '../../../../../lib/database.types';
import { getDictionary } from '../../dictionaries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from "react";
import { useProfileStore } from '../../../../../lib/store/profileStore';
import { Page } from './(perfil)/composition/page';
import Cabecalho from './(perfil)/components/Cabecalho/Cabecalho';
import Infos from './(perfil)/components/Infos/Infos';
import Dashboard from './(perfil)/components/Dashboard/Dashboard';
import Calendario from '../../(components)/Calendario';
import { getProfileFullData } from '../../../../../lib/utils/userProfile';


interface pageProps {
  params: {
    id: string;
    lang: string;
  };
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getUserData(user: userData, id?: string) {

  if (id) {
    user = await getTipoUsuario(user, id);
    [user, user] = await Promise.all([getLinks(user), getAssoc(user)]);
  }

  return user;
}


export default async function page({ params: { id, lang } }: pageProps) {

  let user: userData = {
    id: undefined,
    isPremium: undefined,
    nome: undefined,
    type: undefined,
    links: [],
    assoc: []
  }

  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  const profileData = await getUserData({ ...user }, id);
  const sessionData = await getUserData({ ...user }, session?.user.id);
  const profileFullData = await getProfileFullData(profileData.type!, profileData.id!)

  const dict = await getDictionary(lang)


  useProfileStore.setState({profileData: profileData, profileFullData: profileFullData, sessionData: sessionData, dict: dict})


  return (
      <Page.Root>
            <Page.Main>
                <Cabecalho/>
                <Infos dict={dict} corretor={profileFullData} />
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard/>
                </Page.Dashboard>

                <Page.Calendar>
                    <Calendario ownId={sessionData.id} idProfile={profileData.id} />
                </Page.Calendar>
            </Page.Right>
        </Page.Root >

  );
}