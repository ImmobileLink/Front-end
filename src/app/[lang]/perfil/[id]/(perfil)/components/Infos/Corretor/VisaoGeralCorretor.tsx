"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import Historico from "./Historico/Historico";
import { useQuery } from 'react-query';
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { Corretor } from "../../../../../../../../../lib/modelos";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { v4 as uuidv4 } from 'uuid';
import { useProfileContext } from "../../../context/ProfileContext";

interface VisaoGeralProps {

}

export default function VisaoGeralCorretor({ }: VisaoGeralProps) {
  const state = useProfileStore.getState()
  const corretor = state.profileFullData as Corretor;

  const { especialidades, areasAtuacao } = useProfileContext();


  return (
    <div className="mx-6">
      <h2 className="font-semibold text-xl mb-5">{state.dict!.profile.infoBroker}</h2>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-row gap-x-8 gap-y-3 flex-wrap">
          <div>
            <p className="font-semibold ">Creci</p>
            <p>{corretor.creci}</p>
          </div>
          {corretor.telefone && (
            <div className="">
              <p className="font-semibold ">Telefone</p>
              <p>{corretor.telefone}</p>
            </div>
          )}
          {corretor.celular && (
            <div className="">
              <p className="font-semibold ">Celular</p>
              <p>{corretor.celular}</p>
            </div>
          )}

          {corretor.comercial && (
            <div className="">
              <p className="font-semibold ">Contato comercial</p>
              <p>{corretor.comercial}</p>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-5 flex-wrap">
          {especialidades && (

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit w-full max-w-[320px]">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center text-sm dark:bg-slate-800 bg-slate-300">
                      Especialidades
                    </th>
                  </tr>
                </thead>
                
                  <tbody>
                    {especialidades?.map((item, index) => (
                      <tr key={index} className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-gray-900' : 'dark:bg-gray-800'} dark:border-gray-700`}>
                        <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center`}>
                          {item.descricao}
                        </th>
                      </tr>
                    ))}
                  </tbody>
               
              </table>
              {especialidades.length == 0 && (<p className="text-center py-2">Sem dados</p>)}
            </div>

          )}


          {
            areasAtuacao && (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg  h-fit w-full max-w-[320px]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center text-sm dark:bg-slate-800 bg-slate-300">
                        Regiões de atuação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {areasAtuacao?.map((item, index) => (
                      <tr key={index} className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-gray-900' : 'dark:bg-gray-800'} dark:border-gray-700`}>
                        <th scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center`}>
                          {`${item.cidade} - ${item.estado}`}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {areasAtuacao.length == 0 && (<p className="text-center  py-2">Sem dados</p>)}
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
