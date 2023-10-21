import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Calendario from '@/app/[lang]/(components)/Calendario';
import InfosEmpresa from './components/Infos/InfosEmpresa';
import Dashboard from './components/Dashboard/Dashboard';

export default async function page() {

    const isAssociado = useProfileStore.getState().isAssociado

    return (
        <>
            <Page.Main>
                <Cabecalho />
                <InfosEmpresa />
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard/>
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