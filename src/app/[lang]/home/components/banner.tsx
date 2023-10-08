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
        <div className="bg-white dark:bg-gray-900 flex flex-col items-center text-center justify-center py-20 md:pt-20 md:py-0">
            <p className="font-semibold text-4xl px-12 md:text-5xl md:font-normal">
                Lorem ipsum
            </p>
            <p className="text-cyan-950 dark:text-cyan-100 font-semibold text-4xl px-12 md:text-5xl md:font-normal">
                dolor sit amet
            </p>
            <p className="py-4 px-8 md:w-5/12">
                Praesent scelerisque aliquam est eget porta. Sed id rhoncus
                lorem, et tincidunt lacus. Fusce lacinia eu elit vitae ornare.
            </p>
            <Link
                href={isUserLoggedIn ? "/feed" : "auth"}
                className="md:mt-6 md:mb-12 flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200 md:text-xs"
            >
                ACESSAR PLATAFORMA
            </Link>
        </div>
    );
}
