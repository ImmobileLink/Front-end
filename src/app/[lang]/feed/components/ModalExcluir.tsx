"use client";
import { Feed } from "@/app/i18n/dictionaries/types";
import { clientSupabase } from "lib/utils/clientSupabase";
import { deletePostAPI } from "../feedUtils";

interface ModalExcluirProps {
    setDeletePost: Function;
    id: string;
    dict: Feed;
}

export default function ModalExcluir({
    setDeletePost,
    id,
    dict
}: ModalExcluirProps) {

    const supabase = clientSupabase();

    const handleDeletePost = async () => {
        await deletePostAPI(id, supabase)
        window.location.reload();
    }

    return (
        <div className="absolute p-3 z-999 flex justify-center inset-0 bg-black/25 select-none">
            <div className="self-center w-fit h-fit bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-800">
                <div className=" px-8 py-2">
                    <p className="mt-4 text-xl font-bold mb-2">
                        {dict.pub.areyousure}
                    </p>
                    <p className="text-center">{dict.pub.irreversibleaction}</p>
                    <div className="flex flex-col md:flex-row py-8 justify-center items-center md:justify-between">
                        <button
                            className="w-full md:w-2/5 text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5"
                            onClick={() => setDeletePost(false)}
                        >
                            {dict.pub.cancel}
                        </button>
                        <button
                            className="p-2 w-full md:w-2/5 mt-4 md:mt-0 text-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                            onClick={() => {
                                handleDeletePost();
                                setDeletePost(false);
                            }}
                        >
                            {dict.pub.delete}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
