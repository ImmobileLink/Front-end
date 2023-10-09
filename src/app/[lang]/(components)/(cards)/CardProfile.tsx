import Link from "next/link";
import Avatar from "../Avatar";
import { Cards } from "../../../i18n/dictionaries/types";
import { userData } from "../../../../../lib/modelos";
import CardNavigation from "./CardNavigation";

interface CardProfileProps {
  userData: userData;
  cards: Cards;
}

export default function CardProfile({ userData, cards }: CardProfileProps) {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-between align-middle">
        <div>
          <div className="flex justify-center">
            <Avatar
              route={userData.avatar!}
              size={"l"}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <span className="text-2xl text-black dark:text-white text-center">
              {userData.nome}
            </span>
            <Link
              className="text-gray-500 dark:text-gray-300 hover:font- text-center"
              href={`/perfil/${userData.id}`}
            >
              {cards.visitmyprofile}
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center">
          <CardNavigation
            userData={userData}
            cards={cards}
          />
        </div>

        {!userData.isPremium ? (
          <>
            <div className="w-full flex flex-col justify-center">
              <span className="dark:text-white text-center mt-3 mb-1">
                {cards.notpremiumyet}
                <Link href={"/plano"} className="hover:text-orange-400 ease-in duration-500">{" " + cards.premium}</Link>
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col justify-center">
            <span className="dark:text-white text-center mt-3 mb-1">POG PREMIUM</span>
          </div>
        )
        }
      </div>
    </>
  );
}
