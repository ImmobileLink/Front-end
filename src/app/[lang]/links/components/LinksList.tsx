"use client";

import { Card } from "../../(components)/(compositions)/(card)";
import Link from "next/link";
import Links from "../components/Links";
import { useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Query } from "react-query/types/core/query";

interface LinksListProps {
    type: string;
    id: string;
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

export default function LinksList({ assoc, links, type, id }: LinksListProps) {
    const [view, setView] = useState("links");
    const [error, isError] = useState(false);
    const [meusLinks, setMeusLinks] = useState<any[]>([]);
    const [minhasAssoc, setMinhasAssoc] = useState<any[]>([]);

    const getLinks = async () => {
        let data: any;
        let error: any;
        if (type == "corretor") {
            let response = await supabase
                .from("corretor")
                .select(`*, usuario(avatar), avaliacao(nota)`);
            data = response.data;
            error = response.error;
        } else {
            let response = await supabase
                .from("corporacao")
                .select(`*, usuario(avatar)`);
            data = response.data;
            error = response.error;
        }
        if (error) {
            console.log(error);
            isError(true);
        } else {
            let _meusLinks: any[] = [];
            let _linksIds: string[] = [];

            links!.forEach((item) => {
                _linksIds.push(item.id);
            });

            data.forEach((link: any) => {
                if (_linksIds.includes(link.id)) {
                    _meusLinks.push(link);
                }
            });
            setMeusLinks(_meusLinks);
        }
    };

    const getAssoc = async () => {
        let data: any;
        let error: any;
        if (type == "corretor") {
            let response = await supabase
                .from("corporacao")
                .select(`*, usuario(avatar)`);
            data = response.data;
            error = response.error;
        } else {
            let response = await supabase
                .from("corretor")
                .select(`*, usuario(avatar), avaliacao(nota)`);
            data = response.data;
            error = response.error;
        }
        if (error) {
            console.log(error);
            isError(true);
        } else {
            let _meusLinks: any[] = [];
            let _linksIds: string[] = [];

            assoc!.forEach((item) => {
                _linksIds.push(item.id);
            });

            data.forEach((link: any) => {
                if (_linksIds.includes(link.id)) {
                    _meusLinks.push(link);
                }
            });
            setMinhasAssoc(_meusLinks);
        }
    };

    useEffect(() => {
        getLinks();
        getAssoc();
    }, []);

    return (
        <div>
            <Card.Root className="md:pr-8 p-2 pt-4 md:w-[55vw] w-[91vw]">
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
                        {
                            type == "corretor" ? "Empresas associadas" : "Corretores afiliados"
                        }
                    </a>
                </div>
                <div className="md:ml-16 mt-2">
                    {view == "links" ? (
                        <>
                            {links != null && links != undefined ? (
                                <>
                                    {links.length > 0 ? (
                                        <>
                                            {meusLinks.map((item) => {
                                                return (
                                                    <Links
                                                        key={item.id}
                                                        usuario={item}
                                                        id={id}
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
                                        <>
                                            {minhasAssoc.map((item) => {
                                                return (
                                                    <Links
                                                        key={item.id}
                                                        usuario={item}
                                                        id={id}
                                                    />
                                                );
                                            })}
                                        </>
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
