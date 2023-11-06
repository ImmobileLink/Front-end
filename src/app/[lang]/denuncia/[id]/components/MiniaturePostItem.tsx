"use client";

import { formataData } from "../../../../../../lib/utils/formataData";
import { Card } from "../../../(components)/(compositions)/(card)";
import Avatar from "../../../(components)/Avatar";
import Image from "next/image";
import { useState } from "react";
import { Denuncia, Feed } from "@/app/i18n/dictionaries/types";

interface MiniaturePostItemProps {
    publicacao:
        | {
              id: string;
              idautor: string;
              avatar: string;
              nomeautor: string;
              regiao: any;
              conteudo: string;
              imagem: string;
              criadoem: string;
              atualizadoem: string;
          }[]
        | null;
    dict: Denuncia;
}

export default function MiniaturePostItem({
    publicacao,
    dict,
}: MiniaturePostItemProps) {
    const [readMore, isReadMore] = useState(false);
    let lang = dict.dateformat;
    return (
        <div className="mb-8 bg-black/25 md:w-10/12 border rounded-lg">
            <Card.Content>
                <div className="w-full h-fit min-h-[50px] px-4">
                    <div className="w-full h-fit flex justify-between mb-4">
                        <div className="flex justify-center items-center gap-2 mt-1">
                            <Avatar route={publicacao![0]?.avatar} />
                            <div>
                                <p>{publicacao![0]?.nomeautor}</p>
                                <p className="text-xs">
                                    {formataData(
                                        publicacao![0]?.criadoem,
                                        lang
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p
                            className={`text-sm 
                                ${
                                    readMore
                                        ? "line-clamp-none"
                                        : publicacao![0]?.conteudo.length > 140
                                        ? "line-clamp-3 md:line-clamp-4 "
                                        : "line-clamp-none "
                                }`}
                        >
                            {publicacao![0]?.conteudo}
                        </p>
                        <a
                            className={`${
                                publicacao![0]?.conteudo.length > 140
                                    ? publicacao![0]?.conteudo.length > 325
                                        ? "flex"
                                        : "flex lg:hidden"
                                    : "hidden"
                            } opacity-75 cursor-pointer hover:underline`}
                            onClick={() => isReadMore(!readMore)}
                        >
                            {readMore ? dict.less : dict.more}
                        </a>
                        <div className="flex w-full justify-center">
                            {publicacao![0]?.imagem && (
                                <Image
                                    src={`publicacoes/imagens/${
                                        publicacao![0]?.imagem
                                    }`}
                                    alt={publicacao![0]?.id}
                                    width={1}
                                    height={1}
                                    className="w-auto h-fit max-h-[480px] mt-2"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Card.Content>
        </div>
    );
}
