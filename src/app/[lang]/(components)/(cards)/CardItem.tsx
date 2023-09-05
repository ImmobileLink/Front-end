"use client"
import { FiMail } from "react-icons/fi";
import Avatar from "../Avatar";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { useRouter } from "next/navigation";

interface CardItemProps {
  idremetente: string;
  iddestinatario: string;
  key: string;
  nome: string;
}

const supabase = createClientComponentClient<Database>()

export default function CardItem({ key, idremetente, iddestinatario, nome }: CardItemProps) {
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
      <div className="flex justify-between mx-6 gap-2 ring-1 ring-gray-800 dark:ring-gray-300 ring-inset rounded-full">
        <div className="flex w-3/4 rounded-full">
          <Avatar userId={iddestinatario} />
          <Link className="w-2/3 self-center capitalize text-black dark:text-white truncate ml-2" href={`/perfil/${iddestinatario}`}>{nome}</Link>
        </div>
        <div className="flex justify-center align-middle self-center w-14 h-14 mr-1 rounded-full hover:cursor-pointer">
          <FiMail className="self-center text-xl text-black dark:text-white" />
        </div>
      </div>
    </>
  );
}
