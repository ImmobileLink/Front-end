"use client";
import { Planos } from "@/app/i18n/dictionaries/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../../../lib/database.types";
import { setPremiumFalse, setPremiumTrue } from "../utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ModalTogglePlanoProps {
    id: string;
    role: string;
    premium: boolean;
    setToggle: Function;
    dict: Planos;
}

export default function ModalTogglePlano({
    dict,
    id,
    role,
    premium,
    setToggle,
}: ModalTogglePlanoProps) {
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleTogglePlano = async () => {
        if (premium) {
            // set plano FREE
            const callback = await setPremiumFalse(id, role, supabase);
            if (!callback) {
                console.log("Error while updating in DB");
                toast.error(dict.changeerror);
            }
            setToggle(false);
            router.refresh();
            toast.success(dict.changesuccess);
        } else {
            // set plano PREMIUM
            const callback = await setPremiumTrue(id, role, supabase);
            if (!callback) {
                console.log("Error while updating in DB");
                toast.error(dict.changeerror);
            }
            setToggle(false);
            router.refresh();
            toast.success(dict.changesuccess);
        }
    };

    return (
        <div className="fixed flex justify-center align-middle w-screen h-full top-0 left-0 bg-black/25 select-none">
            <div className="self-center w-10/12 md:w-8/12 lg:w-4/12 h-fit bg-white dark:bg-gray-900 rounded-2xl ring-1 ring-gray-800">
                <div className=" px-8 py-2">
                    <p className="my-4 text-xl font-bold mb-2">
                        {dict.changeto} {premium ? "FREE" : "PREMIUM"}?
                    </p>

                    <a className="text-2xl text-blue-700 font-bold pr-2">
                        {dict.freetier}
                    </a>
                    {premium ? (
                        <p>{dict.changeforfree}</p>
                    ) : (
                        <>
                            <a className="line-through">
                                {role == "corretor"
                                    ? dict.brokertier
                                    : dict.companytier}
                            </a>
                            <p>{dict.changetopremiumforfree}</p>
                            <p className="text-black/50 dark:text-white/50 text-sm">
                                {"* "}
                                {dict.limitedtime}
                            </p>
                        </>
                    )}

                    <div className="flex flex-col md:flex-row py-8 justify-center items-center md:justify-between">
                        <button
                            className="w-full md:w-fit text-white bg-gray-500 hover:bg-gray-700 focus:ring-4 font-medium rounded-lg text-sm px-10 py-2.5"
                            onClick={() => {
                                setToggle(false);
                            }}
                        >
                            {dict.cancel}
                        </button>
                        <button
                            className="p-2 w-full md:w-fit mt-4 md:mt-0 text-center cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 rounded-lg"
                            onClick={() => {
                                handleTogglePlano();
                            }}
                        >
                            {dict.change} {premium ? "FREE" : "PREMIUM"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
