"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { Corporacao, Corretor } from "../../../../../../../../../lib/modelos";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";
import { useEffect } from "react";
import { useProfileContext } from "../../../context/ProfileContext";


interface VisaoGeralProps {

}

export default function VisaoGeralEmpresa({ }: VisaoGeralProps) {
  const state = useProfileStore.getState()
  const corporacao = state.profileFullData as Corporacao;

  const { areasAtuacao } = useProfileContext();


  return (
    <div className="mx-6">
      <h2 className="font-semibold text-xl mb-5">Informações sobre a empresa</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-x-8 gap-y-3 flex-wrap">
          <div>
            <p className="font-semibold ">CNPJ</p>
            <p>{corporacao.cnpj}</p>
          </div>
          {corporacao.telefone1 && (
            <div className="">
              <p className="font-semibold ">Telefone 1</p>
              <p>{corporacao.telefone1}</p>
            </div>
          )}
          {corporacao.telefone2 && (
            <div className="">
              <p className="font-semibold ">Telefone 2</p>
              <p>{corporacao.telefone2}</p>
            </div>
          )}
          {corporacao.telefone3 && (
            <div className="">
              <p className="font-semibold ">Telefone 3</p>
              <p>{corporacao.telefone3}</p>
            </div>
          )}
          {corporacao.site && (
            <div className="">
              <p className="font-semibold ">Site</p>
              <a className="underline">{corporacao.site}</a>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-5 flex-wrap">
          {
            areasAtuacao && (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-fit w-full max-w-[320px]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center text-sm bg-slate-800">
                        Regiões de atuação
                      </th>

                    </tr>
                  </thead>
                  <tbody>

                    {areasAtuacao?.map((item, index) => (
                      <tr  key={index} className={`bg-white border-b ${index % 2 === 0 ? 'dark:bg-gray-900' : 'dark:bg-gray-800'} dark:border-gray-700`}>
                        <th  scope="row" className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center`}>
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


      </div>
    </div>

  );
}
