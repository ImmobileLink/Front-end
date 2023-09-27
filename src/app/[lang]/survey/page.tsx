"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";

import { FcGoogle } from "react-icons/fc";
import { Database } from "../../../../lib/database.types";
import CardRoot from "../(components)/(compositions)/(card)/CardRoot";
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
                <div className="relative z-0 w-full mb-6 group py-4">
                    <CardRoot>
                    Pesquisa de Satisfação....
                    <p>Lorem Ipsum...</p>
                    </CardRoot>
                </div>
            </div>
        </div>
    );
}
