import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function getHistorico(id: string) {
    const { data: historico, error } = await supabase
        .from('historico')
        .select('*')
        .eq('id_corretor', id);

    return { historico, error }
}

