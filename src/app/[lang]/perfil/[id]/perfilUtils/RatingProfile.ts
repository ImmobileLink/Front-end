

async function getAvaliacoes(id: string, supabase: any) {
    let { data, error } = await supabase
        .rpc('obter_avaliacoes', {
            id_cor: id
        })

    return { data, error }
}

async function getNotaMedia(id: string, supabase: any) {

    let { data: notaMedia, error: errorNota } = await supabase
        .from('avaliacao')
        .select('nota')
        .eq('id', id)
        .single()

    return { notaMedia, errorNota }
}


export { getAvaliacoes, getNotaMedia }