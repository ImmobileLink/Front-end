"use client"
import { Session } from "inspector";
import Line from "./charts/Line"
import PolarArea from "./charts/PolarArea"
import Link from "next/link";
import { Database } from "@/../lib/database.types";
import { useButtonContext } from "../../../../context/TabsContext";
import { useProfileStore } from "../../../../../../../../../../lib/store/profileStore";


interface DashboardProps {
}



export default function DashboardEmpresa({}: DashboardProps) {

  const state = useProfileStore.getState()
  const dict = state.dict
  const premium = state.sessionData?.isPremium

  const { activeTab, setTab, tabsRef } = useButtonContext()


  return (
    <>

      {!premium && (
        <div>
          <div className="absolute flex justify-center items-center inset-0 backdrop-blur-md">
            <div className="w-3/4 flex justify-center flex-col items-center">
              {premium == null ? (
                <>
                  <p className="text-center font-semibold mb-3">Faça login ou Cadastro para ter acesso ao dashboard</p>
                  <Link href="/auth" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Link>
                  <Link href="/auth" className="w-32 mt-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cadastro</Link>

                </>
              ) : (
                <>
                  <p className="text-center font-semibold mb-3">Quer ter acesso a informações mais detalhadas? <br /> Assine nosso plano para empresas</p>
                  <Link href="/plano" className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Assine Já</Link>
                  <button onClick={() => tabsRef.current?.setActiveTab(2)} className="w-32 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Abrir dash</button>
                </>

              )}

            </div>
          </div>
        </div >

      )
      }

      <div>
        <div >
          <PolarArea dict={dict} />
        </div>

        <div className="mt-5">
          <Line dict={dict} />
        </div>

      </div>
    </>


  );
}
