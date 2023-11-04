

async function getProfileFullData(type: string, id: string, supabase: any) {
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


async function getUserData( id: string, supabase: any) {

    let { data: session_data } = await supabase
        .from('simple_user_data')
        .select('*')
        .eq('id', id)
        .single()

    return session_data;
}

async function getAvaliacao(id: string, supabase: any) {

    let { data: avaliacao } = await supabase
    .from('avaliacao')
    .select('nota')
    .eq('id', id)
    .single()

    return avaliacao;
}


export { getUserData, getProfileFullData }

