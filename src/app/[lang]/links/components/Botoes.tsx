import { MyLinks } from "@/app/i18n/dictionaries/types";
import Link from "next/link";

interface BotoesProps {
    dict: MyLinks;
    type: string;
    link: any;
}

export default function Botoes({ dict, link, type }: BotoesProps) {
    return (
        <div className="mt-5 flex flex-wrap w-full justify-end">
            <Link href={`/redirect/chat/${link.id}`}>
                <button className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                    {dict.talk}
                </button>
            </Link>
            {type == "corretor" ? null : (
                <>
                    {
                        // verifica se o usuário é pessoa física (Corretor)
                        link.cpf != null && link.cpf != undefined ? (
                            <>
                                <Link href={`/imovel`} className="ml-2">
                                    <button className="md:mt-0 mt-2 w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                                        {dict.visit}
                                    </button>
                                </Link>
                            </>
                        ) : null
                    }
                </>
            )}
        </div>
    );
}
