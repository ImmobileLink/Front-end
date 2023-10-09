"use client"
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { AtualizaImovel, ImovelRegistro } from "../../../../../lib/modelos";
import { v4 as uuidv4 } from 'uuid';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";
import { Spinner } from "flowbite-react";
import { Button, Modal } from 'flowbite-react';

interface EditFormProps {
  imovel: ImovelRegistro,
  userid: string,
  formOpen: boolean,
  setFormOpen: Dispatch<SetStateAction<boolean>>,
}

const supabase = createClientComponentClient<Database>();

// Falta Implementar a Edição

export default function EditForm({ formOpen, setFormOpen, imovel, userid }: EditFormProps) {
  const [img, setImg] = useState<File>();
  const [imagemId, setImagemId] = useState(imovel.imagem);

  const [loading, setLoading] = useState(false);

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

  const handleEditar = async () => {  
    if (img) {
      setLoading(true);

      await handleEditarImagem();

      const { error } = await supabase.from('imovel').update({ imagem: imagemId }).eq('id', imovel.id)
      if (!error) {
        setFormOpen(false);
        setLoading(false);
      }
    } else {
      setFormOpen(false);
    }
  };

  return (
    <>
      <Modal dismissible show={formOpen} onClose={() => setFormOpen(false)}>
        <Modal.Header>Alterar Imagem do Imóvel</Modal.Header>
        <Modal.Body>
        <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center py-4">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                </div>
                <input type="file" className="hidden" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                {
                  img && (
                    <div className="items-center pb-4">
                      <span>{img?.name}</span>
                    </div>
                  )
                }
                
            </label> 
        </div>
        <div className="pt-6">
          <button className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2" onClick={() => handleEditar()}>
          {loading ? (
              <>
                <Spinner />
                <span className="pl-3">
                  Loading...
                </span>
              </>
              )
              : (
                <span>Confirmar</span>
              )}
          </button>
        </div>
        </Modal.Body>
      </Modal>
    </>
  )
}