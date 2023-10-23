import { Cards } from "@/app/i18n/dictionaries/types";
import Link from "next/link";
import { userData } from "../../../../../lib/modelos";

interface CardNavigationProps {
  userData: userData;
  cards: Cards;
}

export default function CardNavigation({
  userData,
  cards,
}: CardNavigationProps) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between">
        {userData.type == "corporacao" ? (
          <>
            <Link
              href={"/corretores"}
              className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              {cards.mybrokers}
            </Link>
            <Link
              href={"/imovel"}
              className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              {cards.myproperties}
            </Link>
            <Link
              href={"/agenda"}
              className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              {cards.schedules}
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/agenda"}
              className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              {cards.schedules}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
