"use client"; 

import Image from "next/image";
import { Suspense } from "react";

interface Card2Props {
    lang: string;
}

export default function Card2({ lang }: Card2Props) {
    return (
        <div className="bg-gray-400 dark:bg-gray-600 flex flex-col items-center text-center justify-center py-8">
            <Suspense fallback="Loading...">
                <Image
                    className="mx-auto h-56 w-auto"
                    src="assets/landingpage/review.svg"
                    width={1}
                    height={1}
                    alt="Encontre oportunidades"
                />
            </Suspense>
            <p className="text-xl font-semibold py-8 px-8">
                Gerencie sua agenda, controle seus links e receba feedback de
                verdade!{" "}
            </p>
            <p className="px-8 pb-4">
                Integer sed pretium erat. Nam ac orci finibus, faucibus lectus
                et, lacinia risus. Ut efficitur augue id diam ultrices, vel
                ornare ipsum pretium. Integer felis elit, iaculis quis congue
                vitae, pretium at erat.
            </p>
        </div>
    );
}
