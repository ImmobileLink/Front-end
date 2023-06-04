"use client";

import Avatar from "../Avatar";

interface UserCardProps {
  usuario: any
}

export default function UserCard({usuario}: UserCardProps) {
  return (
    <div className="flex w-auto md:w-1/3 m-4 p-5 bg-gray-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md my-5">
      <Avatar userId={usuario.id}/>

      <div className="flex-col w-100 justify-end"> 
        <div>
          <p>Nome: {usuario.nome}</p>
          <p>CRECI: {usuario.creci}</p>
          <p>Avaliaçao: {usuario.avaliacao}</p>
        </div>       
        
        <div >
          <div>
            <button className="mt-5 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 justify-center text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              Iniciar Chat
            </button>
          </div>
          <div>
            <button className="mt-2 p-2 bg-black rounded-lg">
              Ver perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
