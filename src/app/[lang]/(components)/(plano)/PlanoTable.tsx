"use client"
import { Planos } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";

import { BsCheckCircle, BsXCircle } from "react-icons/bs"

import { Table } from 'flowbite-react';
import DismissableModal from "../(flowbite)/DismissableModal";

interface PlanoTableProps {
  role: string;
  sub: Planos;
  id?: string;
}

const supabase = createClientComponentClient<Database>({});

export default async function PlanoTable({ role, sub, id }: PlanoTableProps) {

  const setPremiumTrue = async () => {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: true })
      .eq('id', id)
  }

  const setPremiumFalse = async () => {
    const { data, error } = await supabase
      .from('corporacao')
      .update({ premium: false })
      .eq('id', id)
  }

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
          {
            role == "corretor" ?
              (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feedbackreview}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.dashboard}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feed}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.companyafiliation}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.chat}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.visibility}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.exclusivefunctions}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                </>
              ) :
              (
                <>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feedbackreview}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.dashboard}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.feed}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.chat}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.searchfilters}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.oportunitiesposting}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.linktotenbrokers}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.illimitedlinks}</Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.visibility}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{sub.exclusivefunctions}</Table.Cell>
                    <Table.Cell className=""><BsXCircle className="text-red-500" /></Table.Cell>
                    <Table.Cell className=""><BsCheckCircle className="text-green-500" /></Table.Cell>
                  </Table.Row>
                </>
              )
          }
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
            <Table.Cell className="hover:cursor-pointer hover:font-bold" onClick={e => { setPremiumFalse() }}><DismissableModal buttonLabel={sub.buynow} modalTitle="MUDAR PLANO" modalBody="Tem cetreza?" onAccept={setPremiumFalse()} onDecline={setPremiumFalse()}/></Table.Cell>
            <Table.Cell className="hover:cursor-pointer hover:font-bold" onClick={e => { setPremiumTrue() }}><DismissableModal buttonLabel={sub.buynow} modalTitle="MUDAR PLANO" modalBody="Tem cetreza?" onAccept={setPremiumTrue()} onDecline={setPremiumTrue()}/></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  )

}
