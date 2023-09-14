"use client";

import Image from "next/image";
import { CorretorBuscadoItem } from "../../../../../lib/modelos";
import Avatar from "../../(components)/Avatar";

interface UserCarouselItemProps {
  corretor: CorretorBuscadoItem
}

export default function UserCarouselItem({ corretor }: UserCarouselItemProps) {
  return (
    <>
      <div className="w-72 lg:w-80 h-52 lg:h-56 flex justify-center items-center m-1 ring-1 ring-gray-500 rounded-xl">
        <Avatar route={corretor.avatar} size={24}/>
      </div>
    </>
  );
}
