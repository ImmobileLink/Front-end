"use client";

import Link from "next/link";
import Image from "next/image";
import { Home } from "@/app/i18n/dictionaries/types";
import NavBarHamburguerHome from "./NavBarHamburguerHome";
import { useState } from "react";
import Loading from "../(auth)/Loading";

interface NavBarHomeProps {
    lang: Home;
}

export default function NavBarHome({ lang }: NavBarHomeProps) {
    const [loading, isLoading] = useState(false);
    return (
        <>
            <nav className="w-full sticky top-0 z-50 bg-white dark:bg-gray-900 ">
                <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <Link href="/home" className="flex items-center">
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
                        <div className="ml-5 relative hidden md:block">
                        <a className="font-semibold px-4 py-2 mx-2 cursor-pointer">Sobre a plataforma</a>
                        <a className="font-semibold px-4 py-2 mx-2 cursor-pointer">Recursos</a>
                        <Link className="font-semibold px-4 py-2 mx-2" href="/plano">Premium</Link>

                    </div>
                    </div>
                    <button
                        onClick={() => console.log("trata acesso")}
                        className="hidden md:flex justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                    >
                        <Loading loading={loading} />
                        ACESSAR PLATAFORMA
                    </button>
                    <NavBarHamburguerHome lang={lang} />
                </div>
            </nav>
        </>
    );
}
