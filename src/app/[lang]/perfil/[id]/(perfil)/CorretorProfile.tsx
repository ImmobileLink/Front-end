import Calendario from '@/app/[lang]/(components)/Calendario';
import Dashboard from './components/Dashboard';
import Infos from './components/Infos';
import { Page } from './composition/page'
import { Page as Cabecalho } from './composition/cabecalho'
import { profileSimpleData } from '../../../../../../lib/modelos';
import { getCorretorData, verifyIfIsAssociado } from '../../../../../../lib/Utils/userProfile';



interface CorretorProfileProps {
    profile: profileSimpleData;
    session: profileSimpleData | null;
    dict: any;
}



export default async function CorretorProfile({ profile, session, dict }: CorretorProfileProps) {

    const corretorData = await getCorretorData(profile.id!)
    const isAssociado = session && await verifyIfIsAssociado(profile.id!, session.id!)

    //enviar associacoes para o InfosPadrao

    return (
        <Page.Root>
            <Page.Main>

                <Cabecalho.InfosPadrao corretor={corretorData!} dict={dict} isAssociado={isAssociado} session_data={session}>
                    {session &&
                        <Cabecalho.Botoes profileId={profile.id!} sessionId={session?.id!} />
                    }
                </Cabecalho.InfosPadrao>



                <Infos dict={dict} corretor={corretorData} />
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard premium={session?.premium} dict={dict} />
                </Page.Dashboard>


                <Page.Calendar>
                    <Calendario ownId={session?.id} idProfile={profile?.id} />
                </Page.Calendar>
            </Page.Right>
        </Page.Root >
    );
}