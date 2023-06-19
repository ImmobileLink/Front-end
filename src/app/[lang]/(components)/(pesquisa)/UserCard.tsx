"use client";

import Avatar from "../Avatar";
import {CorretorBuscado, CorporacaoPorRegiao } from "../../../../../lib/modelos";

interface UserCardProps {
  corretor: CorretorBuscado | null
  corporacao: CorporacaoPorRegiao | null
}

export default function UserCard({corretor, corporacao}: UserCardProps) {
  return (
    <div className="flex w-auto xl:w-2/3 xl m-4 p-5 bg-gray-600 shadow-md rounded-md my-5">
      
      <div className="flex-col w-100 justify-end"> 
        {
          corretor != null ?      
          <div>
            <Avatar userId={corretor?.id}/>
            <p>Nome: {corretor.nome}</p>
            <p>CRECI: {corretor.creci}</p>
            <p>Avaliaçao: {corretor.nota}</p>
          </div> 
          :
          <div>
            <Avatar userId={corporacao?.id}/>
            <p>Nome: {corporacao?.nomefantasia}</p>
            <p>Região: {corporacao?.regiao}</p>
          </div> 
        }
                  
        <div className="flex flex-row mt-5">
          <div>
            <button className="mr-1 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 justify-center text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              Iniciar Chat
            </button>
          </div>
          <div>
            <button className="ml-1 p-2 bg-black rounded-lg">
              Ver perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
