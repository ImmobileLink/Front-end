'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from '@/../../lib/database.types';


interface botaoAddProps {
  associado: string | null;
  tipo: string;
  idSession: string | null;
  idProfile: string;
  dict: any;
}



export default function BotaoAdd({ associado, idProfile, idSession, tipo, dict }: botaoAddProps) {

  const [estado, setEstado] = useState(associado);
  const [popup, setPopup] = useState(false)
  const supabase = createClientComponentClient<Database>()


  const desassociar = async () => {
    const { data, error } = await supabase
      .from('associacoes')
      .delete()
      .eq('idcorretor', idProfile)
      .eq('idcorporacao', idSession)
    setEstado("Associar")
    setPopup(false)
  }

  const associar = async () => {
    const { data, error } = await supabase
      .from('associacoes')
      .update({ pendente: false })
      .eq('idcorretor', idProfile)
      .eq('idcorporacao', idSession)
      setEstado("Associado")
  }

  const sendConvite = async () => {
    const { data, error } = await supabase
      .from('associacoes')
      .insert([
        { idcorretor: idProfile, idcorporacao: idSession! },
      ])
    setEstado("Pendente")
  }

  const cancelaConvite = async () => {
    const { data, error } = await supabase
      .from('associacoes')
      .delete()
      .eq('idcorretor', idProfile)
      .eq('idcorporacao', idSession)
    setEstado("Associar")
  }




  const handleClick = () => {
    if (estado == "Associar") {
      sendConvite()
      setTimeout(() => {
          associar()
      }, 5000);
    } else if (estado === "Pendente") {
      cancelaConvite()
    } else if (estado === "Associado") {
      setPopup(true)
    }
  };

  const close = () => {
    setPopup(false)
  }





  const buttonClass = classNames('py-2 px-4 rounded', {
    'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800': estado === 'Associar',
    'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800': estado === 'Associado',
    'bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800': estado === 'Pendente',
  });


  return (
    <>
      <button onClick={handleClick} className={`w-fit text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ${buttonClass}`}>
        {estado}
      </button>
      {popup ? (
        <div className='absolute inset-0 backdrop-blur-md'>
          <div className='flex justify-center mt-44'>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg aria-hidden="true" onClick={close} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only" >Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Deseja se desassociar?</h3>
                <button onClick={desassociar} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Sim
                </button>
                <button data-modal-hide="popup-modal" onClick={close} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Não, cancelar</button>
              </div>
            </div>

          </div>
        </div>
      ) : (<></>)}

    </>
  );
}
