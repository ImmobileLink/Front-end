"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { ImovelRegistro } from "../../../../../lib/modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";

interface ImovelImgProps {
    usuarioId: any;
    imovelId: any;
    imagemId: any;
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
            <Image
                className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center z-0"
                src={src}
                width={1}
                height={1}
                onLoad={() => setLoading(false)}
                onError={() => setSrc("imoveis/default")}
                alt="Property Picture"
                loading="lazy"
            />
            {
                loading ? <div className="object-cover rounded-md absolute inset-0 flex items-center justify-center z-10 bg-white opacity-75">Loading</div>
                :
                <div></div>
            }
        </div>
    )
}