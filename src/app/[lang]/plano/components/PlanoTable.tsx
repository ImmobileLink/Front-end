"use client";
import { Planos } from "@/app/i18n/dictionaries/types";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { setPremiumFalse, setPremiumTrue } from "../utils";
import { useRouter } from "next/navigation";
import { Table } from "flowbite-react";

interface PlanoTableProps {
    role: string;
    sub: Planos;
    id?: string;
    premium: boolean;
}

const supabase = createClientComponentClient<Database>();

export default function PlanoTable({
    role,
    sub,
    id,
    premium,
}: PlanoTableProps) {
    const router = useRouter();
    const handleSetPremiumFalse = async () => {
        if (window.confirm(sub.confirmchange + " FREE?")) {
            const callback = await setPremiumFalse(id, role, supabase);
            if (!callback) {
                console.log("Error while updating in DB");
            }
            router.refresh();
        }
    };

    const handleSetPremiumTrue = async () => {
        if (window.confirm(sub.confirmchange + " PREMIUM?")) {
            const callback = await setPremiumTrue(id, role, supabase);
            if (!callback) {
                console.log("Error while updating in DB");
            }
            router.refresh();
        }
    };

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
                                    {sub.linktotenbrokers}
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
                                    {sub.illimitedlinks}
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
                                        onClick={() => handleSetPremiumFalse()}
                                        className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-6 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                                    >
                                        {sub.select} Free
                                    </button>
                                </Table.Cell>
                                <div className="p-6 text-blue-700 font-semibold">{sub.selected}</div>
                            </>
                        ) : (
                            <>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                                <div className="p-6 text-blue-700 font-semibold">{sub.selected}</div>
                                <Table.Cell className="hover:cursor-pointer hover:font-bold">
                                    <button
                                        onClick={() => handleSetPremiumTrue()}
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
        </div>
    );
}
