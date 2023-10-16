"use client";
import { ChangeEvent, Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { ImovelRegistro } from "../../../../../lib/modelos";
import { v4 as uuidv4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Spinner } from "flowbite-react";
import { Modal } from "flowbite-react";
import { FlowbiteModalHeaderTheme } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { Editimg } from "@/app/i18n/dictionaries/types";

interface EditFormProps {
  imovel: ImovelRegistro;
  userid: string;
  formOpen: boolean;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  editimg: Editimg;
}

const supabase = createClientComponentClient<Database>();

export default function EditForm({
  imovel,
  userid,
  formOpen,
  setFormOpen,
  editimg
}: EditFormProps) {
  const [img, setImg] = useState<File>();
  const [imagemId, setImagemId] = useState(imovel.imagem);

  const [loading, setLoading] = useState(false);

  const handleEditarImagem = async () => {
    // Apagar o arquivo antigo
    let { data, error } = await supabase.storage
      .from("imoveis") // Nome do bucket no Supabase
      .remove([`${userid}/${imovel.imagem}`]);

    if (!error) {
      // Enviar o arquivo para o Supabase Storage
      let { data, error } = await supabase.storage
        .from("imoveis") // Nome do bucket no Supabase
        .upload(userid + "/" + imagemId, img!, {
          upsert: true,
        });

      if (error) {
        console.error("Erro ao fazer upload:", error.message);
      } else {
        console.log("Arquivo enviado com sucesso:", data);
      }
    }
  };

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

      const { error } = await supabase
        .from("imovel")
        .update({ imagem: imagemId })
        .eq("id", imovel.id);
      if (!error) {
        setFormOpen(false);
        setLoading(false);
      }
    } else {
      setFormOpen(false);
    }
  };

  const customTheme: FlowbiteModalHeaderTheme = {
    "base": "flex items-center justify-between rounded-t dark:border-gray-600 border-b p-5",
    "popup": "p-2 border-b-0",
    "title": "text-base sm:text-xl font-medium items-center",
    "close": {
      "base": "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
      "icon": "h-5 w-5"
    }
  };

  return (
    <>
      <Modal dismissible show={formOpen} onClose={() => setFormOpen(false)}>
        <Modal.Header theme={customTheme}>
          {editimg.title}
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-200 dark:hover:bg-bray-800 dark:bg-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-700 dark:hover:bg-gray-800">
              <div className="flex flex-col items-center justify-center py-4">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {editimg.imageupload}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {editimg.imageformat}
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
              {img && (
                <div className="items-center pb-4">
                  <span>{img?.name}</span>
                </div>
              )}
            </label>
          </div>
          <div className="pt-6">
            <button
              className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
              onClick={() => handleEditar()}
            >
              {loading ? (
                <>
                  <Spinner />
                  <span className="pl-3">{editimg.loading}</span>
                </>
              ) : (
                <span>{editimg.confirm}</span>
              )}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
