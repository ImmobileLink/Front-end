import { Cards } from "@/app/i18n/dictionaries/types";
import Link from "next/link";

interface CardNotLoggedProps {
  cards: Cards;
}

export default async function CardNotLogged({ cards }: CardNotLoggedProps ) {
  return (
    <>
       <div className="flex flex-col align-middle my-4 select-none">
          <span className="text-2xl text-black dark:text-white text-center tracking-tighter mb-4">
            {cards.yourenotlogged}
          </span>
          <Link
            className="w-fit self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            href={"/auth"}
          >
            {cards.singin}
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-200 text-center">
            {cards.enjoyall}
          </span>
        </div>
    </>
  );
}