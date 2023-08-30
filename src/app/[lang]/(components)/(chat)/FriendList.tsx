import { userGroup } from "../../../../../lib/modelos";
import FriendListCard from "./FriendListCard";

interface FriendListProps {
    dict: any;
    userId: string | undefined;
    userLinks: userGroup;
}

export default async function FriendList({ dict, userLinks, userId }: FriendListProps) {
    return (
        <>
            <div className={`flex flex-col pt-1 max-h-fit overflow-y-auto snap-start  gap-1`}>
                {userLinks!.length > 0 && userId
                    ? userLinks!.map((item) => {
                        return (
                            <FriendListCard
                                key={item.id}
                                idremetente={userId}
                                iddestinatario={item.id}
                                nome={item.nome}
                            />
                        );
                    }) : <span className="text-black dark:text-white text-center">{dict.feed.cards.nolinksyet}</span>}
            </div>
        </>
    );
}