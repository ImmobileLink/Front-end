"use client"

import { useState } from "react";
import EditImage from "./EditImage";
import { useProfileStore } from "lib/store/profileStore";

interface EditCapaProps { 
}

export default function EditCapa({  }: EditCapaProps) {

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const dict = useProfileStore.getState().dict!.profile
    const change = dict.editProfile.changeImage
    const title = dict.editProfile.changeImageTitle

    return (
        <>
            <button onClick={() => props.setOpenModal('default')} className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                {change}
            </button>

           <EditImage props={props} title={title} type={"capa"}/>

        </>
    );
}