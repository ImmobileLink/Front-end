import Link from "next/link";
import Avatar from "./../Avatar";
import { Cards } from "../../../i18n/dictionaries/types";

interface NavProfileProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
  };
  cards: Cards;
}

export default function NavProfile({ userData, cards }: NavProfileProps) {
  return (
    <>
      <div className="w-full h-fit flex justify-center align-middle ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
        {userData.id == undefined ? (
          <div className="flex flex-col align-middle my-4">
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
        ) : (
          <div className="w-full p-5">
            <div className="flex justify-center">
              <Avatar
                userId={userData.id}
                size={"big"}
              />
            </div>
            <div className="w-full flex flex-col justify-center">
              <span className="text-2xl text-black dark:text-white text-center">
                {userData.identificador}
              </span>
              <Link
                className="text-gray-500 dark:text-gray-300 hover:text-black text-center"
                href={`/perfil/${userData.id}`}
              >
                {cards.visitmyprofile}
              </Link>
              {userData.premium ? (
                ""
              ) : (
                <>
                  <p className="selection:text-black dark:text-white text-center mt-3 mb-1">
                    {cards.notpremiumyet}
                  </p>
                  <Link
                    href={"/plano"}
                    className="self-center w-1/2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    {cards.bepremium}
                  </Link>
                </>
              )}
              {userData.role == 2 ? (
                <>
                  <Link
                    href={"/pesquisa"}
                    className="mt-3 self-center w-3/4 lg:w-2/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                  >
                    {cards.findbrokers}
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
