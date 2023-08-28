import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/dist/client/components/headers';
import { Database } from '../database.types'


const supabase = createServerComponentClient<Database>({ cookies })


 async function getUserData(id: string) {
    let { data: session_data } = await supabase
        .from('simple_user_data')
        .select('*')
        .eq('id', id)
        .single()
    
        return session_data;
}

export  { getUserData }

