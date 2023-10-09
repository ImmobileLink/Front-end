"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { ImovelRegistro } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Spinner } from 'flowbite-react';
import EditForm from "./EditForm";

interface ImovelImgProps {
    usuarioId: any;
    imovel: ImovelRegistro;
    imovelId: any;
    imagemId: string;
}

const supabase = createClientComponentClient<Database>();

export default function ImovelImg({ usuarioId, imovel, imovelId, imagemId }: ImovelImgProps) {
  const [src, setSrc] = useState(`imoveis/${usuarioId}/${imagemId}`);
  const [loading, setLoading] = useState(true);
  const [editImage, setEditImage] = useState(false);

  useEffect(() => {
    const setImageURL = async () => {
      const timestamp = Date.now();
      setSrc(`imoveis/${usuarioId}/${imagemId}?t=${timestamp}`)
      setLoading(true);
    }
    setImageURL();
  }, [imagemId]);

    return (
        <div className="relative group">
          {(imagemId.length !== 0) ? (
            <Image
                className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center z-0"
                src={src}
                width={1}
                height={1}
                onLoadingComplete={() => setLoading(false)}
                alt="Property Picture"
                loading="lazy"
            />
          ) : (
            <Image
              className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center z-0"
              src="imoveis/default"
              width={1}
              height={1}
              onLoadingComplete={() => setLoading(false)}
              alt="Default Property Picture"
              loading="lazy"
            />
          )}
            { loading ? 
              ( 
                <div className="object-cover rounded-md absolute inset-0 flex items-center justify-center z-10 bg-white opacity-70"><Spinner size="xl" /></div>
              ) : (
                <div></div>
              )
            }
            {
              !loading && (
              <div className="object-cover absolute inset-0 flex items-center justify-center z-10">
                <button className="invisible group-hover:visible absolute px-3 py-1 bg-blue-500 text-white"
                onClick={() => {
                  setEditImage(true);
                }}>
                  Editar Imagem
                </button>
              </div>
              )
            }
            {
              editImage && (
              <EditForm formOpen={editImage} setFormOpen={setEditImage} imovel={imovel} userid={usuarioId} />
              )
            }
        </div>
    )
}