"use client";

import { Agenda } from "@/app/i18n/dictionaries/types";
import { VisitaProps } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/utils/formataData";
import { LiaTrashAltSolid } from 'react-icons/lia';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutgoingMail } from 'react-icons/md';
import { useState } from "react";
import toast from "react-hot-toast";

interface ModalEventoProps {
  isOpen: boolean;
  onClose: () => void;
  evento: VisitaProps | undefined;
  dict: Agenda;
  type: string;
}

const supabase = createClientComponentClient<Database>()

export default function ModalEvento({ isOpen, onClose, evento, dict , type}: ModalEventoProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  if (!isOpen) {
    return null;
  }

  const endereco = `${evento!.rua_imovel}, ${evento!.numero_imovel} - ${evento!.bairro_imovel}, ${evento!.cidade_imovel} - ${evento!.estado_imovel}, ${evento!.cep_imovel}`;

  const handleDeletaEvento = async () => {
    setLoading(true);
    if (window.confirm(dict.delete + "\n" + dict.cannotbeundone)) {
      const { data } = await supabase.from("visita").delete().eq("id", evento!.visita_id)
      toast.success(dict.logs.visitok);
      router.refresh();
      onClose();
    }
    setLoading(false);
  }

  const handleEnviaSurvey = async () => {

    setLoading(true);
    if (window.confirm(dict.sendsurvey)) {
      try {
        const url = '/api/survey/';

        let schedule =  new Date();
        schedule.setMinutes(schedule.getMinutes() + 3);
        
        const requestBody = {
          clientEmail: evento!.email_marcador,
          clientName: evento!.nome_marcador,
          visitDate: evento!.data_agendamento,
          surveyId: evento!.survey_id,
          scheduledDate: schedule
        };
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }).then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          toast.success(dict.logs.emailok);
        })
        .catch(error => {
          toast.error(dict.logs.emailerror);
        });
      } catch (error) {
        toast.error(dict.logs.emailerror);
      }

      router.refresh();
      onClose();
    }
    setLoading(false);
  }

  return (
    <div className="z-50 absolute flex justify-center align-middle w-screen h-screen top-0 left-0 ">
      <div className="flex flex-col justify-between self-center w-10/12 md:w-8/12 lg:w-3/12 min-w-[400px] h-fit bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-300 dark:ring-gray-800 shadow-2xl">
        <div className="relative w-full h-fit p-3">
          <h1 className="text-center font-bold text-2xl">{dict.visitdetails}</h1>
          <button className="absolute top-2 right-1 w-fit px-4 py-2.5 rounded-lg text-lg" onClick={onClose}><AiOutlineClose /></button>
          <p><span className="font-bold">{dict.date}:</span> {formataData(evento!.data_agendamento)}</p>
          <p><span className="font-bold">{type === "corretor" ? dict.companyname : dict.brokername}:</span> {type === "corretor" ? evento!.nome_corporacao : evento!.nome_corretor}</p>
          <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200 my-2" />
          <h2 className="text-center text-xl">{dict.clientdetails}</h2>
          <p><span className="font-bold">{dict.clientname}:</span> {evento!.nome_marcador}</p>
          <p><span className="font-bold">{dict.telefone}:</span> {evento!.telefone_marcador}</p>
          <p><span className="font-bold">Email:</span> {evento!.email_marcador}</p>
          <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200 my-2" />
          <h2 className="text-center text-xl">{dict.placedetails}</h2>
          <p><span className="font-bold">{dict.address}:</span>  {endereco}</p>
          {/* <div className="w-fit">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small input</label>
            <input disabled className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div> */}
        </div>
        <div className="w-full flex justify-center gap-4 mb-4">
          <button disabled={loading} className="px-8 py-2.5 bg-green-400 hover:bg-green-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 disabled:cursor-not-allowed" onClick={handleEnviaSurvey}><MdOutgoingMail className="h-5 w-5" /></button>
          <button disabled={loading} className="px-8 py-2.5 bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 disabled:cursor-not-allowed" onClick={handleDeletaEvento}><LiaTrashAltSolid className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
