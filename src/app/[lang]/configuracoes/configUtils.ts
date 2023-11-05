import { Session } from "@supabase/supabase-js";

export const getSessionAPI = async (supabase: any) => {
    const {
        data: { session },
        error
    } = await supabase.auth.getSession();
    if (error) {
        console.log(error) //Podemos tentar tratar melhor esses erros depois!
        return false
    }
    else {
        return session
    }
}

export const getUserTypeAPI = async (session: Session | null, supabase: any) => {
    const { data, error } = await supabase
        .rpc('consultar_tipo_usuario', {
            id_usuario: session?.user.id!
        })
    if (error) {
        console.log(error)
        return false;
    }
    else {
        return data
    }
}

export const emailChangeAPI = async (email: string, supabase: any) => {
    const { error } = await supabase.auth.updateUser({ email });

    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}

export const passwordChangeAPI = async (password: string, supabase: any) => {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
        console.log(error)
        return false
    }
    else {
        return true
    }
}
export async function setTelefones(type: string, formData: any, id: string, supabase: any) {
    if (type == "corretor") {
        const { data: updatedData, error } = await supabase
            .from('corretor')
            .update({
                telefone: formData.telefone,
                celular: formData.celular,
                comercial: formData.comercial
            })
            .eq('id', id);

        if (error) {
            console.log(error)
            return false
        }
        else {
            return updatedData
        }
    } else {
        const { data: updatedData, error } = await supabase
            .from('corporacao')
            .update({
                telefone1: formData.telefone_1,
                telefone2: formData.telefone_2,
                telefone3: formData.telefone_3
            })
            .eq('id', id);

        if (error) {
            console.log(error)
            return false
        }
        else {
            return updatedData
        }
    }
}
