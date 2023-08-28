
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Cabecalho from "./(perfil)/components/Cabecalho";
import Dashboard from "./(perfil)/components/Dashboard";
import Infos from "./(perfil)/components/Infos";
import type { Database } from '../../../../../lib/database.types';
import Calendario from '../../(components)/Calendario';
import { getDictionary } from '../../dictionaries';
import { getUserData } from '../../../../../lib/Utils/userProfile'
import { Page as P } from './(perfil)/composition/page'

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

  const profile = await getUserData(id)

  const session_data = session && await getUserData(session.user.id)


  let { data: isAssociado } = await supabase
    .rpc('verifica_associacao', {
      valor1: id,
      valor2: session!.user.id
    })



  let { data: corretor } = await supabase
    .from('corretor')
    .select('*')
    .eq('id', id)
    .single()


  return ( 

      <P.Root>
        <P.Main>
          <Cabecalho dict={dict} isAssociado={isAssociado} session_data={session_data} corretor={corretor} />
          <Infos dict={dict} corretor={corretor} />
        </P.Main>

        <P.Right>
          <P.Dashboard>
            <Dashboard userId={id} session={session} premium={session_data!.premium} dict={dict} />
          </P.Dashboard>

          {isAssociado == "Associado" && (
            <P.Calendar>
              <Calendario ownId={session_data?.id} idProfile={id} />
            </P.Calendar>
          )}
        </P.Right>
      </P.Root >
  );
}
