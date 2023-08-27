"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { Regiao } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Feed } from "@/app/i18n/dictionaries/types";

interface PostFormCardProps {
  textos: Feed,
  idusuario: any,
  regioes: Regiao[] | undefined
}

const supabase = createClientComponentClient<Database>()

export default function PostFormCard({ textos, idusuario, regioes }: PostFormCardProps) {
  const [selectedRegion, setSelectedRegion] = useState<Regiao>({ id: '', regiao: '' })
  const [texto, setTexto] = useState('')
  const [erro, setErro] = useState(false)

  const inserePub = async () => {
    if (selectedRegion.id == '') {
      setErro(true)
    }
    else {
      if(texto != '') {
        setErro(false)
        const { error } = await supabase.from('publicacao').insert({ idautor: idusuario, idregiao: selectedRegion.id, conteudo: texto, privado: false })
        if (error) {
          console.log(error)
        }
        else {
          setTexto('')
        }
      }     
    }
  }
  //Faz o set do estado "Region" com o id da região
  const handleRegionChange = (event: any) => {
    const selectedValue = event.target.value;
    const selectedObject: Regiao | undefined = regioes!.find((regiao: Regiao) => regiao!.regiao === selectedValue);
    if (selectedObject != null) {
      setSelectedRegion(selectedObject)
    }
  };

  return (
    <div className="w-full h-fit p-4 flex flex-col justify-center align-middle gap-4 ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md">
      <div className="flex grow">
        <Avatar userId={idusuario} />

        <div className="flex grow">
          <textarea
            className="block mx-4 p-2.5 w-full text-xs sm:text-sm text-gray-900 bg-gray-100 border-gray-300 rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={texto}
            placeholder={textos.form.placeholder}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        {
          erro ?
            <div className="flex flex-row items-center justify-center">
              <p className="text-black m-2 dark:text-white ">Selecione uma região!</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            :
            <p></p>
        }
        <div className="flex flex-row items-center justify-center m-2">
          <label className="mr-4">{textos.form.regionchange}:</label>
          <select className="bg-gray-200 border border-gray-300 text-gray-900 text-xs sm:text-sm md:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedRegion.regiao}
            onChange={(e) => handleRegionChange(e)}>
            <option>{textos.pub.comboboxplaceholder}</option>
            {regioes!.map((regiao: Regiao) => {
              return (
                <option key={regiao.id}>{regiao.regiao}</option>
              )
            })}
          </select>
        </div>
        <div className="justify-end items-center">
          <button onClick={inserePub} className="flex mr-4 p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xs sm:text-sm md:text-base px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
            {textos.form.post}
          </button>
        </div>
      </div>
    </div>
  );
}
