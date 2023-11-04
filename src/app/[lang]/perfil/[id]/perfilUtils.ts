import { Json } from "lib/database.types";
import { Historico } from "lib/modelos";

async function getProfileFullData(type: string, id: string, supabase:any) {

    if(type == "corretor"){
        let { data: corretorData } = await supabase
        .from('corretor')
        .select('*')
        .eq('id', id)
        .single()
        return corretorData;
    } else{
        let { data: corporacaoData } = await supabase
        .from('corporacao')
        .select('*')
        .eq('id', id)
        .single()
        return corporacaoData;
    }
}


async function getUserData( id: string, supabase:any) {

    let { data: session_data } = await supabase
        .from('simple_user_data')
        .select('*')
        .eq('id', id)
        .single()

    return session_data;
}

async function getAvaliacoes(id: string, supabase:any) {
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

 async function insertHistorico(historico: Historico, supabase:any) {
    const hist = historico!
    const { data, error } = await supabase
        .from('historico')
        .insert([
            { id: hist[0].id, id_corretor: hist[0].id_corretor, data_inicio: hist[0].data_inicio, data_fim: hist[0].data_fim, descricao: hist[0].descricao, nome_empresa: hist[0].nome_empresa },
        ])
        .select()

    return { data, error }
}

 async function deleteHistorico(id: string, supabase:any) {
    const { error } = await supabase
        .from('historico')
        .delete()
        .eq('id', id)

    return { error }

}

export async function updateHistorico(historico: Historico, supabase:any) {
    const hist = historico!

    const { error } = await supabase
        .from('historico')
        .update({data_inicio: hist[0].data_inicio, data_fim: hist[0].data_fim, descricao: hist[0].descricao, nome_empresa: hist[0].nome_empresa})
        .eq('id', hist[0].id)

    return { error }

}

async function getDataDashboard1(id: string, supabase: any) {
    let { data: data1 , error } = await supabase
    .rpc('obter_dados_dashboard_1', {
      idcorretor_param: id
    })

    return{data1, error}
}

async function getDataDashboard2(id: string, supabase: any) {
    let { data: data2 , error } = await supabase
    .rpc('obter_dados_dashboard_2', {
      idcorretor_param: id
    })

    return{data2, error}
}

export async function updateCorporacaoProfile(formData: any, id: string, supabase:any) {
    const { data: updatedData, error } = await supabase
        .from('corporacao')
        .update({
            nomefantasia: formData.nomefantasia,
            sobre: formData.sobre,
            cep: formData.cep,
            cidade: formData.cidade,
            bairro: formData.bairro,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento,
            estado: formData.uf,
            site: formData.site
        })
        .eq('id', id); // Substitua 'id' pelo campo correto que identifica a corporação

    return { updatedData, error }
}

export async function updateCorretorProfile(formData: any, id: string, supabase:any) {
    const { data: updatedData, error } = await supabase
        .from('corretor')
        .update({
            nome: formData.nome,
            sobre: formData.sobre,
            cep: formData.cep,
            cidade: formData.cidade,
            bairro: formData.bairro,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento,
            estado: formData.uf
        })
        .eq('id', id);

    return { updatedData, error }
}

export async function adicionarEspecialidade(idcorretor: string, idtipoimovel: string, supabase:any) {
    const { data, error } = await supabase
        .from('especialidade')
        .insert([
            { idcorretor, idtipoimovel },
        ])
        .select()

    return { data, error }
}

export async function removerEspecialidade(idcorretor: string, idtipoimovel: string, supabase:any) {
    const { data, error } = await supabase
        .from('especialidade')
        .delete()
        .eq('idcorretor', idcorretor)
        .eq('idtipoimovel', idtipoimovel)

    return { data, error }
}

export async function removerRegiao(id: string, regiao: { estado: string, cidade: string }, supabase:any) {
    const { data, error } = await supabase
        .from('usuarioporregiao')
        .delete()
        .eq('idusuario', id)
        .eq('regiao->>cidade', regiao.cidade)
        .eq('regiao->>estado', regiao.estado)

    return { data, error }
}

export async function adicionarRegiao(id: string, regiao: Json, supabase:any) {
    const { data, error } = await supabase
        .from('usuarioporregiao')
        .insert([{ idusuario: id, regiao }])
        .select()

    return { data, error }
}


export async function setTelefones(type: string, formData: any, id: string, supabase:any) {
    if (type == "corretor") {
        const { data: updatedData, error } = await supabase
            .from('corretor')
            .update({
                telefone: formData.telefone,
                celular: formData.celular,
                comercial: formData.comercial
            })
            .eq('id', id);

            return{updatedData, error}
    }else{
        const { data: updatedData, error } = await supabase
        .from('corporacao')
        .update({
            telefone1: formData.telefone_1,
            telefone2: formData.telefone_2,
            telefone3: formData.telefone_3
        })
        .eq('id', id);

        return{updatedData, error}
    }

}  




export { getUserData, getProfileFullData }

