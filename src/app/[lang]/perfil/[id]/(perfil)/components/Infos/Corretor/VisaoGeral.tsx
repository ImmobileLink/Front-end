"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import Historico from "./Historico/Historico";
import { useQuery } from 'react-query';
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { Corretor } from "../../../../../../../../../lib/modelos";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { useEffect } from "react";
import { useProfileContext } from "../../../context/ProfileContext";


interface VisaoGeralProps {

}

export default function VisaoGeral({ }: VisaoGeralProps) {
  const state = useProfileStore.getState()
  const corretor = state.profileFullData as Corretor;

  const { especialidades, areasAtuacao } = useProfileContext();


  return (
    <div className="mx-6">
      <h2 className="font-semibold text-xl mb-5">{state.dict!.profile.infoBroker}</h2>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-row gap-5">
          <div>
            <p className="font-semibold ">Creci</p>
            <p>{corretor.creci}</p>
          </div>
          {corretor.numero && (
            <div className="">
              <p className="font-semibold ">Telefone</p>
              <p>{corretor.numero}</p>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-5 flex-wrap">
          {especialidades && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      Especialidades
                    </th>

                  </tr>
                </thead>
                <tbody>

                  {especialidades?.map((item, index) => (
                    <tr className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-gray-900' : 'dark:bg-gray-800'} dark:border-gray-700`}>
                      <th key={index} scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                        {item.descricao}
                      </th>
                    </tr>
                  ))}


                </tbody>

              </table>
            </div>

          )}



          {
            areasAtuacao && (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg  h-fit">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Regiões de atuação
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {areasAtuacao?.map((item, index) => (
                      <tr className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-gray-900' : 'dark:bg-gray-800'} dark:border-gray-700`}>
                        <th key={index} scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                          {`${item.cidade} - ${item.estado}`}
                        </th>
                      </tr>
                    ))}


                  </tbody>

                </table>
              </div>

            )
          }
        </div>


      </div >

      <hr className="h-px my-8 bg-gray-500"></hr>

      <Historico />

    </div >

  );
}
