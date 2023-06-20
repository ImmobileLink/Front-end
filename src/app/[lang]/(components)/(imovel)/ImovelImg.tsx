import Image from "next/image";

interface ImovelImgProps {
    userId: any;
}

export default function ImovelImg({userId}: ImovelProps) {

    return (
        <div>          
            <Image
                className="mr-3 mb-3 w-40 h-32 rounded-md"
                src={`imoveis/imagens/imovel_teste.jpg`}
                width={1}
                height={1}
                alt="Immobile Picture"
            />                    
        </div>
    )
}