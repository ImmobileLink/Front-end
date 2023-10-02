"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});


async function getEstadoBtnAssoc(idProfile:string, idSession:string) {

    const { data, error } = await supabase
    .from('associacoes')
    .select('*')

    return data;
}




export {getEstadoBtnAssoc}