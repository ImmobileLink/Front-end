"use client"

import { useState } from "react";
import EditImage from "./EditImage";
import { AiFillEdit } from "react-icons/ai";
import { useProfileStore } from "../../../../../../../../../lib/store/profileStore";

interface EditAvatar {
}

export default function EditAvatar({ }: EditAvatar) {

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const isOwn = useProfileStore.getState().isOwn
    const dict = useProfileStore.getState().dict!.profile

    return (
        <>
            <div onClick={() => props.setOpenModal('default')} className="invisible group-hover:visible absolute flex justify-center items-center w-full h-full">
                <AiFillEdit size={30} color={"black"} />
            </div>

            <EditImage props={props} title={dict.editProfile.changeProfileTitle} type={"avatar"}/>

        </>
    );
}