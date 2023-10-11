"use client"

import { useState } from "react";
import EditImage from "./EditImage";

interface EditCapaProps { }

export default function EditCapa({ }: EditCapaProps) {

    const [editImage, setEditImage] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => setEditImage(!editImage)} className="absolute top-2 right-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Alterar Imagem
            </button>

            {/* {editImage && (
                <EditImage />
            )} */}

            <EditImage />

        </>
    );
}