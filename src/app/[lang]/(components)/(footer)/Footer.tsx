"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    lang: string;
}

export default function Footer({ lang }: FooterProps) {
    return (
        <>
            <div className="bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent py-4" />
            <div className="w-full bg-white dark:bg-gray-900 py-8 ">
                <div className="flex px-12 items-center ">
                    <Image
                        className="w-10 h-10"
                        src="assets/favicon/favicon-32x32.png"
                        alt="logo"
                        width={6}
                        height={6}
                    />
                    <span className="block self-center text-md md:text-xl font-semibold whitespace-nowrap dark:text-white">
                        ImmobileLink
                    </span>
                    <div className="hidden md:flex flex-col px-24 py-4 md:flex-row md:justify-end">
                        <div className="flex flex-col">
                            <a className="text-base font-semibold">
                                Links úteis
                            </a>
                            <Link href={"/auth"}>Acessar plataforma</Link>
                            <Link href={"/plano"}>Premium</Link>
                            <br />
                        </div>
                        <div className="flex flex-col md:px-12">
                            <a className="text-base font-semibold">
                                Mais links
                            </a>
                            <Link href={"https://immobilelink.blogspot.com/"}>
                                Blog
                            </Link>
                            <Link
                                href={"https://www.youtube.com/@ImmobileLink"}
                            >
                                Canal do YouTube
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden flex-col px-24 py-4 md:flex-row md:justify-end">
                    <div className="flex flex-col">
                        <a className="text-base font-semibold">Links úteis</a>
                        <Link href={"/auth"}>Acessar plataforma</Link>
                        <Link href={"/plano"}>Premium</Link>
                        <br />
                    </div>
                    <div className="flex md:hidden flex-col md:px-12">
                        <a className="text-base font-semibold">Mais links</a>
                        <Link href={"https://immobilelink.blogspot.com/"}>
                            Blog
                        </Link>
                        <Link href={"https://www.youtube.com/@ImmobileLink"}>
                            Canal do YouTube
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
