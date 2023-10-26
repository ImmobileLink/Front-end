"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MiniaturePostItem from "./MiniaturePostItem";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import Loading from "../../../(components)/(auth)/Loading";
import { Denuncia } from "@/app/i18n/dictionaries/types";

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
    dict: Denuncia;
}

const submitReport = async (
    problema: string,
    motivo: string,
    publicacao: any,
    isSubmitted: Function
) => {
    const supabase = createClientComponentClient<Database>({});
    if (problema != "") {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        let { data } = await supabase.from("denuncia").insert({
            idusuario: session?.user.id!,
            idpublicacao: publicacao![0]?.id,
            idautor: publicacao![0]?.idautor,
            motivo: problema,
            descricao: motivo,
        });

        isSubmitted(true);
    }
};

export default function CabecalhoForm({
    publicacao,
    dict,
}: CabecalhoFormProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>({});

    const [problema, setProblema] = useState("");
    const [motivo, setMotivo] = useState("");
    const [loading, isLoading] = useState(false);
    const [submitted, isSubmitted] = useState(false);

    useEffect(() => {
        isLoading(false);
    }, []);

    return (
        <div className="">
            {submitted ? (
                <>
                    <h1 className="ml-0 md:ml-8 text-xl md:text-2xl my-2 md:my-4">
                        {dict.reportmade}
                    </h1>
                    <p className="ml-0 md:ml-8 pb-4">{dict.reportparagraph}</p>
                    <div className="flex justify-center p-8">
                        <button
                            className="w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5"
                            onClick={() => router.push("/feed")}
                        >
                            {dict.returntofeed}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="ml-0 md:ml-8 text-xl md:text-2xl my-2 md:my-4">
                        {dict.reportpostoruser}
                    </h1>
                    <p className="ml-0 md:ml-8 pb-4">
                        {dict.whichproblem}
                        <b>{publicacao![0]?.nomeautor}</b> {dict.has}
                    </p>
                    <div className="w-full flex justify-center ">
                        <MiniaturePostItem dict={dict} publicacao={publicacao} />
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
                                    {dict.issues.offensive}
                                </label>
                                <p className="pl-4 pr-8">
                                    {dict.issuesdescription.offensive}
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
                                    {dict.issues.abuse}
                                </label>
                                <p className="pl-4 pr-8">
                                    {dict.issuesdescription.abuse}
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
                                    {dict.issues.harm}
                                </label>
                                <p className="pl-4 pr-8">
                                    {dict.issuesdescription.harm}
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
                                    {dict.issues.spam}
                                </label>
                                <p className="pl-4 pr-8">
                                    {dict.issuesdescription.spam}
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
                                    {dict.issues.other}
                                </label>
                            </div>
                        </div>
                        <label className="pl-4 mt-2 mb-2 font-medium text-lg">
                            {dict.issuesdescription.describe}
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
                            {dict.cancel}
                        </button>
                        <div className="px-2" />
                        <button
                            className="p-2 w-fit cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                            onClick={() => {
                                if (problema != "") {
                                    isLoading(true);
                                }
                                submitReport(
                                    problema,
                                    motivo,
                                    publicacao,
                                    isSubmitted
                                );
                            }}
                        >
                            <div className="flex">
                                <Loading loading={loading} />{" "}
                                {dict.finishreport}
                            </div>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
