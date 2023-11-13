import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "lib/database.types"

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

async function getEstadoBtnAssoc(idCorretor:string, idCorporacao:string, supabase:  SupabaseClient<Database>) {

    const { data, error } = await supabase
    .from('associacoes')
    .select('*')
    .eq('idcorporacao', idCorporacao)
    .eq('idcorretor', idCorretor)
    

    return {data, error}
}

async function desassociarPerfis(idCorretor:string, idCorporacao:string, supabase:  SupabaseClient<Database>) {


    const { data, error } = await supabase
    .from('associacoes')
    .delete()
    .eq('idcorretor', idCorretor)
    .eq('idcorporacao', idCorporacao)

    if(error){
      return false
    } else{
      return true
    }
}

async function sendConvite(idCorretor:string, idCorporacao:string, idSession:string, supabase: any) {


    const { data, error } = await supabase
    .from('associacoes')
    .insert([
      { idcorretor: idCorretor, idcorporacao: idCorporacao, iniciativa: idSession },
    ])

    if(!error){
      return true
    }else{
      return false
    }
}

async function cancelaConvite(idCorretor:string, idCorporacao:string, supabase:  SupabaseClient<Database>){
    const { data, error } = await supabase
      .from('associacoes')
      .delete()
      .eq('idcorretor', idCorretor)
      .eq('idcorporacao', idCorporacao)

      return {data, error}
}

async function aceitarConvite(idCorretor:string, idCorporacao:string, supabase:  SupabaseClient<Database>){

    const { data, error } = await supabase
      .from('associacoes')
      .update({ pendente: false })
      .eq('idcorretor', idCorretor)
      .eq('idcorporacao', idCorporacao)

    if(error){
      return false
    }else{
      return true
    }

}


export {getEstadoBtnAssoc, desassociarPerfis, sendConvite, cancelaConvite, aceitarConvite}