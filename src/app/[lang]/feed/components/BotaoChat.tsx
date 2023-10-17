import Link from "next/link";
// import BotaoAdd from "./botaoAdd";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { cookies } from "next/headers";
import { useProfileStore } from "../../../../../lib/store/profileStore";
import { cache } from "react";

interface BotaoChatProps {}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

export default async function BotaoChat({}: BotaoChatProps) {
    const supabase = createServerSupabaseClient();

    const state = useProfileStore.getState();

    const profile = state.profileData;
    const session = state.sessionData;
    const dict = state.dict;

    let { data, error } = await supabase.rpc("criar_ou_retornar_sala", {
        id_destinatario: profile?.id!,
        id_usuario: session?.id!,
    });

    let sala = `/chat/${data}`;

    return (
        <div className="flex flex-wrap">
            {/* <BotaoAdd idProfile={profile?.id!} idSession={session?.id!} dict={dict}  /> */}
            <Link href={sala}>
                <button className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                    Conversar
                </button>
            </Link>
        </div>
    );
}
