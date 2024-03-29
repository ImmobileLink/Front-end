import { getAreasAtuacao, getAssoc, getEspecialidades, getHistorico, getLinks, getTipoUsuario } from '../../../../../lib/utils/userData';
import { userData } from '../../../../../lib/modelos'
import { Database } from '../../../../../lib/database.types';
import { getDictionary } from '../../dictionaries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useProfileStore } from '../../../../../lib/store/profileStore';
import { getProfileFullData } from './perfilUtils/userProfile';
import Link from 'next/link';
import StoreInitializer from './(perfil)/components/StoreInitializer';
import { ProviderContext } from './(perfil)/Provider/ProviderContext';
import Profile from './(perfil)/Profile';
import { getSessionAPI } from '../../configuracoes/configUtils';
import { serverSupabase } from 'lib/utils/serverSupabase';
import { Dictionaries } from '@/app/i18n/dictionaries/types';

interface pageProps {
  params: {
    id: string;
    lang: string;
  };
}

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

async function getUserData(user: userData,supabase:any, id?: string) {

  if (id) {
    user = await getTipoUsuario(user, id, supabase);
    [user, user] = await Promise.all([getLinks(user, supabase), getAssoc(user, supabase)]);
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

  const profileData = await getUserData({ ...user }, supabase, id);
  const sessionData = await getUserData({ ...user }, supabase, session?.user.id);
  const profileFullData = await getProfileFullData(profileData.type!, profileData.id!, supabase)
  const dict = await getDictionary(lang) as Dictionaries

  const isOwnProfile = sessionData?.id == profileData?.id
  const isAssociado = !!(sessionData.id && sessionData.assoc?.some((item) => item.id === profileData.id));

  const areasAtuacao = (await getAreasAtuacao(profileData?.id!, supabase)).usuarioporregiao
  const especialidades = profileData.type == "corretor" ? (await getEspecialidades(id, supabase)).especialidades : null
  const historico = profileData.type == "corretor" ? (await getHistorico(id, supabase)).historico : null

  useProfileStore.setState({ profileData: profileData, profileFullData: profileFullData, sessionData: sessionData, dict: dict, isOwn: isOwnProfile, isAssociado: isAssociado })

  return (
    <ProviderContext areas={areasAtuacao} esp={especialidades} hist={historico}>
      <StoreInitializer isOwn={isOwnProfile} profileData={profileData} sessionData={sessionData} profileFullData={profileFullData} dict={dict} isAssociado={isAssociado} />
      {profileData.id ?
        (<Profile dict={dict.profile}/>)
        :
        <div className='flex justify-center items-center flex-col'>
          <h1 className='text-3xl font-semibold text-gray-800 dark:text-white'>{dict.profile.doesntExist}</h1>
          <Link href={'/feed'} className='mt-4 text-blue-600 hover:underline'>{dict.profile.backToFeed}</Link>
        </div>
      }
    </ProviderContext>
  );
}
