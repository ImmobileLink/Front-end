import { Cards } from "@/app/i18n/dictionaries/types";
import Avatar from "../Avatar";
import Link from "next/link";
import { FiMail } from "react-icons/fi";

interface NavAmizadeProps {
  userData: {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
    conexoes:
      | {
          id: string;
          nome: string;
        }[]
      | null;
  };
  cards: Cards;
}

export default async function NavAmizade({ userData, cards }: NavAmizadeProps) {
  return (
    <>
      <div className="w-full h-fit py-4 flex flex-col justify-center align-middle gap-4 ring-2 ring-gray-300 rounded-md bg-white drop-shadow-md">
        <span className="text-black text-2xl text-center">
          {cards.connections}
        </span>
        {userData.conexoes?.length != undefined
          ? userData.conexoes.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex mx-4 gap-2 ring-1 ring-black ring-inset rounded-full"
                >
                  <div>
                    <Avatar userId={item.id} />
                    <span className="self-center capitalize">{item.nome}</span>
                  </div>
                  <FiMail className="self-center" />
                </div>
              );
            })
          : "não"}
      </div>
    </>
  );
}
