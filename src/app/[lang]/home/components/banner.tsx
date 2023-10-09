"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface BannerProps {
    lang: string;
    isUserLoggedIn: boolean;
}

export default function Banner({ lang, isUserLoggedIn }: BannerProps) {
    const router = useRouter();
    useEffect(() => {
        if (isUserLoggedIn) {
            router.push("feed");
        }
    }, []);
    return (
        <div className="h-screen bg-gradient-to-b from-white to-secundaria-100/25 dark:from-gray-900 dark:to-black/25 flex flex-col items-center text-center justify-center">
            <p className="font-semibold text-5xl px-8 md:text-7xl md:font-normal">
                Unindo imóveis,
            </p>
            <p className="text-cyan-950 dark:text-cyan-100 font-semibold text-5xl px-8 md:text-7xl md:font-normal">
                laços e negócios
            </p>
            <p className="py-4 px-8 md:w-7/12 text-xl">
                A ImmobileLink é uma plataforma que busca facilitar o contato
                entre corretores, construtoras e imobiliárias. Encontre o
                profissional certo para a parceria certa.
            </p>
            <Link
                href={isUserLoggedIn ? "/feed" : "auth"}
                className="flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
                ACESSAR PLATAFORMA
            </Link>
        </div>
    );
}
