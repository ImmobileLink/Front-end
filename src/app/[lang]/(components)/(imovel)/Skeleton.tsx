"use client";
import React, { useState, useEffect } from "react";
import { CorretorAssociado, ImovelRegistro, ImovelTipado, TipoImovel } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import { Session, createClientComponentClient} from "@supabase/auth-helpers-nextjs";

interface SkeletonProps {
  num: Number;
}

const supabase = createClientComponentClient<Database>();

export default function Skeleton({ num }: SkeletonProps) {
  return (
    Array(num).fill(0).map((el, index) => (
      <div key={index}>
    <div className="relative bg-gray-100 dark:bg-dark-200 text-dark-200 dark:text-white ring-2 ring-gray-300 dark:ring-dark-300 focus:ring-gray-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md px-2 pt-2 pb-4 align-middle w-full mb-4 animate-pulse" role="status">   

      <div className="flex flex-col md:flex-row ">
        <div className="mr-2 ml-2">
          {/* Imagem */}
          <div className="relative">
          <div className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center z-0 flex items-center justify-center bg-gray-300 dark:bg-gray-700">
          </div></div>
          
          <div className="flex-auto items-center mx-5 pt-2">
            {/* Botão */}
            <div className="h-4 bg-gray-300 p-2 w-full self-center rounded-lg text-sm pt-2.5 text-center"></div>
          </div>
        </div>

        <div className="md:ml-2 md:mt-0 mx-3 flex-auto">
          <div className="w-full relative">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 my-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 my-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>

            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 my-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    ))
  );
}
