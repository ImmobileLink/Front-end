import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Dashboard from './components/Infos/Empresa/Dashboard/DashboardEmpresa';
import Calendario from '@/app/[lang]/(components)/Calendario';
import InfosEmpresa from './components/Infos/InfosEmpresa';
import DashboardEmpresa from './components/Infos/Empresa/Dashboard/DashboardEmpresa';

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
                    <DashboardEmpresa />
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