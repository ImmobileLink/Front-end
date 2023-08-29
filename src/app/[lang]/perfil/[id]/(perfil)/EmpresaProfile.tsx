import Calendario from '@/app/[lang]/(components)/Calendario';
import Cabecalho from './components/Cabecalho';
import Dashboard from './components/Dashboard';
import Infos from './components/Infos';
import { Page as P } from './composition/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../lib/database.types';
import { cookies } from 'next/headers';
import { Dictionaries } from '@/app/i18n/dictionaries/types';
import { userData } from '../../../../../../lib/modelos';

interface EmpresaProfileProps {
  profile: userData
  session: userData;
  dict: Dictionaries
}

const supabase = createServerComponentClient<Database>({ cookies })

export default async function EmpresaProfile({ profile, session, dict }: EmpresaProfileProps) {

  let { data: isAssociado } = await supabase
    .rpc('verifica_associacao', {
      valor1: profile!.id!,
      valor2: session!.id!
    })

  return (
    <>
      <P.Root>
        <P.Main>
          <Cabecalho dict={dict} isAssociado={isAssociado} session_data={session} corretor={profile} />
          <Infos dict={dict} corretor={profile} />
        </P.Main>

        <P.Right>
          <P.Dashboard>
            <Dashboard userId={profile!.id!} session={session} premium={session!.premium} dict={dict} />
          </P.Dashboard>


          <P.Calendar>
            <Calendario ownId={session?.id} idProfile={profile?.id} />
          </P.Calendar>
        </P.Right>
      </P.Root >
    </>
  );
}