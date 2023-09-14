import { Labels } from "@/app/i18n/dictionaries/types";
import { userData } from "../../../../../lib/modelos";
import UserCarousel from "./UserCarousel";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { Database } from "../../../../../lib/database.types";

interface NearbyUsersProps {
  dict: Labels;
  estado: string;
  userData: userData;
}


export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getData(estado: string) {
  const supabase = createServerSupabaseClient();

  let { data, error } = await supabase
    .rpc('obter_corretores_por_estado', {
      estadoinputado: estado
    })

  return data;
}

export default async function NearbyUsers({ dict, estado, userData }: NearbyUsersProps) {
  const carouselUsers = await getData(estado);

  return (
    <>
      <div className="w-full px-4">
        <span className="text-black dark:text-white text-xl text-start">
          {dict.nearbyusers} <span className="font-bold">
            {/* {_UF_converter[estado![0].estado]} */}
            {estado}
          </span>
        </span>
        <UserCarousel data={carouselUsers} />
      </div>
    </>
  );
}