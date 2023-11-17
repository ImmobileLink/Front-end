"use client";

import Link from "next/link";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MyLinks, Pesquisa } from "@/app/i18n/dictionaries/types";
import Avatar from "../../(components)/Avatar";
import {
    CorporacaoBuscadaUnica,
    CorretorBuscadoUnico,
} from "../../../../../lib/modelos";
import Botoes from "./Botoes";

interface LinksProps {
    dict: MyLinks;
    usuario: {
        avaliacao: { nota: number } | null;
        bairro: string | null;
        celular: string | null;
        cep: string | null;
        cidade: string | null;
        cnpj: string | null;
        comercial: string | null;
        complemento: string | null;
        cpf: string | null;
        creci: string | null;
        estado: string | null;
        id: string;
        logradouro: string | null;
        nome: string | null;
        numero: number | null;
        premium: boolean | null;
        sobre: string | null;
        telefone: string | null;
        nomefantasia: string | null;
        usuario: { avatar: string };
    } | null;
    id: string;
}

export default function Links({ dict, usuario, id }: LinksProps) {
    const nota = [
        <AiOutlineStar key={0} />,
        <AiOutlineStar key={1} />,
        <AiOutlineStar key={2} />,
        <AiOutlineStar key={3} />,
        <AiOutlineStar key={4} />,
    ];

    if (usuario != null && usuario.avaliacao != null) {
        if (usuario.avaliacao.nota != null) {
            for (let i = 0; i < usuario.avaliacao.nota; i++) {
                nota.splice(i, 1, <AiFillStar key={i} />);
            }
        }
    }

    return (
        <div>
            <div className="p-5 my-4 flex flex-col justify-between ring-gray-300 bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md shadow-md rounded-md">
                <div className="text-start">
                    <Link href={`/perfil/${usuario?.id}`} className="flex align-middle items-center">
                        <Avatar route={usuario!.usuario.avatar || "nopfp"} id={id}/>
                        <div className="flex flex-col align-top items-start cursor-pointer">
                            <p>{usuario!.nome || usuario!.nomefantasia}</p>
                            <p className="text-sm">
                                {usuario!.estado + " - " + usuario!.cidade}
                            </p>
                        </div>
                    </Link>
                    {usuario!.creci && (
                        <p className="flex flex-row items-end align-bottom text-sm">
                            {nota}
                        </p>
                    )}
                    {usuario!.creci && (
                        <p className="text-left">CRECI Nº: {usuario!.creci}</p>
                    )}
                    <p className="text-justify text-ellipsis overflow-hidden whitespace-pre-line h-10 text-sm">
                        {usuario!.sobre}
                    </p>
                </div>
                <Botoes dict={dict} link={usuario} user={id}/>
                {/* <div className="w-full flex justify-end mt-3">
                    <Link
                        href={`/perfil/${usuario!.id}`}
                        className="flex w-fit cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                    >
                        {textos.labels.checkprofile}
                    </Link>
                </div> */}
            </div>
        </div>
    );
}
