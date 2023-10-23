"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

async function getAvaliacao(id: string) {
    let { data: avaliacao , error } = await supabase
    .rpc('obter_avaliacao_media', {
      idcorretor_param: id
    })

    return{avaliacao, error}
}

async function getSatisfacao(id: string) {
    let { data: satisfacao , error } = await supabase
    .rpc('obter_satisfacao_media', {
      idcorretor_param: id
    })

    return{satisfacao, error}
}

export {getAvaliacao, getSatisfacao}