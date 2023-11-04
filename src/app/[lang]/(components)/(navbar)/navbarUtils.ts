import { Notificacao } from "lib/modelos"

export const getNotificationsAPI = async (idusuario: string, supabase: any) => {
    const { data, error } = await supabase
        .from('notificacao')
        .select('*')
        .eq('iddestinatario', idusuario)
        .neq('tipo', 'mensagem')
        .order('data', { ascending: false })
    if (error) {
        console.log(error)
        return false
    }
    else {
        return data
    }
}

export const updateNotificationsAPI = async (itemId: string, userId: string, supabase: any) => {
    const { error } = await supabase
        .from('notificacao')
        .update({ visualizada: true })
        .eq('iddestinatario', userId)
        .eq('artefato', itemId)
        .select()
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const acceptAssociationAPI = async (itemId: string, supabase: any) => {
    const { error } = await supabase
        .from('associacoes')
        .update({ pendente: false })
        .eq('id', itemId)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const refuseAssociationAPI = async (itemId: string, supabase: any) => {
    const { error } = await supabase
        .from('associacoes')
        .delete()
        .eq('id', itemId)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const acceptConnectionAPI = async (itemId: string, supabase: any) => {
    const { error } = await supabase
        .from('conexoes')
        .update({ pendente: false })
        .eq('id', itemId)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const refuseConnectionAPI = async (itemId: string, supabase: any) => {
    const { error } = await supabase
        .from('conexoes')
        .delete()
        .eq('id', itemId)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}


export const acceptVisitAPI = async (idvisita: string, supabase: any) => {
    const { error } = await supabase
        .from('visita')
        .update({ aceito: true })
        .eq('id', idvisita)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const refuseVisitAPI = async (idvisita: string, supabase: any) => {
    const { error } = await supabase
        .from('visita')
        .update({ aceito: false })
        .eq('id', idvisita)
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const getMessageNotificationsAPI = async (idusuario: string, supabase: any) => {
    const { data, error } = await supabase
        .from('notificacao')
        .select('*')
        .eq('iddestinatario', idusuario)
        .eq('tipo', 'mensagem')
        .eq('visualizada', 'false')
    if (error) {
        console.log(error)
        return false
    }
    else {
        const array: Notificacao[] = data.map((item: Notificacao) => item.artefato)
        return array
    }
}

