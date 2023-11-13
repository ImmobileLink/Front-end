import { getDictionary } from "../dictionaries";
import PlanoTable from "./components/PlanoTable";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getUserData } from "lib/utils/userData";


interface pageProps {
    params: {
        lang: string;
    };
}

export default async function page({ params: { lang } }: pageProps) {
  const supabase = await serverSupabase();

  const dict = await getDictionary(lang); // pt
  const userData = await getUserData(supabase);

    return (
        <>
            <p className="w-full select-none pt-6 md:pt-8 lg:pt-10 text-black dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
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
