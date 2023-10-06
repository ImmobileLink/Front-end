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
                    <p id="amazing-resources" className="text-xl font-semibold md:px-8 md:text-2xl md:pb-8">
                        Recursos incríveis para corretores e empresas
                    </p>
                    <p className="px-8 pb-4">
                        Orci varius natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Vestibulum consectetur
                        condimentum mollis. Mauris velit est, rutrum ut leo in,
                        scelerisque auctor diam. Mauris aliquam lectus in mi
                        pretium, in posuere nibh porttitor. Donec volutpat quam
                        ut erat auctor molestie. Nullam feugiat turpis vel quam
                        luctus volutpat. Morbi gravida mi eu odio rutrum, sit
                        amet consectetur leo faucibus.
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
