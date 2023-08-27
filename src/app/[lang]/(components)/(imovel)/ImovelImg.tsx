import Image from "next/image";
import { Suspense, useState } from "react";

interface ImovelImgProps {
    usuarioId: any;
    imagemId: any;
}

export default function ImovelImg({ usuarioId, imagemId }: ImovelImgProps) {
  const [src, setSrc] = useState(`imoveis/${usuarioId}/${imagemId}`);

  const [loading, setLoading] = useState(true);

    return (
        <div className="relative">
            <Image
                className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center z-1000"
                src={src}
                width={1}
                height={1}
                onError={() => setSrc("imoveis/default")}
                onLoadingComplete={() => setLoading(false)}
                alt="Property Picture"
                priority
            />
            {
                loading ? <div className="absolute inset-0 flex items-center justify-center z-0">Loading</div>
                :
                <div></div>
            }
        </div>
    )
}