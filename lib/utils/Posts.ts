"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";
import { v4 } from "uuid";

const supabase = createClientComponentClient<Database>()

interface PostProps {
  idusuario: string;
  selectedCity: string;
  texto: string;
}

export async function publishPost({idusuario, selectedCity, texto}: PostProps) {
  const uuid = v4();
  const { error } = await supabase.from('publicacao').insert({ id: uuid, idautor: idusuario, regiao: selectedCity, conteudo: texto, imagem: uuid })
  if (error) {
    return error;
  }
  return false;
}

export async function uploadFile(file: File) {
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
  if (error) {
    console.log(error);
    // Handle error
  } else {
    console.log(data);
    // Handle success
  }
}