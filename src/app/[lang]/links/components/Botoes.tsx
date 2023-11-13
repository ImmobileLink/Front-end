import { MyLinks } from "@/app/i18n/dictionaries/types";
import Link from "next/link";

interface BotoesProps {
    dict: MyLinks;
    link: any;
    user: any;
}

export default function Botoes({ dict, link, user }: BotoesProps) {
    return (
        <div className="mt-5 flex flex-wrap w-full justify-end">
            {/* <BotaoConecta link={link} userId={user}/> */}
            <Link href={`/redirect/chat/${link.id}`}>
                <button className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                    {dict.talk}
                </button>
            </Link>
        </div>
    );
}
