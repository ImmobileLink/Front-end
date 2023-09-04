import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../../../lib/database.types";

const supabase = createServerComponentClient<Database>({ cookies });

type userDataType = {
    id: string | undefined;
    identificador: string | undefined;
    premium: boolean | undefined;
    role: number | undefined;
    conexoes:
        | {
              id: string;
              nome: string;
          }[]
        | null;
    associados:
        | {
              id: string;
              corretor: string;
          }[]
        | null;
    associados2:
        | {
              id: string;
              corporacao: string;
          }[]
        | null;
};

export async function getUserData() {
    let userData: userDataType = {
        id: undefined,
        identificador: undefined,
        premium: undefined,
        role: undefined,
        conexoes: null,
        associados: null,
        associados2: null,
    };

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session?.user.id) {
        {
            let { data, error } = await supabase.rpc("consultar_tipo_usuario", {
                id_usuario: session?.user.id,
            });

            userData.id = session?.user.id;
            userData.identificador = data![0].identificador;
            userData.premium = data![0].premium;
            userData.role = data![0].role;
        }
        {
            let { data, error } = await supabase.rpc("get_connected_users", {
                id_usuario: session?.user.id,
            });

            userData.conexoes = data;
        }
        if (userData.role == 2) {
            let { data, error } = await supabase.rpc(
                "obter_corretores_por_corporacao",
                {
                    id_corporacao: session?.user.id,
                }
            );

            userData.associados = data;
        }
        if (userData.role == 1) {
            let { data, error } = await supabase.rpc(
                "obter_corporacoes_por_corretor",
                {
                    id_corretor: session?.user.id,
                }
            );

            userData.associados2 = data;
        }
    }
    return userData;
}

export const getRegiao = async () => {
    const { data, error } = await supabase.from("regiao").select("*");
    if (error) console.log(error);
    else return data;
};

export async function getBrokersData() {
    let { data, error } = await supabase.rpc("obter_cinco_corretores_id");

    return data;
}
