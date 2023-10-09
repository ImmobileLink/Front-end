import Image from "next/image";
import { Suspense } from "react";

interface Card1Props {
    lang: string;
}

export default function Card1({ lang }: Card1Props) {
    return (
        <div
            id="about-immobilelink"
            className="flex flex-col items-center md:text-left text-center justify-center py-8"
        >
            <div className="md:flex md:flex-row">
                <div className="px-8 md:pl-8">
                    <p className="text-xl font-semibold pb-8 md:pt-12 md:pl-12 md:text-2xl">
                        Encontre oportunidades
                    </p>
                    <p className="pb-4 md:pr-20 md:pl-12 text-lg">
                        Busque por oportunidades de parceria com diversas
                        imobiliárias e corretores do mercado. Aqui oferecemos um
                        ambiente colaborativo que contribui para a construção e
                        demonstração de credibilidade de profissionais autônomos
                        e empresas do ramo imobiliário. Demonstre sua
                        experiência, atuação, seu portfólio e forme laços com
                        diversos profissionais e organizações se assim desejar.
                    </p>
                </div>
                <div className="flex justify-center md:mr-36">
                    <div className="bg-gray-400 rounded-full h-72 w-72 md:h-52 md:w-52 md:mt-12 md:mb-8">
                        <Suspense fallback="Loading...">
                            <Image
                                className="mx-auto h-56 md:h-36 md:mt-4 w-auto"
                                src="assets/landingpage/teamup.svg"
                                width={1}
                                height={1}
                                alt="Encontre oportunidades"
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
