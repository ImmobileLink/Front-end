import { Cards } from "@/app/i18n/dictionaries/types";
import CardAssociados from "./CardAssociados";

interface NavAssociadosProps {
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
    associados:
      | {
          id: string;
          corretor: string;
        }[]
      | null;
  };
  cards: Cards;
}

export default async function NavAssociados({ userData, cards }: NavAssociadosProps) {
  return <>
    <div className="w-full h-fit py-4 flex flex-col justify-center align-middle gap-4 ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
        <span className="text-black dark:text-white text-2xl text-center">
          {cards.relatedbrokers}
        </span>
        {userData.associados?.length != undefined && userData.associados?.length > 0
          ? userData.associados.map((item) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <CardAssociados
                  idcorporacao={userData.id}
                  idcorretor={item.id}
                  nome={item.corretor}
                />
              );
            })
          : <span className="text-black dark:text-white text-center">{cards.norelatedbrokersyet}</span>}
      </div>
  </>;
}
