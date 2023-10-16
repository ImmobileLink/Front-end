"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/../lib/database.types";
import Historico from "../Historico/Historico";
import { useQuery } from 'react-query';
import { Dictionaries } from "@/app/i18n/dictionaries/types";
import { Corretor } from "../../../../../../../../../../lib/modelos";
import { useProfileStore } from "../../../../../../../../../../lib/store/profileStore";
import { useEffect } from "react";
import { useProfileContext } from "../../../../Provider/ProviderProfile";


interface VisaoGeralProps {
 
}

export default function VisaoGeral({ }: VisaoGeralProps) {
  const state = useProfileStore.getState()
  const corretor = state.profileFullData as Corretor;

  const {  especialidades, areasAtuacao } = useProfileContext();


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


      <div className="mt-8">
        <Historico/>
      </div>

    </div>


  );
}
