"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { Database } from "../../../../../lib/database.types";
import Avatar from "../Avatar";
import { useRouter } from 'next/navigation';

interface CardEmpresaAssociadaProps {
  idcorporacao: string;
  idcorretor: string | undefined;
  nome: string;
}

const supabase = createClientComponentClient<Database>()

export default function CardEmpresaAssociada({idcorporacao, idcorretor, nome}: CardEmpresaAssociadaProps) {
  const router = useRouter()

  const handleEnviarMensagem = async () => {
    let { data, error } = await supabase
    .rpc('criar_ou_retornar_sala', {
      id_destinatario: idcorporacao, 
      id_usuario: idcorretor!
    })

    router.push(`/chat/${data}`)
  }

  return (
    <>
      <div
        key={idcorporacao}
        className="flex justify-between mx-6 gap-2 ring-1 ring-black dark:ring-white ring-inset rounded-full"
      >
        <div className="flex">
          <Avatar userId={idcorporacao} />
          <Link className="self-center capitalize text-black dark:text-white" href={`/perfil/${idcorporacao}`}>{nome}</Link>
        </div>
        <div className="flex justify-center align-middle self-center w-14 h-14 mr-1 rounded-full hover:cursor-pointer" onClick={handleEnviarMensagem}>
          <FiMail className="self-center text-xl text-black dark:text-white" />
        </div>
      </div>
    </>
  );
}
