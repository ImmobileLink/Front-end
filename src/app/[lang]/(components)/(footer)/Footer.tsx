"use client";

import { FooterLang } from "@/app/i18n/dictionaries/types";
import Image from "next/image";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { BiLogoBlogger } from "react-icons/bi";

interface FooterProps {
    lang: FooterLang;
}

export default function Footer({ lang }: FooterProps) {
    return (
        <>
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
                    <div className="md:w-full hidden md:flex flex-col px-24 py-4 md:flex-row md:justify-end">
                        <div className="flex flex-col">
                            <a className="text-base font-semibold">
                                {lang.usefulLinks}
                            </a>
                            <li>
                                <Link href={"/auth"}>{lang.access}</Link>
                            </li>

                            <li>
                                <Link href={"/plano"}>{lang.premium}</Link>
                            </li>
                            <br />
                        </div>
                        <div className="flex flex-col md:px-12">
                            <a className="text-base font-semibold">
                                {lang.moreLinks}
                            </a>
                            <Link
                                href={"https://immobilelink.blogspot.com/"}
                                className="flex"
                            >
                                <BiLogoBlogger size={24} className="mr-2" />
                                {lang.blog}
                            </Link>
                            <Link
                                href={"https://www.youtube.com/@ImmobileLink"}
                                className="flex"
                            >
                                <AiFillYoutube size={24} className="mr-2" />
                                {lang.ytChannel}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden flex-col px-24 py-4 md:flex-row md:justify-end">
                    <div className="flex flex-col">
                        <a className="text-base font-semibold">{lang.usefulLinks}</a>
                        <li>
                            <Link href={"/auth"}>{lang.access}</Link>
                        </li>

                        <li>
                            <Link href={"/plano"}>{lang.premium}</Link>
                        </li>
                        <br />
                    </div>
                    <div className="flex md:hidden flex-col md:px-12">
                        <a className="text-base font-semibold">{lang.moreLinks}</a>
                        <Link
                            href={"https://immobilelink.blogspot.com/"}
                            className="flex"
                        >
                            <BiLogoBlogger size={24} className="mr-2" />
                            {lang.blog}
                        </Link>
                        <Link
                            className="flex"
                            href={"https://www.youtube.com/@ImmobileLink"}
                        >
                            <AiFillYoutube size={24} className="mr-2" />
                            {lang.ytChannel}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
