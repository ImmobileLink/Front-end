"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

const getId = (idProfile:string, idSession:string, typeSession: string) => {
    let corporacao = null
    let corretor = null
    if(typeSession == "corporacao"){
      corporacao = idSession
      corretor = idProfile
    }else{
      corporacao = idProfile
      corretor = idSession
    }
    return {corporacao, corretor}
  }

async function getEstadoBtnAssoc(idCorretor:string, idCorporacao:string) {

    const { data, error } = await supabase
    .from('associacoes')
    .select('*')
    .eq('idcorporacao', idCorporacao)
    .eq('idcorretor', idCorretor)

    return {data, error}
}

async function desassociarPerfis(idCorretor:string, idCorporacao:string) {


    const { data, error } = await supabase
    .from('associacoes')
    .delete()
    .eq('idcorretor', idCorretor)
    .eq('idcorporacao', idCorporacao)

    return {data, error}
}

async function sendConvite(idCorretor:string, idCorporacao:string, idSession:string) {


    const { data, error } = await supabase
    .from('associacoes')
    .insert([
      { idcorretor: idCorretor, idcorporacao: idCorporacao, iniciativa: idSession },
    ])

    return {data, error}
}

async function cancelaConvite(idCorretor:string, idCorporacao:string){


    const { data, error } = await supabase
      .from('associacoes')
      .delete()
      .eq('idcorretor', idCorretor)
      .eq('idcorporacao', idCorporacao)

      return {data, error}
}

async function aceitarConvite(idCorretor:string, idCorporacao:string){

    const { data, error } = await supabase
      .from('associacoes')
      .update({ pendente: false })
      .eq('idcorretor', idCorretor)
      .eq('idcorporacao', idCorporacao)

      return {data, error}
}


export {getEstadoBtnAssoc, desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite}