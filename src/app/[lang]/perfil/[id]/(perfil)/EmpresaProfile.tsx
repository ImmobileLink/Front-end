import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Dashboard from './components/Infos/Empresa/Dashboard/DashboardEmpresa';
import Calendario from '@/app/[lang]/(components)/Calendario';
import InfosEmpresa from './components/Infos/InfosEmpresa';

export default async function page() {

    const state = useProfileStore.getState()

    return (
        <>
            <Page.Main>
                <Cabecalho />
                <InfosEmpresa/>
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard />
                </Page.Dashboard>

                <Page.Calendar>
                    <Calendario ownId={state.sessionData?.id} idProfile={state.profileData?.id} />
                </Page.Calendar>
            </Page.Right>
        </>
    );
}