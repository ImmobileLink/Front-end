import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function updateCorporacaoProfile(formData: any, id: string){
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

            return {updatedData, error}
}    

export async function updateCorretorProfile(formData: any, id: string){
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

            return {updatedData, error}
}  


