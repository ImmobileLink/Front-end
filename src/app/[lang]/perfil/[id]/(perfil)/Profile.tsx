import { useProfileStore } from '../../../../../../lib/store/profileStore';
import { Page } from './composition/page';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Calendario from '@/app/[lang]/(components)/Calendario';
import Dashboard from './components/Dashboard/Dashboard';
import Infos from './components/Infos/Infos';

export default async function page() {

    const isAssociado = useProfileStore.getState().isAssociado
    const isOwn = useProfileStore.getState().isOwn

    const dash = isAssociado ||  isOwn

    return (
        <>
            <Page.Main>
                <Cabecalho />
                <Infos isAssociado={isAssociado!}/>
            </Page.Main>

            <Page.Right>
                <Page.Dashboard>
                    <Dashboard/>
                </Page.Dashboard>

                {dash  && (
                    <Page.Calendar>
                        <Calendario />
                    </Page.Calendar>
                )}
            </Page.Right>
        </>
    );
}