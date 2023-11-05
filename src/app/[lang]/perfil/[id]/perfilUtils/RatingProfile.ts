import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "lib/database.types"


async function getAvaliacoes(id: string, supabase: SupabaseClient<Database>) {
    let { data, error } = await supabase
        .rpc('obter_avaliacoes', {
            id_cor: id
        })

    return { data, error }
}

async function getNotaMedia(id: string, supabase: SupabaseClient<Database>) {

    let { data: notaMedia, error: errorNota } = await supabase
        .from('avaliacao')
        .select('nota')
        .eq('id', id)
        .single()

        
    return { notaMedia, errorNota }
}


export { getAvaliacoes, getNotaMedia }