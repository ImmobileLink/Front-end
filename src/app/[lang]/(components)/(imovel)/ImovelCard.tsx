"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { supabase } from "../../../../../lib/supabaseClient";

interface ImovelCardProps {
  idusuario: any;
}

export default function ImovelCard({ idusuario }: ImovelCardProps) {

  return (
    <div className="bg-white focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4">
      <div className="flex grow">
        <div className="w-1/4">Imagem do Imóvel</div>

        <div className="grow">
          <div className="flex grow">
            <button
              className="p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
            >
              Delegar Visita
            </button>
          </div>
          <div className="flex grow">
            <p className="font-bold w-1/2">Localização</p>
            <p className="font-bold">Características</p>
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div className="relative">
            <button className="text-gray-400" onClick={(e) => openDropdown(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
