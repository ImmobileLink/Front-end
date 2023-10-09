"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import RatingCount from "./Rating";
import { Database } from "../../../../../../../../lib/database.types";
import { ReactNode, useState } from "react";

interface CabecalhoDataProps {
    nome: string;
    cidade: string;
    estado: string;
    id: string;
    tipo: string;
    sobre: string | null | undefined;
    action?: ReactNode;
}

export default function CabecalhoData({ id, tipo, nome, cidade, estado, sobre, action }: CabecalhoDataProps) {
    const supabase = createClientComponentClient<Database>({});

    const tabela = tipo == "corretor" ? "corretor" : "corporacao"

    const [data, setData] = useState({
        nome: nome,
        cidade: cidade,
        estado: estado,
        sobre: sobre
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
                if (tabela == "corporacao") {
                    setData({
                        nome: payload.new.nomefantasia,
                        estado: payload.new.estado,
                        cidade: payload.new.cidade,
                        sobre: payload.new.sobre,
                    })
                } else {
                    setData({
                        nome: payload.new.nome,
                        estado: payload.new.estado,
                        cidade: payload.new.cidade,
                        sobre: payload.new.sobre,
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

            {action}

            {sobre && (
                <div className=" mt-5">
                    <div className="rounded-md p-3 ring-2 mb-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md dark:text-white">
                        <p className="">{data.sobre}</p>
                    </div>
                </div>
            )}
        </>
    );
}