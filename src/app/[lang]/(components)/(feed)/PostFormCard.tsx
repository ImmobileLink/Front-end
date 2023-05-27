"use client";
import React, { useState } from "react";
import Avatar from "../Avatar";
import { supabase } from "../../../../../lib/supabaseClient";

interface PostFormCardProps {
  idusuario: any
}

export default function PostFormCard({idusuario}: PostFormCardProps) {

  const inserePub = async () => {
    const { error } = await supabase.from('publicacao').insert({idautor: idusuario, areapub: 2, conteudo: 'texto', privado: false})
    if (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-gray-600 focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 shadow-md rounded-md p-4">
      <div className="flex grow">
        {/* @ts-expect-error Server Component */}
        <Avatar userId={idusuario} />

        <div className="flex grow">
          <textarea 
            className="bg-gray-100 grow p-3 rounded-md text-slate-900"
            placeholder={"Whats on your mind?"}
          ></textarea>
        </div>
      </div>
      <div className="justify-end flex items-center">
        <button onClick={inserePub} className="mt-2 p-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
          Publicar
        </button>
      </div>
    </div>
  );
}
