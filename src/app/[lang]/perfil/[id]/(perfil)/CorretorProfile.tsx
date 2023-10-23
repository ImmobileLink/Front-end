import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import InfosCorretor from './components/Infos/InfosCorretor';
import Calendario from '@/app/[lang]/(components)/Calendario';
import { Corretor } from '../../../../../../lib/modelos';
import Dashboard from './components/Dashboard/Dashboard';

export default async function page() {

    const isAssociado = useProfileStore.getState().isAssociado
    const isOwn = useProfileStore.getState().isOwn

    return (

        <>
            <Page.Main>
                <Cabecalho />
                <InfosCorretor />
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard />
                </Page.Dashboard>

                {isAssociado || isOwn && (
                    <Page.Calendar>
                        <Calendario />
                    </Page.Calendar>
                )}


            </Page.Right>
        </>

    );
}