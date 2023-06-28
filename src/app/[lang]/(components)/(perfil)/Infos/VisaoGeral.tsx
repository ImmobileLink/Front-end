"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../../lib/database.types";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

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
      <h2 className="font-semibold text-xl mb-3 text-center">Informações sobre o corretor</h2>
      <div>
        <p><strong>Creci</strong></p>
        <p>{corretor.creci}</p>
      </div>
      {especialidades ? (
        <div className="mt-3">
          <p><strong>Especialidades</strong></p>
          <ul className="list-disc ml-8">
            {especialidades?.map((item, index) => (
              <li key={index}>{item.descricao}</li>
            ))}
          </ul>
        </div>
      ) : (<></>)}



    </div>


  );
}
