import { getUserData } from '../../../../../lib/Utils/userProfile'
import { Database } from '../../../../../lib/database.types';
import { getDictionary } from '../../dictionaries';
import CorretorProfile from './(perfil)/CorretorProfile';
import EmpresaProfile from './(perfil)/EmpresaProfile';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


interface pageProps {
  params: {
    id: string;
    lang: string;
  };
}

const supabase = createServerComponentClient<Database>({ cookies })

export default async function Page({ params: { id, lang } }: pageProps) {

  const { data: { session } } = await supabase.auth.getSession();

  const profile = await getUserData(id)

  const session_data = session ? await getUserData(session.user.id) : null

  const dict = await getDictionary(lang)
  // {/* <EmpresaProfile profile={profile} session={session_data} dict={dict}/> */}

  return (
    <>
      {profile!.tipo == "corretor" ?
        <CorretorProfile profile={profile!} session={session_data!} dict={dict}/>
        :
        (<p>Perfil de empresa</p>)        
      }
    </>

  );
}
