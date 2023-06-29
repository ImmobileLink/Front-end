"use client";

import Avatar from "../Avatar";
import { CorretorBuscado, CorporacaoPorRegiao } from "../../../../../lib/modelos";
import Link from 'next/link'
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Pesquisa } from "@/app/i18n/dictionaries/types";

interface UserCardProps {
  key: any,
  textos: Pesquisa,
  corretor: CorretorBuscado | null,
  corporacao: CorporacaoPorRegiao | null
}

export default function UserCard({ textos, corretor, corporacao }: UserCardProps) {
  const nota = [<AiOutlineStar key={0}/>, <AiOutlineStar key={1}/>, <AiOutlineStar key={2}/>, <AiOutlineStar key={3}/>, <AiOutlineStar key={4}/>];

  if (corretor != null) {
    if (corretor.nota != null) {
      for (let i = 0; i < corretor!.nota!; i++) {
        nota.splice(i, 1, <AiFillStar key={i} />);
      }
    }

  }

  return (
    <div className="w-full h-72 p-5 ring-gray-300 bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md shadow-md rounded-md my-5">
      {
        corretor != null ?
          <div>
            <Avatar userId={corretor?.id} />
            <p>{textos.labels.name}: {corretor.nome}</p>
            <p>CRECI: {corretor.creci}</p>
            <p className="flex flex-row items-baseline align-bottom mt-1">{nota}</p>
          </div>
          :
          <div>
            <Avatar userId={corporacao?.id} />
            <p>{textos.labels.name}: {corporacao?.nomefantasia}</p>
            <p>CNPJ: {corporacao?.cnpj}</p>
          </div>
      }

      <div className="flex flex-row align-bottom mt-5">
        <div>
          <Link href={`perfil/${corretor?.id}`}>
            <button className="flex p-2 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-mediumtext-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
              Ver perfil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
