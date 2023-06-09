"use client";
import React, { useState } from "react";
import {
  Corretor,
  CorretorAssociado,
  InsereImovel,
  Visita,
} from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Formlabels, Imovel, Newproperty } from "@/app/i18n/dictionaries/types";
import { ImovelDB } from "../../../../../lib/modelos";
import Link from "next/link";

interface NovoImovelCardProps {
  textos: Newproperty;
  userSession: Session | null | undefined;
}

const supabase = createClientComponentClient<Database>();

export default function NovoImovelCard({ textos, userSession }: NovoImovelCardProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [num, setNum] = useState(0);
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");

  // Falta a validação dos dados
  const handleCadastrarImovel = async () => {
      const imovel: InsereImovel = {
        idcorporacao: userSession?.user.id!,
        descricao: descricao,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: num,
        valor: valor
      };
      const { error } = await supabase
      .from('imovel')
      .insert(imovel)
      if(error) {
        console.log(error) 
      }
      else {
        setFormOpen(false);
      }
  };

  const handleNumChange = (event: any) => {
    let number = 0;
    try {
      number = parseInt(event.target.value)
    }
    catch (e) {
      console.log("Erro no Parse Int: " + e)
    } 
    setNum(number)
  }

  const handleValorChange = (event: any) => {
    let val = 0;
    try {
      val = parseFloat(event.target.value)
    }
    catch (e) {
      console.log("Erro no Parse Float: " + e)
    } 
    setValor(val)
  }

  return (
    <div>
      <button
        onClick={() => {
          setFormOpen(true);
        }}
        className="flex items-center justify-between p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
        <span>{textos.registerproperty}</span>
      </button>

      {formOpen ? (
        <div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <div className="pointer-events-auto relative w-screen max-w-md">
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 md:-ml-10 md:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => {
                        setFormOpen(false);
                      }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 md:px-6">
                      <h2
                        className="text-2xl font-semibold leading-6 text-gray-900"
                        id="slide-over-title"
                      >
                        {textos.registerproperty}
                      </h2>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 md:px-6">
                      <div className="mb-2 flex flex-wrap">
                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.uf}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => setEstado(e.target.value)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="estado"
                            type="text"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.city}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => setCidade(e.target.value)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="cidade"
                            type="text"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.neighborhood}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => setBairro(e.target.value)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="bairro"
                            type="text"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.street}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => setRua(e.target.value)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="rua"
                            type="text"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.number}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => handleNumChange(e)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="num"
                            type="number"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.price}
                        </label>
                        <div className="w-full md:w-3/4">
                          <input
                            onChange={(e) => handleValorChange(e)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="valor"
                            type="number"
                          />
                        </div>

                        <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                          {textos.description}
                        </label>
                        <div className="w-full md:w-3/4">
                          <textarea name="" id="" cols={30} rows={2} onChange={(e) => setDescricao(e.target.value)}
                            className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                          </textarea>
                        </div>

                        <div className="ml-auto w-1/2 flex justify-end">
                        <button
                        onClick={handleCadastrarImovel}
                        className="p-2 mt-2 grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
                      >
                        {textos.register}
                      </button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
}
