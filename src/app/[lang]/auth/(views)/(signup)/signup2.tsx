"use client";

import { Signup2 } from "@/app/i18n/dictionaries/types";
import Image from "next/image";
import { Dispatch, SetStateAction, Suspense } from "react";

interface Signup2Props {
    props: {
        tipoPerfil: number;
        setTipoPerfil: Dispatch<SetStateAction<number>>;
    };
    setAlert: Dispatch<
        SetStateAction<{ type: string; title: string; message: string }>
    >;
    signup2: Signup2;
}

export default function Signup2({ props, setAlert, signup2 }: Signup2Props) {
    return (
        <>
            <div className="w-full h-fit flex items-center justify-evenly flex-col md:flex-row md:grid-cols-2">
                <div
                    className={`${
                        props.tipoPerfil == 1 ? "bg-white/25 rounded-lg" : ""
                    } px-2 py-2 w-fit h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-end cursor-pointer`}
                >
                    <div className="bg-gray-400 rounded-full h-60 w-60">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-56 w-auto cursor-pointer"
                                src="assets/login/contacorretor.png"
                                width={1}
                                height={1}
                                alt="corretor"
                                onClick={() => {
                                    props.setTipoPerfil(1);
                                }}
                            />
                        </Suspense>
                    </div>

                    <div className="w-full text-center">
                        {signup2.corretorlabel}
                    </div>

                    <button
                        onClick={() => {
                            props.setTipoPerfil(1);
                        }}
                        className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                    >
                        {signup2.corretorbutton}
                    </button>
                </div>
                <div
                    className={`${
                        props.tipoPerfil == 2
                            ? "bg-white/25 rounded-lg mt-8 md:mt-0"
                            : ""
                    } mt-8 md:mt-0 px-2 py-2 w-fit h-fit grid justify-items-center gap-3 justify-self-center md:justify-self-start cursor-pointer`}
                >
                    <div className="bg-gray-400 rounded-full h-60 w-60">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-64 w-auto cursor-pointer"
                                src="assets/login/contaempresa.png"
                                width={1}
                                height={1}
                                alt="empresa"
                                onClick={() => {
                                    props.setTipoPerfil(2);
                                }}
                            />
                        </Suspense>
                    </div>

                    <div className="w-full text-center">
                        {signup2.companylabel}
                    </div>

                    <button
                        onClick={() => {
                            props.setTipoPerfil(2);
                        }}
                        className="flex w-full justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                    >
                        {signup2.companybutton}
                    </button>
                </div>
            </div>
            <div
                className={`${
                    props.tipoPerfil == undefined ? "hidden" : "block"
                }} w-full text-center mt-8 text-md text-gray-500`}
            >
                {signup2.yourchoiceis}
                <span className="font-semibold ml-1 text-blue-500">
                    {props.tipoPerfil == 1 ? signup2.corretor : signup2.company}
                </span>
            </div>
        </>
    );
}
