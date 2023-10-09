"use client";
import { useEffect, useState } from "react";
import { HiDocumentAdd } from "react-icons/hi/";
import HistoricoPopup from "./HistoricoPopup";
import HistoricoCard from "./HistoricoCard";
import { getHistorico } from "@/../../lib/utils/Historico";
import { Historico } from "../../../../../../../../../lib/modelos";
import { useProfileStore } from "@/../../lib/store/profileStore";


interface HistoricoProps {}

export default function Historico({}: HistoricoProps) {

    const [openModal, setOpenModal] = useState<string | undefined>();
    const props = { openModal, setOpenModal };
    const [historico, setHistorico] = useState<Historico | null>()

    const state = useProfileStore.getState()
    
    useEffect(() => {
        const fetchHistorico = async () => {
            try {
                const data = await getHistorico(state.profileData?.id!);
                setHistorico(data.historico);
            } catch (error) {
                console.error("Erro ao buscar o histórico:", error);
            }
        };
        fetchHistorico();
    }, [])


    return (
        <>
            <div className="flex flex-row items-center gap-5 mb-5">
                <h2 className="font-semibold text-xl">{state.dict!.profile.historic}</h2>
                {state.isOwn && <HiDocumentAdd className="cursor-pointer" size={20} onClick={() => props.setOpenModal('default')} />}
            </div>

            <HistoricoPopup props={props} />

            {historico?.map((item : any) => {
                return (
                    <HistoricoCard item={item} props={props}/>
                  );
            })}


        </>
    );
}
