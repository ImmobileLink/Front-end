import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import NavBarHome from "../(components)/(home)/NavBarHome";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import Banner from "./components/banner";
import Card1 from "./components/card1";
import Card2 from "./components/card2";
import Card3 from "./components/card3";
import CallToAction from "./components/callToAction";

interface HomeProps {
    params: {
        lang: string;
    };
}

export default async function Home({ params: { lang } }: HomeProps) {
    const dict = await getDictionary(lang); // pt

    return (
        <div className="w-full h-fit min-h-screen bg-branco dark:bg-dark-200">
            <NavBarHome lang={dict} />
            <Banner lang={dict} />
            <Card1 lang={dict} />
            <Card2 lang={dict} />
            <Card3 lang={dict} />
            <CallToAction lang={dict} />
        </div>
    );
}
