"use client";

import { Card } from "../../(components)/(compositions)/(card)";
import Link from "next/link";
import Links from "../components/Links";
import { useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";

interface LinksListProps {
    type: string;
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

const supabase = createClientComponentClient<Database>();

export default function LinksList({ assoc, links, type }: LinksListProps) {
    const [view, setView] = useState("links");
    const [error, isError] = useState(false);
    const [meusLinks, setMeusLinks] = useState<any[]>([]);
    const [minhasAssoc, setMinhasAssoc] = useState([]);

    const getLinks = async () => {
        if (type == "corretor") {
            const { data, error } = await supabase.from("corretor").select(`*, usuario(avatar), avaliacao(nota)`);
            console.log(data, error)
            if (error) {
                console.log(error);
                isError(true);
            } else {
                let _meusLinks: any[] = [];
                let _linksIds: string[] = [];

                links!.forEach((item) => {
                    _linksIds.push(item.id);
                });

                data.forEach((link) => {
                    if (_linksIds.includes(link.id)) {
                        _meusLinks.push(link);
                    }
                });
                setMeusLinks(_meusLinks);
            }
        } else {
            // get links = get empresas where id = id contido nos links
            const { data, error } = await supabase.from("corporacao").select();
        }
    };

    const getAssoc = async () => {
        if (type == "corretor") {
            // get assoc = get empresas blablabla
        } else {
            // get assoc = get corretores blabla...
        }
    };

    useEffect(() => {
        getLinks();
        getAssoc();
    }, []);

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
                                            {meusLinks.map((item) => {
                                                // let mAvatar = "";
                                                // links!.forEach((link) => {
                                                //     if(item.id == link.id){
                                                //         mAvatar = link.avatar;
                                                //         return;
                                                //     }
                                                // })
                                                return (
                                                    <Links
                                                        key={item.id}
                                                        usuario={item}
                                                    />
                                                );
                                            })}
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
