"use client";

import { Home } from "@/app/i18n/dictionaries/types";
import Image from "next/image";
import { Suspense } from "react";

interface Card2Props {
    lang: Home;
}

export default function Card2({ lang }: Card2Props) {
    return (
        <div className="flex w-full justify-center md:mb-20">
            <div className="bg-gray-400 dark:bg-gray-600 flex flex-col items-center text-center justify-center py-8 md:py-2 md:w-11/12 md:rounded-md">
                <div className="md:flex md:w-full md:justify-left">
                    <div className="md:ml-16">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-56 md:h-64 w-auto"
                                src="assets/landingpage/review.svg"
                                width={1}
                                height={1}
                                alt="Encontre oportunidades"
                            />
                        </Suspense>
                    </div>
                    <div className="md:flex md:flex-col md:text-left">
                        <p className="text-xl font-semibold py-8 px-8 md:text-2xl">
                            {lang.manageYourCalendar}
                        </p>
                        <p className="px-8 pb-4 text-lg">
                            {lang.manageParagraph}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
