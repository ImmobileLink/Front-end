import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavBarHome from "../(components)/(home)/NavBarHome";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import Banner from "./components/banner";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import Card3 from "./components/card3";
import CallToAction from "./components/callToAction";
import { cookies } from "next/headers";
import { cache } from "react";
import { Database } from "../../../../lib/database.types";
import PlanoTable from "../(components)/(plano)/PlanoTable";
import ComparePlanos from "./components/ComparePlanos";

interface HomeProps {
    params: {
        lang: string;
    };
}

const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

async function getLoginStatus() {
    const supabase = createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session != null;
}

export default async function Home({ params: { lang } }: HomeProps) {
    const dict = await getDictionary(lang); // pt
    const isUserLoggedIn = await getLoginStatus();

    return (
        <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200">
            <NavBarHome lang={dict.home} isUserLoggedIn={isUserLoggedIn} />
            <Banner lang={dict.home} isUserLoggedIn={isUserLoggedIn} />
            <Card1 lang={dict.home} />
            <Card2 lang={dict.home} />
            <Card3 lang={dict.home} />
            <ComparePlanos sub={dict.planos} />
            {/* <div className="flex w-full justify-center py-8 md:py-0 md:justify-end md:px-16">
                <a
                    href="/auth"
                    className="md:mt-6 md:mb-12 flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200 md:text-xs"
                >
                    {dict.home.tryPremium}
                </a>
            </div> */}
            <CallToAction
                lang={dict.home}
                footer={dict.footer}
                isUserLoggedIn={isUserLoggedIn}
            />
        </div>
    );
}
