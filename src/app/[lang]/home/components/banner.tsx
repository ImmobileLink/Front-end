"use client";

import { Home } from "@/app/i18n/dictionaries/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface BannerProps {
    lang: Home;
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
        <div className="h-screen select-none bg-gradient-to-b from-white to-transparent dark:from-gray-900 dark:to-black/25 flex flex-col items-center text-center justify-center">
            <a className="font-semibold text-5xl px-8 md:text-7xl md:font-normal">
                {lang.conecting}
            </a>
            <a className="text-cyan-950 dark:text-cyan-100 font-semibold text-5xl px-8 md:text-7xl md:font-normal">
                {lang.ties}
            </a>
            <p className="py-8 px-8 md:w-7/12 text-xl">
                {lang.whatIsImmobileLink}
            </p>
            <Link
                href={isUserLoggedIn ? "/feed" : "auth"}
                className="flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
            >
                {lang.access}
            </Link>
        </div>
    );
}
