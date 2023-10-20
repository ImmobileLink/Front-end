import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import InfosCorretor from './components/Infos/InfosCorretor';
import DashboardCorretor from './components/Infos/Corretor/Dashboard/DashboardCorretor';
import Calendario from '@/app/[lang]/(components)/Calendario';
import { Corretor } from '../../../../../../lib/modelos';

export default async function page() {

    const isAssociado = useProfileStore.getState().isAssociado

    return (

        <>
            <Page.Main>
                <Cabecalho />
                <InfosCorretor />
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <DashboardCorretor />
                </Page.Dashboard>

                {isAssociado && (
                    <Page.Calendar>
                        <Calendario />
                    </Page.Calendar>
                )}


            </Page.Right>
        </>

    );
}