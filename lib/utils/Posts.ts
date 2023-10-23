"use client"
import { v4 } from "uuid";
import { PostFormProps } from "../modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function publishPost({ idusuario, regiao, texto, imagem }: PostFormProps) {
  //deixei como any pq não da pra deixar como Publicacao, pq tem valores que são obrigatórios e a gente não insere manualmente 
  let postContent: any = {};

  if (imagem) {
    const uuid = v4();
    const fileNewName = uuid;
    postContent = { id: uuid, idautor: idusuario, regiao: regiao, conteudo: texto, imagem: fileNewName };
    uploadFile(imagem, fileNewName);
  } else {
    postContent = { idautor: idusuario, regiao: regiao, conteudo: texto };
  }

  const { error } = await supabase.from('publicacao').insert(postContent)
  if (error) {
    return error;
  }
  return false;
}

export async function uploadFile(file: File, fileName: string) {
  const { data, error } = await supabase
    .storage
    .from('publicacoes')
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
