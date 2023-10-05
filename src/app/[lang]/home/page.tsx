
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavBarHome from "../(components)/(home)/NavBarHome";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";

interface HomeProps {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: HomeProps) {
    const dict = await getDictionary(lang); // pt
        
    return (
        <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200">
            <NavBarHome lang={lang}/>
        </div>
    );
}
