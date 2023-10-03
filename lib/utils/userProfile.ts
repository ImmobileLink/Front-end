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
        let { data: corretorData, error } = await supabase
        .rpc('get_corretor_com_avatar', {
          corretor_id: id
        })
        .single()
        return corretorData;
    } else{
        let { data: corporacaoData, error } = await supabase
        .rpc('get_corporacao_com_avatar', {
          corporacao_id: id
        })
        .single()
        return corporacaoData;
    }
    

    
}

async function verifyIfIsAssociado(idProfile: string, idSession:string) {
    const supabase = createServerSupabaseClient();

    let { data: isAssociado } = await supabase
        .rpc('verifica_associacao', {
            valor1: idProfile,
            valor2: idSession!
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

