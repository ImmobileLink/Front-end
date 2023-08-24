import Image from "next/image";
import { useState } from "react";

interface ImovelImgProps {
    imovelId: any;
}

export default function ImovelImg({ imovelId }: ImovelImgProps) {
  const [src, setSrc] = useState(`imoveis/imagens/${imovelId}`);

    return (
        <div>          
            <Image
                className="object-cover my-2 w-full h-32 rounded-md md:w-52 flex-none text-center"
                src={src}
                width={1}
                height={1}
                onError={() => setSrc("imoveis/imagens/default")}
                alt="Property Picture"
                loading="lazy"
            />                    
        </div>
    )
}