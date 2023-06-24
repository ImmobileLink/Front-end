import Image from "next/image";

interface ImovelImgProps {
    imovelId: any;
}

export default function ImovelImg({ imovelId }: ImovelProps) {

    return (
        <div>          
            <Image
                className="mr-3 my-2 w-40 h-32 rounded-md"
                src={`imoveis/imagens/${imovelId}`}
                width={1}
                height={1}
                alt="Property Picture"
            />                    
        </div>
    )
}