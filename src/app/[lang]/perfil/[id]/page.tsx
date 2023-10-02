import { getAssoc, getLinks, getTipoUsuario } from '../../../../../lib/utils/userData';
import { userData } from '../../../../../lib/modelos'
import { Database } from '../../../../../lib/database.types';
import { getDictionary } from '../../dictionaries';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useProfileStore } from '../../../../../lib/store/profileStore';
import { getProfileFullData } from '../../../../../lib/Utils/userProfile';
import CorretorProfile from './(perfil)/CorretorProfile';
import EmpresaProfile from './(perfil)/EmpresaProfile';


interface pageProps {
  params: {
    id: string;
    lang: string;
  };
}

export const createServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

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

  useProfileStore.setState({ profileData: profileData, profileFullData: profileFullData, sessionData: sessionData, dict: dict })


  return (
    <>
      {profileData.type! == "corretor" ? (
        <CorretorProfile />
      ) : (
        <EmpresaProfile />
      )}
    </>
  );
}
