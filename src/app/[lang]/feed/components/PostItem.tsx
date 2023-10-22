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
import ModalExcluir from "./ModalExcluir";

interface PostItemProps {
    publicacao: PublicacaoCompleta;
    idusuario?: string;
    dict: Feed;
    setDeletePost: Function;
    setPubid: Function;
}

export default function PostItem({
    idusuario,
    publicacao,
    dict,
    setDeletePost,
    setPubid
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
                                <Dropdown
                                    label={<BsThreeDots />}
                                    items={[
                                        {
                                            label: (
                                                <div className="flex items-center">
                                                    <BsFillBookmarkPlusFill />
                                                    <a className="pl-1">
                                                        {
                                                            dict.dropdown
                                                                .addsaveditem
                                                        }
                                                    </a>
                                                </div>
                                            ),
                                            onClick: () => {
                                                console.log("ver mais!");
                                            },
                                        },
                                        {
                                            label: (
                                                <>
                                                    {publicacao.idautor ==
                                                    idusuario
                                                        ? dict.cards
                                                              .visitmyprofile
                                                        : dict.dropdown
                                                              .seeprofile}
                                                </>
                                            ),
                                            onClick: () => {
                                                router.push(
                                                    `/perfil/${publicacao.idautor}`
                                                );
                                            },
                                        },

                                        {
                                            label: (
                                                <>
                                                    {publicacao.idautor ==
                                                    idusuario
                                                        ? dict.pub.deletepub
                                                        : dict.dropdown.report}
                                                </>
                                            ),
                                            onClick: () => {
                                                if (
                                                    publicacao.idautor ==
                                                    idusuario
                                                ) {
                                                    setPubid(publicacao.id);
                                                    setDeletePost(true);
                                                } else {
                                                    router.push(
                                                        `/denuncia/${publicacao.id}`
                                                    );
                                                }
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
                                    <button className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5">
                                        {dict.pub.chat}
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </Card.Content>
            </Card.Root>
        </div>
    );
}
