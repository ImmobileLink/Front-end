"use client";

import { Agenda } from "@/app/i18n/dictionaries/types";
import { VisitaProps } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/utils/formataData";
import { LiaTrashAltSolid } from 'react-icons/lia'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";

interface ModalEventoProps {
  isOpen: boolean;
  onClose: () => void;
  evento: VisitaProps | undefined;
  dict: Agenda;
}

const supabase = createClientComponentClient<Database>()

export default function ModalEvento({ isOpen, onClose, evento, dict }: ModalEventoProps) {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }
  const endereco = `${evento!.rua_imovel}, ${evento!.numero_imovel} - ${evento!.bairro_imovel}, ${evento!.cidade_imovel} - ${evento!.estado_imovel}, ${evento!.cep_imovel}` ;

  const handleDeletaEvento = async () => {
    if(window.confirm(dict.delete + "\n" + dict.cannotbeundone)) {
      const { data } = await supabase.from("visita").delete().eq("id", evento!.visita_id)

      router.refresh();
      onClose();
    }
  }

  return (
    <div className="z-50 absolute flex justify-center align-middle w-screen h-screen top-0 left-0 ">
      <div className="flex flex-col justify-between self-center w-10/12 md:w-8/12 lg:w-3/12 min-w-[400px] h-fit bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-300 dark:ring-gray-800 shadow-2xl">
        <div className="w-full h-fit p-3">
          <h1 className="text-center text-2xl">{dict.visitdetails}</h1>
          <p><span className="font-bold">{dict.date}:</span> {formataData(evento!.data_agendamento)}</p>
          <p><span className="font-bold">{dict.companyname}:</span> {evento!.nome_corporacao}</p>
          <p><span className="font-bold">{dict.clientname}:</span> {evento!.nome_marcador}</p>
          <p><span className="font-bold">{dict.telefone}.:</span> {evento!.telefone_marcador}</p>
          <h2 className="text-center text-xl">{dict.placedetails}</h2>
          <p><span className="font-bold">{dict.address}:</span>  {endereco}</p>
          {/* <div className="w-fit">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
            <input disabled className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div> */}
        </div>
        <div className="w-full flex justify-center gap-4 mb-2">
          <button className="self-center w-9/12 md:w-1/3 text-white bg-secundaria-100 hover:bg-secundaria-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 p-2.5 text-center" onClick={onClose}>Fechar</button>
          <button className="px-4 py-2.5 bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 " onClick={handleDeletaEvento}><LiaTrashAltSolid className="h-5 w-5"/></button>
        </div>
      </div>
    </div>
  );
}
