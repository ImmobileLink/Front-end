"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import Historico from "./historico/Historico";

interface VisaoGeralProps {
  corretor: any;
}

export default function VisaoGeral({ corretor }: VisaoGeralProps) {
  const supabase = createClientComponentClient<Database>()
  const [especialidades, setEspecialidade] = useState<{ descricao: string; }[] | null>()

  useEffect(() => {
    const fetchData = async () => {
      let { data: especialidades } = await supabase
        .rpc('obterespecialidade', {
          idcorretor: corretor.id
        })
      setEspecialidade(especialidades)
    }
    fetchData()
  }, [])

  return (
    <div className="ml-6">
      <h2 className="font-semibold text-xl mb-5">Informações sobre o corretor</h2>
      <div className="flex items-start justify-between  w-3/5">
        <div>
          <p className="font-semibold ">Creci</p>
          <p>{corretor.creci}</p>
        </div>
        {corretor.numero ? (
          <div className="">
            <p className="font-semibold ">Telefone</p>
            <p>{corretor.numero}</p>
          </div>
        ) : (<></>)}

        {especialidades ? (
          <div className="">
            <p className="font-semibold">Especialidades</p>
            <ul className="list-disc ml-8">
              {especialidades?.map((item, index) => (
                <li key={index}>{item.descricao}</li>
              ))}
            </ul>
          </div>
        ) : (<></>)}
      </div>


      <div className="mt-5">
        <h2 className="font-semibold text-xl">Histórico</h2>
        <Historico />
      </div>

    </div>


  );
}
