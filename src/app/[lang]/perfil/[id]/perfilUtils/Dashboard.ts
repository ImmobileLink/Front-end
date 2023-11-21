import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "lib/database.types"

async function getDataDashboard1(id: string, supabase: SupabaseClient<Database>) {
    let { data: data1 , error } = await supabase
    .rpc('obter_dados_dashboard_1', {
      idcorretor_param: id
    })

    return{data1, error}
}

async function getDataDashboard2(id: string, supabase: SupabaseClient<Database>) {
    let { data: data2 , error } = await supabase
    .rpc('obter_dados_dashboard_2', {
      idcorretor_param: id
    })

    return{data2, error}
}

async function getDataDashboard3(id: string, supabase: SupabaseClient<Database>) {
  let { data: data3 , error } = await supabase
  .rpc('obter_dados_dashboard_3', {
    idcorretor_param: id
  })

  return{data3, error}
}

async function getDataDashboard4(id: string, supabase: SupabaseClient<Database>) {
  let { data: data4 , error } = await supabase
  .rpc('obter_dados_dashboard_4', {
    idcorretor_param: id
  })
  

  return{data4, error}
}

async function getDataDashboardCorporacao1(id: string, supabase: SupabaseClient<Database>) {
  let { data: data4 , error } = await supabase
  .rpc('obter_dados_dashboard_empresa_1', {
    idempresa_param: id
  })
  

  return{data4, error}
}

async function getDataDashboardCorporacao2(id: string, supabase: SupabaseClient<Database>) {
  let { data: data3 , error } = await supabase
  .rpc('obter_dados_dashboard_empresa_2', {
    idempresa_param: id
  })
  

  return{data3, error}
}

export {getDataDashboard1, getDataDashboard2, getDataDashboard3, getDataDashboard4, getDataDashboardCorporacao1, getDataDashboardCorporacao2}