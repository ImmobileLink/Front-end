"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";

import { FcGoogle } from "react-icons/fc";
import { Database } from "../../../../lib/database.types";
import CardRoot from "../(components)/(compositions)/(card)/CardRoot";
import RadioSelector from "../(components)/(survey)/radioSelector";
// import { Database } from "../../../../../lib/database.types";
// import PasswordInput from "../../(components)/(auth)/PasswordInput";
// import Loading from "../../(components)/(auth)/Loading";

interface PageProps {
    lang: string;
}

const supabase = createClientComponentClient<Database>();

export default function Survey({ lang }: PageProps) {
    return (
        <div className="w-full h-screen bg-branco dark:bg-dark-200 ">
            <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 ">
                <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <Link href="/feed" className="flex items-center">
                            <Image
                                className="w-10 h-10"
                                src="assets/favicon/favicon-32x32.png"
                                alt="logo"
                                width={10}
                                height={10}
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                ImmobileLink
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="space-y-6 sm:mx-auto w-full md:px-12 px-4">
                <div className="relative z-0 w-full group pt-4">
                    <CardRoot className="max-h-[34rem] overflow-y-scroll">
                        <div className="my-2 mx-2 md:my-4 md:mx-8">
                            <h1 className="text-xl md:text-2xl my-2 md:my-4">
                                BEM-VINDO(A) À PESQUISA DE SATISFAÇÃO DA
                                IMMOBILELINK
                            </h1>
                            <p>
                                Aqui você pode avaliar a sua experiência
                                utilizando a plataforma e ajudar a tornar a
                                ImmobileLink ainda melhor!
                                <br />A pesquisa leva menos de 3 minutos para
                                ser concluída, basta indicar em uma escala de 1
                                a 5, o quão satisfeito está com nossos serviços,
                                sendo 5 = Muito satisfeito e 1 = Nada
                                satisfeito.
                            </p>
                            <form>
                                <RadioSelector
                                    params={{
                                        lang: lang,
                                        pergunta: "Pergunta 1",
                                    }}
                                />
                                <RadioSelector
                                    params={{
                                        lang: lang,
                                        pergunta: "Pergunta 2",
                                    }}
                                />
                                <RadioSelector
                                    params={{
                                        lang: lang,
                                        pergunta: "Pergunta 3",
                                    }}
                                />

                                <div className="my-4">
                                    <label className="py-2">
                                        Compartilhe um pouco mais sobre sua
                                        experiência:
                                    </label>
                                    <br />
                                    <textarea
                                        className="bg-branco dark:bg-dark-200 rounded h-36 md:h-16 w-full py-2 px-2"
                                        id="op-comentario"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        // onClick={submitForm}
                                        className="flex justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                                    >
                                        {/* <Loading loading={loading} /> */}
                                        FINALIZAR PESQUISA
                                    </button>
                                </div>
                            </form>
                        </div>
                    </CardRoot>
                </div>
            </div>
        </div>
    );
}
