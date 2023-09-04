"use client"

import React, { useState } from 'react';
import VisaoGeral from "./VisaoGeral"
import Publicacoes from "./Publicacoes"

interface InfosProps {
  corretor: any;
  dict: any;
}


export default function Infos ({ corretor, dict }: InfosProps){
  const [activeButton, setActiveButton] = useState('overview');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const getButtonClasses = (buttonName: string) => {
    return activeButton === buttonName
      ? 'w-1/4 h-full text-center bg-slate-200 w-full p-3'
      : 'w-1/4 h-full text-center hover:bg-slate-100 w-full p-3';
  };

  return (
    <div className="w-auto bg-white rounded-md">
      <div className="flex flex-row flex-nowrap justify-around items-center border-b-2 font-semibold overflow-x-auto whitespace-nowrap scrollbar-none">
        <button className={getButtonClasses('overview')} onClick={() => handleButtonClick('overview')}>Visão Geral</button>
        <button className={getButtonClasses('publicacoes')} onClick={() => handleButtonClick('publicacoes')}>Publicações</button>
        <button className={`${getButtonClasses('calendario')} block lg:hidden`} onClick={() => handleButtonClick('calendario')}>Calendário</button>
        <button className={`${getButtonClasses('dashboard')}`} onClick={() => handleButtonClick('dashboard')}>Dashboard</button>
      </div>

      <div className="p-3 pt-8">
        {activeButton === 'overview' && <VisaoGeral corretor={corretor} dict={dict}/>}
        {activeButton === 'publicacoes' && <Publicacoes />}
        {/* {activeButton === 'calendario' && <Calendario />}
        {activeButton === 'dashboard' && <Dashboard />} */}
      </div>
    </div>
  );
};
