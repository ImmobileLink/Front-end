import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../lib/database.types";
import { getDictionary } from "../dictionaries";
import PlanoTable from "./components/PlanoTable";
import { getTipoUsuario } from "../../../../lib/utils/userData";
import { userData } from "../../../../lib/modelos";
import { cache } from "react";
import { setPremiumTrue, setPremiumFalse } from "./utils";
import Alert from "../(components)/Alert";
import PlanoCard from "../(components)/(plano)/PlanoCard";
import PlanoCardMobile from "./components/PlanoCardMobile";

interface pageProps {
    params: {
        lang: string;
    };
}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

async function getUserData(user: userData) {
    const supabase = createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session?.user.id) {
        user = await getTipoUsuario(user, session.user.id);
    }
    return user;
}

export default async function page({ params: { lang } }: pageProps) {
    const supabase = createServerSupabaseClient();

    let user: userData = {
        id: undefined,
        avatar: undefined,
        isPremium: undefined,
        nome: undefined,
        type: undefined,
        links: [],
        assoc: [],
    };

    const dict = await getDictionary(lang); // pt
    const userData = await getUserData(user);

    return (
        <>
            <p className="w-full pt-6 md:pt-8 lg:pt-10 text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
                {dict.planos.subscription}
            </p>
            <p className="w-full mt-2 mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 text-center self-center">
                {dict.planos.chooseyourplan}
            </p>
            <div className="w-auto flex justify-center px-10 mt-10 ">
                <div className="hidden md:flex">
                    <PlanoTable
                        id={userData.id}
                        premium={userData.isPremium!}
                        role={userData.type || "corretor"}
                        sub={dict.planos}
                    />
                </div>
                <div className="flex flex-col md:hidden">
                    {
                        // TO DO: AJUSTAR TABLE DESKTOP E MOBILE PARA PLANO DE EMPRESA
                    }
                    <PlanoCardMobile
                        dict={dict.planos}
                        id={userData.id}
                        premium={userData.isPremium!}
                        role={userData.type || "corretor"}
                        sub={dict.planos}
                    />
                    <br />
                </div>
            </div>
            <div className="py-6" />
        </>
    );
}
