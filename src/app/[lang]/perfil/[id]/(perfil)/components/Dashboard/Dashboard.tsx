"use client"
import Line from "./charts/Line"
import PolarArea from "./charts/PolarArea"
import Link from "next/link";
import { Database } from "@/../lib/database.types";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import {  useState } from "react";
import Radar from "./charts/Radar";
import Doughnut from "./charts/Doughnut";
import Pie from "./charts/Pie";
import DashboardSkeleton from "../loading/DashboardSkeleton";


interface DashboardProps {
}



export default function Dashboard({ }: DashboardProps) {

  const state = useProfileStore.getState()
  const dict = state.dict
  const premium = state.sessionData?.isPremium
  const isLogged = state.sessionData?.id

  const [openCalendar, setOpenCalendar] = useState(false)


  return (
    <>

      {!premium && (
        <div>
          <div className="absolute flex justify-center items-center inset-0 backdrop-blur-md">
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

      )
      }

      <div className={`${!openCalendar && "max-h-[380px] md:max-h-[600px]"}`}>
        {/* <DashboardSkeleton/> */}

        <div className="gap-5">
          <PolarArea dict={dict} />
          <Line dict={dict} />
          <Radar />
          <Pie/>
          <Doughnut/>
        </div>

        {premium && (
          <div className={`flex items-center justify-center absolute bottom-0 w-full right-0 bg-gradient-to-b from-transparent to-opacity-100 via-yellow-400 to-yellow-700 h-14`}>
            <Link href="#dashboard" onClick={() => setOpenCalendar(!openCalendar)} className="cursor-pointer text-white font-bold mt-4">{openCalendar ? "Veja menos" : "Veja mais"}</Link>
          </div>
        )}
      </div>

    </>


  );
}
