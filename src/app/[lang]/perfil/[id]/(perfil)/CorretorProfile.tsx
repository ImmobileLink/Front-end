import Calendario from '@/app/[lang]/(components)/Calendario';
import Cabecalho from './components/Cabecalho';
import Dashboard from './components/Dashboard';
import Infos from './components/Infos';
import { Page as P } from './composition/page'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../../../../../lib/database.types';
import { cookies } from 'next/headers';
import { getDictionary } from '@/app/[lang]/dictionaries';
import { Dictionaries } from '@/app/i18n/dictionaries/types';
import { profileSimpleData } from '../../../../../../lib/modelos';
import { getCorretorData, verifyIfIsAssociado } from '../../../../../../lib/Utils/userProfile';



interface CorretorProfileProps {
    profile: profileSimpleData;
    session: profileSimpleData | null;
    dict: any;
}

const supabase = createServerComponentClient<Database>({ cookies })


export default async function CorretorProfile({ profile, session, dict }: CorretorProfileProps) {

    const corretorData = await getCorretorData(profile.id!)
    const isAssociado = session && await verifyIfIsAssociado(profile.id!, session.id!)


    return (
        <P.Root>
            <P.Main>
                <Cabecalho dict={dict} isAssociado={isAssociado} session_data={session} corretor={corretorData} />
                <Infos dict={dict} corretor={corretorData} />
            </P.Main>

            <P.Right>
                <P.Dashboard>
                    <Dashboard premium={session?.premium} dict={dict} />
                </P.Dashboard>


                <P.Calendar>
                    <Calendario ownId={session?.id} idProfile={profile?.id} />
                </P.Calendar>
            </P.Right>
        </P.Root >
    );
}