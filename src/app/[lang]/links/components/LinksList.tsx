"use client";

import { Card } from "../../(components)/(compositions)/(card)";
import Link from "next/link";
import Links from "../components/Links";
import { useEffect, useState } from "react";
import { BiSolidLeftArrow } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { MyLinks } from "@/app/i18n/dictionaries/types";

interface LinksListProps {
    dict: MyLinks;
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

export default function LinksList({
    assoc,
    links,
    type,
    id,
    dict,
}: LinksListProps) {
    const [view, setView] = useState("links");
    const [error, isError] = useState(false);
    const [meusLinks, setMeusLinks] = useState<any[]>([]);
    const [minhasAssoc, setMinhasAssoc] = useState<any[]>([]);

    useEffect(() => {
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
        getLinks();
        getAssoc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Card.Root className="md:pr-8 p-2 pt-4 md:w-[55vw] w-[91vw]">
                <div className="flex md:items-center ml-6 text-xl flex-col md:flex-row">
                    <div className="flex items-center">
                        <Link href="/feed" className="mr-4">
                            <BiSolidLeftArrow />
                        </Link>
                        <a
                            onClick={() => setView("links")}
                            className={`${
                                view == "links"
                                    ? "md:underline md:bg-black/0 md:mt-0 font-semibold bg-black/25 rounded-md p-4 md:p-0 mt-2"
                                    : ""
                            } w-full pr-2 cursor-pointer select-none py-2 md:py-0`}
                        >
                            {dict.links}
                        </a>
                    </div>

                    <a
                        onClick={() => setView("assoc")}
                        className={`${
                            view == "assoc"
                                ? "md:underline md:bg-black/0 font-semibold bg-black/25 rounded-md pr-0 p-2 md:p-0"
                                : ""
                        } md:px-2 cursor-pointer`}
                    >
                        {type == "corretor" ? (
                            <p className="select-none">{dict.companies}</p>
                        ) : (
                            <p className="select-none">{dict.brokers}</p>
                        )}
                    </a>
                </div>
                <div className="md:ml-16 mt-2">
                    {error ? (
                        <p className="pl-4 md:pl-0 select-none">
                            {dict.logs.errorwhilesearchingdata}
                        </p>
                    ) : (
                        <>
                            {view == "links" ? (
                                <>
                                    {links != null && links != undefined ? (
                                        <>
                                            {links.length > 0 ? (
                                                <>
                                                    {meusLinks.map((item) => {
                                                        return (
                                                            <Links
                                                                type={type}
                                                                dict={dict}
                                                                key={item.id}
                                                                usuario={item}
                                                                id={id}
                                                            />
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <p className="pl-4 md:pl-0 select-none">
                                                    {
                                                        dict.logs
                                                            .noconnectionswerefound
                                                    }
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="pl-4 md:pl-0 select-none">
                                            {dict.logs.errorwhilesearchingdata}
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
                                                                type={type}
                                                                dict={dict}
                                                                key={item.id}
                                                                usuario={item}
                                                                id={id}
                                                            />
                                                        );
                                                    })}
                                                </>
                                            ) : (
                                                <p className="pl-4 md:pl-0 select-none">
                                                    {
                                                        dict.logs
                                                            .noassociationswerefound
                                                    }
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="pl-4 md:pl-0 select-none">
                                            {dict.logs.errorwhilesearchingdata}
                                        </p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </Card.Root>
        </div>
    );
}
