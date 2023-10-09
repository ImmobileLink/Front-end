"use client";
import React, { useState, useEffect, useRef } from "react";
import { Corretor, CorretorAssociado, ImovelRegistro, ImovelTipado, TipoImovel } from "../../../../../lib/modelos";
import { Database } from "../../../../../lib/database.types";
import { Imovel } from "@/app/i18n/dictionaries/types";
import { Session, createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import ImovelImg from "./ImovelImg";
import VisitaCard from "./VisitaCard";
import EditForm from "./EditForm";

interface ImovelCardProps {
  textos: Imovel;
  imovel: ImovelRegistro;
  userid: string | undefined;
}

type Propriedade = ImovelRegistro & {
  tipoImovel: TipoImovel[];
};

const supabase = createClientComponentClient<Database>();

export default function ImovelCard({ textos, imovel, userid }: ImovelCardProps) {
  const [corretor, setCorretor] = useState<CorretorAssociado[] | null>([]);
  const [erro, setErro] = useState<string>("");
  const [formOpen, setFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);

  let menuRef = useRef();
  let svgRef = useRef();

  useEffect(() => {
    let handler = (e: any) => {
      if(!menuRef.current?.contains(e.target) && !svgRef.current?.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return() => {
      document.removeEventListener("mousedown", handler);
    }
  });

  const handleDeletarImovel = async () => {
    // Apagar o arquivo
    if (imovel.imagem?.length !== 0) {
      let { data, error } = await supabase
        .storage
        .from('imoveis')
        .remove(userid + "/" + imovel.imagem);    

      if (error) {
        console.error(error);
      }
    }

    const { error } = await supabase.from("imovel").delete().eq('id', imovel.id)
    if (error) {
      console.log(error);
    } else {
      console.log('Imóvel removido com sucesso');
    }
  }

  const getCorretores = async () => {
    if (userid) {
      /*let { data, error } = await supabase.rpc("get_corretores_associados", {
        id_usuario: userid,
      });*/
      const { data: id, error } = await supabase.from('associacoes').select('idcorretor').eq('idcorporacao', userid)

      let array: CorretorAssociado[] = [];

      if (!error) {
        for (let i = 0; i < id?.length; i++) {
          const { data, error } = await supabase.from('corretor').select(`id,nome,estado,cidade,tipoImovel(id,descricao)`).eq('id', id[i].idcorretor)
          if (error) {
            console.log(error);
          } else {
            array = [...array, ...data]
          }
        }
        setCorretor(array)
        //console.log(array)
      } else {
        console.log(error);
        setCorretor([]);
      }
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-700 dark:border-gray-600 text-dark-200 dark:text-white shadow-md rounded-md px-2 pt-2 pb-4 align-middle w-full mb-4">
      {/*<div className="flex justify-end">
        <button ref={svgRef} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="sr-only">Open dropdown</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button></div>
        {dropdownOpen && (
            <div ref={menuRef} id="dropdown" className="absolute right-0 mr-2 mt-1 z-10 text-base list-none bg-gray-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2" aria-labelledby="dropdownButton">
            <li className="block px-4 py-2 text-sm text-center text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" onClick={() => {
              handleDeletarImovel();
              setDropdownOpen(false);
            }}>Delete
            </li>
            </ul>
        </div>
          )}*/}

      <div className="flex flex-col md:flex-row ">
        <div className="mr-2 ml-2">
          <ImovelImg usuarioId={userid} imovel={imovel} imovelId={imovel.id} imagemId={imovel!.imagem} loading={loading} setLoading={setLoading} />
          <div className="flex-auto items-center ">
            <button
              onClick={() => {
                getCorretores();
                setFormOpen(true);
              }}
              className="p-2 w-full self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 transition ease-in duration-200 text-center focus:ring-offset-2"
            >
              {textos.mainlabels.delegatevisit}
            </button>
          </div>
        </div>

        <div className="md:ml-2 md:mt-0 ml-3 flex-auto md:text-sm text-xs">
          <div className="w-full">
            <p className="font-bold">{textos.mainlabels.location}</p>
            <p>{`${imovel!.rua}, ${imovel!.numero}`}</p>
            <p>{`${imovel!.bairro} - ${imovel!.cidade}/${imovel!.estado}`}</p>

            <p className="font-bold mt-2">{textos.mainlabels.price}</p>
            <p>{`${imovel!.valor!.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}`}</p>
          </div>
          <div className="w-full mt-2">
            <p className="font-bold">{textos.mainlabels.characteristics}</p>
            <ul className="list-disc">
              {imovel.caracteristicas.map((item, index) => (
                <li key={index} className="ml-4">
                  {item.descricao}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {formOpen ? (
          <VisitaCard
            formlabels={textos.formlabels}
            imovel={imovel}
            corretor={corretor}
            userid={userid}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
          />
        ) : (
          false
        )}
      </div>
    </div>
  );
}
