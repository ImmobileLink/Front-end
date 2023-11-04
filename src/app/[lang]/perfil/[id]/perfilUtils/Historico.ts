
import { Historico } from "../../../../../../lib/modelos";


export async function insertHistorico(historico: Historico, supabase: any) {
    const hist = historico!
    const { data, error } = await supabase
        .from('historico')
        .insert([
            { id: hist[0].id, id_corretor: hist[0].id_corretor, data_inicio: hist[0].data_inicio, data_fim: hist[0].data_fim, descricao: hist[0].descricao, nome_empresa: hist[0].nome_empresa },
        ])
        .select()

    return { data, error }
}

export async function deleteHistorico(id: string, supabase: any) {
    const { error } = await supabase
        .from('historico')
        .delete()
        .eq('id', id)

    return { error }

}

export async function updateHistorico(historico: Historico, supabase: any) {
    const hist = historico!

    const { error } = await supabase
        .from('historico')
        .update({data_inicio: hist[0].data_inicio, data_fim: hist[0].data_fim, descricao: hist[0].descricao, nome_empresa: hist[0].nome_empresa})
        .eq('id', hist[0].id)

    return { error }

}

