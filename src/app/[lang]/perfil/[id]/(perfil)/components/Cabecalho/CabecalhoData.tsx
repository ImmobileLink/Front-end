"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import RatingCount from "./Rating";
import { Database } from "../../../../../../../../lib/database.types";
import { useState } from "react";

interface CabecalhoDataProps {
    nome: string;
    cidade: string;
    estado: string;
    id: string;
    tipo: string;
}

export default function CabecalhoData({ id, tipo, nome, cidade, estado }: CabecalhoDataProps) {
    const supabase = createClientComponentClient<Database>({});

    const tabela = tipo == "corretor" ? "corretor" : "corporacao"

    const [data, setData] = useState({
        nome: nome,
        cidade: cidade,
        estado: estado
    })

    const channelA = supabase
        .channel('profile_changes')
        .on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: tabela,
                filter: `id=eq.${id}`
            },
            (payload) => {
                if(tabela == "corporacao"){
                    setData({
                     nome: payload.new.nomefantasia,
                     estado: payload.new.estado,
                     cidade: payload.new.cidade
                    })
                }else{
                    setData({
                        nome: payload.new.nome,
                        estado: payload.new.estado,
                        cidade: payload.new.cidade
                       })
                }
            }
        ).subscribe()

    return (
        <>
            <h2 className="font-bold text-2xl dark:text-white">{data.nome}</h2>
            <div className="flex flex-wrap-reverse gap-4 mt-2">
                <p className="text-gray-500 dark:text-gray-400">{`${data.cidade} - ${data.estado}`}</p>
                <RatingCount />
            </div>
        </>
    );
}