"use client";
import Avatar from "../../(components)/Avatar";
import Image from "next/image";
import { PublicacaoCompleta } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/Utils/formataData";
import { Card } from "../../(components)/(compositions)/(card)";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import {
    BsFillBookmarkPlusFill,
    BsBookmarkCheckFill,
    BsThreeDots,
} from "react-icons/bs";
import Link from "next/link";
import { Feed } from "@/app/i18n/dictionaries/types";
import { useState } from "react";

interface PostItemProps {
    publicacao: PublicacaoCompleta;
    idusuario?: string;
    dict: Feed;
}

export default function PostItem({
    idusuario,
    publicacao,
    dict,
}: PostItemProps) {
    const router = useRouter();
    const [readMore, isReadMore] = useState(false);

    return (
        <div className="mb-4">
            <Card.Root>
                <Card.Content>
                    <div className="w-full h-fit min-h-[50px] px-4">
                        <div className="w-full h-fit flex justify-between mb-4">
                            <div className="flex justify-center items-center gap-2 mt-1">
                                <Avatar route={publicacao.avatar} />
                                <div>
                                    <p>{publicacao.nomeautor}</p>
                                    <p className="text-xs">
                                        {formataData(
                                            publicacao.criadoem,
                                            dict.pub.dateformat
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="h-full">
                                {/** TO DO: Incluir variação de botões para o próprio post -> Meu perfil, salvar, excluir */}
                                <Dropdown
                                    label={<BsThreeDots />}
                                    items={[
                                        // if not from the author && not saved -> Salvar
                                        // else -> option "Remover dos items salvos"
                                        {
                                            label: (
                                                <div className="flex items-center">
                                                    <BsFillBookmarkPlusFill />
                                                    <a className="pl-1">{"Salvar publicação"}</a>
                                                </div>
                                            ),
                                            onClick: () => {
                                                console.log("ver mais!");
                                            },
                                        },
                                        {
                                            label: "Ver perfil",
                                            onClick: () => {
                                                router.push(`/perfil/${publicacao.idautor}`)
                                            },
                                        },
                                        
                                        {
                                            label: "Denunciar",
                                            onClick: () => {
                                                router.push(`/denuncia/${publicacao.id}`)
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <p
                                className={`text-sm 
                                ${
                                    readMore
                                        ? "line-clamp-none"
                                        : publicacao.conteudo.length > 140
                                        ? "line-clamp-3 md:line-clamp-4 "
                                        : "line-clamp-none "
                                }`}
                            >
                                {publicacao.conteudo}
                            </p>
                            <a
                                className={`${
                                    publicacao.conteudo.length > 140
                                        ? publicacao.conteudo.length > 325
                                            ? "flex"
                                            : "flex lg:hidden"
                                        : "hidden"
                                } opacity-75 cursor-pointer hover:underline`}
                                onClick={() => isReadMore(!readMore)}
                            >
                                {readMore ? dict.pub.less : dict.pub.more}
                            </a>
                            <div className="flex w-full justify-center">
                                {publicacao.imagem && (
                                    <Image
                                        src={`publicacoes/imagens/${publicacao.imagem}`}
                                        alt={publicacao.id}
                                        width={1}
                                        height={1}
                                        className="w-auto h-fit max-h-[480px] mt-2"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {publicacao.idautor != idusuario ? (
                                <Link
                                    href={`/redirect/chat/${publicacao.idautor}`}
                                >
                                    {/* {children} */}
                                    <button className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                                        {dict.pub.chat}
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                        {/* <div className="flex gap-4 mb-4">
                            <div className="flex text-xl items-center gap-3">
                                <button
                                    onClick={() => {
                                        alert("curtiu");
                                    }}
                                >
                                    <BsHeart className="hover:cursor-pointer hover:text-red-400 ease-in duration-100" />
                                </button>
                                <span>10</span>
                            </div>
                            <div className="flex text-xl items-center gap-3">
                                <button
                                    onClick={() => {
                                        alert("comentou");
                                    }}
                                >
                                    <BsChatSquareText className="hover:cursor-pointer" />
                                </button>
                                <span>10</span>
                            </div>
                            <div className="flex text-xl items-center gap-3">
                                <button
                                    onClick={() => {
                                        alert("compartilhou");
                                    }}
                                >
                                    <BsShare className="hover:cursor-pointer" />
                                </button>
                                <span>10</span>
                            </div>
                        </div>
                        <div>
                            <textarea
                                className="w-full bg-gray-100 grow p-3 h-12 rounded-md text-slate-900"
                                placeholder={"Leave a comment"}
                            ></textarea>
                                </div> */}
                    </div>
                </Card.Content>
            </Card.Root>
        </div>
    );
}
