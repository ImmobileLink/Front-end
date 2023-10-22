"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

async function getEstadoBtnConexao(uuid1: string, uuid2: string) {

    let { data, error } = await supabase
        .rpc('get_conexao', {
            uuid1,
            uuid2
        })
    return { data, error }
}

async function desassociarPerfis(idConexao: string) {
    console.log(idConexao)

    const { data, error } = await supabase
        .from('conexoes')
        .delete()
        .eq('id', idConexao)
    

    return { data, error }
}

async function sendConvite(idPerfil: string, idSessao: string) {


    const { data, error } = await supabase
        .from('conexoes')
        .insert([
            { idusuario1: idPerfil, idusuario2: idSessao, iniciativa: idSessao },
        ])

    return { data, error }
}

async function getIdConexao(uuid1: string, uuid2: string) {

    let { data, error } = await supabase
        .rpc('get_id_conexao', {
            uuid1,
            uuid2
        })

    if (error) console.error(error)
    else console.log(data)

    return { data, error}
}

async function cancelaConvite(idConexao: string) {

    const { data, error } = await supabase
        .from('conexoes')
        .delete()
        .eq('id', idConexao)

    return { data, error }
}

async function aceitarConvite(idConexao: string) {

    const { data, error } = await supabase
        .from('conexoes')
        .update({ pendente: false })
        .eq('id', idConexao)

    return { data, error }
}


export { getEstadoBtnConexao, getIdConexao ,desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite }