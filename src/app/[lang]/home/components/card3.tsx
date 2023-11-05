"use client";

import { Home } from "@/app/i18n/dictionaries/types";
import { AiFillStar } from "react-icons/ai";

interface Card3Props {
    lang: Home;
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
                        {lang.amazingResources}
                    </p>
                    <p className="px-8 pb-4 text-lg">
                        {lang.amazingParagraph}
                    </p>
                </div>
                <div className="md:flex text-left">
                    <div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">{lang.itemResources.item1}</a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">
                            {lang.itemResources.item2}
                            </a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">
                            {lang.itemResources.item3}
                            </a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">{lang.itemResources.item4}</a>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">{lang.itemResources.item5}</a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">
                            {lang.itemResources.item6}
                            </a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">
                            {lang.itemResources.item7}
                            </a>
                        </div>
                        <div className="flex flex-row align-center font-semibold">
                            <AiFillStar className="text-orange-400 text-4xl ml-8 mr-2" />
                            <a className="mt-2">{lang.itemResources.item8}</a>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center py-8 md:py-0 md:justify-end md:px-16">
                    <a
                        href="/auth"
                        className="md:mt-6 md:mb-12 flex w-fit justify-center rounded-md bg-secundaria-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secundaria-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secundaria-200 md:text-xs"
                    >
                        {lang.tryPremium}
                    </a>
                </div>
            </div>
        </div>
    );
}
