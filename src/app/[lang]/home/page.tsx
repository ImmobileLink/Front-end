
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavBarHome from "../(components)/(home)/NavBarHome";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import Banner from "./components/banner";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import Card3 from "./components/card3";

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
            <Banner lang={lang}/>
            <Card1 lang={lang}/>
            <Card2 lang={lang}/>
            <Card3 lang={lang}/>
        </div>
    );
}
