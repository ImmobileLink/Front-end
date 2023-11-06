import { CorretorAssociado, InsereImovel, InsereVisita, TipoImovel, userData } from "lib/modelos";

export async function getBrokers(user: userData, supabase: any) {

    let array: CorretorAssociado[] = [];

    if (user.id) {
        if (user.type == "corporacao") {
            const { data: assoc, error } = await supabase
                .from("associacoes")
                .select("idcorretor")
                .eq("idcorporacao", user.id);

            if (!error) {
                for (let i = 0; i < assoc?.length; i++) {
                    const { data, error } = await supabase
                        .from("corretor")
                        .select(`id,nome,estado,cidade,tipoImovel(id,descricao)`)
                        .eq("id", assoc[i].idcorretor);
                    if (!error) {
                        array = [...array, ...data];
                    }
                }
                return array;
            }
        }
    }
    return array;
}

export async function filterAndMapTipos(tiposImovel: TipoImovel[], classificacao: string) {
    return tiposImovel
        .filter((obj: TipoImovel) => obj.classificacao === classificacao)
        .map((obj: TipoImovel) => ({ id: obj.id, descricao: obj.descricao, classificacao: obj.classificacao }));
}

export async function getTiposImovel(supabase: any) {
    const { data: tiposImovel, error } = await supabase.from('tipoImovel').select('*')
    if (error) {
        console.log(error)
        return false
    }
    else {
        return tiposImovel
    }
}

export async function getCountImovel(userId: string, supabase: any) {
    const { count, error } = (await supabase.from('imovel').select('*', { count: 'estimated', head: true }).eq("idcorporacao", userId));
    if (error) {
        console.log(error)
        return false
    }
    else {
        return count
    }
}

export async function getPropertiesAPI(userId: string, supabase: any) {
    const { data, error } = await supabase
        .from("imovel")
        .select("*")
        .eq("idcorporacao", userId);
    if (error) {
        console.log(error)
        return false
    } else {
        return data
    }
}

export async function imageEditAPI(userId: string, imagem: string, imagemId: string, img: File, supabase: any) {
    let { error } = await supabase.storage
        .from("imoveis") // Nome do bucket no Supabase
        .remove([`${userId}/${imagem}`]);
    if (error) {
        console.log(error)
        return false
    }
    else {
        let { error } = await supabase.storage
            .from("imoveis") // Nome do bucket no Supabase
            .upload(userId + "/" + imagemId, img!, {
                upsert: true,
            });
        if (error) {
            console.log(error)
            return false
        }
        else {
            return true
        }
    }
}

export async function imovelEditAPI(imagemId: string, imovelId: string, supabase: any) {
    const { error } = await supabase
        .from("imovel")
        .update({ imagem: imagemId })
        .eq("id", imovelId);
    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export async function cadastrarImagemAPI(userId: string, imagemId: string, img: File, supabase: any) {
    const { error } = await supabase.storage
        .from("imoveis") // Nome do bucket no Supabase
        .upload(userId + "/" + imagemId, img!); // Cria a pasta se ela ainda não existir
    if (error) {
        console.log(error);
        return false
    }
    else {
        return true
    }
}

export async function cadastrarImovelAPI(imovel: InsereImovel, supabase: any) {
    const { data, error } = await supabase
        .from("imovel")
        .insert(imovel)
        .select();
    if(error) {
        console.log(error)
        return false
    }
    else {
        return data
    }
}

export async function insereVisitaAPI(visita: InsereVisita, supabase: any) {
    const { error } = await supabase.from("visita").insert(visita);
    if (error) {
      console.error(error);
      return false
    } else {
      return true
    }
}