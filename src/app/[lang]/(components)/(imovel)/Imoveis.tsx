"use client";
import React, { useEffect, useState } from "react";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import { ImovelRegistro, ImovelTipado, InsereImovel, TipoImovel, userData } from "../../../../../lib/modelos";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ImovelCard from "./ImovelCard";
import { v4 as uuidv4 } from 'uuid';
import Select from "react-select";
import InputMask from "react-input-mask";
import Form from "./Form";
import Skeleton from "./Skeleton";

interface ImoveisProps {
  userData: userData;
  textos: Imovel,
  tipos: TipoImovel[],
  outros: TipoImovel[],
  mobilias: TipoImovel[],
  condicoes: TipoImovel[]
}

const supabase = createClientComponentClient<Database>();

export default function Imoveis({ userData, textos, tipos, outros, mobilias, condicoes }: ImoveisProps) {
  const [properties, setProperties] = useState<ImovelRegistro[]>([]); //imoveis
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  let userid: string | undefined = ''
  if (userData) {
    userid = userData.id
  }

  // Realtime
  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() => {
    const subscription = supabase
      .channel("property_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { new: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => [...properties, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { new: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => {
            return properties.map((property) =>
              property.id === payload.new.id ? payload.new : property
            );
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "imovel",
          filter: `idcorporacao=eq.${userid}`,
        },
        async (payload: { old: ImovelRegistro }) => {
          setProperties((properties: ImovelRegistro[]) => {
            return properties.filter((property) => property.id !== payload.old.id);
          });
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getProperties = async () => {  
    if (userid) {
      const { data, error } = await supabase
        .from("imovel")
        .select("*")
        .eq("idcorporacao", userid);
      if (error) {
        setLoading(false)
      }
      else {
        setProperties(data)
        setLoading(false)
      }
    }
  }

  return (
    <>
    <div className="w-screen">
    <div className="ring-2 ring-gray-300 rounded-md bg-white dark:bg-gray-600 dark:ring-gray-700 drop-shadow-md overflow-hidden p-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-4xl text-black dark:text-white">
          {textos.mainlabels.title}
        </h2>
        <div>
          <button
            onClick={() => {
              setFormOpen(true);
            }}
            className="flex items-center justify-between p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
            <span>{textos.newproperty.registerproperty}</span>
          </button>

          
        </div>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-x-4 w-full justify-center items-start">
        {
          loading ? (
          <Skeleton num={properties.length} />
          ) : (
          properties!.map((imovel: ImovelRegistro) => {
            return (
              <ImovelCard key={imovel.id} textos={textos} imovel={imovel} userid={userid} 
              />
            );
          }))
        }
      </div>
    </div>
    {formOpen ? (
      <Form props={{ userid, textos, tipos, outros, mobilias, condicoes, formOpen, setFormOpen }} />
    ) : (
      false
    )}
    </>
    
  );
}
