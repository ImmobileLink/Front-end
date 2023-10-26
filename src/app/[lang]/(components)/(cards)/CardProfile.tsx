import Link from "next/link";
import Avatar from "../Avatar";
import { Cards } from "../../../i18n/dictionaries/types";
import { userData } from "../../../../../lib/modelos";
import CardNavigation from "./CardNavigation";
import { AiFillStar} from "react-icons/ai";

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
              className="text-gray-500 dark:text-gray-300 hover:font- text-center hover:underline"
              href={`/perfil/${userData.id}`}
            >
              {cards.visitmyprofile}
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <CardNavigation
            userData={userData}
            cards={cards}
          />
        </div>

        {!userData.isPremium ? (
          <>
            <div className="w-full flex flex-row justify-center items-center">
            <AiFillStar className="pr-1 text-yellow-500 dark:text-yellow-400 text-2xl"/>
              <span>
                {cards.notpremiumyet}
                <Link href={"/plano"} className="hover:text-yellow-600 ease-in duration-500 font-medium">{" " + cards.premium}</Link>
              </span>
            </div>
          </>
        ) : (
          <div className="flex w-full justify-center">
          <div className="w-9/12 flex flex-row items-center justify-center bg-gradient-to-l from-yellow-400 to-yellow-600 rounded-lg">
            <AiFillStar className="items-center pr-1 text-black text-2xl"/>
            <div><span className="text-black items-center font-semibold text-center mb-1">PREMIUM</span></div>
          </div>
          </div>
        )
        }
      </div>
    </>
  );
}
