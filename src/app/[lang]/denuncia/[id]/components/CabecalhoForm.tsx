"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import MiniaturePostItem from "./MiniaturePostItem";

interface CabecalhoFormProps {
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
}

export default function CabecalhoForm({ publicacao }: CabecalhoFormProps) {
    const router = useRouter();
    const [problema, setProblema] = useState("");
    const [motivo, setMotivo] = useState("");

    const submitReport = () => {
        //trata e envia o formulario
    };

    return (
        <div className="">
            <h1 className="ml-0 md:ml-8 text-xl md:text-2xl my-2 md:my-4">
                DENUNCIAR PUBLICAÇÃO OU USUÁRIO
            </h1>
            <p className="ml-0 md:ml-8 pb-4">
                Que tipo de problema a publicação ou perfil de{" "}
                <b>{publicacao![0]?.nomeautor}</b> apresenta?
            </p>
            <div className="w-full flex justify-center ">
                <MiniaturePostItem publicacao={publicacao} />
            </div>

            <div className="flex flex-col md:pl-8 md:mr-12">
                <div
                    className={`${
                        problema == "Ofensivo" ? "bg-black/25 " : ""
                    }rounded-lg p-2 flex mb-2 items-baseline md:mb-4 `}
                >
                    <input
                        type="radio"
                        value={"Ofensivo"}
                        name={"op"}
                        onChange={() => setProblema("Ofensivo")}
                    />
                    <div className="flex flex-col">
                        <label className="pl-4 font-medium text-lg">
                            Comportamento ofensivo ou discriminatório
                        </label>
                        <p className="pl-4 pr-8">
                            Inclui insultos e ações que prejudicam, menosprezam
                            ou discriminam pessoas com base em características
                            pessoais, como raça, etnia, gênero, orientação
                            sexual, religião, deficiência, ou outras
                            características protegidas por lei.
                        </p>
                    </div>
                </div>
                <div
                    className={`
                ${problema == "Abusivo" ? "bg-black/25 " : ""}
                rounded-lg p-2 flex mb-2 items-baseline md:mb-4 `}
                >
                    <input
                        type="radio"
                        value={"Abusivo"}
                        name={"op"}
                        onChange={() => setProblema("Abusivo")}
                    />
                    <div className="flex flex-col">
                        <label className="pl-4 font-medium text-lg">
                            Abuso e assédio
                        </label>
                        <p className="pl-4 pr-8">
                            Inclui assédio praticado dentro da plataforma,
                            direcionado a usuários ou grupos específicos, assim
                            como o compartilhamento de conteúdo de cunho sexual
                            ou que incite atos de abuso e assédio.
                        </p>
                    </div>
                </div>
                <div
                    className={`
                ${problema == "Perigoso" ? "bg-black/25 " : ""}
                rounded-lg p-2 flex mb-2 items-baseline md:mb-4 `}
                >
                    <input
                        type="radio"
                        value={"Perigoso"}
                        name={"op"}
                        onChange={() => setProblema("Perigoso")}
                    />
                    <div className="flex flex-col">
                        <label className="pl-4 font-medium text-lg">
                            Comportamento nocivo ou perigoso
                        </label>
                        <p className="pl-4 pr-8">
                            Inclui organização criminosa, ameaças, chantagens,
                            compartilhamento de conteúdo gráfico perturbador ou
                            ilegal, incentivo ou menção a automutilação e
                            suicídio, discurso violento ou que incentive atos
                            violentos.
                        </p>
                    </div>
                </div>
                <div
                    className={`
                ${problema == "Spam" ? "bg-black/25 " : ""}
                rounded-lg p-2 flex mb-2 items-baseline md:mb-4 `}
                >
                    <input
                        type="radio"
                        value={"Spam"}
                        name={"op"}
                        onChange={() => setProblema("Spam")}
                    />
                    <div className="flex flex-col">
                        <label className="pl-4 font-medium text-lg">
                            Spam ou fraude
                        </label>
                        <p className="pl-4 pr-8">
                            Compartilhamento de informações fraudulentas,
                            publicação de links mal-intencionados, aplicação de
                            golpes, identidade falsa, postagens e perfis não
                            relacionados a proposta da plataforma.
                        </p>
                    </div>
                </div>
                <div
                    className={`
                ${problema == "Outro" ? "bg-black/25 " : ""}
                rounded-lg p-2 flex mb-2 items-baseline md:mb-4 `}
                >
                    <input
                        type="radio"
                        value={"Outro"}
                        name={"op"}
                        onChange={() => setProblema("Outro")}
                    />
                    <div className="flex flex-col items-center">
                        <label className="pl-4 font-medium text-lg">
                            Outro problema
                        </label>
                    </div>
                </div>
                <label className="pl-4 mt-2 mb-2 font-medium text-lg">
                    Descreva melhor o problema:
                </label>
                <textarea
                    className="bg-branco dark:bg-dark-200 rounded h-36 md:h-16 w-full py-2 px-2"
                    id="op-comentario"
                    name="campo10"
                    onChange={(e) => setMotivo(e.target.value)}
                />
            </div>
            <div className="flex justify-end md:pl-8 md:pr-12 py-8">
                <button
                    className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5"
                    onClick={() => router.push("/feed")}
                >
                    CANCELAR
                </button>
                <div className="px-2" />
                <button
                    className="p-2 w-fit cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                    onClick={submitReport}
                >
                    FINALIZAR DENÚNCIA
                </button>
            </div>
        </div>
    );
}
