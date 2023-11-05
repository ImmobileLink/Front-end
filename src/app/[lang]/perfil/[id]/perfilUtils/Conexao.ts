
async function getEstadoBtnConexao(uuid1: string, uuid2: string, supabase: any) {

    let { data, error } = await supabase
        .rpc('get_conexao', {
            uuid1,
            uuid2
        })
    return { data, error }
}

async function desassociarPerfis(idConexao: string, supabase: any) {
    // console.log(idConexao)

    const { data, error } = await supabase
        .from('conexoes')
        .delete()
        .eq('id', idConexao)
    

    return { data, error }
}

async function sendConvite(idPerfil: string, idSessao: string, supabase: any) {


    const { data, error } = await supabase
        .from('conexoes')
        .insert([
            { idusuario1: idPerfil, idusuario2: idSessao, iniciativa: idSessao },
        ])

    return { data, error }
}

async function getIdConexao(uuid1: string, uuid2: string, supabase: any) {

    let { data, error } = await supabase
        .rpc('get_id_conexao', {
            uuid1,
            uuid2
        })

    return { data, error}
}

async function cancelaConvite(idConexao: string, supabase: any) {

    const { data, error } = await supabase
        .from('conexoes')
        .delete()
        .eq('id', idConexao)

    return { data, error }
}

async function aceitarConvite(idConexao: string, supabase: any) {

    const { data, error } = await supabase
        .from('conexoes')
        .update({ pendente: false })
        .eq('id', idConexao)

    return { data, error }
}


export { getEstadoBtnConexao, getIdConexao ,desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite }