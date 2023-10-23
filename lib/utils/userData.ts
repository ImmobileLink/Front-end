import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import { userData } from "../modelos";
import { cache } from "react";

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
})

export async function getTipoUsuario(userData: userData, userId: string): Promise<userData> {
  const supabase = createServerSupabaseClient();
  let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
    id_usuario: userId,
  });

  if (!error && data!.length > 0) {
    userData.id = userId;
    userData.nome = data![0].nome;
    userData.avatar = data![0].avatar;
    userData.isPremium = data![0].ispremium;
    userData.type = data![0].role;
    userData.capa = data![0].capa;
  }

  return userData;
}

export async function getLinks(userData: userData): Promise<userData> {
  const supabase = createServerSupabaseClient();
  let { data, error } = await supabase.rpc("get_connected_users", {
    id_usuario: userData.id!,
  });

  if (!error) {
    userData.links = data;
  }

  return userData;
}

export async function getAssoc(userData: userData): Promise<userData> {
  const supabase = createServerSupabaseClient();
  if (userData.type == "corporacao") {
    let { data, error } = await supabase.rpc(
      "obter_corretores_por_corporacao",
      {
        id_corporacao: userData.id!,
      }
    );

    if (!error) {
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

    if (!error) {
      userData.assoc = data;
    }
  }

  return userData;
}

export async function getAreasAtuacao(id: string) {
  const supabase = createServerSupabaseClient();

  let { data: usuarioporregiao, error } = await supabase
    .rpc('obter_cidade_estado_por_usuario', {
      user_id: id
    })

  return { usuarioporregiao }
}

export async function getEspecialidades(id: string) {
  const supabase = createServerSupabaseClient();

  let { data: especialidades, error } = await supabase
    .rpc('get_tipoimovel_by_idcorretor', {
      idcorret: id
    })

  return { especialidades }
}

export async function getHistorico(id: string) {
  const supabase = createServerSupabaseClient();

  const { data: historico, error } = await supabase
    .from('historico')
    .select('*')
    .eq('id_corretor', id);

  return { historico, error }
}



