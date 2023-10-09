"use client";

import { AiFillStar } from "react-icons/ai";

interface Card3Props {
    lang: string;
}

export default function Card3({ lang }: Card3Props) {
    return (
        <div className="bg-white dark:bg-gray-900 text-center items-center py-12 md:px-12">
            <div className="md:flex md:flex-col md:text-left">
                <div>
                    <p
                        id="amazing-resources"
                        className="text-xl font-semibold md:px-8 md:text-2xl md:pb-8"
                    >
                        Recursos incríveis para corretores e empresas
                    </p>
                    <p className="px-8 pb-4 text-lg">
                        A ImmobileLink conta com recursos exclusivos para
                        atender as principais necessidades do mercado. Explore
                        uma vasta gama de funcionalidades gratuitas e premium
                        para suas necessidades e de seu negócio:
                    </p>
                </div>
                <div className="md:flex">
                    <div>
                        <div className="flex flex-row align-center">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">Lorem ipsum</a>
                        </div>
                        <div className="flex flex-row align-center">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">Lorem ipsum</a>
                        </div>
                        <div className="flex flex-row align-center">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">Lorem ipsum</a>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row align-center">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">Lorem ipsum</a>
                        </div>
                        <div className="flex flex-row align-center">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">Lorem ipsum</a>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center py-8 md:py-0 md:justify-end md:px-16">
                    <a
                        href="/plano"
                        className="md:mt-6 md:mb-12 flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200 md:text-xs"
                    >
                        EXPERIMENTE O PREMIUM
                    </a>
                </div>
            </div>
        </div>
    );
}
