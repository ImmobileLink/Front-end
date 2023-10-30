"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

async function getAvaliacoes(id: string) {
    let { data, error } = await supabase
        .rpc('obter_avaliacoes', {
            id_cor: id
        })

    return { data, error }
}

async function getNotaMedia(id: string) {

    let { data: notaMedia, error: errorNota } = await supabase
        .from('avaliacao')
        .select('nota')
        .eq('id', id)
        .single()

    return { notaMedia, errorNota }
}


export { getAvaliacoes, getNotaMedia }