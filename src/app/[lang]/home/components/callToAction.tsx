"use client";

import Link from "next/link";
import Footer from "../../(components)/(footer)/Footer";

interface CallToActionProps {
    lang: string;
    isUserLoggedIn: boolean;
}

export default function CallToAction({
    lang,
    isUserLoggedIn,
}: CallToActionProps) {
    return (
        <div>
            <div className="flex flex-col items-center py-12">
                <p className="text-4xl px-12 py-6">Vamos começar?</p>
                <Link
                    href={isUserLoggedIn ? "/feed" : "auth"}
                    className="flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200"
                >
                    ACESSAR PLATAFORMA
                </Link>
            </div>
            <Footer lang={lang} />
        </div>
    );
}
