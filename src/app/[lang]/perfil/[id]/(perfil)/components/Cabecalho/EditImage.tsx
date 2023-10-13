"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { Database } from "../../../../../../../../lib/database.types";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";
import { useRouter } from "next/navigation";
import { uploadCoverImage, uploadProfileImage } from "../../../../../../../../lib/utils/EditImage";


interface EditFormProps {
  props: any;
  title: string;
  type: string;
}

const supabase = createClientComponentClient<Database>();

export default function EditImage({ props, title, type }: EditFormProps) {
  const state = useProfileStore.getState()
  const initialImage = type == "capa" ? state.sessionData?.capa : state.sessionData?.avatar
  const [img, setImg] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [imagemId, setImagemId] = useState(state.sessionData?.capa)
  const [error, setError] = useState<string | undefined>()
  const router = useRouter()


  const handleEditarImagem = async () => {
    setLoading(true);
    try {
      const { data, error } = type == "capa" ? await uploadCoverImage(imagemId!, img!) : await uploadProfileImage(imagemId!, img!)

      if (error) {
        console.error('Erro ao fazer upload:', error.message);
        setError('Erro ao fazer upload');
      } else {
        console.log('Arquivo enviado com sucesso:', data);
        setError(undefined);
        props.setOpenModal(undefined);

        router.refresh()

        if (initialImage === 'nopfp') {
          await updateTable();
        }

      }
    } catch (error) {
      console.error('Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const updateTable = async () => {
    try {
      const updateData: { capa?: string; avatar?: string } = {};

      if (type === 'capa') {
        updateData.capa = imagemId;
      } else if (type === 'avatar') {
        updateData.avatar = imagemId;
      } else {
        // Handle caso em que o valor de "type" não é válido
        console.error('Tipo inválido:', type);
        return;
      }

      const { data, error } = await supabase
        .from('usuario')
        .update(updateData)
        .eq('id', state.sessionData?.id!);
      if (error) {
        console.error('Erro ao atualizar a tabela:', error.message);
      } else {
        console.log('Tabela atualizada com sucesso:', data);
      }
    } catch (err) {
      console.error('Erro inesperado ao atualizar a tabela:', err);
    }
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagemId(state.sessionData?.id);
      setImg(file);
    }
  };

  const handleEditar = async () => {
    if (img) {
      setLoading(true);
      await handleEditarImagem();
    };
  }

  return (
    <>
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center py-4">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
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
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button onClick={() => handleEditar()} className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2">
              {loading ? (
                <>

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


