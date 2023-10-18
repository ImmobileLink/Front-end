import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import InfosCorretor from './components/Infos/InfosCorretor';
import DashboardCorretor from './components/Infos/Corretor/Dashboard/DashboardCorretor';
import Calendario from '@/app/[lang]/(components)/Calendario';
import { Corretor } from '../../../../../../lib/modelos';

export default async function page() {

    const state = useProfileStore.getState()

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

                <Page.Calendar>
                    <Calendario ownId={state.sessionData?.id} idProfile={state.profileData?.id} />
                </Page.Calendar>
            </Page.Right>
        </>

    );
}