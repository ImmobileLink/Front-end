"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "../database.types"

const getUserRooms = async (idusuario: string) => {
    const supabase = createClientComponentClient<Database>()
    const { data, error } = await supabase
        .from('usuarioporsala')
        .select('idsala')
        .eq('idusuario', idusuario)
    if (error) {
        console.log(error)
    }
    else {
        const array = data.map(item => item.idsala)
        const string = array.toString()
        return string
    }
}

export { getUserRooms }