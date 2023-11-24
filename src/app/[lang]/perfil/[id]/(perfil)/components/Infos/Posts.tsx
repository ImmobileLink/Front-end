"use client";

import PostList from "@/app/[lang]/feed/components/PostList";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";

interface PostsProps {}

export default function Posts({}: PostsProps) {
    const textos = useProfileStore.getState().dict?.feed!;
    const id = useProfileStore.getState().sessionData?.id;
    const idProfile = useProfileStore.getState().profileData?.id;
    return (
        <div className="m-3">
            {/**
             * NOTA [LEIA ANTES DE CODAR]: O mock PostList não funciona mais e precisa ser ajustado
             * Mudanças (significativas) foram feitas no feed.
             * 
             * Sugestão de alteração:
             * let response = await supabase
                        .rpc("get_publicacoes_salvas", { idusuario })
                        .eq("issalvo", true)
                        .order("atualizadoem", { ascending: false })
                        .limit(10);
                let data = response.data;
                // O response é interessante de se manter caso queira ver o corpo completo da requisição
                // e por conseguinte verificar que ela está de fato retornando tudo que é esperado.
             */}
            <PostList idusuario={id} textos={textos} idprofile={idProfile}/>
        </div>
    );
}
