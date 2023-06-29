"use client";
import React, { useState, useEffect, useRef } from "react";
import ImovelImg from "./ImovelImg";
import { Corretor, CorretorAssociado, ImovelDB, ImovelSemCorporacao } from "../../../../../lib/modelos";
import VisitaCard from "./VisitaCard";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Imovel } from '@/app/i18n/dictionaries/types';
import { Database } from "../../../../../lib/database.types";

interface ImovelCardProps {
  textos: Imovel;
  imovel: ImovelSemCorporacao | null;
  userSession: Session | null | undefined
}

const supabase = createClientComponentClient<Database>()

export default function ImovelCard({textos, imovel, userSession}: ImovelCardProps) {
  const [corretor, setCorretor] = useState<CorretorAssociado[] | null>([]);
  const [erro, setErro] = useState<string>('');
  const [formOpen, setFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const getCorretores = async () => {    
      if (userSession?.user.id) {
        let { data, error } = await supabase.rpc("get_corretores_associados", {
          id_usuario: userSession?.user.id
        })
        if (error) {
          console.log(error)
          setErro(error.toString())
          setCorretor([])
        }
        else {
          setErro('')
          setCorretor(data)
        }
      }
    }

  function openDropdown(e: any) {
    e.stopPropagation();
    setDropdownOpen(true);
  }
  function handleClickOutsideDropdown(e: any) {
    e.stopPropagation();
    setDropdownOpen(false);
  }

  const handleCloseModal = () => {
    setFormOpen(false);
  };

  // Deixar a descrição na tabela de imóveis, por enquanto
  const caracteristicas = imovel!.descricao!.split("; ");

  return (
    <div className="bg-gray-300 dark:bg-branco text-dark-200 dark:text-white ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-2 mb-2 align-middle w-full my-4">
      <div className="flex flex-col md:flex-row">
        <div className="mr-2 ml-2">
          <ImovelImg imovelId={imovel!.id} />
          <div className="flex-auto">
            <button
              onClick={() => {getCorretores(); setFormOpen(true)}}
              className="p-2 w-fit self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
            >
              {textos.mainlabels.delegatevisit}
            </button>
          </div>
        </div>

        <div className="md:ml-2 md:mt-0 ml-3 flex-auto">
            <div className="w-full">
              <p className="font-bold">{textos.mainlabels.location}</p>
              <p>{`${imovel!.rua}, ${imovel!.numero}`}</p>
              <p>
                {`${imovel!.bairro} - ${imovel!.cidade}/${imovel!.estado}`}
              </p>

              <p className="font-bold mt-2">{textos.mainlabels.price}</p>
              <p>{`${imovel!.valor!.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</p>
            </div>
            <div className="w-full mt-2">
              <p className="font-bold">{textos.mainlabels.characteristics}</p>
              <ul className="list-disc">
                {caracteristicas.map((item, index) => (
                  <li key={index} className="ml-4">{item}</li>
                ))}
              </ul>
            </div>
        </div>

        {/*<div className="flex mr-3 items-center justify-around">
          <div className="relative">
            <button className="text-escuro2" onClick={(e) => openDropdown(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
        </div>*/}

        {formOpen ? (
          <VisitaCard onCloseModal={handleCloseModal} formlabels={textos.formlabels} imovelData={imovel} corretorData={corretor} userSession={userSession} />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
