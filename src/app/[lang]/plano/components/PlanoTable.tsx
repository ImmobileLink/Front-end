"use client"
import { Planos } from "@/app/i18n/dictionaries/types";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { setPremiumFalse, setPremiumTrue } from "../planoUtils";
import { useRouter } from "next/navigation";
import { Table } from "flowbite-react";
import { clientSupabase } from "lib/utils/clientSupabase";

interface PlanoTableProps {
  role: string;
  sub: Planos;
  id?: string;
}

const supabase = clientSupabase();

export default function PlanoTable({ role, sub, id }: PlanoTableProps) {
  const router = useRouter()

  const handleSetPremiumFalse = async () => {
    if(window.confirm(sub.confirmchange + " FREE?")){
      const callback = await setPremiumFalse(id, role, supabase)
      if (!callback) {
        console.log("Error while updating in DB")
      }
      router.refresh()
    }
  }

  const handleSetPremiumTrue = async () => {
    if(window.confirm(sub.confirmchange + " PREMIUM?")){
      const callback = await setPremiumTrue(id, role, supabase)
      if (!callback) {
        console.log("Error while updating in DB")
      }
      router.refresh()
    }
  }

  return (
    <div className="overflow-x-auto">
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
            <Table.Cell className="hover:cursor-pointer hover:font-bold"><button onClick={() => handleSetPremiumFalse()} className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">{sub.buynow}</button></Table.Cell>
            <Table.Cell className="hover:cursor-pointer hover:font-bold"><button onClick={() => handleSetPremiumTrue()} className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">{sub.buynow}</button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )

}
