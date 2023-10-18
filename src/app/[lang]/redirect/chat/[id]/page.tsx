import Link from "next/link";
// import BotaoAdd from "./botaoAdd";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import { cookies, headers } from "next/headers";
import { useProfileStore } from "../../../../../../lib/store/profileStore";
import { cache } from "react";
import { redirect } from "next/navigation";
import { userData } from "../../../../../../lib/modelos";
import { GetServerSidePropsContext } from "next/types";
import Loading from "@/app/[lang]/(components)/(auth)/Loading";
// import { useRouter } from "next/navigation";

interface BotaoChatProps {}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

export default async function BotaoChat(params: any) {
    const supabase = createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    let { data, error } = await supabase.rpc("criar_ou_retornar_sala", {
        id_destinatario: params.params.id,
        id_usuario: session?.user.id!,
    });

    let sala = `/chat/${data}`;
    redirect(sala);

    return (
        <div></div>
    );
}
