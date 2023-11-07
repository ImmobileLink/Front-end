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
    // const userData = await getUserData(user);
    return <>Hello World!</>;
}
