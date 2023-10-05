"use client";

import { Home } from "@/app/i18n/dictionaries/types";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsList } from "react-icons/bs";

interface NavBarHamburguerHomeProps {
    lang: Home;
}

export default function NavBarHome({ lang }: NavBarHamburguerHomeProps) {
    // const router = useRouter();
    const [isHamburguerMenuOpen, setIsHamburguerMenuOpen] =
        useState<boolean>(false);

    const toggleHamburguerMenu = () => {
        setIsHamburguerMenuOpen(!isHamburguerMenuOpen);
    };

    return (
        <>
            <div className="relative md:hidden">
                <button
                    onClick={toggleHamburguerMenu}
                    className="flex items-center justify-between w-full p-1 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                    <BsList className="text-3xl" />
                </button>
                {isHamburguerMenuOpen && (
                    <div className="absolute top-12 right-0 z-10 w-44 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-xl dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                            <li>
                                <Link
                                    href="/auth"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Acessar plataforma
                                </Link>
                                <Link
                                    href="/plano"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Premium
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
