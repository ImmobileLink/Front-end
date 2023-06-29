"use client"
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
      <div className="w-auto bg-white mt-5 rounded-md m-3 overflow-hidden">
        <div className="flex justify-around items-center border-b-2 font-semibold h-9">
          {overview ? (
            <>
              <button className="w-1/2 h-full text-center border-r-2 bg-slate-100">{dict.profile.overview}</button>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center hover:bg-slate-100">{dict.profile.posts}</button>
            </>
          ) : (
            <>
              <button onClick={() => { setOverview(!overview) }} className="w-1/2 h-full text-center border-r-2 hover:bg-slate-100">{dict.profile.overview}</button>
              <button className="w-1/2 h-full text-center bg-slate-100">{dict.profile.posts}</button>
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
