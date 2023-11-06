export async function getPublicacaoPorIdAPI(pubId: string, supabase: any) {
    const { data, error } = await supabase
        .rpc("get_publicacoes_salvas", {
            idusuario: null
        })
        .eq('id', pubId)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return data
    }
}

export async function submitReportAPI(userId: string, publicacao:
    {
        id: string;
        idautor: string;
        avatar: string;
        nomeautor: string;
        regiao: any;
        conteudo: string;
        imagem: string;
        criadoem: string;
        atualizadoem: string;
    }, motivo: string, descricao: string, supabase: any) {
    let { error } = await supabase.from("denuncia").insert({
        idusuario: userId,
        idpublicacao: publicacao.id,
        idautor: publicacao.idautor,
        motivo,
        descricao,
    })
    if(error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}