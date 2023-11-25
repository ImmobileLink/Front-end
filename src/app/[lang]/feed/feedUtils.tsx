import { PostFormProps } from "lib/modelos";
import { uploadFile } from "../../../../lib/utils/uploadFile";
import { v4 } from "uuid";

export async function getBrokersData(supabase: any) {
    let { data, error } = await supabase.rpc("obter_cinco_corretores_id");
    if (error) {
        console.log(error);
        return false;
    } else {
        return data;
    }
}

export async function deletePostAPI(postId: string, supabase: any) {
    const { error } = await supabase
        .from("publicacao")
        .delete()
        .eq("id", postId);
    if (error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}
export async function publishPost(
    { idusuario, regiao, texto, imagem }: PostFormProps,
    supabase: any
) {
    //deixei como any pq não da pra deixar como Publicacao, pq tem valores que são obrigatórios e a gente não insere manualmente
    let postContent: any = {};

    if (imagem) {
        const uuid = v4();
        const fileNewName = uuid;
        postContent = {
            id: uuid,
            idautor: idusuario,
            regiao: regiao,
            conteudo: texto,
            imagem: fileNewName,
        };
        uploadFile(imagem, fileNewName, "publicacoes", supabase);
    } else {
        postContent = { idautor: idusuario, regiao: regiao, conteudo: texto };
    }

    const { error } = await supabase.from("publicacao").insert(postContent);
    if (error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}

export async function salvarPublicacaoAPI(
    savedItem: { idusuario: string; idpublicacao: string },
    supabase: any
) {
    const { error } = await supabase.from("publicacaosalva").insert(savedItem);
    if (error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}

export async function removerPublicacaoSalvaAPI(
    userId: string,
    idpublicacao: string,
    supabase: any
) {
    const { error } = await supabase
        .from("publicacaosalva")
        .delete()
        .eq("idusuario", userId)
        .eq("idpublicacao", idpublicacao);
    if (error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}

export async function getPublicacoesSalvasAPI(
    userId: string | undefined,
    supabase: any
) {
    const { data, error } = await supabase
        .rpc("get_publicacoes_salvas", { idusuario: userId })
        .order("atualizadoem", { ascending: false })
        .limit(10);
    if (error) {
        console.log(error);
        return false;
    } else {
        return data;
    }
}

export async function getPublicacoesSalvasPorEstadoAPI(
    userId: string | undefined,
    estado: string,
    supabase: any
) {
    let { data, error } = await supabase
        .rpc("get_publicacoes_salvas", { idusuario: userId })
        .contains("regiao", { estado: estado! })
        .order("atualizadoem", { ascending: false })
        .limit(10);
    if (error) {
        console.log(error);
        return false;
    } else {
        return data;
    }
}

export async function getPublicacoesSalvasPorEstadoCidadeAPI(
    userId: string | undefined,
    estado: string,
    cidade: string,
    supabase: any
) {
    let { data, error } = await supabase
        .rpc("get_publicacoes_salvas", {
            idusuario: userId!,
        })
        .contains("regiao", {
            cidade: cidade!,
            estado: estado!,
        })
        .order("atualizadoem", { ascending: false })
        .limit(10);
    if (error) {
        console.log(error);
        return false;
    } else {
        return data;
    }
    if (error) {
        console.log(error);
        return false;
    } else {
        return data;
    }
}
