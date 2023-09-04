import Image from "next/image";
import Avatar from "@/app/[lang]/(components)/Avatar"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import { cookies } from "next/headers";
import { AiFillEdit } from "react-icons/ai";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import Botoes from "./Botoes";
import { cache } from "react";
import EditProfile from "./EditProfile";


interface InfosPadraoProps {
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})


export default async function Cabecalho({ }: InfosPadraoProps) {

  const supabase = createServerSupabaseClient();

  const state = useProfileStore.getState()
  const session = state.sessionData
  const profile = state.profileData
  const profileFullData = state.profileFullData

  const isOwnProfile = () => {
    if (session?.id == profile?.id) {
      return true;
    }
    return false;
  }

  const isOwn = isOwnProfile()

  console.log(session)


  return (
    <>
      <div className="h-44 overflow-hidden rounded-md relative">
        <Image
          className="w-screen my-auto"
          src="users/cover/cover.jpg"
          alt="capa"
          width={1}
          height={1}
        />
        {isOwn && (
          <button className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Alterar Imagem
          </button>
        )}

      </div>


      <div className="p-8 -mt-28 relative">
        <div className="flex justify-between w-full items-baseline mb-3">
          <div className="w-34 h-34 rounded-full bg-white flex justify-center items-center">
            <Avatar userId={profile!.id} size={"big"} />
          </div>
          {isOwn && (
            <EditProfile/>
          )}

        </div>
        <h2 className="font-bold text-2xl">{profile?.nome}</h2>
        <p className="text-gray-500">{`${profileFullData?.cidade} - ${profileFullData?.estado}`}</p>

        {session?.id && !isOwn && (
          <Botoes />
        )}

      </div>

       {/* {profile. != null && (
        <div className="px-5">
          <div className="bg-white mt-3 rounded-md p-3">
            <p className="">{profile?.sobre}</p>
          </div>
        </div>
      )} */}
    </>
  );
}
