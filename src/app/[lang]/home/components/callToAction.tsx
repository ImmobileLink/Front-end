"use client";

import Link from "next/link";
import Footer from "../../(components)/(footer)/Footer";
import { FooterLang, Home } from "@/app/i18n/dictionaries/types";

interface CallToActionProps {
    lang: Home;
    footer: FooterLang;
    isUserLoggedIn: boolean;
}

export default function CallToAction({
    lang,
    footer,
    isUserLoggedIn,
}: CallToActionProps) {
    return (
        <div>
            <div className="bg-white dark:bg-gray-900 flex flex-col items-center py-24">
                <p className="text-4xl px-12 py-6">{lang.start}</p>
                <Link
                    href={isUserLoggedIn ? "/feed" : "auth"}
                    className="flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                >
                    {lang.access}
                </Link>
            </div>
            <Footer lang={footer} />
        </div>
    );
}
