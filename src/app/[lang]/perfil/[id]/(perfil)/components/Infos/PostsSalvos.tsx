"use client";

import PostList from "@/app/[lang]/feed/components/PostList";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";

interface PostsSalvos {}

export default function PostsSalvos({}: PostsSalvos) {
    const textos = useProfileStore.getState().dict?.feed!;
    const id = useProfileStore.getState().profileData?.id;
    return (
        <div className="m-3">
            <PostList idusuario={id} textos={textos} profile={true} salvo={true}/>
        </div>
    );
}
