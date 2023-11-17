import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import Botoes from "./Botao/Botoes";
import { Card } from "@/app/[lang]/(components)/(compositions)/(card)";
import { MdWorkspacePremium } from 'react-icons/md';
import EditProfileCorporacao from "./Edit/EditProfileCorporacao";
import EditProfileCorretor from "./Edit/EditProfileCorretor";
import { Corporacao, Corretor } from "../../../../../../../../lib/modelos";
import CabecalhoData from "./CabecalhoData";
import Capa from "./Capa";
import AvatarCabecalho from "./AvatarCabecalho";
import { Page } from "../../composition/page";
import Dashboard from "../Dashboard/Dashboard";
import { Profile } from "@/app/i18n/dictionaries/types";

interface InfosPadraoProps {
  dict: Profile;
}

export default async function Cabecalho({dict}: InfosPadraoProps) {

  const state = useProfileStore.getState()
  const session = state.sessionData
  const profile = state.profileData
  const profileFullData = state.profileFullData

  const premium  = state.dict!.profile.premium

  return (
    <>
      <div className="ring-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md bg-white rounded-md">
        <div className="h-44 relative">
          <Capa />
        </div>

        <div className="p-8 -mt-28 relative">
          <div className="flex justify-between w-full mb-3 items-end">
            <AvatarCabecalho />
            <div className="flex gap-5">
              {state.isOwn && (
                session?.type == "corretor" ? (
                  <EditProfileCorretor data={profileFullData as Corretor} />
                ) : (
                  <EditProfileCorporacao data={profileFullData as Corporacao} />
                )
              )}
              {profile?.isPremium && <MdWorkspacePremium size={30} title={premium} />}
            </div>
          </div>

          <CabecalhoData
            action={session?.id && !state.isOwn && <Botoes />}
          />
        </div>

        <div className=" pb-7 mx-5 lg:hidden flex justify-center">
         
            <Page.Dashboard>
              <Dashboard dict={dict.dashboard}/>
            </Page.Dashboard>
        </div>
      </div>
    </>
  );
}
