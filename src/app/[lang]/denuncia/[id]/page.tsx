import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import { Database } from "../../../../../lib/database.types";
import NavBar from "../../(components)/(navbar)/NavBar";
import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import Image from "next/image";

interface pageProps {
    params: {
        id: string;
        lang: string;
    };
}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

export default async function ReportForm({ params: { id, lang } }: pageProps) {
    const supabase = createServerSupabaseClient();
    const dict = await getDictionary(lang);
    // publi -> params.id
    return (
        <div className="w-screen h-screen bg-branco dark:bg-dark-200 justify-center">
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
            DENÚNCIA
        </div>
    );
}