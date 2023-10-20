import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';
import { Database } from '../database.types'
import { cache } from "react";



export const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient<Database>({ cookies: () => cookieStore })
  })

async function getProfileFullData(type: string, id: string) {
    const supabase = createServerSupabaseClient();
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

async function verifyIfIsAssociado(idProfile: string, idSession:string) {
    const supabase = createServerSupabaseClient();

    let { data: isAssociado } = await supabase
        .rpc('verifica_se_conexao_existe', {
            uuid1: idProfile,
            uuid2: idSession!
        })

    return isAssociado;
}

async function getUserData( id: string) {
    const supabase = createServerSupabaseClient();

    let { data: session_data } = await supabase
        .from('simple_user_data')
        .select('*')
        .eq('id', id)
        .single()

    return session_data;
}

async function getAvaliacao(id: string) {
    const supabase = createServerSupabaseClient();

    let { data: avaliacao } = await supabase
    .from('avaliacao')
    .select('nota')
    .eq('id', id)
    .single()

    return avaliacao;
}

export { getUserData, getProfileFullData, verifyIfIsAssociado }

