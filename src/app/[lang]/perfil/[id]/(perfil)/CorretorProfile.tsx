import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import InfosCorretor from './components/Infos/InfosCorretor';
import Dashboard from './components/Dashboard/Dashboard';
import Calendario from '@/app/[lang]/(components)/Calendario';
import { Corretor } from '../../../../../../lib/modelos';

export default async function page() {

    const state = useProfileStore.getState()

    return (

        <>
            <Page.Main>
                <Cabecalho />
                <InfosCorretor dict={state.dict!} id={state.profileFullData?.id!} corretor={state.profileFullData as Corretor} isOwn={state.isOwn}/>
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