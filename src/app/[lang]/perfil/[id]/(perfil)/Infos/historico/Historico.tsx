"use client";

interface HistoricoProps { }

export default function Historico({ }: HistoricoProps) {

    const data = [
        {
            nome: "Imobiliária Pousada do Sol",
            visitas: 112,
            tempo: "1 Ano",
            avaliacao: "4,2"
        },
        {
            nome: "Imobiliária Da Vinci",
            visitas: 342,
            tempo: "2 Anos",
            avaliacao: "3,9"
        },
        {
            nome: "Imobiliária Souzas",
            visitas: 67,
            tempo: "2 Anos e 2 meses",
            avaliacao: "3,8"
        }
    ]
    return (
        <>
            <div className="w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex  w-2/3  rounded-md mt-2 p-2 align-center flex-col">
                        <p className="font-semibold underline decoration-1 text-md hover:cursor-pointer">{item.nome}</p>
                        <div>
                            <p>{`Duração: ${item.tempo}`}</p>
                            <p>{`Quantidade de visitas: ${item.visitas}`}</p>
                            <p>{`Avaliação: ${item.avaliacao}`}</p>
                        </div>

                    </div>
                ))}
            </div>
        </>
    );
}
