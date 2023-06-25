"use client";

import { FiMail } from "react-icons/fi";
import Avatar from "../Avatar";
import Link from "next/link";

interface CardAmizadeProps {
  idremetente: string | undefined;
  iddestinatario: string;
  nome: string;
}

export default function CardAmizade({ idremetente, iddestinatario, nome }: CardAmizadeProps) {

  const handleEnviarMensagem = () => {
    console.log("oi")
  }

  return (
    <>
      <div
        key={iddestinatario}
        className="flex justify-between mx-6 gap-2 ring-1 ring-black ring-inset rounded-full"
      >
        <div className="flex">
          <Avatar userId={iddestinatario} />
          <Link className="self-center capitalize text-black" href={`/perfil/${iddestinatario}`}>{nome}</Link>
        </div>
        <div className="flex justify-center align-middle self-center w-14 h-14 mr-1 rounded-full hover:cursor-pointer" onClick={handleEnviarMensagem}>
          <FiMail className="self-center text-xl text-black" />
        </div>
      </div>
    </>
  );
}
