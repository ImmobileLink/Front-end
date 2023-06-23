"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { supabase } from "../../../../../lib/supabaseClient";
import { Regiao } from "../../../../../lib/modelos";

interface PostFormCardProps {
  idusuario: any,
  regioes: Regiao[] | undefined
}

export default function PostFormCard({idusuario, regioes}: PostFormCardProps) {
  const [selectedRegion, setSelectedRegion] = useState<Regiao>(regioes![0])
  const [texto, setTexto] = useState('')
  const inserePub = async () => {
    const { error } = await supabase.from('publicacao').insert({idautor: idusuario, idregiao: selectedRegion.id, conteudo: texto, privado: false})
    if (error) {
      console.log(error)
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
    <div className="bg-gray-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4">
      <div className="flex grow">
        <Avatar userId={idusuario} />

        <div className="flex grow">
          <textarea 
            className="bg-gray-100 grow p-3 rounded-md text-slate-900"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <div>
          <label className="mr-4">trocarlang:</label>
                <select className="text-black w-50 text-center"
                  value={selectedRegion.regiao}
                  onChange={(e) => handleRegionChange(e)}>
                  {regioes!.map((regiao: Regiao) => {
                    return (
                      <option key={regiao.id}>{regiao.regiao}</option>
                    )
                  })}
                </select>
        </div>
        <div className="justify-end flex items-center">
          <button onClick={inserePub} className="mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
            Publicar
          </button>
        </div>
      </div>
      
    </div>
  );
}
