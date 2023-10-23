import { v4 } from "uuid";
import { MensagemAInserir } from "../modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function insertMessage({ idautor, idsala, mensagem, imagem }: MensagemAInserir) {
    //deixei como any pq não da pra deixar como Publicacao, pq tem valores que são obrigatórios e a gente não insere manualmente 
    let novamensagem: any = {}
    if (imagem) {
        const uuid = v4()
        const fileNewName = uuid;
        novamensagem = {
            idautor: idautor,
            idsala: idsala,
            mensagem: mensagem,
            imagem: fileNewName
        }
        uploadFile(imagem, fileNewName);
    }
    else {
        novamensagem = {
            idautor: idautor,
            idsala: idsala,
            mensagem: mensagem
        }
    }

    const { error } = await supabase
        .from('mensagem')
        .insert(novamensagem)
    if (error) {
        return error
    }
    else {
        return false
    }
}

export async function uploadFile(file: File, fileName: string) {
    const { data, error } = await supabase
        .storage
        .from('mensagens')
        .upload(`imagens/${fileName}`, file)
    if (error) {
        console.log(error);
    }
}

export function getExtensionFromFilename(filename: string) {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        return ""; // Retorna uma string vazia se não houver ponto no nome do arquivo
    }
    return filename.slice(lastDotIndex); // Retorna a extensão a partir do ponto até o final
}
