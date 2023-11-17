"use client";

import { CorretorCarouselItem } from "../../../../../lib/modelos";
import Avatar from "../../(components)/Avatar";
import Link from "next/link";
import { Labels } from "@/app/i18n/dictionaries/types";

interface UserCarouselItemProps {
  corretor: CorretorCarouselItem | null;
  dict: Labels;
  key: number
}

export default function UserCarouselItem({ corretor, dict }: UserCarouselItemProps) {
  return (
    <>
      {
        corretor &&
        (
          <div className="w-72 lg:w-80 h-52 lg:h-56 p-4 flex flex-col justify-between bg-gray-200 border border-gray-300 m-1 dark:bg-gray-700 dark:border-gray-600 dark: rounded-xl text-black dark:text-white mb-2 shadow-md">
            <div>
              <div className="flex align-middle justify-start items-center">
                <Avatar route={corretor.avatar} size={"m"} id={corretor.id}/>
                <div className="flex flex-col align-top justify-start items-start">
                  <Link href={`/perfil/${corretor.id}`}>{corretor.nome}</Link>
                  <p className="text-sm">{corretor.estado + " - " + corretor.cidade}</p>
                </div>
              </div>
              <p>CRECI Nº: {corretor.creci}</p>
              <p className="text-justify text-ellipsis overflow-hidden whitespace-pre-line h-10 text-sm">{corretor.sobre}</p>
            </div>
            <div className="w-full flex justify-end">
              <Link href={`/perfil/${corretor.id}`} className="flex w-fit cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg">
                {dict.checkprofile}
              </Link>
            </div>
          </div>
        )
      }
    </>
  );
}
