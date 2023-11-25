"use client";

import { ImovelRegistro } from "lib/modelos";
import { clientSupabase } from "lib/utils/clientSupabase";
import { Dispatch, SetStateAction, useState } from "react";
import { deletaImovelAPI, getCountVisita } from "../imovelUtils";
import { Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { HiX } from "react-icons/hi";
import { Deleteproperty } from "@/app/i18n/dictionaries/types";

interface DeleteModalProps {
  props: {
    userid: string | undefined;
    textos: Deleteproperty;
    imovel: ImovelRegistro;
    deleteModal: boolean;
    setDeleteModal: Dispatch<SetStateAction<boolean>>;
  };
}

export default function DeleteModal({ props }: DeleteModalProps) {
  const supabase = clientSupabase();

  const [loading, setLoading] = useState(false);

  const deleteImovel = async (userId: string, imovel: ImovelRegistro) => {
    setLoading(true);
    const count = await getCountVisita(imovel.id,supabase)
    if (count) {
      const result = await deletaImovelAPI(userId, imovel, supabase)
      if (result) {
        toast.success((t) =>
          <span>
            <b>{props.textos.deletepropertylogs.success}</b>
            <button className="px-3" onClick={() => toast.dismiss(t.id)}>
              <div className="absolute top-2.5 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <HiX />
              </div>
            </button>
          </span>,
        {duration: 5000})
        props.setDeleteModal(false);
        setLoading(false);
      }
    } else {
      toast.error((t) =>
        <span>
          <b className="block">{props.textos.deletepropertylogs.error1}</b><span className="text-gray-700 text-[13px]">{props.textos.deletepropertylogs.error2}</span>
          <button className="px-3" onClick={() => toast.dismiss(t.id)}>
            <div className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <HiX />
            </div>
          </button>
        </span>,
      {duration: 10000})
      props.setDeleteModal(false);
      setLoading(false);
    }
  };

    return (
        <div className="absolute p-3 z-50 flex justify-center inset-0 bg-gray-500 bg-opacity-50 rounded-lg">
            <div className="self-center w-fit h-fit bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex gap-5 flex-col">
                  <div className="flex p-5 gap-4 pb-0">
                    <div className="bg-red-100 rounded-full text-red-600 min-w-[40px] h-[40px] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h1 className="font-bold text-lg mb-2">{props.textos.title}</h1>
                      <p className="text-gray-700">{props.textos.msg}</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 py-3 px-5 justify-end flex gap-4">
                    <button className="text-white bg-gray-500 hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2" onClick={() => props.setDeleteModal(false)}>{props.textos.cancel}</button>
                    <button className=" text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2"
                    onClick={() => deleteImovel(props.userid!, props.imovel)}>
                      {loading ? (
                        <>
                          <Spinner />
                          <span className="pl-3">{props.textos.loading}</span>
                        </>
                      ) : (
                        <span>{props.textos.delete}</span>
                      )}
                    </button>
                  </div>
                </div>
            </div>
        </div>
    );
}
