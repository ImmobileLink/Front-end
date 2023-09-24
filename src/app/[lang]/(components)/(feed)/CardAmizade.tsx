"use client"
import { FiMail } from "react-icons/fi";
import Avatar from "../Avatar";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";

interface CardAmizadeProps {
  idremetente: string | undefined;
  iddestinatario: string;
  nome: string;
}

const supabase = createClientComponentClient<Database>()

export default function CardAmizade({ idremetente, iddestinatario, nome }: CardAmizadeProps) {
  const router = useRouter()

  const handleEnviarMensagem = async () => {
    let { data, error } = await supabase
    .rpc('criar_ou_retornar_sala', {
      id_destinatario: iddestinatario, 
      id_usuario: idremetente!
    })

    router.push(`/chat/${data}`)
  }

  return (
    <>
      <div
        key={iddestinatario}
        className="flex justify-between mx-6 gap-2 ring-1 ring-black dark:ring-white ring-inset rounded-full"
      >
        <div className="flex">
          <Avatar userId={iddestinatario} />
          <Link className="self-center capitalize text-black dark:text-white" href={`/perfil/${iddestinatario}`}>{nome}</Link>
        </div>
        <div className="flex justify-center align-middle self-center w-14 h-14 mr-1 rounded-full hover:cursor-pointer" onClick={handleEnviarMensagem}>
          <FiMail className="self-center text-xl text-black dark:text-white" />
        </div>
      </div>
    </>
  );
}
