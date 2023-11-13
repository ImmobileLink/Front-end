//@ts-nocheck
"use client";

import Link from 'next/link';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Pesquisa } from "@/app/i18n/dictionaries/types";
import Avatar from "../../(components)/Avatar";
import { CorporacaoBuscadaUnica, CorretorBuscadoUnico } from '../../../../../lib/modelos';

interface UserCardProps {
  key: any,
  textos: Pesquisa,
  usuario: CorretorBuscadoUnico | CorporacaoBuscadaUnica
}


export default function UserCard({ textos, usuario }: UserCardProps) {
  const nota = [<AiOutlineStar key={0} />, <AiOutlineStar key={1} />, <AiOutlineStar key={2} />, <AiOutlineStar key={3} />, <AiOutlineStar key={4} />];

  if (usuario != null) {
    if (usuario.nota != null) {
      for (let i = 0; i < usuario.nota; i++) {
        nota.splice(i, 1, <AiFillStar key={i} />);
      }
    }
  }

  return (
    <div className="p-5 flex flex-col justify-between ring-gray-300 bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md shadow-md rounded-md">
      <div className='text-start'>
        <div className='flex align-middle items-center'>
          <Avatar route={usuario.avatar} />
          <div className='flex flex-col align-top items-start'>
            <p>{usuario.nome || usuario.nomefantasia}</p>
            <p className="text-sm">{usuario.estado + " - " + usuario.cidade}</p>
          </div>
        </div>
        {usuario.creci && (<p className="flex flex-row items-end align-bottom text-sm">{nota}</p>)}
        {usuario.creci && (<p className='text-left'>CRECI Nº: {usuario.creci}</p>)}
        <p className='text-justify text-ellipsis overflow-hidden whitespace-pre-line h-10 text-sm'>{usuario.sobre}</p>
      </div>
      <div className="w-full flex justify-end mt-3">
        <Link href={`/perfil/${usuario.id}`} className="flex w-fit cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
          {textos.labels.checkprofile}
        </Link>
      </div>
    </div>
  );
}


