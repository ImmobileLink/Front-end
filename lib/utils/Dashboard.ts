"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

async function getDataDashboard1(id: string) {
    let { data: data1 , error } = await supabase
    .rpc('obter_dados_dashboard_1', {
      idcorretor_param: id
    })

    return{data1, error}
}

async function getDataDashboard2(id: string) {
    let { data: data2 , error } = await supabase
    .rpc('obter_dados_dashboard_2', {
      idcorretor_param: id
    })

    return{data2, error}
}

export {getDataDashboard1, getDataDashboard2}