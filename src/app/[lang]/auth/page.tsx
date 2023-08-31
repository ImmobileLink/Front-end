import Image from "next/image";
import ImmobileLogo from "@/app/[lang]/(components)/ImmobileLogo";
import { getDictionary } from "../dictionaries";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../lib/database.types";
import AuthForm from "./AuthForm";
// import bg from "assets/login/bg1.jpg";

interface PageProps {
    params: {
        lang: string;
    };
}

const supabase = createServerActionClient<Database>({ cookies });

async function getData() {
    let { data: tipoImovel } = await supabase
        .from("tipoImovel")
        .select("id,descricao");

    let { data: regiao } = await supabase.from("regiao").select("id,regiao");

    return { tipoImovel, regiao };
}

export default async function page({ params: { lang } }: PageProps) {
    const dict = await getDictionary(lang); // pt
    const data = await getData();

    return (
        <>
            <div className="flex w-screen h-screen bg-branco dark:bg-dark-200 overflow-x-hidden">
                <div className="flex w-2/3 h-fit flex-col m-auto justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <ImmobileLogo />
                    </div>

                    <div className="mt-10 h-max">
                        <AuthForm auth={dict.auth} data={data} lang={lang} />
                    </div>
                </div>
                <div
                    className="relative w-1/3 hidden lg:flex shrink-0 min-h-[80%] rounded-s-giga overflow-hidden"
                    // style={{
                    //   backgroundImage: `url(${bg.src})`,
                    //   width: '100%',
                    //   height: '100%',
                    // }}
                >
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
