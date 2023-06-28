"use client"
import VisaoGeral from "./Infos/VisaoGeral"
import Publicacoes from "./Infos/Publicacoes"
import { useState } from "react"

interface InfosProps {
  corretor: any;
}

export default function Infos({ corretor }: InfosProps) {
  const [overview, setOverview] = useState(true)
  const [style, setStyle] = useState("")


  return (
    <>
      <div className="w-auto bg-white min-h-48 mt-5 rounded-md m-3 overflow-hidden">
        <div className="flex justify-around items-center border-b-2 font-semibold h-9">
          {overview ? (
            <>
              <button className="w-1/2 h-full text-center border-r-2 bg-slate-100">Visão Geral</button>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center hover:bg-slate-100">Publicações</button>
            </>
          ) : (
            <>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center border-r-2 hover:bg-slate-100">Visão Geral</button>
              <button className="w-1/2 h-full text-center bg-slate-100">Publicações</button>
            </>
          )}

        </div>

        <div className="p-3">
          {overview ? (
            <VisaoGeral corretor={corretor} />
          ) : (
            <Publicacoes />
          )}

        </div>

      </div>
    </>
  );
}
