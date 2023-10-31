"use client";

import { AiOutlineClose } from 'react-icons/ai';
import { MdOutgoingMail } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { Agenda } from "@/app/i18n/dictionaries/types";
import { VisitaProps } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/utils/formataData";
import { LiaTrashAltSolid } from 'react-icons/lia';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal, Spinner } from 'flowbite-react';

interface ModalEventoProps {
  isOpen: boolean;
  onClose: () => void;
  evento: VisitaProps | undefined;
  dict: Agenda;
  type: string;
  openEditModal: () => void;
}

const supabase = createClientComponentClient<Database>();

export default function ModalEvento({ isOpen, onClose, evento, dict, type, openEditModal }: ModalEventoProps) {
  const router = useRouter();
  const [loadingEmail, setLoadingEmail] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  if (!isOpen) {
    return null;
  }

  const endereco = `${evento!.rua_imovel}, ${evento!.numero_imovel} - ${evento!.bairro_imovel}, ${evento!.cidade_imovel} - ${evento!.estado_imovel}, ${evento!.cep_imovel}`;

  const handleDeletaEvento = async () => {
    setLoadingDelete(true);
    if (window.confirm(dict.delete + "\n" + dict.cannotbeundone)) {
      const { data } = await supabase.from("visita").delete().eq("id", evento!.visita_id)
      toast.success(dict.logs.visitok);
      router.refresh();
      onClose();
    }
    setLoadingDelete(false);
  }

  const handleEnviaSurvey = async () => {

    setLoadingEmail(true);
    if (window.confirm(dict.sendsurvey)) {
      try {
        const url = '/api/survey/';

        let schedule = new Date();
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
    setLoadingEmail(false);
  }

  return (
    <Modal
      dismissible
      show={isOpen}
      onClose={onClose}
      size={"xl"}
    >
      <Modal.Body>
        <Modal.Header>
          {dict.visitdetails}
        </Modal.Header>
        <Modal.Body>
          <p><span className="font-bold">{dict.date}:</span> {formataData(evento!.data_agendamento)}</p>
          <p><span className="font-bold">{type === "corretor" ? dict.companyname : dict.brokername}:</span> {type === "corretor" ? evento!.nome_corporacao : evento!.nome_corretor}</p>
          <div className="mt-2 sm:col-span-2">
            <h4 className="mb-1 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">
              {dict.clientdetails}
            </h4>
            <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200" />
          </div>
          <p><span className="font-bold">{dict.clientname}:</span> {evento!.nome_marcador}</p>
          <p><span className="font-bold">{dict.telefone}:</span> {evento!.telefone_marcador}</p>
          <p><span className="font-bold">Email:</span> {evento!.email_marcador}</p>
          <div className="mt-2 sm:col-span-2">
            <h4 className="mb-1 text-base sm:text-lg font-medium text-gray-900 dark:text-gray-200">
              {dict.placedetails}
            </h4>
            <hr className="h-px border-0 bg-gray-900 dark:bg-gray-200" />
          </div>
          <p><span className="font-bold">{dict.address}:</span>  {endereco}</p>
        </Modal.Body>
        <Modal.Footer className='flex justify-center items-center'>
          <button
            disabled={loadingEmail}
            className="px-8 py-2.5 bg-green-400 hover:bg-green-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 disabled:cursor-not-allowed"
            onClick={handleEnviaSurvey}
          >
            {loadingEmail ? <Spinner /> : <MdOutgoingMail className="h-5 w-5" />}
          </button>
          <hr className='w-[1px] h-6 bg-gray-900 dark:bg-gray-200' />
          <button
            className="px-8 py-2.5 bg-sky-400 hover:bg-sky-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 disabled:cursor-not-allowed"
            onClick={openEditModal}
          >
            <BiEditAlt className="h-5 w-5" />
          </button>
          <button
            disabled={loadingDelete}
            className="px-8 py-2.5 bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 disabled:cursor-not-allowed"
            onClick={handleDeletaEvento}
          >
            {loadingDelete ? <Spinner /> :<LiaTrashAltSolid className="h-5 w-5" />}
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}
