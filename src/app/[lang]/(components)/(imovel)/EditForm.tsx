"use client"
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { AtualizaImovel, ImovelRegistro } from "../../../../../lib/modelos";
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/router";

interface EditFormProps {
  onCloseModal: any;
  imovel: ImovelRegistro;
  userid: string;
}

const supabase = createClientComponentClient<Database>();

export default function EditForm({ onCloseModal, imovel, userid }: EditFormProps) {
  const [estado, setEstado] = useState(imovel.estado);
  const [cidade, setCidade] = useState(imovel.cidade);
  const [bairro, setBairro] = useState(imovel.bairro);
  const [rua, setRua] = useState(imovel.rua);
  const [num, setNum] = useState(imovel.numero);
  const [valor, setValor] = useState(imovel.valor);
  const [descricao, setDescricao] = useState(imovel.descricao);

  const [img, setImg] = useState<File>();
  const [imagemId, setImagemId] = useState(imovel.imagem);

  const handleEditarImagem = async () => {
    // Apagar o arquivo antigo
    let { data, error } = await supabase
      .storage
      .from('imoveis') // Nome do bucket no Supabase
      .remove(userid + "/" + imovel.imagem);    

      if (!error) {
        // Enviar o arquivo para o Supabase Storage
        let { data, error } = await supabase
            .storage
            .from('imoveis') // Nome do bucket no Supabase
            .upload(userid + "/" + imagemId, img, {
              upsert: true
            });    

          if (error) {
            console.error('Erro ao fazer upload:', error.message);
          } else {
            console.log('Arquivo enviado com sucesso:', data);
          }
        }
    }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagemId(uuidv4());
      setImg(file);
    }
  };

  const handleEditarImovel = async () => {
    if (img) {
      await handleEditarImagem();
    }

    const updateImovel: AtualizaImovel = {
      descricao: descricao,
      estado: estado,
      cidade: cidade,
      bairro: bairro,
      rua: rua,
      numero: num,
      valor: valor,
      imagem: imagemId
    };
    const { data, error } = await supabase
      .from("imovel")
      .update(updateImovel)
      .eq('id', imovel.id)
      .select();

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      onCloseModal();
    }
  };

    return (
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
                  onClick={() => onCloseModal()}
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
                    Editar Imóvel
                  </h2>
                </div>
                <div className="relative mt-6 flex-1 px-4 md:px-6">
                  <div className="mb-2 flex flex-wrap">
                    <label className="text-gray-700 text-sm font-bold mb-1 w-full md:w-1/4 py-2 md:pr-4 leading-normal">
                      Cidade
                    </label>
                    <div className="w-full md:w-3/4">
                    <input
                      onChange={(e) => setCidade(e.target.value)}
                      className="relative shadow appearance-none border rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cidade"
                      type="text"
                      />
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
                        onClick={handleEditarImovel}
                        className="p-2 mt-2 grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
                      >
                        Confirmar
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
    )
}