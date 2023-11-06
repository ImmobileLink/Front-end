import ImmobileLogo from "@/app/[lang]/(components)/ImmobileLogo";
import Image from "next/image";
import { getDictionary } from "../dictionaries";
import AuthForm from "./AuthForm";
import { getData } from "./authUtils";
import { serverSupabase } from "lib/utils/serverSupabase";
// import bg from "assets/login/bg1.jpg";

interface PageProps {
    params: {
        lang: string;
    };
}

export default async function page({ params: { lang } }: PageProps) {
    const supabase = await serverSupabase();
    const dict = await getDictionary(lang); // pt
    const data = await getData(supabase);

    return (
        <>
            <div className="flex w-screen h-screen select-none bg-branco dark:bg-dark-200 overflow-x-hidden">
                <div className="flex md:w-2/3 h-fit flex-col m-auto justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <ImmobileLogo />
                    </div>

                    <div className="mt-10 h-max">
                        <AuthForm auth={dict.auth} data={data} lang={lang} />
                    </div>
                </div>
                <div
                    className="relative w-1/3 hidden lg:flex shrink-0 min-h-[80%] rounded-s-giga overflow-hidden">
                    <Image
                        fill
                        src="assets/login/bg1.jpg"
                        alt="Casa"
                        style={{"objectFit": "cover"}}
                    />
                </div>
            </div>
        </>
    );
}
