
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Cabecalho from "./(perfil)/Cabecalho";
import Dashboard from "./(perfil)/Dashboard";
import Infos from "./(perfil)/Infos";
import type { Database } from '../../../../../lib/database.types';
import Calendario from '../../(components)/Calendario';
import { getDictionary } from '../../dictionaries';
import { getProfileData } from '../../../../../lib/Utils/userProfile'

interface pageProps {
  params: {
    id: string;
    lang: string;
  };
}
const supabase = createServerComponentClient<Database>({ cookies })

export default async function Page({ params: { id, lang } }: pageProps) {
 

  const { data: { session } } = await supabase.auth.getSession();
  const dict = await getDictionary(lang);

  const profile = session ? await getProfileData(id) : null

  console.log(profile)

 /*  let { data: isAssociado } = await supabase
    .rpc('verifica_associacao', {
      valor1: id,
      valor2: session!.user.id
    }) */



/*   let { data: corretor } = await supabase
    .from('corretor')
    .select('*')
    .eq('id', id)
    .single() */


  return (
    <>

      {/* <div className="bg-dark-200 overflow-x-hidden box-border text-black">
        <div className="h-screen w-screen">
          <div className="flex relative max-w-6xl mx-auto px-4 mt-4">

            <div className="w-2/3 relative  bg-branco mr-3 rounded-md overflow-hidden">
              <Cabecalho dict={dict} isAssociado={isAssociado} session_data={session_data} corretor={corretor} />
              <Infos dict={dict} corretor={corretor} />
            </div>



            <div className="w-1/3 ">
              <div className="bg-branco rounded-md p-3 relative overflow-hidden">
                <Dashboard userId={id} session={session} premium={session_data!.premium} dict={dict} />
              </div>

              {isAssociado == "Associado" ? (
                <div className="bg-branco rounded-md mt-3 p-3">
                  <Calendario ownId={session_data?.id} idProfile = {id} />
                </div>
              ) : (<></>)}

            </div>

          </div>
        </div>

      </div> */}
    </>
  );
}
