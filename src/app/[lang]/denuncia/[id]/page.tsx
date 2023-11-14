import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import Image from "next/image";
import CardRoot from "../../(components)/(compositions)/(card)/CardRoot";
import CabecalhoForm from "./components/CabecalhoForm";
import { serverSupabase } from "lib/utils/serverSupabase";
import { getPublicacaoPorIdAPI } from "./denunciaUtils";

interface pageProps {
    params: {
        id: string;
        lang: string;
    };
}

export default async function ReportForm({ params: { id, lang } }: pageProps) {
    const supabase = await serverSupabase();
    const dict = await getDictionary(lang);
    
    const data = await getPublicacaoPorIdAPI(id, supabase)
   

    return (
        <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200 select-none">
            <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 h-[72px] max-h-[72px]">
                <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-center mx-auto px-2 py-4 md:pt-3 md:pb-3 max-h-[72px]">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                className="w-10 h-10"
                                src="assets/favicon/favicon-32x32.png"
                                alt="logo"
                                width={10}
                                height={10}
                            />
                            <span className="block self-center text-md md:text-2xl font-semibold whitespace-nowrap dark:text-white">
                                ImmobileLink
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="space-y-6 sm:mx-auto w-full lg:w-11/12 lg:min-w-[900px]">
                <div className="flex justify-center z-0 w-full group py-4">
                    <CardRoot className="h-full md:w-8/12 px-8 md:px-0">
                        <CabecalhoForm publicacao={data} dict={dict.denuncia} />
                    </CardRoot>
                </div>
            </div>
        </div>
    );
}
