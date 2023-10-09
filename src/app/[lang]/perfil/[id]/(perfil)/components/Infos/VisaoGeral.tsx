"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import Historico from "./historico/Historico";
import { useQuery } from 'react-query';
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { Corretor } from "../../../../../../../../lib/modelos";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";


interface VisaoGeralProps {
 
}

export default function VisaoGeral({ }: VisaoGeralProps) {
  const supabase = createClientComponentClient<Database>()

  const state = useProfileStore.getState()
  const corretor = state.profileFullData as Corretor;
  // Defina a chave única para essa query
  const queryKey = ['especialidades', state.profileData?.id];

  // Defina a função para buscar as especialidades
  const fetchEspecialidades = async () => {
    const { data: especialidades } = await supabase
      .rpc('obterespecialidade', {
        idcorretor: state.profileData?.id!
      });
    return especialidades;
  };

  // Use a função useQuery para buscar os dados
  const { data: especialidades, isLoading, isError } = useQuery(queryKey, fetchEspecialidades);

  return (
    <div className="mx-6">
      <h2 className="font-semibold text-xl mb-5">{state.dict!.profile.infoBroker}</h2>
      <div className="flex items-start justify-between  w-3/5">
        <div>
          <p className="font-semibold ">Creci</p>
          <p>{corretor.creci}</p>
        </div>
        {corretor.numero && (
          <div className="">
            <p className="font-semibold ">Telefone</p>
            <p>{corretor.numero}</p>
          </div>
        )}

        {especialidades && (
          <div className="">
            <p className="font-semibold">Especialidades</p>
            <ul className="list-disc ml-8">
              {especialidades?.map((item, index) => (
                <li key={index}>{item.descricao}</li>
              ))}
            </ul>
          </div>
        )}
      </div>


      <div className="mt-5">
        <Historico/>
      </div>

    </div>


  );
}
