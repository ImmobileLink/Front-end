import Link from "next/link";
// import BotaoAdd from "./botaoAdd";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import { cookies } from "next/headers";
import { useProfileStore } from "../../../../../../lib/store/profileStore";
import { cache } from "react";
import { redirect } from "next/navigation";
import { userData } from "../../../../../../lib/modelos";
// import { useRouter } from "next/navigation";

interface BotaoChatProps {}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

export default async function BotaoChat({}: BotaoChatProps) {
    const supabase = createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    const state = useProfileStore.getState();

    const profile = state.profileData;
    const dict = state.dict;

    let { data, error } = await supabase.rpc("criar_ou_retornar_sala", {
        id_destinatario: profile?.id!,
        id_usuario: session?.user.id!,
    });
    console.log("==== PARAMS ====");
    console.log({
        id_destinatario: profile?.id!,
        id_usuario: session?.user.id!,
    });
    console.log("==== DATA, ERROR ====");
    console.log(data, error);

    let sala = `/chat/${data}`;
    console.log("==== SALA ====");
    console.log(sala);

    // redirect(sala);

    return <div></div>;
}
