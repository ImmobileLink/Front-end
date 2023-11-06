"use client";

import { Agenda } from "@/app/i18n/dictionaries/types";
import { VisitaProps } from "../../../../../lib/modelos";
import { FormEvent, useState } from "react";
import { Modal, Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { formataDataSemDia, formataDataSemHora, isDateBeforeCurrent } from 'lib/utils/formataData';
import { clientSupabase } from "lib/utils/clientSupabase";
import { updateVisita } from "../agendaUtils";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: VisitaProps | undefined;
  dict: Agenda;
}

export default function EditModal({ isOpen, onClose, evento, dict }: EditModalProps) {
  const supabase = clientSupabase();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(formataDataSemHora(evento!.data_agendamento));
  const [time, setTime] = useState(formataDataSemDia(evento!.data_agendamento));


  //const currentDate = new Date().toISOString().slice(0, 10);
  const date = new Date().toLocaleDateString().split("/");
  const currentDate = `${date[2]}-${date[1]}-${date[0]}`;

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if(!isDateBeforeCurrent(`${data} ${time}:00-03`)){
      const result = await updateVisita(supabase, data, time, evento!.visita_id);

      if (result) {
        toast.success(dict.logs.visitchanged);
        router.refresh();
        onClose();
      } else {
        toast.error(dict.logs.invaliddate);
      }
    } else {
      toast.error(dict.logs.invaliddate);
    }

    setLoading(false);
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
          {dict.scheduling}
        </Modal.Header>
        <form onSubmit={e => handleSubmit(e)} className="group" noValidate>
          <Modal.Body>
            <div className="grid gap-3 gap-y-2 text-sm grid-cols-1 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                  {dict.date}
                </label>
                <input
                  onChange={(e) => setData(e.target.value)}
                  className={`text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 dark:[color-scheme:dark] ${data !== "" &&
                    "invalid:[&:not(:focus)]:border-red-500"
                    } peer`}
                  id="visit-date"
                  type="date"
                  min={currentDate}
                  required
                  defaultValue={formataDataSemHora(evento!.data_agendamento)}
                />
                <span
                  className={`mt-2 hidden text-xs italic text-red-500 ${data !== "" &&
                    "peer-[&:not(:focus):invalid]:block"
                    }`}
                >
                  {dict.logs.invaliddate}
                </span>
              </div>

              <div className="sm:col-span-1">
                <label className="text-gray-900 dark:text-gray-200 text-xs mb-1 block uppercase tracking-wide text-grey-darker font-bold">
                  {dict.time}
                </label>
                <input
                  onChange={(e) => setTime(e.target.value)}
                  className={`text-xs py-1.5 px-2 relative block appearance-none border border-gray-300 rounded w-full text-gray-900 leading-tight focus:outline-none bg-gray-100 sm:text-sm focus:border-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:border-gray-500 dark:[color-scheme:dark] ${time !== "" &&
                    "invalid:[&:not(:focus)]:border-red-500"
                    } peer`}
                  id="visit-time"
                  type="time"
                  min={`${data === currentDate
                    ? `${new Date()
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${new Date()
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`
                    : "00:00"
                    }`}
                  max="23:59"
                  required
                  defaultValue={formataDataSemDia(evento!.data_agendamento)}
                />
                <span
                  className={`mt-2 hidden text-xs italic text-red-500 ${time !== "" &&
                    "peer-[&:not(:focus):invalid]:block"
                    }`}
                >
                  {dict.logs.invalidtime}
                </span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-center items-center'>
            <div className="sm:col-span-2 text-right">
              <div className="mt-4 inline-flex items-end">
                <button
                  type="submit"
                  className={`p-2 w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg 
                ${data === formataDataSemHora(evento!.data_agendamento) &&
                    time === formataDataSemDia(evento!.data_agendamento) &&
                    "pointer-events-none opacity-30"
                    }`
                  }
                >
                  {loading ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    <span>{dict.submit}</span>
                  )}

                </button>
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}
