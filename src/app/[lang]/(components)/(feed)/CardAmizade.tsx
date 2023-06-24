"use client";

import { FiMail } from "react-icons/fi";
import Avatar from "../Avatar";
import Link from "next/link";

interface CardAmizadeProps {
  id: string;
  nome: string;
}

export default function CardAmizade({ id, nome }: CardAmizadeProps) {

  const handleEnviarMensagem = () => {
    console.log("oi")
  }

  return (
    <>
      <div
        key={id}
        className="flex justify-between mx-6 gap-2 ring-1 ring-black ring-inset rounded-full"
      >
        <div className="flex">
          <Avatar userId={id} />
          <Link className="self-center capitalize" href={`/perfil/${id}`}>{nome}</Link>
        </div>
        <div className="flex justify-center align-middle self-center w-14 h-14 mr-1 rounded-full hover:bg-orange-200 ease-in-out duration-500 hover:cursor-pointer" onClick={handleEnviarMensagem}>
          <FiMail className="self-center text-xl" />
        </div>
      </div>
    </>
  );
}
