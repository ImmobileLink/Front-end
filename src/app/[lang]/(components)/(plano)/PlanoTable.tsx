"use client"
import { Planos } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";

import { BsCheckCircle, BsXCircle } from "react-icons/bs"

import { Table } from 'flowbite-react';

interface PlanoTableProps {
  role: string;
  sub: Planos;
  id?: string;
}

const supabase = createClientComponentClient<Database>({});

export default async function PlanoTable({ role, sub, id }: PlanoTableProps) {

  const stayPremium = async () => {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: true })
      .eq('id', id)
      .select()
  }

  const noPremium = async () => {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: false })
      .eq('id', id)
      .select()
  }

  switch (role) {
    case "corretor":
      return (
          <Table>
            <Table.Head>
              <Table.HeadCell>
                {sub.sublabel}
              </Table.HeadCell>
              <Table.HeadCell>
                FREE
              </Table.HeadCell>
              <Table.HeadCell>
                PREMIUM
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feedbackreview}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.dashboard}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feed}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.companyafiliation}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.chat}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.visibility}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.exclusivefunctions}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                <Table.Cell className="">{sub.buynow}</Table.Cell>
                <Table.Cell className="">{sub.buynow}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
      );
    case "corporacao":
      return (
        <>
        <Table>
            <Table.Head>
              <Table.HeadCell>
                {sub.sublabel}
              </Table.HeadCell>
              <Table.HeadCell>
                FREE
              </Table.HeadCell>
              <Table.HeadCell>
                PREMIUM
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feedbackreview}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.dashboard}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feed}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.chat}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.searchfilters}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.oportunitiesposting}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.linktotenbrokers}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.illimitedlinks}</Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.visibility}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.exclusivefunctions}</Table.Cell>
                <Table.Cell className=""><BsXCircle className="text-red-500"/></Table.Cell>
                <Table.Cell className=""><BsCheckCircle className="text-green-500"/></Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                <Table.Cell className="">{sub.buynow}</Table.Cell>
                <Table.Cell className="">{sub.buynow}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      );
    default:
      break;
  }
}
