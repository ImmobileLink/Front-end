import { Cards } from "@/app/i18n/dictionaries/types";
import Avatar from "../Avatar";
import Link from "next/link";
import { getBrokersData } from "../../feed/utils";

interface NavFindBrokersProps {
  cards: Cards;
}

export default async function NavFindBrokers({cards}: NavFindBrokersProps ) {
  const corretores = await getBrokersData();
  return (
    <>
    <div className="w-full h-fit py-4 flex flex-col justify-center align-middle gap-4 ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
      
       <div className="flex flex-col gap-4 justify-center">
          <span className="text-black dark:text-white text-2xl text-center">{cards.findbrokers}</span>
          <div className="flex mb-5 -space-x-4 justify-center">
            {corretores?.map((item) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Avatar userId={item.id} />
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
                  </div>
    </>
  );
}