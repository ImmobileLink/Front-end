"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { ImovelRegistro } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Spinner } from 'flowbite-react';

interface ImovelImgProps {
    usuarioId: any;
    imovelId: any;
    imagemId: string;
}

const supabase = createClientComponentClient<Database>();

export default function ImovelImg({ usuarioId, imovelId, imagemId }: ImovelImgProps) {
  const [src, setSrc] = useState(`imoveis/${usuarioId}/${imagemId}`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setImageURL = async () => {
      const timestamp = Date.now();
      setSrc(`imoveis/${usuarioId}/${imagemId}?t=${timestamp}`)
      setLoading(true);
    }
    setImageURL();
  }, [imagemId]);

    return (
        <div className="relative">
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
              priority={true}
            />
          )}
            { loading ? 
              ( 
                <div className="object-cover rounded-md absolute inset-0 flex items-center justify-center z-10 bg-white opacity-70"><Spinner size="xl" /></div>
              ) : (
                <div></div>
              )
            }
        </div>
    )
}