import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function getHistorico(id: string) {
    const { data: historico, error } = await supabase
        .from('historico')
        .select('*')
        .eq('id_corretor', id);

    return { historico, error }
}

export async function insertHistorico(id_corretor: string, data_inicio: string, data_fim: string, descricao:string, nome_empresa:string){
    const { data, error } = await supabase
    .from('historico')
    .insert([
      { id_corretor, data_inicio: new Date(data_inicio), data_fim: new Date(data_fim), descricao, nome_empresa },
    ])
    .select()

    return {data, error}
}

