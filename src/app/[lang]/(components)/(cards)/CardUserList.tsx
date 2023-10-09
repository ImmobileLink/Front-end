import { Cards } from "@/app/i18n/dictionaries/types";
import Avatar from "../Avatar";
import Link from "next/link";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '../../../../../lib/database.types';
import { cache } from "react";

interface CardUserListProps {
  cards: Cards;
}

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

async function getData() {
  const supabase = createServerSupabaseClient();
  let { data, error } = await supabase.rpc("obter_cinco_corretores_id");

  return data;
}

export default async function CardUserList({ cards }: CardUserListProps) {
  const avatares = await getData();

  return (
    <>
      <div className="flex flex-col  justify-center">
        <div className="flex mb-5 p-1 -space-x-4 justify-center">
          {avatares?.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Avatar route={item.avatar} />
            );
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