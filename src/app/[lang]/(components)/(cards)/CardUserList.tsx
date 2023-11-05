import { Cards } from "@/app/i18n/dictionaries/types";
import Avatar from "../Avatar";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../../../../lib/database.types";
import { cache } from "react";

interface CardUserListProps {
    cards: Cards;
    avatar: string | undefined;
}

export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
        cookies: () => cookieStore,
    });
});

async function getData(avatar: string | undefined) {
    const supabase = createServerSupabaseClient();
    let { data, error } = await supabase
        .rpc("obter_cinco_corretores_id")
        .neq("avatar", avatar);

    return data;
}

export default async function CardUserList({
    cards,
    avatar,
}: CardUserListProps) {
    const avatares = await getData(avatar);

    return (
        <>
            <div className="flex flex-col  justify-center select-none">
                <div className="flex mb-5 p-1 -space-x-4 justify-center">
                    {avatares?.map((item, index) => {
                        return <Avatar route={item.avatar} key={index} />;
                    })}
                </div>
                <Link
                    href={"/pesquisa"}
                    className="self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                    {cards.search}
                </Link>
            </div>
        </>
    );
}
