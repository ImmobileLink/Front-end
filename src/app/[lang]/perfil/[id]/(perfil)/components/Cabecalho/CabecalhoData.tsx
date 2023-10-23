import RatingCount from "./Rating";
import { Database } from "../../../../../../../../lib/database.types";
import { ReactNode, useState } from "react";
import { useProfileStore } from "../../../../../../../../lib/store/profileStore";

interface CabecalhoDataProps {
   
    action?: ReactNode;
}

export default function CabecalhoData({ action }: CabecalhoDataProps) {
   
    const state = useProfileStore.getState()
    const sobre = state.profileFullData?.sobre
    const type = state.profileData?.type

    return (
        <>

            <h2 className="font-bold text-2xl dark:text-white">{state.profileData?.nome}</h2>
            <div className="flex flex-wrap-reverse gap-4 mt-2">
                <p className="text-gray-500 dark:text-gray-400">{`${state.profileFullData?.cidade} - ${state.profileFullData?.estado}`}</p>
                {type == "corretor" && <RatingCount />}
            </div>

            {action}

            {sobre && (
                <div className=" mt-5">
                    <div className="rounded-md p-3 ring-2 mb-2 ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 drop-shadow-md dark:text-white">
                        <p className="">{sobre}</p>
                    </div>
                </div>
            )}
        </>
    );
}