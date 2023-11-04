"use client"
import Line from "./charts/Line"
import PolarArea from "./charts/PolarArea"
import Link from "next/link";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { useEffect, useState } from "react";
import Radar from "./charts/Radar";
import Doughnut from "./charts/Doughnut";
import Pie from "./charts/Pie";
import DashboardSkeleton from "../loading/DashboardSkeleton";
import { getDataDashboard1, getDataDashboard2 } from "../../../perfilUtils/Dashboard";
import { Dashboard1, Dashboard2 } from "../../../../../../../../lib/modelos";
import PieMock from "./charts/PieMock";
import PolarAreaMock from "./charts/PolarAreaMock";
import { clientSupabase } from "lib/utils/clientSupabase";


interface DashboardProps {
}



export default function Dashboard({ }: DashboardProps) {
  const supabase = clientSupabase()
  const state = useProfileStore.getState()
  const dict = state.dict
  const premium = state.sessionData?.isPremium
  const isLogged = state.sessionData?.id
  const id = state.profileData?.id!

  const [openCalendar, setOpenCalendar] = useState(false)

  const [data1, setData1] = useState<Dashboard1>(null)
  const [data2, setData2] = useState<Dashboard2>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      let { data1 } = await getDataDashboard1(id, supabase)
      let { data2 } = await getDataDashboard2(id, supabase)
      setData1(data1)
      setData2(data2)
      setIsLoading(false)
    }

    fetchData()

  }, [])

  return (
    <>
      {!premium ? (
        <div>
          <div className="absolute blur-md inset-0 overflow-hidden">
            <PieMock />
            <PolarAreaMock />
          </div>
          <div className="absolute flex justify-center items-center inset-0">
            <div className="w-3/4 flex justify-center flex-col items-center">
              {!isLogged ? (
                <>
                  <p className="text-center font-semibold mb-3">Faça login ou Cadastro para ter acesso ao dashboard</p>
                  <Link href="/auth" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Link>
                  <Link href="/auth" className="w-32 mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cadastro</Link>

                </>
              ) : (
                <>
                  <p className="text-center font-semibold mb-3 text-black">Quer ter acesso a informações mais detalhadas? <br /> Veja nossos planos</p>
                  <Link href="/plano" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Assine Já</Link>
                </>

              )}
            </div>
          </div>

        </div >

      ) : (
        <div className={`${!openCalendar && "max-h-[380px] md:max-h-[600px]"} min-h-[300px]`}>
          {isLoading && <DashboardSkeleton />}
          {data1 && data1.length >= 1 ? (
            <div>
              <div className="flex flex-col gap-5 mb-16">
                <Pie satisfacao={data2} />
                <Radar avaliacao={data1} />
                <PolarArea dict={dict} />
                <Line dict={dict} />
                <Doughnut />
              </div>

              <div className={`flex items-center justify-center absolute bottom-0 w-full right-0 bg-gradient-to-b from-transparent to-opacity-100 via-yellow-400 to-yellow-700 h-14`}>
                <Link href="#dashboard" onClick={() => setOpenCalendar(!openCalendar)} className="cursor-pointer text-white font-bold mt-4">{openCalendar ? "Veja menos" : "Veja mais"}</Link>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="">
                <p className="text-center text-black text-xl font-bold absolute inset-0 z-10 flex justify-center items-center ">
                  Esse usuário ainda não foi avaliado :(
                </p>
                <div className="absolute blur-lg inset-0 overflow-hidden ">
                  <PieMock />
                  <PolarAreaMock />
                </div>
              </div>
            )
          )}
        </div>
      )
      }




    </>


  );
}
