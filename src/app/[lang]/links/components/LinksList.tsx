"use client";

import { Card } from "../../(components)/(compositions)/(card)";
import Link from "next/link";
import Links from "../components/Links"
import { useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";

interface LinksListProps {
    links:
        | {
              id: string;
              nome: string;
              avatar: string;
          }[]
        | null
        | undefined;
    assoc:
        | {
              id: string;
              nome: string;
              avatar: string;
          }[]
        | null
        | undefined;
}

export default function LinksList({ assoc, links }: LinksListProps) {
    const [view, setView] = useState("links");
    // TO DO:
    // BUSCAR INFOS DE TODOS OS LINKS E ASSOCIADOS NO BD PARA DISPOR DA MESMA FORMA QUE ESTÁ NA BUSCA
    return (
        <div>
            <Card.Root className="md:pr-8 p-2 pt-4">
                <div className="flex items-center ml-6 text-xl">
                    <Link href="/feed" className="mr-4">
                        <BiSolidLeftArrow />
                    </Link>
                    <a
                        onClick={() => setView("links")}
                        className={`${
                            view == "links" ? "underline font-semibold" : ""
                        } pr-2 cursor-pointer`}
                    >
                        Meus links
                    </a>
                    <a
                        onClick={() => setView("assoc")}
                        className={`${
                            view == "assoc" ? "underline font-semibold" : ""
                        } px-2 cursor-pointer`}
                    >
                        Associados
                    </a>
                </div>
                <div className="ml-16 mt-2">
                    {view == "links" ? (
                        <>
                            {links != null && links != undefined ? (
                                <>
                                    {links.length > 0 ? (
                                        <>
                                        
                                            <Links usuario={links[0]}/>
                                        
                                        </>
                                    ) : (
                                        <p>
                                            Parece que você ainda não tem
                                            nenhuma conexão. Tente encontrar
                                            novos Links.
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p>
                                    Ocorreu um erro ao carregar seus Links. Por
                                    favor, tente novamente mais tarde
                                </p>
                            )}
                        </>
                    ) : (
                        <>
                            {assoc != null && assoc != undefined ? (
                                <>
                                    {assoc.length > 0 ? (
                                        <>EXIBE ARRAY ASSOCIAÇÕES</>
                                    ) : (
                                        <p>
                                            Parece que você ainda não tem
                                            nenhuma associação. Tente encontrar
                                            novos parceiros.
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p>
                                    Ocorreu um erro ao carregar suas
                                    associações. Por favor, tente novamente mais
                                    tarde
                                </p>
                            )}
                        </>
                    )}
                </div>
            </Card.Root>
        </div>
    );
}
