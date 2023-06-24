"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import ImovelImg from "./ImovelImg";
import { useSupabase } from "@/app/[lang]/SupabaseProvider";
import { Imovel } from "../../../../../lib/modelos";

interface ImovelCardProps {
  imovel: Imovel[] | null
}

// Arrumar internacionalização, tailwind

export default function ImovelCard({ imovel }: ImovelCardProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function openDropdown(e: any) {
    e.stopPropagation();
    setDropdownOpen(true);
  }
  function handleClickOutsideDropdown(e: any) {
    e.stopPropagation();
    setDropdownOpen(false);
  }

  const caracteristicas = imovel.descricao.split("; ");

  return (
    <div className="bg-white focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4 mb-2 align-middle">
      <div className="flex grow">
        <div className="mr-3 ">
          <ImovelImg imovelId={imovel.id}/>
        </div>

        <div className="grow my-2">
          <div className="flex grow">
            <button
              onClick={() => setFormOpen(true)}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg mb-2"
            >
              Delegar Visita
            </button>
            {formOpen ? (
              <div className="w-full p-[5%] bg-[rgba(0,0,0,0.5)] fixed z-100 flex justify-center inset-0">
              <div className="bg-white flex-1 shadow-md max-w-md flex flex-col relative rounded-lg px-8 pt-6 pb-8 mb-4"
              >
                <button
                  type="button"
                  className="w-6 h-6 absolute text-inherit bg-transparent cursor-pointer border-none right-4 inset-y-2 text-lg"
                  onClick={() => setFormOpen(false)}
                >
                  X
                </button>
                
                <div class="mb-4">
                  <label class="block text-gray-700 text-lg font-bold mb-2" for="grid-state">
                    Corretor
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div class="inline-block relative">
                      <select class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option></option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                    <button class="items-end bg-escuro2 hover:bg-escuro text-sm text-white py-1 px-2 rounded" type="button">
                    Encontrar corretor ideal
                  </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label class="block text-gray-700 text-lg font-bold mb-2" for="client-data">Dados do Cliente</label>
                  <div className="bg-gray-200 rounded px-4 py-4 mb-4">
                    <div class="mb-4 flex flex-wrap">  
                      <label class="text-gray-700 text-sm font-bold mb-1 sm:w-1/5 px-2 py-2 leading-normal" for="user-name">Nome</label>
                      <div class="sm:w-4/5 px-4">
                        <input className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
                      </div>
                    </div>
                    <div class="mb-4 flex flex-wrap">  
                      <label class="text-gray-700 text-sm font-bold mb-1 sm:w-1/5 px-2 py-2 leading-normal" for="user-tel">Telefone</label>
                      <div class="sm:w-4/5 px-4">
                        <input className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="usertel" type="text" />
                      </div>
                    </div>
                    <div class="mb-2 flex flex-wrap">  
                      <label class="text-gray-700 text-sm font-bold mb-1 sm:w-1/5 px-2 py-2 leading-normal" for="user-email">E-mail</label>
                      <div class="sm:w-4/5 px-4">
                        <input className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="usermail" type="text" />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">Delegar Visita</button>
              </div>
              </div>
            ): false}

          </div>
          <div className="flex grow">
            <div className="w-1/2">
              <p className="font-bold">Localização</p>
              <p>{`${imovel.rua}, ${imovel.numero}`}</p>
              <p>{`${imovel.bairro} - ${imovel.cidade}/${imovel.estado}`}</p>
            </div>
            <div>
              <p className="font-bold">Características</p>
              <ul className="list-disc">
                {caracteristicas.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
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
      </div>
    </div>
  );
}
