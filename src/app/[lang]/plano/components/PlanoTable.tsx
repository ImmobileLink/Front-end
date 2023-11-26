"use client";
import { Planos } from "@/app/i18n/dictionaries/types";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { setPremiumFalse, setPremiumTrue } from "../planoUtils";
import { useRouter } from "next/navigation";
import { Table } from "flowbite-react";
import { clientSupabase } from "lib/utils/clientSupabase";
import { useState } from "react";
import ModalTogglePlano from "./ModalTogglePlano";

interface PlanoTableProps {
    role: string;
    sub: Planos;
    id?: string;
    premium: boolean;
}

const supabase = clientSupabase();

export default function PlanoTable({
    role,
    sub,
    id,
    premium,
}: PlanoTableProps) {
    const [togglePlano, setTogglePlano] = useState(false);

    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>{sub.sublabel}</Table.HeadCell>
                    <Table.HeadCell className="flex justify-center">
                        FREE
                    </Table.HeadCell>
                    <Table.HeadCell className="text-center">
                        PREMIUM
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {role == "corretor" ? (
                        <>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.pricing}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <a className="text-lg text-blue-700 font-semibold">
                                        {sub.freetier}
                                    </a>
                                </Table.Cell>
                                <Table.Cell className="">
                                    <a
                                        className={`${
                                            premium ? "" : "pl-12"
                                        } text-lg text-blue-700 font-semibold pr-2`}
                                    >
                                        {sub.freetier}
                                    </a>
                                    <a className="line-through">
                                        {sub.brokertier}
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.feedbackreview}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.feed}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.companyafiliation}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.chat}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.dashboard}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsXCircle className="text-red-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.visibility}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsXCircle className="text-red-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.exclusivefunctions}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsXCircle className="text-red-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    ) : (
                        <>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.pricing}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <a className="text-lg text-blue-700 font-semibold">
                                        {sub.freetier}
                                    </a>
                                </Table.Cell>
                                <Table.Cell className="">
                                    <a
                                        className={`${
                                            premium ? "" : "pl-12"
                                        } text-lg text-blue-700 font-semibold pr-2`}
                                    >
                                        {sub.freetier}
                                    </a>
                                    <a className="line-through">
                                        {sub.companytier}
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.feedbackreview}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.feed}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.chat}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.searchfilters}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.oportunitiesposting}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsCheckCircle className="text-green-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.visibility}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsXCircle className="text-red-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {sub.exclusivefunctions}
                                </Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <BsXCircle className="text-red-500" />
                                </Table.Cell>
                                <Table.Cell className="">
                                    <BsCheckCircle
                                        className={`${
                                            premium ? "ml-6" : "ml-20"
                                        } mb-2 text-green-500`}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </>
                    )}
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        {premium ? (
                            <>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                                <Table.Cell className="hover:cursor-pointer hover:font-bold">
                                    <button
                                        onClick={() => setTogglePlano(true)}
                                        className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-6 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                                    >
                                        {sub.select} Free
                                    </button>
                                </Table.Cell>
                                <div className="p-6 text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                            </>
                        ) : (
                            <>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                                <div className="p-6 text-blue-700 font-semibold">
                                    {sub.selected}
                                </div>
                                <Table.Cell className="hover:cursor-pointer hover:font-bold">
                                    <button
                                        onClick={() => setTogglePlano(true)}
                                        className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-6 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                                    >
                                        {sub.select} Premium
                                    </button>
                                </Table.Cell>
                            </>
                        )}
                    </Table.Row>
                </Table.Body>
            </Table>
            {togglePlano ? (
                <ModalTogglePlano
                    id={id!}
                    role={role}
                    setToggle={setTogglePlano}
                    premium={premium}
                    dict={sub}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
