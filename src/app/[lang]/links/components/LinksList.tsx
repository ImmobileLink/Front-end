"use client";

import { Card } from "../../(components)/(compositions)/(card)";
import Link from "next/link";
import { BiSolidLeftArrow } from "react-icons/bi";

interface LinksListProps {}

export default function LinksList({}: LinksListProps) {
    return (
        <div>
            <Card.Root className="md:pr-8 p-2">
                <div className="flex items-center ml-6 text-xl">
                    <Link href="/feed" className="mr-4">
                        <BiSolidLeftArrow />
                    </Link>
                    <a>Meus links</a>
                    <a className="px-2">Associados</a>
                </div>
                {
                    // mensagem padrão caso user sem links
                }
                <div className="ml-16 mt-2">
                    <p>
                        Parece que você ainda não tem nenhuma conexão. Tente
                        encontrar novos Links.
                    </p>
                </div>
            </Card.Root>
        </div>
    );
}
