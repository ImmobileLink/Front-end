import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Database } from "../../../../lib/database.types";
import { userData } from "../../../../lib/modelos";
import { getDictionary } from "../dictionaries";
import {
    getAssoc,
    getLinks,
    getTipoUsuario,
} from "../../../../lib/utils/userData";
import { Card } from "../(components)/(compositions)/(card)";
import CardUserList from "../(components)/(cards)/CardUserList";
import NavBar from "../(components)/(navbar)/NavBar";
import LinksList from "./components/LinksList";

interface pageProps {
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

async function getUserData(user: userData) {
    const supabase = createServerSupabaseClient();
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session?.user.id) {
        user = await getTipoUsuario(user, session.user.id);

        [user, user] = await Promise.all([getLinks(user), getAssoc(user)]);
    }

    return user;
}

export default async function page({ params: { lang } }: pageProps) {
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
        <div>
            <NavBar
                params={{
                    lang: lang,
                }}
            />
            <div className="pt-4 w-full h-fit min-h-screen bg-branco dark:bg-dark-200 flex flex-row justify-center">
                <div className="md:mx-2 md:w-7/12 w-11/12 flex">
                    <LinksList links={userData.links} assoc={userData.assoc}/>
                </div>
                <div className="w-fit hidden md:flex mx-4">
                    <Card.Root>
                        <Card.Title title={dict.feed.cards.findbrokers} />
                        <Card.Content>
                            <CardUserList
                                cards={dict.feed.cards}
                                avatar={userData.avatar}
                            />
                        </Card.Content>
                    </Card.Root>
                </div>
            </div>
        </div>
    );
}
