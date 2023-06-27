import { Cards } from "@/app/i18n/dictionaries/types";
import Link from "next/link";

interface NavSettingsProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
  cards: Cards;
}

export default async function NavSettings({
  userData,
  cards,
}: NavSettingsProps) {
  return (
    <>
      <div className="w-full h-fit flex justify-center align-middle ring-2 ring-gray-300 rounded-md bg-white drop-shadow-md">
        <div className="w-full flex flex-col align-middle my-4">
          {userData.role == 2 ? (
            <>
              <Link
                href={"/pesquisa"}
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
                href={"/pesquisa"}
                className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                {cards.schedules}
              </Link>
            </>
          ) : (
            ""
          )}
          {userData.role == 1 ? (
            <>
              <Link
                href={"/pesquisa"}
                className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                {cards.schedules}
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
