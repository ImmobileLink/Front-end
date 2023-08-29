import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';
import { Database } from '../database.types'
import { profileSimpleData } from '../modelos';


const supabase = createServerComponentClient<Database>({ cookies })


async function getUserData(id: string) {
    let { data: session_data } = await supabase
        .from('simple_user_data')
        .select('*')
        .eq('id', id)
        .single()

    return session_data;
}

async function getCorretorData(id: string) {
    let { data: corretorData } = await supabase
        .from('corretor')
        .select('*')
        .eq('id', id)
        .single()

    return corretorData;
}

async function verifyIfIsAssociado(idProfile: string, idSession:string) {
    
    let { data: isAssociado } = await supabase
        .rpc('verifica_associacao', {
            valor1: idProfile,
            valor2: idSession!
        })

    return isAssociado;
}

export { getUserData, getCorretorData, verifyIfIsAssociado }

