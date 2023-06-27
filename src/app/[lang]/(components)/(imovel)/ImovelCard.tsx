"use client";
import React, { useState, useEffect, useRef } from "react";
import ImovelImg from "./ImovelImg";
import { Corretor, CorretorAssociado, Imovel } from "../../../../../lib/modelos";
import VisitaCard from "./VisitaCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface ImovelCardProps {
  imovel: Imovel[] | null;
  userSession: Session | null | undefined
}

const supabase = createClientComponentClient<Database>()

export default function ImovelCard({imovel, userSession}: ImovelCardProps) {
  const [corretor, setCorretor] = useState<CorretorAssociado[] | null>([]);
  const [erro, setErro] = useState<string>('');
  const [formOpen, setFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const getCorretores = async () => {    
      if (userSession?.user.id) {
        let { data, error } = await supabase.rpc("get_corretores_by_corporacao_especialidade", {
          id_usuario: userSession?.user.id,
          id_imovel: imovel.id,
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
  const caracteristicas = imovel.descricao.split("; ");

  return (
    <div className="bg-white focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4 mb-2 align-middle">
      <div className="flex grow">
        <div className="mr-3 ">
          <ImovelImg imovelId={imovel.id} />
        </div>

        <div className="grow my-2">
          <div className="flex grow">
            <button
              onClick={() => {getCorretores(); setFormOpen(true)}}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-2"
            >
              Delegar Visita
            </button>
          </div>
          <div className="flex grow">
            <div className="w-1/3">
              <p className="font-bold">Localização</p>
              <p>{`${imovel.rua}, ${imovel.numero}`}</p>
              <p>
                {`${imovel.bairro} - ${imovel.cidade}/${imovel.estado}`}
              </p>
            </div>
            <div className="w-1/3">
              <p className="font-bold">Características</p>
              <ul className="list-disc">
                {caracteristicas.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold">Valor</p>
              <p>{`${imovel.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}`}</p>
            </div>
          </div>
        </div>

        <div className="flex mr-3 items-center justify-around">
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
        </div>

        {formOpen ? (
          <VisitaCard onCloseModal={handleCloseModal} imovelData={imovel} corretorData={corretor} userSession={userSession} />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
