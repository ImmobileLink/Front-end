"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import { ImovelRegistro, InsereImovel } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ImovelCard from "./ImovelCard";
import { v4 as uuidv4 } from 'uuid';

interface ImoveisProps {
  userid: string;
  textos: Imovel;
}

const supabase = createClientComponentClient<Database>();

export default function Imoveis({ userid, textos }: ImoveisProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [num, setNum] = useState(0);
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");

  const [img, setImg] = useState<File>();
  const [imagemId, setImagemId] = useState("");

  const [loading, setLoading] = useState(true);

  const [properties, setProperties] = useState<ImovelRegistro[]>([]); //imoveis

  const newproperty = textos.newproperty;

  // Realtime
  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("property_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { new: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => [...properties, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { new: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => {
            return properties.map((property) =>
              property.id === payload.new.id ? payload.new : property
            );
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { old: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => {
            return properties.filter((property) => property.id !== payload.old.id);
          });
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getProperties = async () => {  
    if (userid) {
      //setLoading(true);

      let { data, error } = await supabase
        .from("imovel")
        .select("*")
        .eq("idcorporacao", userid);
      if (error) {
        setLoading(false)
      }
      else {
        setProperties(data)
        setLoading(false)
      }
    }
  }

  const handleCadastrarImagem = async () => {
      // Enviar o arquivo para o Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('imoveis') // Nome do bucket no Supabase
      .upload(userid + "/" + imagemId, img);  // Cria a pasta se ela ainda não existir    cacheControl: 'max-age=300'

    if (error) {
      console.error('Erro ao fazer upload:', error.message);
    } else {
      console.log('Arquivo enviado com sucesso:', data);
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagemId(uuidv4());
      setImg(file);
    }
  };

  // Falta a validação dos dados
  const handleCadastrarImovel = async () => {
    if (img) {
      await handleCadastrarImagem();
    }

    const imovel: InsereImovel = {
      idcorporacao: userid,
      descricao: descricao,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: num,
      valor: valor,
      imagem: imagemId
    };
    const { data, error } = await supabase.from("imovel").insert(imovel).select();
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setFormOpen(false);
    }
  };

  const handleNumChange = (event: any) => {
    let number = 0;
    try {
      number = parseInt(event.target.value);
    } catch (e) {
      console.log("Erro no Parse Int: " + e);
    }
    setNum(number);
  };

  const handleValorChange = (event: any) => {
    let val = 0;
    try {
      val = parseFloat(event.target.value);
    } catch (e) {
      console.log("Erro no Parse Float: " + e);
    }
    setValor(val);
  };

  return (
    <div className="ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md overflow-hidden h-screen w-screen p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-4xl text-black dark:text-white">
          {textos.mainlabels.title}
        </h2>
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
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
            <span>{newproperty.registerproperty}</span>
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
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
                            {newproperty.registerproperty}
                          </h2>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 md:px-6">
                          <div className="mb-2 flex flex-wrap">
                            <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                              {newproperty.uf}
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
                              {newproperty.city}
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
                              {newproperty.neighborhood}
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
                              {newproperty.street}
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
                              {newproperty.number}
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
                              {newproperty.price}
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
                              {newproperty.description}
                            </label>
                            <div className="w-full md:w-3/4">
                              <textarea
                                name=""
                                id=""
                                cols={30}
                                rows={2}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              ></textarea>
                            </div>


                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                              Carregar imagem
                            </label>
                            <div className="w-full md:w-3/4">
                              <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help"
                                id="imagem"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                            </div>

                            <div className="ml-auto w-1/2 flex justify-end">
                              <button
                                onClick={handleCadastrarImovel}
                                className="p-2 mt-2 grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
                              >
                                {newproperty.register}
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
      </div>
      <div className="grid grid-cols-2 gap-x-4 w-full justify-center items-start">
        {
          loading ? <div>Loading</div>
          :
          properties!.map((imovel: ImovelRegistro) => {
            return (
              <ImovelCard key={imovel.id} textos={textos} imovel={imovel} userid={userid}
              />
            );
          })
        }
      </div>
    </div>
  );
}
