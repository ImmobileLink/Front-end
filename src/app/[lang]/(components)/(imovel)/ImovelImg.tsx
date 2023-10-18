"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { Spinner } from 'flowbite-react';

interface ImovelImgProps {
    usuarioId: string;
    imagemId: string;
}

const supabase = createClientComponentClient<Database>();

export default function ImovelImg({ usuarioId, imagemId }: ImovelImgProps) {
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
        <>
          {(imagemId.length !== 0) ? (
            <Image
                className="w-full max-h-64 sm:h-56 lg:h-48 rounded-md z-0"
                src={src}
                width={1}
                height={1}
                onLoadingComplete={() => setLoading(false)}
                alt="Property Picture"
                loading="lazy"
            />
          ) : (
            <Image
              className="w-full max-h-64 sm:h-56 lg:h-48 rounded-md z-0"
              src="imoveis/default"
              width={1}
              height={1}
              onLoadingComplete={() => setLoading(false)}
              alt="Default Property Picture"
              loading="lazy"
            />
          )}
            { loading &&
                <div className="object-cover rounded-md absolute inset-0 flex items-center justify-center z-10 bg-white opacity-70"><Spinner size="xl" /></div>
            }
        </>
    )
}