import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import { userData } from "../modelos";

const supabase = createServerComponentClient<Database>({ cookies });

export async function getTipoUsuario(userData: userData, userId: string): Promise<userData> {
  let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
    id_usuario: userId,
  });

  if(!error) {
    userData.id = userId;
    userData.nome = data![0].nome;
    userData.isPremium = data![0].ispremium;
    userData.type = data![0].role;
  }

  return userData;
}

export async function getLinks (userData: userData): Promise<userData> {
  let { data, error } = await supabase.rpc("get_connected_users", {
    id_usuario: userData.id!,
  });

  if(!error) {
    userData.links = data;
  }

  return userData;
}

export async function getAssoc (userData: userData): Promise<userData> {
  if (userData.type == "corporacao") {
    let { data, error } = await supabase.rpc(
      "obter_corretores_por_corporacao",
      {
        id_corporacao: userData.id!,
      }
    );

    if(!error) {
      userData.assoc = data;
    }
  }

  if (userData.type == "corretor") {
    let { data, error } = await supabase.rpc(
      "obter_corporacoes_por_corretor",
      {
        id_corretor: userData.id!,
      }
    );

    if(!error) {
      userData.assoc = data;
    }
  }

  return userData;
}