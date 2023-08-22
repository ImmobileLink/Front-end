"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { v4 } from "uuid";

const supabase = createClientComponentClient<Database>()

interface PostProps {
  idusuario: string;
  selectedCity: string;
  texto: string;
  imagem?: File;
}

export async function publishPost({ idusuario, selectedCity, texto, imagem }: PostProps) {
  //deixei como any pq não da pra deixar como Publicacao, pq tem valores que são obrigatórios e a gente não insere manualmente 
  let postContent: any = {};

  if(imagem) {
    const uuid = v4();
    const fileNewName = uuid.concat(getExtensionFromFilename(imagem.name));
    postContent = { id: uuid, idautor: idusuario, regiao: selectedCity, conteudo: texto, imagem: fileNewName };
    uploadFile(imagem, fileNewName);
  } else {
    postContent = { idautor: idusuario, regiao: selectedCity, conteudo: texto };
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
    .upload(`imagens/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false
    })
  if (error) {
    console.log(error);
    // Handle error
  } else {
    console.log(data);
    // Handle success
  }
}

export function getExtensionFromFilename(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return ""; // Retorna uma string vazia se não houver ponto no nome do arquivo
  }
  return filename.slice(lastDotIndex); // Retorna a extensão a partir do ponto até o final
}