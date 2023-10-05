"use client";

import { AiFillStar } from "react-icons/ai";

interface Card3Props {
    lang: string;
}

export default function Card3({ lang }: Card3Props) {
    return (
        <div className="bg-white dark:bg-gray-900 text-center items-center py-12">
            <p className="text-xl font-semibold pb-8">
                Recursos incríveis para corretores e empresas
            </p>
            <p className="px-8 pb-4">
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Vestibulum consectetur condimentum
                mollis. Mauris velit est, rutrum ut leo in, scelerisque auctor
                diam. Mauris aliquam lectus in mi pretium, in posuere nibh
                porttitor. Donec volutpat quam ut erat auctor molestie. Nullam
                feugiat turpis vel quam luctus volutpat. Morbi gravida mi eu
                odio rutrum, sit amet consectetur leo faucibus.
            </p>
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
                <div className="flex flex-row align-center">
                    <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                    <a className="mt-2">Lorem ipsum</a>
                </div>
            </div>
        </div>
    );
}
