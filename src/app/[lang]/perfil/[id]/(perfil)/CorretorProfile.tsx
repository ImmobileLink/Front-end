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
import { userData } from '../../../../../../lib/modelos';



interface CorretorProfileProps {
    profile: userData
    session: userData

    dict: Dictionaries
}

const supabase = createServerComponentClient<Database>({ cookies })


export default async function CorretorProfile({ profile, session, dict }: CorretorProfileProps) {

    let { data: profileData } = await supabase
        .from('corretor')
        .select('*')
        .eq('id', profile?.id)
        .single()

    let { data: isAssociado } = await supabase
        .rpc('verifica_associacao', {
            valor1: profile!.id!,
            valor2: session!.id!
        })

    return (
        <>
            <P.Root>
                <P.Main>
                    <Cabecalho dict={dict} isAssociado={isAssociado} session_data={session} corretor={profileData} />
                    <Infos dict={dict} corretor={profileData} />
                </P.Main>

                <P.Right>
                    <P.Dashboard>
                        <Dashboard userId={profile!.id!} session={session} premium={session.isPremium} dict={dict} />
                    </P.Dashboard>


                    <P.Calendar>
                        <Calendario ownId={session?.id} idProfile={profile?.id} />
                    </P.Calendar>
                </P.Right>
            </P.Root >
        </>
    );
}