"use client";

import { TiDelete } from "react-icons/ti";
import { BiCalendarCheck, BiEditAlt } from 'react-icons/bi';
import { Agenda } from "@/app/i18n/dictionaries/types";
import { VisitaProps } from "../../../../../lib/modelos";
import { formataData } from "../../../../../lib/utils/formataData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Modal, Spinner } from 'flowbite-react';
import { clientSupabase } from 'lib/utils/clientSupabase';
import { confirmaVisita, deleteVisita, enviaEmail, enviaEmailCliente } from '../agendaUtils';
import Mapa from './Mapa';

interface ModalEventoProps {
    isOpen: boolean;
    onClose: () => void;
    evento: VisitaProps | undefined;
    dict: Agenda;
    type: string;
    openEditModal: () => void;
}


export default function ModalConfirmaEvento({ isOpen, onClose, evento, dict, type, openEditModal }: ModalEventoProps) {
    const supabase = clientSupabase();

    const respondido = async () => {
        let { data: status, error } = await supabase.from('resultadoformulario').select('status').eq('id', evento!.survey_id)

        return status ? true : false
    }

    const router = useRouter();

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [loadingConfirm, setLoadingConfirm] = useState(false)

    if (!isOpen) {
        return null;
    }

    const endereco = `${evento!.rua_imovel}, ${evento!.numero_imovel} - ${evento!.bairro_imovel}, ${evento!.cidade_imovel} - ${evento!.estado_imovel}, ${evento!.cep_imovel}`;

    const handleDeletaEvento = async () => {
        setLoadingDelete(true);
        if (window.confirm(dict.delete + "\n" + dict.cannotbeundone)) {
            await deleteVisita(supabase, evento!.visita_id);
            toast.success(dict.logs.refuseVisit);
            router.refresh();
            onClose();
        }
        setLoadingDelete(false);
    }


    const handleConfirmaEvento = async () => {
        setLoadingConfirm(true)
        const response = await confirmaVisita(supabase, evento?.visita_id!)

        const data = await enviaEmailCliente(evento!.email_marcador, evento!.nome_corretor, evento!.nome_corporacao,evento!.nome_marcador, evento!.data_agendamento, evento!.rua_imovel, evento!.numero_imovel);
        if (response) {
            toast.success(dict.logs.confirmVisit);
            router.refresh();
            onClose();
        } else {
            toast.error(dict.logs.confirmVisitError)
        }
        setLoadingConfirm(false)
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
                    <div className="w-full max-h-64 mt-3">
                        <Mapa endereco={endereco} />
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex justify-center items-center'>

                    {type == "corretor" ? (
                        <>
                            <button
                                className="px-10 py-2.5 bg-green-500 hover:bg-green-800 rounded-lg focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 disabled:cursor-not-allowed"
                                onClick={handleConfirmaEvento}
                                disabled={loadingConfirm}
                            >
                                {loadingConfirm ? <Spinner /> : <BiCalendarCheck className="h-5 w-5" />}
                            </button>

                            <hr className='w-[1px] h-6 bg-gray-900 dark:bg-gray-200' />
                        </>
                    ) : (
                        <>
                            <button
                                className="px-10 py-2.5 bg-sky-400 hover:bg-sky-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 disabled:cursor-not-allowed"
                                onClick={openEditModal}
                            >
                                <BiEditAlt className="h-5 w-5" />
                            </button>
                        </>)}


                    <button
                        disabled={loadingDelete}
                        className="px-10 py-2.5 bg-red-400 hover:bg-red-500 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 disabled:cursor-not-allowed"
                        onClick={handleDeletaEvento}
                    >
                        {loadingDelete ? <Spinner /> : <TiDelete className="h-5 w-5" />}
                    </button>


                </Modal.Footer>
            </Modal.Body>
        </Modal>
    );
}
