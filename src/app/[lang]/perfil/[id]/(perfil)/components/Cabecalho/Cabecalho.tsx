import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import Botoes from "./Botoes";
import { Card } from "@/app/[lang]/(components)/(compositions)/(card)";
import Dashboard from "../Dashboard/Dashboard";
import { MdWorkspacePremium } from 'react-icons/md';
import EditProfileCorporacao from "./EditProfileCorporacao";
import EditProfileCorretor from "./EditProfileCorretor";
import { Corporacao, Corretor } from "../../../../../../../../lib/modelos";
import CabecalhoData from "./CabecalhoData";
import Capa from "./Capa";
import EditCapa from "./EditCapa";
import AvatarCabecalho from "./AvatarCabecalho";

interface InfosPadraoProps {
}


export default async function Cabecalho({ }: InfosPadraoProps) {

  const state = useProfileStore.getState()
  const session = state.sessionData
  const profile = state.profileData
  const profileFullData = state.profileFullData



  return (
    <>
      <div className="h-44 overflow-hidden rounded-md relative">
        <Capa />
        {state.isOwn && <EditCapa />}
      </div>

      <div className="p-8 -mt-28 relative">
        <div className="flex justify-between w-full mb-3 items-end">
          <AvatarCabecalho route={profile?.avatar!} />
          <div className="flex gap-5">
            {state.isOwn && (
              session?.type == "corretor" ? (
                <EditProfileCorretor data={profileFullData as Corretor} />
              ) : (
                <EditProfileCorporacao data={profileFullData as Corporacao} />
              )
            )}
            {profile?.isPremium && <MdWorkspacePremium size={30} title="Usuário Premium" />}
          </div>
        </div>

        <CabecalhoData
          cidade={profileFullData?.cidade!}
          sobre={profileFullData?.sobre}
          estado={profileFullData?.estado!}
          nome={profile?.nome!}
          id={profile?.id!}
          tipo={profile?.type!}
          action={session?.id && !state.isOwn && <Botoes />}
        />
      </div>

      <div className="m-5 lg:hidden flex justify-center">
        <Card.Root className="bg-gray-300 max-w-lg">
          <Card.Content>
            <Dashboard />
          </Card.Content>
        </Card.Root>
      </div>

    </>
  );
}
