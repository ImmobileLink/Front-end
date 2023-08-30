/* "use client"
import VisaoGeral from "./Infos/VisaoGeral"
import Publicacoes from "./Infos/Publicacoes"
import { useState } from "react"

interface InfosProps {
  corretor: any;
  dict: any;
}

export default function Infos({ corretor, dict }: InfosProps) {
  const [overview, setOverview] = useState(true)

  return (
    <>
      <div className="w-auto bg-white mt-5 rounded-md overflow-hidden">
        <div className="flex justify-around items-center border-b-2 font-semibold h-9">
          {overview ? (
            <>
              <button className="w-1/2 h-full text-center border-r-2 bg-slate-200">{dict.profile.overview}</button>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center hover:bg-slate-100">{dict.profile.posts}</button>
            </>
          ) : (
            <>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center border-r-2 hover:bg-slate-100">{dict.profile.overview}</button>
              <button className="w-1/2 h-full text-center bg-slate-200">{dict.profile.posts}</button>
            </>
          )}

        </div>

        <div className="p-3 pt-8">
          {overview ? (
            <VisaoGeral corretor={corretor} dict={dict} />
          ) : (
            <Publicacoes />
          )}

        </div>

      </div>
    </>
  );
}
 */

"use client"

import React, { useState } from 'react';
import VisaoGeral from "./Infos/VisaoGeral"
import Publicacoes from "./Infos/Publicacoes"

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
