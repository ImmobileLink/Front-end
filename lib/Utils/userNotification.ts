import { cache } from 'react'
import { Database } from '../database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const createServerSupabaseClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient<Database>({ cookies: () => cookieStore })
  })

export const getMessageNotifications = async (idusuario: string) => {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
        .from('notificacao')
        .select('*')
        .eq('iddestinatario', idusuario)
        .eq('tipo', 'mensagem')
        .eq('visualizada', 'false')
    if (error) {
        console.log(error)
    }
    else {
        const array = data.map(item => item.artefato)
        return array
    }
}