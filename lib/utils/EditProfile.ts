import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Json } from "../database.types";

const supabase = createClientComponentClient<Database>({});


export async function updateCorporacaoProfile(formData: any, id: string) {
    const { data: updatedData, error } = await supabase
        .from('corporacao')
        .update({
            nomefantasia: formData.nomefantasia,
            sobre: formData.sobre,
            cep: formData.cep,
            cidade: formData.cidade,
            bairro: formData.bairro,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento,
            estado: formData.uf
        })
        .eq('id', id); // Substitua 'id' pelo campo correto que identifica a corporação

    return { updatedData, error }
}

export async function updateCorretorProfile(formData: any, id: string) {
    const { data: updatedData, error } = await supabase
        .from('corretor')
        .update({
            nome: formData.nome,
            sobre: formData.sobre,
            cep: formData.cep,
            cidade: formData.cidade,
            bairro: formData.bairro,
            logradouro: formData.logradouro,
            numero: formData.numero,
            complemento: formData.complemento,
            estado: formData.uf
        })
        .eq('id', id);

    return { updatedData, error }
}

export async function adicionarEspecialidade(idcorretor: string, idtipoimovel: string) {
    const { data, error } = await supabase
        .from('especialidade')
        .insert([
            { idcorretor, idtipoimovel },
        ])
        .select()

    return { data, error }
}

export async function removerEspecialidade(idcorretor: string, idtipoimovel: string) {
    const { data, error } = await supabase
        .from('especialidade')
        .delete()
        .eq('idcorretor', idcorretor)
        .eq('idtipoimovel', idtipoimovel)

    return { data, error }
}

export async function removerRegiao(id: string, regiao: { estado: string, cidade: string }) {
    const { data, error } = await supabase
        .from('usuarioporregiao')
        .delete()
        .eq('idusuario', id)
        .eq('regiao->>cidade', regiao.cidade)
        .eq('regiao->>estado', regiao.estado)

    return { data, error }
}

export async function adicionarRegiao(id: string, regiao: Json) {
    const { data, error } = await supabase
        .from('usuarioporregiao')
        .insert([{ idusuario: id, regiao }])
        .select()

    return { data, error }
}


export async function setTelefones(type: string, formData: any, id: string) {
    if (type == "corretor") {
        const { data: updatedData, error } = await supabase
            .from('corretor')
            .update({
                telefone: formData.telefone,
                celular: formData.celular,
                comercial: formData.comercial
            })
            .eq('id', id);

            return{updatedData, error}
    }else{
        const { data: updatedData, error } = await supabase
        .from('corporacao')
        .update({
            telefone1: formData.telefone_1,
            telefone2: formData.telefone_2,
            telefone3: formData.telefone_3
        })
        .eq('id', id);

        return{updatedData, error}
    }

}  