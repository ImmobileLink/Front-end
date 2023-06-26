'use client'
import React, { useState } from 'react';
import classNames from 'classnames';


interface botaoAddProps {
  associado: string | null;
  tipo: string;
}

export default function BotaoAdd({ associado }: botaoAddProps) {
  const [estado, setEstado] = useState<'associar' | 'associado' | 'pendente'>('associar');


    /* if (associado == "false") {
      relacao="Associar"
      style="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    } else if (associado == "true") {
      relacao="Associados"
      style="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
    } else if (associado == "pendente") {
      relacao="Pendente"
      style="bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
    } */

    const handleClick = () => {

    };

    const buttonClass = classNames('py-2 px-4 rounded', {
      'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800': associado === 'false',
      'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800': associado === 'true',
      'bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800': associado === 'pendente',
    });
  
    let buttonText: string;
    if (associado === 'false') {
      buttonText = 'Associar';
    } else if (associado === 'true') {
      buttonText = 'Associado';
    } else {
      buttonText = 'Pendente';
    }

  return (
    <>
      <button  onClick={handleClick} className={`w-fit text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 ${buttonClass}`}>
        {buttonText}
      </button>
    </>
  );
}
