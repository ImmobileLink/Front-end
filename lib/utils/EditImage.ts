"use client"

import { PostFormProps } from "../modelos";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../database.types";

const supabase = createClientComponentClient<Database>({});

export async function uploadCoverImage(imagemId: string, img: File, id: string) {
    const { data, error } = await supabase
        .storage
        .from('users')
        .upload(`${id}/cover/${imagemId}`, img!, {
            cacheControl: '3600',
            upsert: true
        });

    return { data, error }
}

export async function uploadProfileImage(imagemId: string, img: File, id: string) {
    const { data, error } = await supabase
        .storage
        .from('users')
        .upload(`${id}/profile_picture/${imagemId}`, img!, {
            cacheControl: '3600',
            upsert: true
        });

    return { data, error }
}
