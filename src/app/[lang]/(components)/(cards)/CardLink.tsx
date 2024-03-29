import { Cards } from "@/app/i18n/dictionaries/types";
import CardItem from "./CardItem";
import { userGroup } from "../../../../../lib/modelos";

interface CardLinkProps {
  userId: string;
  userLinks: userGroup;
  cards: Cards;
}

export default async function CardLink({ userId, userLinks, cards }: CardLinkProps) {
  return (
    <>
      <div className="w-full h-fit max-h-40 overflow-y-auto flex flex-col justify-between align-middle gap-4 select-none">
        {userLinks!.length > 0
          ? userLinks!.map((item) => {
            return (
              <CardItem
                key={item.id}
                idremetente={userId}
                iddestinatario={item.id}
                avatardestinatario={item.avatar}
                nome={item.nome}
              />
            );
          })
          : <span className="text-black dark:text-white text-center">{cards.nolinksyet}</span>}
      </div>
    </>
  );
}
