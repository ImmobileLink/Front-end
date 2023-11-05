"use client";

import { Planos } from "@/app/i18n/dictionaries/types";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

interface PlanoCardMobileProps {
    sub: Planos;
    role: string;
}

export default function PlanoCardMobile({
    sub,
    role,
}: PlanoCardMobileProps) {
    return (
        <>
            <div>
                {role == "corretor" ? (
                    <>
                        {
                            // FREE TIER - Corretor
                        }
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                FREE
                            </h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-5xl font-semibold text-blue-700">
                                    {sub.freetier}
                                </span>
                                {/* <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                        /month
                    </span> */}
                            </div>
                            <ul role="list" className="space-y-5 my-7">
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feedbackreview}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base text-left font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feed}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.companyafiliation}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.chat}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.dashboard}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.visibility}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.exclusivefunctions}
                                    </span>
                                </li>
                            </ul>
                            {/* {premium ? (
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    onClick={() => setTogglePlano(true)}
                                >
                                    {sub.select} Free
                                </button>
                            ) : (
                                <div className="p-6 flex justify-center text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                            )} */}
                        </div>
                        <br />
                        {
                            // PREMIUM TIER - Corretor
                        }
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                PREMIUM
                            </h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-5xl font-semibold text-blue-700">
                                    {sub.freetier}
                                </span>
                                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                                    <a className="line-through">
                                        {sub.brokertier}
                                    </a>
                                </span>
                            </div>
                            <ul role="list" className="space-y-5 my-7">
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feedbackreview}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base text-left font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feed}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.companyafiliation}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.chat}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.dashboard}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.visibility}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.exclusivefunctions}
                                    </span>
                                </li>
                            </ul>
                            {/* {premium ? (
                                <div className="p-6 flex justify-center text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    onClick={() => setTogglePlano(true)}
                                >
                                    {sub.select} Premium
                                </button>
                            )} */}
                        </div>
                    </>
                ) : (
                    <>
                        {
                            // FREE TIER - Empresa
                        }
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                FREE
                            </h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-5xl font-semibold text-blue-700">
                                    {sub.freetier}
                                </span>
                                
                            </div>
                            <ul role="list" className="space-y-5 my-7">
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feedbackreview}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feed}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.chat}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.searchfilters}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.oportunitiesposting}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.linktotenbrokers}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.illimitedlinks}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.visibility}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                <BsXCircle className="text-red-500" />
                                    <span className="line-through text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.exclusivefunctions}
                                    </span>
                                </li>
                            </ul>
                            {/* {premium ? (
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    onClick={() => setTogglePlano(true)}
                                >
                                    {sub.select} Free
                                </button>
                            ) : (
                                <div className="p-6 flex justify-center text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                            )} */}
                        </div>
                        <br />
                        {
                            // PREMIUM TIER - Empresa
                            // ...
                        }
                        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                                PREMIUM
                            </h5>
                            <div className="flex items-baseline text-gray-900 dark:text-white">
                                <span className="text-5xl font-semibold text-blue-700">
                                    {sub.freetier}
                                </span>
                                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                                    <a className="line-through">
                                        {sub.companytier}
                                    </a>
                                </span>
                            </div>
                            <ul role="list" className="space-y-5 my-7">
                            <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feedbackreview}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.feed}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.chat}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.searchfilters}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.oportunitiesposting}
                                    </span>
                                </li>
                                {/* <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.linktotenbrokers}
                                    </span>
                                </li> */}
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.illimitedlinks}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.visibility}
                                    </span>
                                </li>
                                <li className="flex space-x-3 items-center">
                                    <BsCheckCircle className="text-green-500" />
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {sub.exclusivefunctions}
                                    </span>
                                </li>
                                
                            </ul>
                            {/* {premium ? (
                                <div className="p-6 flex justify-center text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                                    onClick={() => setTogglePlano(true)}
                                >
                                    {sub.select} Premium
                                </button>
                            )} */}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
